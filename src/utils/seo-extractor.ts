import type { SeoExtractedData } from '@/types/seo-analyzer';

export function extractSeoData(crawlResult: any, originalUrl: string): SeoExtractedData {
  const html: string = crawlResult?.result?.html || crawlResult?.result?.cleaned_html || '';
  const markdown: string = crawlResult?.result?.markdown || '';

  // Parse from HTML using regex (server-side, no DOM available)
  const getMetaContent = (name: string): string => {
    const pattern = new RegExp(
      `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["']`,
      'i'
    );
    const altPattern = new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${name}["']`,
      'i'
    );
    return pattern.exec(html)?.[1] || altPattern.exec(html)?.[1] || '';
  };

  const getTagContent = (tag: string): string => {
    const pattern = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, 'i');
    return pattern.exec(html)?.[1]?.trim() || '';
  };

  const getAllTagContents = (tag: string): string[] => {
    const pattern = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, 'gi');
    const matches: string[] = [];
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const text = match[1].trim();
      if (text) matches.push(text);
    }
    return matches;
  };

  // Extract images
  const imagePattern = /<img[^>]+src=["']([^"']*)["'][^>]*(?:alt=["']([^"']*)["'])?/gi;
  const images: { src: string; alt: string }[] = [];
  let imgMatch;
  while ((imgMatch = imagePattern.exec(html)) !== null) {
    images.push({ src: imgMatch[1], alt: imgMatch[2] || '' });
  }

  // Count links
  const internalLinkPattern = new RegExp(
    `<a[^>]+href=["'](?:${originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|/)[^"']*["']`,
    'gi'
  );
  const externalLinkPattern = /<a[^>]+href=["']https?:\/\/[^"']*["']/gi;
  const internalLinks = (html.match(internalLinkPattern) || []).length;
  const totalLinks = (html.match(externalLinkPattern) || []).length;

  // Word count from markdown or stripped HTML
  const textContent = markdown || html.replace(/<[^>]*>/g, ' ');
  const wordCount = textContent.split(/\s+/).filter((w) => w.length > 0).length;

  // Schema markup
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
  const robotsMeta = getMetaContent('robots');

  // Language
  const langMatch = /<html[^>]+lang=["']([^"']*)["']/i;
  const languageTag = langMatch.exec(html)?.[1] || '';

  return {
    url: originalUrl,
    title: getTagContent('title'),
    metaDescription: getMetaContent('description'),
    h1: getAllTagContents('h1'),
    h2: getAllTagContents('h2'),
    h3: getAllTagContents('h3'),
    canonical,
    robotsMeta,
    ogTags,
    images,
    internalLinks,
    externalLinks: Math.max(0, totalLinks - internalLinks),
    wordCount,
    schemaMarkup,
    languageTag,
    loadedUrl: crawlResult?.result?.url || originalUrl,
  };
}
