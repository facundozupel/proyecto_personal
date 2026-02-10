/**
 * Lightweight Markdown to HTML renderer for chat messages.
 * Handles: bold, italic, inline code, code blocks, headers, lists, links, line breaks.
 */
export function renderMarkdown(text: string): string {
  let html = text;

  // Escape HTML entities first
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="chat-code-block"><code>${code.trim()}</code></pre>`;
  });

  // Inline code (`...`)
  html = html.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>');

  // Headers (#### → bold, ### → h4, ## → h3, # → h2 inside chat)
  html = html.replace(/^#{4,} (.+)$/gm, '<p class="chat-h4">$1</p>');
  html = html.replace(/^### (.+)$/gm, '<h4 class="chat-h4">$1</h4>');
  html = html.replace(/^## (.+)$/gm, '<h3 class="chat-h3">$1</h3>');
  html = html.replace(/^# (.+)$/gm, '<h2 class="chat-h2">$1</h2>');

  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Unordered lists
  html = html.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul class="chat-list">$1</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Links [text](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>'
  );

  // Line breaks (double newline → paragraph, single newline → br)
  html = html
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>');

  // Wrap in paragraph if not already wrapped
  if (!html.startsWith('<')) {
    html = `<p>${html}</p>`;
  }

  return html;
}
