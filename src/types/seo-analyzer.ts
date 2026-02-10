export interface SeoExtractedData {
  url: string;
  title: string;
  metaDescription: string;
  h1: string[];
  h2: string[];
  h3: string[];
  canonical: string;
  robotsMeta: string;
  ogTags: Record<string, string>;
  images: { src: string; alt: string }[];
  internalLinks: number;
  externalLinks: number;
  wordCount: number;
  schemaMarkup: string[];
  languageTag: string;
  loadedUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type AnalyzerState =
  | 'idle'
  | 'crawling'
  | 'analyzing'
  | 'chat'
  | 'email-gate'
  | 'post-gate';
