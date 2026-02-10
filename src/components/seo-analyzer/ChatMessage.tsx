import { renderMarkdown } from '@/utils/markdown-renderer';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3.5 ${
          isUser
            ? 'bg-[#0070F3]/20 border border-[#0070F3]/30 text-white'
            : 'bg-white/[0.06] border border-white/[0.08] text-white/90'
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{content}</p>
        ) : (
          <div
            className="chat-markdown text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        )}
        {isStreaming && (
          <span className="inline-block w-2 h-4 bg-white/60 animate-pulse ml-0.5" />
        )}
      </div>
    </div>
  );
}
