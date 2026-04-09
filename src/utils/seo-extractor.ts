import type { SeoExtractedData } from '@/types/seo-analyzer';

export function extractSeoData(markdown: string, originalUrl: string): SeoExtractedData {
  const content = markdown || '';

  // Extract headings from markdown
  const h1 = extractHeadings(content, 1);
  const h2 = extractHeadings(content, 2);
  const h3 = extractHeadings(content, 3);

  // Extract links from markdown: [text](url)
  const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;
  let internalLinks = 0;
  let externalLinks = 0;
  let linkMatch;
  const parsedUrl = new URL(originalUrl);
  while ((linkMatch = linkPattern.exec(content)) !== null) {
    const href = linkMatch[2];
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) continue;
    try {
      const linkUrl = new URL(href, originalUrl);
      if (linkUrl.hostname === parsedUrl.hostname) {
        internalLinks++;
      } else {
        externalLinks++;
      }
    } catch {
      internalLinks++; // relative links are internal
    }
  }

  // Extract images from markdown: ![alt](src)
  const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const images: { src: string; alt: string }[] = [];
  let imgMatch;
  while ((imgMatch = imagePattern.exec(content)) !== null) {
    images.push({ alt: imgMatch[1], src: imgMatch[2] });
  }

  // Word count
  const wordCount = content
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '') // remove images
    .replace(/\[[^\]]*\]\([^)]+\)/g, '') // remove link syntax
    .replace(/[#*_~`>|-]/g, '') // remove markdown formatting
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  // Use first H1 as title fallback
  const title = h1.length > 0 ? h1[0] : '';

  return {
    url: originalUrl,
    title,
    metaDescription: '',
    h1,
    h2,
    h3,
    canonical: '',
    robotsMeta: '',
    ogTags: {},
    images,
    internalLinks,
    externalLinks,
    wordCount,
    schemaMarkup: [],
    languageTag: '',
    loadedUrl: originalUrl,
    markdown: content,
  };
}

function extractHeadings(markdown: string, level: number): string[] {
  const prefix = '#'.repeat(level);
  // Match lines starting with exactly N hashes followed by space
  const pattern = new RegExp(`^${prefix}(?!#)\\s+(.+)$`, 'gm');
  const headings: string[] = [];
  let match;
  while ((match = pattern.exec(markdown)) !== null) {
    const text = match[1].replace(/[*_`]/g, '').trim();
    if (text) headings.push(text);
  }
  return headings;
}
