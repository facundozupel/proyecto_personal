export const prerender = false;

import type { APIRoute } from 'astro';
import type { SeoExtractedData, ChatMessage } from '@/types/seo-analyzer';
import { buildSystemPrompt } from '@/utils/system-prompt';

const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 500;

// Patterns that indicate prompt injection attempts
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|above|prior)\s+(instructions|prompts|rules)/i,
  /forget\s+(all\s+)?(previous|your)\s+(instructions|rules|prompts)/i,
  /you\s+are\s+now\s+/i,
  /act\s+as\s+(a\s+)?(?!seo|consultor|experto)/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /new\s+(system\s+)?prompt/i,
  /reveal\s+(your|the|system)\s+(prompt|instructions|configuration)/i,
  /repeat\s+(your|the|system)\s+(prompt|instructions)/i,
  /what\s+are\s+your\s+(instructions|rules|system\s+prompt)/i,
  /show\s+me\s+(your|the)\s+(prompt|instructions|api\s*key)/i,
  /api[_\s-]?key/i,
  /openai/i,
  /sk-[a-zA-Z0-9]/i,
  /system\s*prompt/i,
  /\bDAN\b/,
  /jailbreak/i,
  /bypass\s+(your\s+)?(rules|restrictions|filters)/i,
];

function sanitizeMessage(text: string): string {
  // Truncate to max length
  let sanitized = text.slice(0, MAX_MESSAGE_LENGTH);
  // Strip control characters except newlines
  sanitized = sanitized.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '');
  return sanitized.trim();
}

function hasInjectionAttempt(text: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(text));
}

export const POST: APIRoute = async ({ request }) => {
  if (!OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'Servicio no disponible' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { seoData, messages } = body as {
      seoData: SeoExtractedData;
      messages: ChatMessage[];
    };

    if (!seoData || !messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Datos invalidos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Limit conversation length to prevent abuse
    if (messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: 'Conversacion demasiado larga. Inicia un nuevo analisis.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = buildSystemPrompt(seoData);

    // Sanitize and validate each user message
    const openaiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map((m) => {
        const content = sanitizeMessage(m.content);
        // If injection detected, replace with safe redirect
        if (m.role === 'user' && hasInjectionAttempt(content)) {
          return {
            role: 'user' as const,
            content: 'Dame recomendaciones para mejorar el SEO de esta pagina.',
          };
        }
        return { role: m.role as 'user' | 'assistant', content };
      }),
    ];

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openaiMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Error al generar analisis' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Stream SSE response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = openaiResponse.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith('data: ')) continue;
              const data = trimmed.slice(6);
              if (data === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                continue;
              }
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                  );
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
