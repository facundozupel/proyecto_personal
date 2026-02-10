import { useState, useCallback, useRef, useLayoutEffect } from 'react';
import type { AnalyzerState, ChatMessage, SeoExtractedData } from '@/types/seo-analyzer';
import { UrlInput } from './UrlInput';
import { CrawlProgress } from './CrawlProgress';
import { ChatInterface } from './ChatInterface';
import { EmailGateModal } from './EmailGateModal';
import { CtaScheduleCall } from './CtaScheduleCall';

const EMAIL_GATE_AFTER = 2; // Show gate after this many user messages
const MAX_QUESTIONS = 3; // Hard limit per session

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function trackEvent(event: string, params?: Record<string, any>) {
  window.gtag?.('event', event, params);
}

export function SeoAnalyzer() {
  const [state, setState] = useState<AnalyzerState>('idle');
  const savedScrollRef = useRef<number | null>(null);

  // Save scroll position before state change, restore after DOM update
  const setStateKeepScroll = useCallback((newState: AnalyzerState) => {
    savedScrollRef.current = window.scrollY;
    setState(newState);
  }, []);

  useLayoutEffect(() => {
    if (savedScrollRef.current !== null) {
      window.scrollTo(0, savedScrollRef.current);
      savedScrollRef.current = null;
    }
  }, [state]);
  const [seoData, setSeoData] = useState<SeoExtractedData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [error, setError] = useState('');
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const analyzedUrlRef = useRef('');

  const sendChatMessage = useCallback(
    async (seo: SeoExtractedData, allMessages: ChatMessage[]) => {
      setIsStreaming(true);
      setStreamingContent('');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seoData: seo, messages: allMessages }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || 'Error en el analisis');
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data: ')) continue;
            const data = trimmed.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulated += parsed.content;
                setStreamingContent(accumulated);
              }
            } catch {
              // skip
            }
          }
        }

        const assistantMessage: ChatMessage = { role: 'assistant', content: accumulated };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        console.error('Chat error:', err);
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: 'Hubo un error al generar el analisis. Por favor intenta de nuevo.',
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsStreaming(false);
        setStreamingContent('');
      }
    },
    []
  );

  const handleUrlSubmit = useCallback(
    async (url: string) => {
      setError('');
      setStateKeepScroll('crawling');
      analyzedUrlRef.current = url;
      trackEvent('seo_analyzer_url_submitted', { url });

      try {
        const response = await fetch('/api/crawl', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Error al rastrear');
        }

        const data = await response.json();
        setSeoData(data.seoData);
        trackEvent('seo_analyzer_crawl_complete', { url });

        setStateKeepScroll('analyzing');

        // Send initial empty messages to get first analysis
        const initialMessages: ChatMessage[] = [
          { role: 'user', content: 'Analiza el SEO de esta pagina y dame un diagnostico general.' },
        ];
        setMessages(initialMessages);
        setUserMessageCount(0); // Initial prompt doesn't count toward gate

        setStateKeepScroll('chat');
        await sendChatMessage(data.seoData, initialMessages);
      } catch (err: any) {
        console.error('Crawl error:', err);
        setError(err.message || 'Error al rastrear la pagina. Verifica la URL e intenta de nuevo.');
        setStateKeepScroll('idle');
      }
    },
    [sendChatMessage, setStateKeepScroll]
  );

  const handleNewMessage = useCallback(
    async (text: string) => {
      if (!seoData) return;

      const newCount = userMessageCount + 1;
      setUserMessageCount(newCount);
      trackEvent('seo_analyzer_message_sent', { count: newCount });

      // Hard limit
      if (newCount > MAX_QUESTIONS) return;

      // Check email gate
      if (newCount >= EMAIL_GATE_AFTER && !emailCaptured) {
        trackEvent('seo_analyzer_email_gate_shown');
        setShowEmailGate(true);
        setStateKeepScroll('email-gate');
        return;
      }

      const userMessage: ChatMessage = { role: 'user', content: text };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      await sendChatMessage(seoData, updatedMessages);
    },
    [seoData, messages, userMessageCount, emailCaptured, sendChatMessage, setStateKeepScroll]
  );

  const handleEmailSubmit = useCallback(
    async (email: string, nombre: string) => {
      try {
        await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            nombre,
            urlAnalyzed: analyzedUrlRef.current,
          }),
        });
        trackEvent('seo_analyzer_email_captured', { email_domain: email.split('@')[1] });
      } catch (err) {
        console.error('Lead capture error:', err);
      }

      setEmailCaptured(true);
      setShowEmailGate(false);
      setStateKeepScroll('post-gate');
    },
    []
  );

  const handleEmailGateClose = useCallback(() => {
    // Allow closing but keep the gate state — they can't send more messages
    setShowEmailGate(false);
  }, []);

  const chatDisabled = (state === 'email-gate' && !emailCaptured) || userMessageCount >= MAX_QUESTIONS;

  return (
    <div className="w-full">
      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      {/* Idle: URL input */}
      {state === 'idle' && <UrlInput onSubmit={handleUrlSubmit} isLoading={false} />}

      {/* Crawling / Analyzing: progress */}
      {(state === 'crawling' || state === 'analyzing') && (
        <CrawlProgress stage={state} />
      )}

      {/* Chat states */}
      {(state === 'chat' || state === 'email-gate' || state === 'post-gate') && seoData && (
        <div className="w-full">
          {/* CTA banner after email gate */}
          {state === 'post-gate' && (
            <div className="mb-4">
              <CtaScheduleCall />
            </div>
          )}

          {/* Chat container */}
          <div className="border border-white/[0.08] rounded-xl bg-black/40 backdrop-blur-sm overflow-hidden h-[500px] md:h-[600px] flex flex-col">
            <ChatInterface
              messages={messages}
              seoData={seoData}
              onNewMessage={handleNewMessage}
              isStreaming={isStreaming}
              streamingContent={streamingContent}
              disabled={chatDisabled}
            />
          </div>

          {/* Email gate hint when modal is closed but gate is active */}
          {state === 'email-gate' && !showEmailGate && !emailCaptured && (
            <div className="mt-3 text-center">
              <button
                onClick={() => setShowEmailGate(true)}
                className="text-sm text-[#0070F3] hover:text-[#3291FF] transition-colors"
              >
                Deja tu email para seguir chateando
              </button>
            </div>
          )}
        </div>
      )}

      {/* Email gate modal */}
      <EmailGateModal
        isOpen={showEmailGate}
        onSubmit={handleEmailSubmit}
        onClose={handleEmailGateClose}
      />
    </div>
  );
}
