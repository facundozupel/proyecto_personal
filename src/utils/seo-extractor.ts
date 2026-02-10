import type { SeoExtractedData } from '@/types/seo-analyzer';

export function extractSeoData(crawlResult: any, originalUrl: string): SeoExtractedData {
  // Crawl4AI returns { results: [{ html, cleaned_html, markdown, metadata, links, media, ... }] }
  const result = crawlResult?.results?.[0] || {};
  const html: string = result.cleaned_html || result.html || '';
  const metadata = result.metadata || {};
  const linksData = result.links || {};
  const mediaData = result.media || {};
  const markdownData = result.markdown || {};

  // Use Crawl4AI's parsed markdown (raw_markdown has full content)
  const rawMarkdown: string = markdownData.raw_markdown || '';

  // Use Crawl4AI's parsed metadata when available, fallback to regex
  const title = metadata.title || getTagContent(html, 'title');
  const metaDescription = metadata.description || getMetaContent(html, 'description');

  // Extract headings from cleaned_html
  const h1 = getAllTagContents(html, 'h1');
  const h2 = getAllTagContents(html, 'h2');
  const h3 = getAllTagContents(html, 'h3');

  // Use Crawl4AI's structured links
  const internalLinksArr = linksData.internal || [];
  const externalLinksArr = linksData.external || [];

  // Use Crawl4AI's structured images
  const imagesArr = mediaData.images || [];
  const images = imagesArr.map((img: any) => ({
    src: img.src || '',
    alt: img.alt || '',
  }));

  // Word count from markdown
  const textContent = rawMarkdown || html.replace(/<[^>]*>/g, ' ');
  const wordCount = textContent.split(/\s+/).filter((w: string) => w.length > 0).length;

  // Schema markup from HTML
  const schemaPattern = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const schemaMarkup: string[] = [];
  let schemaMatch;
  while ((schemaMatch = schemaPattern.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(schemaMatch[1]);
      schemaMarkup.push(parsed['@type'] || 'Unknown');
    } catch {
      // skip invalid JSON
    }
  }

  // OG tags
  const ogPattern = /<meta[^>]+property=["'](og:[^"']*)["'][^>]+content=["']([^"']*)["']/gi;
  const ogAltPattern = /<meta[^>]+content=["']([^"']*)["'][^>]+property=["'](og:[^"']*)["']/gi;
  const ogTags: Record<string, string> = {};
  let ogMatch;
  while ((ogMatch = ogPattern.exec(html)) !== null) {
    ogTags[ogMatch[1]] = ogMatch[2];
  }
  while ((ogMatch = ogAltPattern.exec(html)) !== null) {
    ogTags[ogMatch[2]] = ogMatch[1];
  }

  // Canonical
  const canonicalMatch = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i;
  const canonical = canonicalMatch.exec(html)?.[1] || '';

  // Robots meta
  const robotsMeta = getMetaContent(html, 'robots');

  // Language
  const langMatch = /<html[^>]+lang=["']([^"']*)["']/i;
  const languageTag = langMatch.exec(html)?.[1] || '';

  return {
    url: originalUrl,
    title,
    metaDescription,
    h1,
    h2,
    h3,
    canonical,
    robotsMeta,
    ogTags,
    images,
    internalLinks: internalLinksArr.length,
    externalLinks: externalLinksArr.length,
    wordCount,
    schemaMarkup,
    languageTag,
    loadedUrl: result.redirected_url || result.url || originalUrl,
    markdown: rawMarkdown,
  };
}

function getMetaContent(html: string, name: string): string {
  const pattern = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["']`,
    'i'
  );
  const altPattern = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${name}["']`,
    'i'
  );
  return pattern.exec(html)?.[1] || altPattern.exec(html)?.[1] || '';
}

function getTagContent(html: string, tag: string): string {
  const pattern = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, 'i');
  return pattern.exec(html)?.[1]?.trim() || '';
}

function getAllTagContents(html: string, tag: string): string[] {
  const pattern = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, 'gi');
  const matches: string[] = [];
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const text = match[1].trim();
    if (text) matches.push(text);
  }
  return matches;
}
