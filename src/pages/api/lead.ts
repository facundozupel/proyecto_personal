export const prerender = false;

import type { APIRoute } from 'astro';
import { WEBHOOK_URL } from '@/config/api';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, nombre, urlAnalyzed, sessionId } = body as {
      email: string;
      nombre?: string;
      urlAnalyzed: string;
      sessionId?: string;
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
      mensaje: `Analizo la URL: ${urlAnalyzed || 'N/A'}`,
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
