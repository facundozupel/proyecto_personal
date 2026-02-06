import { useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({ value, onChange, placeholder = 'Escribe tu contenido en Markdown...' }: Props) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      const newCursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const toolbarButtons = [
    {
      icon: 'H1',
      title: 'Titulo 1',
      action: () => insertMarkdown('# '),
    },
    {
      icon: 'H2',
      title: 'Titulo 2',
      action: () => insertMarkdown('## '),
    },
    {
      icon: 'H3',
      title: 'Titulo 3',
      action: () => insertMarkdown('### '),
    },
    {
      icon: 'B',
      title: 'Negrita',
      action: () => insertMarkdown('**', '**'),
      className: 'font-bold',
    },
    {
      icon: 'I',
      title: 'Cursiva',
      action: () => insertMarkdown('_', '_'),
      className: 'italic',
    },
    {
      icon: '\u2022',
      title: 'Lista',
      action: () => insertMarkdown('- '),
    },
    {
      icon: '1.',
      title: 'Lista numerada',
      action: () => insertMarkdown('1. '),
    },
    {
      icon: '"',
      title: 'Cita',
      action: () => insertMarkdown('> '),
    },
    {
      icon: '{}',
      title: 'Codigo inline',
      action: () => insertMarkdown('`', '`'),
    },
    {
      icon: '<>',
      title: 'Bloque de codigo',
      action: () => insertMarkdown('```\n', '\n```'),
    },
    {
      icon: '\uD83D\uDD17',
      title: 'Link',
      action: () => insertMarkdown('[', '](url)'),
    },
    {
      icon: '\uD83D\uDCF7',
      title: 'Imagen',
      action: () => insertMarkdown('![alt](', ')'),
    },
    {
      icon: '\u2501',
      title: 'Linea horizontal',
      action: () => insertMarkdown('\n\n---\n\n'),
    },
  ];

  // Simple markdown to HTML renderer for preview
  const renderMarkdown = (text: string) => {
    let html = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2 text-white">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3 text-white">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4 text-white">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      // Italic
      .replace(/\_(.*?)\_/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#0070F3] hover:underline">$1</a>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-[#111] border border-white/[0.08] text-white p-4 rounded-xl my-4 overflow-x-auto"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-[#0070F3]/10 text-[#3291FF] px-2 py-1 rounded text-sm border border-[#0070F3]/20">$1</code>')
      // Lists
      .replace(/^\- (.*$)/gim, '<li class="ml-4 text-white/70">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside my-2">$1</ul>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 text-white/70">$1</li>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-2 border-white/20 pl-4 text-white/60 my-4">$1</blockquote>')
      // Horizontal rule
      .replace(/^---$/gim, '<hr class="my-6 border-white/[0.08]">')
      // Paragraphs (split by double newline)
      .split('\n\n')
      .map((p) => {
        if (p.startsWith('<') || !p.trim()) return p;
        return `<p class="my-3 text-white/70">${p}</p>`;
      })
      .join('\n');

    return html;
  };

  return (
    <div className="border border-white/[0.08] rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="bg-white/[0.03] border-b border-white/[0.08] p-2 flex flex-wrap gap-1">
        {toolbarButtons.map((btn, idx) => (
          <button
            key={idx}
            type="button"
            onClick={btn.action}
            title={btn.title}
            className={`px-3 py-1.5 text-white/70 hover:bg-white/[0.06] hover:text-white rounded-lg transition-colors text-sm font-medium ${btn.className || ''}`}
          >
            {btn.icon}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-white/[0.08] bg-black flex">
        <button
          type="button"
          onClick={() => setActiveTab('edit')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'edit'
              ? 'border-b-2 border-[#0070F3] text-[#0070F3]'
              : 'text-white/50 hover:text-white'
          }`}
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? 'border-b-2 border-[#0070F3] text-[#0070F3]'
              : 'text-white/50 hover:text-white'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-black">
        {activeTab === 'edit' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-[500px] p-4 bg-transparent text-white placeholder-white/30 resize-none focus:outline-none font-mono text-sm"
          />
        ) : (
          <div
            className="prose prose-invert max-w-none p-4 min-h-[500px]"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        )}
      </div>
    </div>
  );
}
