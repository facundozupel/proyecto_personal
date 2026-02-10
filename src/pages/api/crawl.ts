export const prerender = false;

import type { APIRoute } from 'astro';
import { extractSeoData } from '@/utils/seo-extractor';

const CRAWL4AI_URL = import.meta.env.CRAWL4AI_URL || 'http://157.180.72.189:11235/crawl';

function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    if (!['http:', 'https:'].includes(url.protocol)) return false;
    // Block private IPs and localhost
    const hostname = url.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.') ||
      hostname === '0.0.0.0'
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    let { url } = body as { url: string };

    if (!url || typeof url !== 'string') {
      return new Response(JSON.stringify({ error: 'URL es requerida' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Add https:// if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    if (!isValidUrl(url)) {
      return new Response(JSON.stringify({ error: 'URL no valida' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Call Crawl4AI
    const crawlResponse = await fetch(CRAWL4AI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        urls: [url],
        priority: 8,
        js_code: [],
        wait_for: '',
        css_selector: '',
        extract_blocks: false,
        word_count_threshold: 5,
        only_main_content: false,
      }),
    });

    if (!crawlResponse.ok) {
      const errorText = await crawlResponse.text();
      console.error('Crawl4AI error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Error al rastrear la pagina. Intenta de nuevo.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const crawlData = await crawlResponse.json();
    const seoData = extractSeoData(crawlData, url);

    return new Response(JSON.stringify({ seoData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Crawl API error:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
