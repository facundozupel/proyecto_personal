import { useState, useRef, useEffect } from 'react';
import type { ChatMessage as ChatMessageType, SeoExtractedData } from '@/types/seo-analyzer';
import { ChatMessage } from './ChatMessage';

interface ChatInterfaceProps {
  messages: ChatMessageType[];
  seoData: SeoExtractedData;
  onNewMessage: (message: string) => void;
  isStreaming: boolean;
  streamingContent: string;
  disabled: boolean;
}

const suggestions = [
  'Mejora mi title tag',
  'Analiza mis headings',
  'Que schema markup deberia agregar?',
  'Como mejorar mi meta description?',
];

export function ChatInterface({
  messages,
  seoData,
  onNewMessage,
  isStreaming,
  streamingContent,
  disabled,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isNearBottomRef = useRef(true);

  // Track if user is near the bottom of the chat
  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const threshold = 80;
    isNearBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  };

  // Only auto-scroll inside the chat container, and only if user is near bottom
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el || !isNearBottomRef.current) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, streamingContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isStreaming || disabled) return;
    onNewMessage(trimmed);
    setInput('');
  };

  const handleSuggestion = (text: string) => {
    if (isStreaming || disabled) return;
    onNewMessage(text);
  };

  // Show suggestions after the initial analysis completes (2 messages: auto-prompt + response)
  const showSuggestions = messages.length === 2 && !isStreaming;

  return (
    <div className="flex flex-col h-full">
      {/* Crawl summary header */}
      <div className="px-4 py-3 border-b border-white/[0.06] space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
          <span className="text-xs text-white/40 truncate flex-1">{seoData.url}</span>
          <span className="text-[10px] text-white/25 shrink-0 font-mono">gpt-oss-120b</span>
        </div>
        <div className="pl-4 space-y-0.5">
          {seoData.title && (
            <p className="text-xs text-white/60 truncate">
              <span className="text-white/30">Title:</span> {seoData.title}
            </p>
          )}
          {seoData.h1.length > 0 && (
            <p className="text-xs text-white/60 truncate">
              <span className="text-white/30">H1:</span> {seoData.h1[0]}
            </p>
          )}
          {seoData.metaDescription && (
            <p className="text-xs text-white/60 truncate">
              <span className="text-white/30">Meta:</span> {seoData.metaDescription}
            </p>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-1 min-h-0"
      >
        {messages.map((msg, i) => {
          // Hide the auto-generated initial prompt from the UI
          if (i === 0 && msg.role === 'user') return null;
          return <ChatMessage key={i} role={msg.role} content={msg.content} />;
        })}
        {isStreaming && streamingContent && (
          <ChatMessage role="assistant" content={streamingContent} isStreaming />
        )}

        {/* Suggestions */}
        {showSuggestions && (
          <div className="flex flex-wrap gap-2 mt-4 px-1">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="px-3.5 py-2 text-xs bg-white/[0.04] border border-white/[0.08] rounded-full text-white/60 hover:text-white hover:border-white/20 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div />
      </div>

      {/* Input area */}
      <div className="border-t border-white/[0.06] px-4 py-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={disabled ? 'Deja tu email para continuar...' : 'Escribe tu pregunta...'}
            className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm placeholder-white/25 focus:border-[#0070F3]/50 focus:ring-1 focus:ring-[#0070F3]/20 outline-none transition-all disabled:opacity-40"
            disabled={isStreaming || disabled}
          />
          <button
            type="submit"
            disabled={isStreaming || disabled || !input.trim()}
            className="px-4 py-3 bg-[#0070F3] text-white rounded-xl hover:bg-[#005AC8] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
