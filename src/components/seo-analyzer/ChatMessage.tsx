import { renderMarkdown } from '@/utils/markdown-renderer';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end mb-5">
        <div className="max-w-[80%] md:max-w-[70%]">
          <div className="px-5 py-3 bg-[#1a1a1a] text-white/90 rounded-2xl rounded-br-sm text-sm leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-start gap-3">
        {/* Accent bar */}
        <div className="w-[3px] min-h-[24px] bg-[#BF551A] rounded-full shrink-0 mt-1 self-stretch" />
        <div className="flex-1 min-w-0">
          <div
            className="chat-markdown text-sm leading-[1.75] text-[#1a1a1a]/85"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
          {isStreaming && (
            <span className="inline-flex gap-1 ml-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF551A] animate-[pulse_1s_ease-in-out_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF551A] animate-[pulse_1s_ease-in-out_0.2s_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF551A] animate-[pulse_1s_ease-in-out_0.4s_infinite]" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
