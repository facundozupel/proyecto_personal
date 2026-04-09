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
  { text: 'Mejora mi title tag', icon: 'T' },
  { text: 'Analiza mis headings', icon: 'H' },
  { text: 'Qué schema markup debería agregar?', icon: '{' },
  { text: 'Cómo mejorar mi meta description?', icon: 'M' },
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

  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const threshold = 80;
    isNearBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  };

  // Scroll to top on first load, then auto-scroll to bottom for subsequent messages
  const hasScrolledToTopRef = useRef(false);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;

    // On initial analysis (2 messages: auto-prompt + response), scroll to top
    if (messages.length === 2 && !isStreaming && !hasScrolledToTopRef.current) {
      el.scrollTop = 0;
      hasScrolledToTopRef.current = true;
      return;
    }

    if (isNearBottomRef.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, streamingContent, isStreaming]);

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

  const showSuggestions = messages.length === 2 && !isStreaming;

  // Build compact metrics
  const metrics = [
    { label: 'H1', value: seoData.h1.length, ok: seoData.h1.length === 1 },
    { label: 'H2', value: seoData.h2.length, ok: seoData.h2.length > 0 },
    { label: 'IMG', value: seoData.images.length, ok: seoData.images.length > 0 },
    { label: 'INT', value: seoData.internalLinks, ok: seoData.internalLinks > 0 },
    { label: 'EXT', value: seoData.externalLinks, ok: true },
    { label: 'WRD', value: seoData.wordCount, ok: seoData.wordCount > 300 },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header — editorial compact */}
      <div className="border-b-2 border-[#1a1a1a]">
        {/* URL bar */}
        <div className="px-5 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
            <span className="text-xs font-mono text-[#1a1a1a]/50 truncate">{seoData.url}</span>
          </div>
          <span className="text-[10px] font-mono text-[#1a1a1a]/25 shrink-0 tracking-wider uppercase">live</span>
        </div>

        {/* Metrics strip */}
        <div className="px-5 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {metrics.map((m) => (
            <div
              key={m.label}
              aria-label={`${m.label}: ${m.value}`}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wide shrink-0 ${
                m.ok
                  ? 'bg-[#1a1a1a]/[0.04] text-[#1a1a1a]/60'
                  : 'bg-[#BF551A]/[0.08] text-[#BF551A]'
              }`}
            >
              <span className="font-semibold">{m.label}</span>
              <span>{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-5 py-6 min-h-0"
      >
        {messages.map((msg, i) => {
          if (i === 0 && msg.role === 'user') return null;
          return <ChatMessage key={i} role={msg.role} content={msg.content} />;
        })}
        {isStreaming && streamingContent && (
          <ChatMessage role="assistant" content={streamingContent} isStreaming />
        )}

        {/* Suggestions */}
        {showSuggestions && (
          <div className="mt-6 pt-5 border-t border-[#1a1a1a]/[0.08]">
            <p className="text-[10px] font-mono text-[#1a1a1a]/30 tracking-wider uppercase mb-3">
              Preguntas sugeridas
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestions.map((s) => (
                <button
                  key={s.text}
                  onClick={() => handleSuggestion(s.text)}
                  className="group flex items-center gap-3 px-4 py-2.5 text-left border border-[#1a1a1a]/[0.08] rounded-lg hover:border-[#BF551A]/30 hover:bg-[#BF551A]/[0.03] transition-all"
                >
                  <span className="w-6 h-6 rounded-md bg-[#1a1a1a]/[0.05] group-hover:bg-[#BF551A]/10 flex items-center justify-center text-[10px] font-mono font-bold text-[#1a1a1a]/30 group-hover:text-[#BF551A] transition-colors shrink-0">
                    {s.icon}
                  </span>
                  <span className="text-xs text-[#1a1a1a]/50 group-hover:text-[#1a1a1a]/80 transition-colors">
                    {s.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div />
      </div>

      {/* Input area */}
      <div className="border-t-2 border-[#1a1a1a] px-5 py-3">
        <form onSubmit={handleSubmit} className="flex gap-2.5">
          <input
            ref={inputRef}
            id="seo-chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={disabled ? 'Dejá tu email para continuar...' : 'Hacé una pregunta sobre tu SEO...'}
            className="flex-1 px-4 py-3 bg-[#1a1a1a]/[0.03] border border-[#1a1a1a]/[0.1] rounded-lg text-[#1a1a1a] text-sm placeholder-[#1a1a1a]/25 focus:border-[#BF551A]/40 focus:bg-white outline-none transition-all disabled:opacity-30"
            disabled={isStreaming || disabled}
          />
          <button
            type="submit"
            aria-label="Enviar pregunta"
            disabled={isStreaming || disabled || !input.trim()}
            className="px-4 py-3 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#BF551A] transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-[#1a1a1a]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
