export const prerender = false;

import type { APIRoute } from 'astro';
import { WEBHOOK_URL } from '@/config/api';
import { getPostHogServer } from '@/lib/posthog-server';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, nombre, urlAnalyzed, sessionId, objetivo } = body as {
      email: string;
      nombre?: string;
      urlAnalyzed: string;
      sessionId?: string;
      objetivo?: string;
    };

    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'Email es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const webhookData = {
      nombre: nombre || '',
      email,
      empresa: '',
      mensaje: `Analizo la URL: ${urlAnalyzed || 'N/A'}${objetivo ? ` | Objetivo: ${objetivo}` : ''}`,
      interes: 'seo-analyzer',
      fecha: new Date().toISOString(),
      origen: 'Analizador SEO',
      sessionId: sessionId || '',
    };

    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookData),
    });

    if (!webhookResponse.ok) {
      console.error('Webhook error:', await webhookResponse.text());
      return new Response(
        JSON.stringify({ error: 'Error al registrar lead' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Track lead submission server-side and identify the user
    const posthogSessionId = request.headers.get('X-PostHog-Session-Id') || sessionId || undefined;
    const posthog = getPostHogServer();
    posthog.identify({
      distinctId: email,
      properties: { name: nombre || '', email, seo_objetivo: objetivo || '' },
    });
    posthog.capture({
      distinctId: email,
      event: 'lead_submitted',
      properties: {
        $session_id: posthogSessionId,
        analyzed_url: urlAnalyzed || '',
        seo_objetivo: objetivo || '',
        source: 'seo-analyzer',
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Lead API error:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
