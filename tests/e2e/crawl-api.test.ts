import { describe, it, expect } from 'vitest';

const CRAWL4AI_URL = 'https://crawl4ai.facundo.click';

describe('Crawl4AI API integration', () => {
  it('health check responds ok', async () => {
    const res = await fetch(`${CRAWL4AI_URL}/health`);
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.status).toBe('ok');
  });

  it('crawls example.com and returns expected format', async () => {
    const res = await fetch(`${CRAWL4AI_URL}/crawl`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://example.com' }),
    });

    expect(res.ok).toBe(true);
    const data = await res.json();

    // Validate response shape
    expect(data).toHaveProperty('url');
    expect(data).toHaveProperty('markdown');
    expect(data).toHaveProperty('success');
    expect(data).toHaveProperty('status_code');
    expect(data).toHaveProperty('error');

    // Validate values
    expect(data.success).toBe(true);
    expect(data.status_code).toBe(200);
    expect(data.error).toBeNull();
    expect(typeof data.markdown).toBe('string');
    expect(data.markdown.length).toBeGreaterThan(0);
    expect(data.markdown).toContain('Example Domain');
  }, 30000); // 30s timeout for crawl

  it('returns success:false for invalid URL', async () => {
    const res = await fetch(`${CRAWL4AI_URL}/crawl`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://this-domain-does-not-exist-xyz123.com' }),
    });

    const data = await res.json();
    // Either HTTP error or success:false
    expect(data.success === false || !res.ok).toBe(true);
  }, 30000);
});
