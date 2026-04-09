import { describe, it, expect } from 'vitest';
import { extractSeoData } from '@/utils/seo-extractor';

describe('extractSeoData', () => {
  const baseUrl = 'https://example.com/page';

  it('returns correct structure with empty markdown', () => {
    const result = extractSeoData('', baseUrl);

    expect(result.url).toBe(baseUrl);
    expect(result.loadedUrl).toBe(baseUrl);
    expect(result.title).toBe('');
    expect(result.h1).toEqual([]);
    expect(result.h2).toEqual([]);
    expect(result.h3).toEqual([]);
    expect(result.images).toEqual([]);
    expect(result.internalLinks).toBe(0);
    expect(result.externalLinks).toBe(0);
    expect(result.wordCount).toBe(0);
    expect(result.markdown).toBe('');
  });

  it('extracts H1, H2, H3 headings from markdown', () => {
    const md = `# Main Title
Some text here.

## Section One
Content.

## Section Two
More content.

### Subsection
Details.

#### H4 should be ignored
`;
    const result = extractSeoData(md, baseUrl);

    expect(result.h1).toEqual(['Main Title']);
    expect(result.h2).toEqual(['Section One', 'Section Two']);
    expect(result.h3).toEqual(['Subsection']);
  });

  it('uses first H1 as title', () => {
    const md = '# My Page Title\nSome content';
    const result = extractSeoData(md, baseUrl);
    expect(result.title).toBe('My Page Title');
  });

  it('strips markdown formatting from heading text', () => {
    const md = '# **Bold** and _italic_ heading';
    const result = extractSeoData(md, baseUrl);
    expect(result.h1).toEqual(['Bold and italic heading']);
  });

  it('does not match headings without space after #', () => {
    const md = '#NoSpace\n## Valid Heading';
    const result = extractSeoData(md, baseUrl);
    expect(result.h1).toEqual([]);
    expect(result.h2).toEqual(['Valid Heading']);
  });

  it('counts internal and external links correctly', () => {
    const md = `
[Home](https://example.com/)
[About](https://example.com/about)
[Google](https://google.com)
[Anchor](#section)
[Relative](/path)
[Mail](mailto:test@test.com)
`;
    const result = extractSeoData(md, baseUrl);

    // example.com links (2) + relative /path (1) = 3 internal
    expect(result.internalLinks).toBe(3);
    // google.com = 1 external
    expect(result.externalLinks).toBe(1);
  });

  it('extracts images with alt text', () => {
    const md = `
![Logo](https://example.com/logo.png)
![](https://example.com/no-alt.jpg)
![Screenshot of dashboard](/assets/screenshot.webp)
`;
    const result = extractSeoData(md, baseUrl);

    expect(result.images).toHaveLength(3);
    expect(result.images[0]).toEqual({ alt: 'Logo', src: 'https://example.com/logo.png' });
    expect(result.images[1]).toEqual({ alt: '', src: 'https://example.com/no-alt.jpg' });
    expect(result.images[2]).toEqual({ alt: 'Screenshot of dashboard', src: '/assets/screenshot.webp' });
  });

  it('counts words excluding markdown syntax', () => {
    const md = '# Title\n\nThis is a **simple** paragraph with [a link](https://example.com).';
    const result = extractSeoData(md, baseUrl);

    // "Title This is a simple paragraph with a link" ~= 9-10 words
    expect(result.wordCount).toBeGreaterThan(5);
    expect(result.wordCount).toBeLessThan(15);
  });

  it('handles real Crawl4AI markdown output', () => {
    const md = `# Example Domain
This domain is for use in documentation examples without needing permission. Avoid use in operations.
[Learn more](https://iana.org/domains/example)
`;
    const result = extractSeoData(md, 'https://example.com/');

    expect(result.title).toBe('Example Domain');
    expect(result.h1).toEqual(['Example Domain']);
    expect(result.externalLinks).toBe(1);
    expect(result.wordCount).toBeGreaterThan(10);
    expect(result.markdown).toBe(md);
  });

  it('sets HTML-dependent fields as empty (not available from markdown)', () => {
    const md = '# Test';
    const result = extractSeoData(md, baseUrl);

    expect(result.metaDescription).toBe('');
    expect(result.canonical).toBe('');
    expect(result.robotsMeta).toBe('');
    expect(result.ogTags).toEqual({});
    expect(result.schemaMarkup).toEqual([]);
    expect(result.languageTag).toBe('');
  });

  it('handles null/undefined markdown gracefully', () => {
    // @ts-expect-error testing runtime safety
    const result = extractSeoData(null, baseUrl);
    expect(result.markdown).toBe('');
    expect(result.h1).toEqual([]);
    expect(result.wordCount).toBe(0);
  });
});
