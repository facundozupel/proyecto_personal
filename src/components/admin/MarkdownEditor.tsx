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
      title: 'Título 1',
      action: () => insertMarkdown('# '),
    },
    {
      icon: 'H2',
      title: 'Título 2',
      action: () => insertMarkdown('## '),
    },
    {
      icon: 'H3',
      title: 'Título 3',
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
      icon: '•',
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
      title: 'Código inline',
      action: () => insertMarkdown('`', '`'),
    },
    {
      icon: '<>',
      title: 'Bloque de código',
      action: () => insertMarkdown('```\n', '\n```'),
    },
    {
      icon: '🔗',
      title: 'Link',
      action: () => insertMarkdown('[', '](url)'),
    },
    {
      icon: '📷',
      title: 'Imagen',
      action: () => insertMarkdown('![alt](', ')'),
    },
    {
      icon: '━',
      title: 'Línea horizontal',
      action: () => insertMarkdown('\n\n---\n\n'),
    },
  ];

  // Simple markdown to HTML renderer for preview
  const renderMarkdown = (text: string) => {
    let html = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\_(.*?)\_/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:underline">$1</a>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-neutral-900 text-white p-4 rounded my-4 overflow-x-auto"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-neutral-100 px-2 py-1 rounded text-sm">$1</code>')
      // Lists
      .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside my-2">$1</ul>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-neutral-300 pl-4 italic my-4">$1</blockquote>')
      // Horizontal rule
      .replace(/^---$/gim, '<hr class="my-6 border-neutral-300">')
      // Paragraphs (split by double newline)
      .split('\n\n')
      .map((p) => {
        if (p.startsWith('<') || !p.trim()) return p;
        return `<p class="my-3">${p}</p>`;
      })
      .join('\n');

    return html;
  };

  return (
    <div class="border border-neutral-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div class="bg-neutral-100 border-b border-neutral-300 p-2 flex flex-wrap gap-1">
        {toolbarButtons.map((btn, idx) => (
          <button
            key={idx}
            type="button"
            onClick={btn.action}
            title={btn.title}
            class={`px-3 py-1.5 hover:bg-neutral-200 rounded transition-colors text-sm font-medium ${btn.className || ''}`}
          >
            {btn.icon}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div class="border-b border-neutral-300 bg-white flex">
        <button
          type="button"
          onClick={() => setActiveTab('edit')}
          class={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'edit'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          class={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Content Area */}
      <div class="bg-white">
        {activeTab === 'edit' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            class="w-full h-[500px] p-4 resize-none focus:outline-none font-mono text-sm"
          />
        ) : (
          <div
            class="prose prose-neutral max-w-none p-4 min-h-[500px]"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        )}
      </div>
    </div>
  );
}
