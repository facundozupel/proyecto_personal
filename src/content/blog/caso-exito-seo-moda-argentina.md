---
title: "Caso de éxito SEO en moda: cómo una marca argentina multiplicó x5 su tráfico orgánico en 5 meses"
description: "Caso de éxito: cómo una estrategia SEO técnica generó +$42.8M ARS en facturación adicional, +434% en clics orgánicos y liderazgo de market share para un ecommerce de moda en Argentina."
author: "Facundo Zupel"
date: 2026-03-25
readTime: "14 minutos"
tags: ["SEO", "Ecommerce", "Caso de Éxito", "Moda", "Argentina"]
draft: false
category: "todo-sobre-seo"
robots: "noindex, follow"
---

Voy a contarte cómo un ecommerce de moda argentino pasó de depender casi al **100% del tráfico de marca** a liderar el market share orgánico no-marca de su industria. En 5 meses. Con solo el 30% del proyecto ejecutado.

No es teoría. Son datos reales de Google Search Console y GA4.

¿Por qué comparto esto? Porque la mayoría de los ecommerce de moda en Argentina tienen el mismo problema y no lo saben: su canal orgánico no adquiere clientes nuevos. Solo retiene a los que ya conocen la marca. Y eso es un problema enorme cuando las impresiones de marca caen.

---

## El punto de partida: una web que Google no podía entender

Cuando llegué al proyecto, el escenario era uno que he visto demasiadas veces en ecommerce de moda: **una arquitectura web que se fue rompiendo temporada tras temporada** sin que nadie lo corrigiera.

### Canibalización masiva por URLs legacy

La arquitectura del sitio heredaba URLs de temporadas pasadas (ss24, aw24, aw23) más rutas legacy (/collection, /ver-todo) que **nunca fueron eliminadas**. Google indexaba todas simultáneamente.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.1;">Web sin estructura</h3>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#BF551A;margin-bottom:4px;">Peor caso · Jeans</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#BF551A;line-height:1.1;">9 URLs</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;line-height:1.4;">compitiendo por la misma búsqueda</div>
    </div>
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#BF551A;margin-bottom:4px;">Impresiones fragmentadas · Calzado</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#BF551A;line-height:1.1;">122K</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;line-height:1.4;">impresiones divididas entre 4 URLs</div>
    </div>
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Categorías afectadas</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#1a1a1a;line-height:1.1;">6+</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;line-height:1.4;">con canibalización activa en Q4 2024</div>
    </div>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:15px;">
    <thead>
      <tr style="border-bottom:2px solid rgba(0,0,0,0.1);">
        <th style="text-align:left;padding:12px 16px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.4);">Categoría</th>
        <th style="text-align:center;padding:12px 16px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.4);">URLs compitiendo</th>
        <th style="text-align:right;padding:12px 16px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.4);">Impresiones fragmentadas</th>
        <th style="text-align:left;padding:12px 16px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.4);">Problema principal</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
        <td style="padding:14px 16px;font-weight:700;color:#1a1a1a;">Jeans</td>
        <td style="padding:14px 16px;text-align:center;"><span style="background:#BF551A;color:white;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;">9 URLs</span></td>
        <td style="padding:14px 16px;text-align:right;font-weight:600;color:#1a1a1a;">20.952</td>
        <td style="padding:14px 16px;color:rgba(0,0,0,0.55);">Estructura caótica</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
        <td style="padding:14px 16px;font-weight:700;color:#1a1a1a;">Vestidos</td>
        <td style="padding:14px 16px;text-align:center;"><span style="background:#BF551A;color:white;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;">4 URLs</span></td>
        <td style="padding:14px 16px;text-align:right;font-weight:600;color:#1a1a1a;">10.913</td>
        <td style="padding:14px 16px;color:rgba(0,0,0,0.55);">Temporadas duplicadas</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
        <td style="padding:14px 16px;font-weight:700;color:#1a1a1a;">Calzado</td>
        <td style="padding:14px 16px;text-align:center;"><span style="background:#BF551A;color:white;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;">4 URLs</span></td>
        <td style="padding:14px 16px;text-align:right;font-weight:600;color:#BF551A;">122.332</td>
        <td style="padding:14px 16px;color:rgba(0,0,0,0.55);">Temporadas obsoletas activas</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
        <td style="padding:14px 16px;font-weight:700;color:#1a1a1a;">Camperas</td>
        <td style="padding:14px 16px;text-align:center;"><span style="background:#BF551A;color:white;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;">4 URLs</span></td>
        <td style="padding:14px 16px;text-align:right;font-weight:600;color:#1a1a1a;">3.014</td>
        <td style="padding:14px 16px;color:rgba(0,0,0,0.55);">Temporadas + collection</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
        <td style="padding:14px 16px;font-weight:700;color:#1a1a1a;">Shorts</td>
        <td style="padding:14px 16px;text-align:center;"><span style="background:#BF551A;color:white;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;">2 URLs</span></td>
        <td style="padding:14px 16px;text-align:right;font-weight:600;color:#1a1a1a;">254</td>
        <td style="padding:14px 16px;color:rgba(0,0,0,0.55);">Temporadas</td>
      </tr>
      <tr>
        <td style="padding:14px 16px;font-weight:700;color:#1a1a1a;">Pantalones</td>
        <td style="padding:14px 16px;text-align:center;"><span style="background:#BF551A;color:white;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;">3 URLs</span></td>
        <td style="padding:14px 16px;text-align:right;font-weight:600;color:#1a1a1a;">61</td>
        <td style="padding:14px 16px;color:rgba(0,0,0,0.55);">Temporadas + paginación</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size:13px;color:rgba(0,0,0,0.35);text-align:center;margin:24px 0 0;font-style:italic;line-height:1.5;">(*) URL Legacy: Una URL legacy es una página antigua que sigue activa aunque ya no es necesaria, genera duplicados y canibalización en Google.</p>
</div>

El caso más extremo: la categoría **Jeans tenía 9 URLs activas** compitiendo por la misma búsqueda. Google no podía determinar cuál era la canónica y dividía la autoridad entre todas, bajando el posicionamiento de cada una.

Esto impactaba el posicionamiento al 100%. La solución era clara: **consolidar la autoridad en una única URL por categoría**.

### Dependencia crítica de la marca

Acá es donde se pone realmente grave. En Q4 2024, el **98,2%** del tráfico orgánico provenía de usuarios que ya buscaban la marca directamente. El canal no aportaba clientes nuevos.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.1;">Dependencia crítica</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(191,85,26,0.2);background:rgba(191,85,26,0.05);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#BF551A;margin-bottom:4px;">Tráfico Non-Brand · Q4 2024</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#BF551A;line-height:1.1;">1,8%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">3.105 clicks genéricos de 172K+ totales</div>
    </div>
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Tráfico Brand · Q4 2024</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:rgba(0,0,0,0.25);line-height:1.1;">98,2%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">172.000 clicks de búsquedas de marca</div>
    </div>
  </div>
  <div style="text-align:center;margin-bottom:16px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:12px;">Q4 2024 · Distribución del tráfico orgánico</div>
    <div style="display:flex;justify-content:center;gap:24px;margin-bottom:20px;">
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:rgba(0,0,0,0.12);border-radius:3px;display:inline-block;"></span><span style="font-size:13px;color:rgba(0,0,0,0.55);">Brand (98,2%)</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:#BF551A;border-radius:3px;display:inline-block;"></span><span style="font-size:13px;color:rgba(0,0,0,0.55);">Non-Brand (1,8%)</span></div>
    </div>
    <svg viewBox="0 0 200 200" width="220" height="220" style="display:block;margin:0 auto;">
      <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="28"/>
      <circle cx="100" cy="100" r="75" fill="none" stroke="#BF551A" stroke-width="28" stroke-dasharray="8.48 471.24" stroke-dashoffset="0" transform="rotate(-90 100 100)" stroke-linecap="round"/>
      <text x="100" y="92" text-anchor="middle" font-size="30" font-weight="900" fill="#BF551A" style="font-family:Switzer,system-ui,sans-serif;">1,8%</text>
      <text x="100" y="112" text-anchor="middle" font-size="12" fill="rgba(0,0,0,0.4)" style="font-family:Switzer,system-ui,sans-serif;">Non-Brand</text>
    </svg>
  </div>
  <div style="border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:16px 20px;margin-top:24px;">
    <p style="font-size:13px;color:rgba(0,0,0,0.5);margin:0;line-height:1.5;"><strong style="color:rgba(0,0,0,0.6);">Nota:</strong> El % de tráfico non-brand desde ene-25 a sep-25 fue de 3,3% — una leve mejora pero aún con dependencia crítica de la marca.</p>
  </div>
</div>

Solo **1,8%** del tráfico — apenas **3.105 clics** — venía de búsquedas genéricas de productos o categorías. Ese es el tráfico de mayor valor para la adquisición.

¿Qué significa esto en la práctica? Que si alguien buscaba "vestidos de verano" o "jeans mujer" en Google, este ecommerce no aparecía. Punto. Solo lo encontrabas si ya sabías que existía.

El objetivo del proyecto SEO quedaba definido por este dato: **pasar de un canal de retención a un canal de adquisición** que capture demanda genérica del mercado.

### Y encima, la marca se estaba desplomando

El problema no terminaba ahí. Las impresiones de marca cayeron un **-41,7% interanual** — prácticamente a la mitad en todos los meses del período analizado.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.1;">Visibilidad de marca</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(191,85,26,0.2);background:rgba(191,85,26,0.05);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#BF551A;margin-bottom:4px;">Impresiones marca YoY</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#BF551A;line-height:1.1;">-41,7%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">Sept–Dic 2025 vs 2024</div>
    </div>
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Impresiones · Sep 2025</div>
      <div style="font-size:clamp(24px,3.5vw,32px);font-weight:900;color:#1a1a1a;line-height:1.1;">2,1M</div>
      <div style="font-size:13px;color:#BF551A;margin-top:4px;">↓ -43% vs Sep 2024 (3,6M)</div>
    </div>
    <div style="border:1px solid rgba(191,85,26,0.2);background:rgba(191,85,26,0.03);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#BF551A;margin-bottom:4px;">Impresiones · Dic 2025</div>
      <div style="font-size:clamp(24px,3.5vw,32px);font-weight:900;color:#1a1a1a;line-height:1.1;">2,3M</div>
      <div style="font-size:13px;color:#BF551A;margin-top:4px;">↓ -45% vs Dic 2024 (4,1M)</div>
    </div>
  </div>
  <div style="display:flex;gap:20px;margin-bottom:20px;">
    <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:rgba(0,0,0,0.2);border-radius:3px;display:inline-block;"></span><span style="font-size:13px;color:rgba(0,0,0,0.55);">2024</span></div>
    <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:#BF551A;border-radius:3px;display:inline-block;"></span><span style="font-size:13px;color:rgba(0,0,0,0.55);">2025</span></div>
  </div>
  <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:24px;">
    <svg viewBox="0 0 700 300" width="100%" style="display:block;">
      <line x1="50" y1="280" x2="680" y2="280" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
      <line x1="50" y1="210" x2="680" y2="210" stroke="rgba(0,0,0,0.05)" stroke-width="1" stroke-dasharray="4"/>
      <line x1="50" y1="140" x2="680" y2="140" stroke="rgba(0,0,0,0.05)" stroke-width="1" stroke-dasharray="4"/>
      <line x1="50" y1="70" x2="680" y2="70" stroke="rgba(0,0,0,0.05)" stroke-width="1" stroke-dasharray="4"/>
      <text x="30" y="284" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">1.5M</text>
      <text x="30" y="214" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">2.5M</text>
      <text x="30" y="144" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">3.5M</text>
      <text x="30" y="74" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">4.5M</text>
      <text x="155" y="298" font-size="11" fill="rgba(0,0,0,0.4)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">Sep</text>
      <text x="365" y="298" font-size="11" fill="rgba(0,0,0,0.4)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">Oct</text>
      <text x="470" y="298" font-size="11" fill="rgba(0,0,0,0.4)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">Nov</text>
      <text x="575" y="298" font-size="11" fill="rgba(0,0,0,0.4)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">Dic</text>
      <!-- 2024 line (grey) -->
      <polyline points="155,108 365,164 470,115 575,52" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="2.5"/>
      <circle cx="155" cy="108" r="5" fill="rgba(0,0,0,0.2)"/>
      <circle cx="365" cy="164" r="5" fill="rgba(0,0,0,0.2)"/>
      <circle cx="470" cy="115" r="5" fill="rgba(0,0,0,0.2)"/>
      <circle cx="575" cy="52" r="5" fill="rgba(0,0,0,0.2)"/>
      <text x="155" y="96" font-size="11" fill="rgba(0,0,0,0.4)" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">3.6M</text>
      <text x="365" y="156" font-size="11" fill="rgba(0,0,0,0.4)" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">2.9M</text>
      <text x="470" y="103" font-size="11" fill="rgba(0,0,0,0.4)" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">3.5M</text>
      <text x="575" y="43" font-size="11" fill="rgba(0,0,0,0.4)" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">4.1M</text>
      <!-- 2025 line (red) -->
      <polyline points="155,228 365,242 470,234 575,210" fill="none" stroke="#BF551A" stroke-width="2.5"/>
      <circle cx="155" cy="228" r="5" fill="#BF551A"/>
      <circle cx="365" cy="242" r="5" fill="#BF551A"/>
      <circle cx="470" cy="234" r="5" fill="#BF551A"/>
      <circle cx="575" cy="210" r="5" fill="#BF551A"/>
      <text x="155" y="220" font-size="11" fill="#BF551A" text-anchor="middle" font-weight="700" style="font-family:Switzer,system-ui,sans-serif;">2.1M</text>
      <text x="365" y="258" font-size="10" fill="#BF551A" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">-33%</text>
      <text x="470" y="250" font-size="10" fill="#BF551A" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">-44%</text>
      <text x="590" y="224" font-size="11" fill="#BF551A" text-anchor="start" font-weight="700" style="font-family:Switzer,system-ui,sans-serif;">2.3M</text>
      <text x="168" y="242" font-size="10" fill="#BF551A" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">-43%</text>
      <text x="590" y="236" font-size="10" fill="#BF551A" text-anchor="start" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">-44%</text>
    </svg>
  </div>
</div>

La caída más pronunciada fue en **septiembre 2025**: **2,1M vs 3,6M** de impresiones — un -43%. Google mostraba el sitio a 1,5M de usuarios menos ante búsquedas de marca.

Los clicks de marca también cayeron un **-17,5%** en el período septiembre-diciembre. El pico más crítico fue **noviembre 2025 vs noviembre 2024**: de 65,8K a 42,1K clics — una caída de -36% en el mes de mayor tráfico del año.

Esto evidenciaba dos problemas combinados: **menor awareness de marca** (menos búsquedas) y **menor captura** de las búsquedas existentes (CTR bajo por canibalización).

### Solo una categoría tenía tracción

Del tráfico de marca, el **84,5%** iba a la Home — páginas sin intención de categoría específica. El tráfico de categoría era mínimo.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.1;">Dependencia Zapatillas</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(191,85,26,0.2);background:rgba(191,85,26,0.05);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#BF551A;margin-bottom:4px;">Otras categorías · Q4 2024</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#BF551A;line-height:1.1;">1%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">2.418 clicks (Remera, Vestido, Jean, Bikini...)</div>
    </div>
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Zapatillas (mejor categoría)</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:rgba(0,0,0,0.3);line-height:1.1;">14,5%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">~25.000 clicks de marca</div>
    </div>
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Resto (Home + genérico)</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:rgba(0,0,0,0.25);line-height:1.1;">84,5%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">búsquedas sin intención de categoría</div>
    </div>
  </div>
  <div style="text-align:center;margin-bottom:16px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:12px;">Q4 2024 · Distribución tráfico de marca por destino</div>
    <div style="display:flex;justify-content:center;gap:20px;margin-bottom:20px;">
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:rgba(0,0,0,0.1);border-radius:3px;display:inline-block;"></span><span style="font-size:12px;color:rgba(0,0,0,0.55);">Resto Home + genérico (84,5%)</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:#8fbc8f;border-radius:3px;display:inline-block;"></span><span style="font-size:12px;color:rgba(0,0,0,0.55);">Zapatillas (14,5%)</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:#BF551A;border-radius:3px;display:inline-block;"></span><span style="font-size:12px;color:rgba(0,0,0,0.55);">Otras categorías (1%)</span></div>
    </div>
    <svg viewBox="0 0 200 200" width="220" height="220" style="display:block;margin:0 auto;">
      <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="28"/>
      <circle cx="100" cy="100" r="75" fill="none" stroke="#8fbc8f" stroke-width="28" stroke-dasharray="68.33 471.24" stroke-dashoffset="0" transform="rotate(-90 100 100)"/>
      <circle cx="100" cy="100" r="75" fill="none" stroke="#BF551A" stroke-width="28" stroke-dasharray="4.71 471.24" stroke-dashoffset="-68.33" transform="rotate(-90 100 100)" stroke-linecap="round"/>
      <text x="100" y="92" text-anchor="middle" font-size="30" font-weight="900" fill="#BF551A" style="font-family:Switzer,system-ui,sans-serif;">1%</text>
      <text x="100" y="112" text-anchor="middle" font-size="12" fill="rgba(0,0,0,0.4)" style="font-family:Switzer,system-ui,sans-serif;">categorías</text>
    </svg>
  </div>
  <div style="border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:16px 20px;margin-top:24px;">
    <p style="font-size:13px;color:rgba(0,0,0,0.5);margin:0;line-height:1.5;"><strong style="color:rgba(0,0,0,0.6);">(*)</strong> URL Home + genérico: búsquedas donde el usuario escribe el nombre de la marca solo o con un término amplio, sin intención de categoría específica. Ej: "47 Street", "47 Street oficial", "47 Street tienda online".</p>
  </div>
</div>

La única excepción era Zapatillas con un **14,5%**, probablemente por volumen de búsqueda propio. **El resto de categorías — Vestidos, Jeans, Remeras, Bikinis — eran prácticamente invisibles.**

Este era el punto de partida: apenas **2.418 clics** repartidos entre todas las categorías de ropa. El proyecto SEO apuntaba a revertir exactamente esta distribución.

### Los competidores lo hacían mejor

Cuando comparé con la competencia, el patrón era claro: los competidores (directos e indirectos) mantenían un equilibrio mucho más sano entre tráfico brand y non-brand.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:left;margin:0 0 8px;color:#1a1a1a;line-height:1.1;">Competidores</h3>
  <div style="margin-bottom:8px;">
    <div style="font-size:18px;font-weight:700;color:#1a1a1a;">Tráfico Brand vs Non-Brand</div>
    <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">Distribución de tráfico orgánico por tipo de búsqueda · Ordenado por mayor Non-Brand</div>
  </div>
  <div style="display:flex;gap:20px;margin-bottom:24px;">
    <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:#2D6A4F;border-radius:3px;display:inline-block;"></span><span style="font-size:13px;color:rgba(0,0,0,0.55);">Non-Brand</span></div>
    <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:#B7E4C7;border-radius:3px;display:inline-block;"></span><span style="font-size:13px;color:rgba(0,0,0,0.55);">Brand</span></div>
  </div>
  <div style="display:flex;align-items:flex-end;gap:6px;height:280px;padding-bottom:60px;position:relative;">
    <div style="position:absolute;left:0;bottom:58px;right:0;border-top:1px solid rgba(0,0,0,0.06);"></div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:53%;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:47%;"></div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.4);text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;">kosiuko.com</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:48%;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:52%;"></div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.4);text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;">lovelydenim.com.ar</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:47%;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:53%;"></div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.4);text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;">comoquieres.com.ar</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:42%;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:58%;"></div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.4);text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;">complot.com.ar</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:33%;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:67%;"></div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.4);text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;">bombaproject.com.ar</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:33%;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:67%;"></div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.4);text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;">portsaid.com.ar</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:33%;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:67%;"></div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.4);text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;">sweet.com.ar</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:30%;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:70%;"></div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.4);text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;">desiderata.com.ar</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:27%;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:73%;"></div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.4);text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;">kingofthekongo.com.ar</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:15%;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:85%;"></div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.4);text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;">aynotdead.com</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:13%;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:87%;"></div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.4);text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;">queenjuana.com</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:3%;min-height:3px;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:97%;"></div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.4);text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;">muaa.ar</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;height:100%;border:2px dashed #BF551A;border-radius:6px;padding:2px;">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="background:#2D6A4F;height:2%;min-height:3px;border-radius:3px 3px 0 0;"></div>
        <div style="background:#B7E4C7;height:98%;border-radius:0 0 3px 3px;"></div>
      </div>
      <div style="font-size:8px;color:#BF551A;text-align:center;margin-top:6px;transform:rotate(-45deg);transform-origin:top center;white-space:nowrap;font-weight:700;">47 Street</div>
    </div>
  </div>
</div>

Esto es de suma importancia ya que se compensan en caso de pérdida de tráfico en uno de los dos lados. Si tu marca pierde búsquedas (como estaba pasando), el tráfico genérico te sostiene. Sin esa diversificación, cualquier caída de marca es una caída total.

---

## La estrategia: qué hice y por qué

Con el diagnóstico claro, la intervención se enfocó en resolver los problemas estructurales primero. Sin base técnica sólida, nada de lo que hagas después escala.

### 1. Anti-canibalización: una URL por intención

El movimiento más importante. Antes, múltiples URLs competían por la misma búsqueda. Google no sabía cuál mostrar y dividía las impresiones entre todas — bajando el CTR de todas.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.1;">Arquitectura alineada</h3>
  <!-- ANTES -->
  <div style="border:1px solid rgba(191,85,26,0.15);background:rgba(191,85,26,0.02);border-radius:12px;padding:28px 24px;margin-bottom:20px;">
    <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#BF551A;margin-bottom:20px;">✗ Antes · Canibalización</div>
    <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:20px;align-items:center;">
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="background:white;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:10px 16px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:14px;">🔍</span>
          <span style="font-size:14px;color:#1a1a1a;">"vestidos 47 street"</span>
        </div>
        <div style="background:white;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:10px 16px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:14px;">🔍</span>
          <span style="font-size:14px;color:#1a1a1a;">"vestidos verano 47 street"</span>
        </div>
        <div style="background:white;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:10px 16px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:14px;">🔍</span>
          <span style="font-size:14px;color:#1a1a1a;">"vestidos invierno 47 street"</span>
        </div>
      </div>
      <div style="font-size:24px;color:rgba(0,0,0,0.2);">→</div>
      <div style="background:rgba(191,85,26,0.06);border:1px solid rgba(191,85,26,0.2);border-radius:10px;padding:16px 20px;text-align:center;">
        <div style="font-size:14px;font-weight:700;color:#BF551A;margin-bottom:8px;">3 URLs compitiendo</div>
        <div style="font-size:13px;color:#1a1a1a;font-weight:600;line-height:1.8;">/verano/vestidos<br>/invierno/vestidos<br>/sale/vestidos</div>
        <div style="font-size:12px;color:rgba(0,0,0,0.4);margin-top:8px;font-style:italic;">Google no sabe cuál mostrar<br>CTR bajo · impresiones divididas</div>
      </div>
    </div>
  </div>
  <!-- DESPUÉS -->
  <div style="border:1px solid rgba(45,106,79,0.15);background:rgba(45,106,79,0.03);border-radius:12px;padding:28px 24px;">
    <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#2D6A4F;margin-bottom:20px;">✓ Después · Anti-canibalización</div>
    <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:20px;align-items:center;">
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="background:white;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:10px 16px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:14px;">🔍</span>
          <span style="font-size:14px;color:#1a1a1a;">"vestidos verano 47 street"</span>
        </div>
        <div style="background:white;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:10px 16px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:14px;">🔍</span>
          <span style="font-size:14px;color:#1a1a1a;">"vestidos invierno 47 street"</span>
        </div>
        <div style="background:white;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:10px 16px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:14px;">🔍</span>
          <span style="font-size:14px;color:#1a1a1a;">"rebajas vestidos 47 street"</span>
        </div>
      </div>
      <div style="font-size:24px;color:rgba(0,0,0,0.2);">→</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="background:rgba(45,106,79,0.06);border:1px solid rgba(45,106,79,0.15);border-radius:8px;padding:10px 16px;text-align:center;">
          <div style="font-size:14px;font-weight:700;color:#2D6A4F;">/verano/vestidos</div>
          <div style="font-size:12px;color:rgba(0,0,0,0.4);">CTR 3.67% · +164%</div>
        </div>
        <div style="background:rgba(45,106,79,0.06);border:1px solid rgba(45,106,79,0.15);border-radius:8px;padding:10px 16px;text-align:center;">
          <div style="font-size:14px;font-weight:700;color:#2D6A4F;">/invierno/vestidos</div>
          <div style="font-size:12px;color:rgba(0,0,0,0.4);">URL exacta por intención</div>
        </div>
        <div style="background:rgba(45,106,79,0.06);border:1px solid rgba(45,106,79,0.15);border-radius:8px;padding:10px 16px;text-align:center;">
          <div style="font-size:14px;font-weight:700;color:#2D6A4F;">/sale/vestidos</div>
          <div style="font-size:12px;color:rgba(0,0,0,0.4);">Sin competencia interna</div>
        </div>
      </div>
    </div>
  </div>
</div>

La solución: **cada intención de búsqueda tiene una única URL canónica**. Google muestra el resultado correcto, el usuario hace clic, y el CTR sube.

El ejemplo más claro: "Vestidos". Antes, 3 URLs competían (/verano/vestidos, /invierno/vestidos, /sale/vestidos). Después, cada una responde a su intención específica — Verano, Invierno y Rebajas — sin competencia interna. Hoy Google muestra **3 resultados distintos**, cada uno para su intención.

### 2. Consolidación de URLs legacy

Eliminé las URLs de temporadas pasadas que ya no tenían razón de existir. Cada categoría pasó a tener una estructura limpia: una URL principal y variantes solo cuando la intención de búsqueda lo justificaba.

Esto desbloqueó la autoridad que estaba fragmentada entre múltiples páginas y la concentró donde Google podía usarla.

### 3. Optimización técnica de base

Resolución de problemas de [SEO técnico](/seo-tecnico): limpieza de URLs duplicadas, corrección de canonicals, optimización de la arquitectura de categorías para que Googlebot pudiera rastrear todo sin confundirse.

Nada glamoroso, pero es el trabajo que permite que todo lo demás funcione. Sin base técnica, no hay crecimiento sostenible.

---

## Los resultados: acá se pone gigantesco

Okay, esta es la parte que más disfruto. Todos los datos son del período **octubre 2025 a febrero 2026** — 5 meses de implementación. Solo la Fase 1 del proyecto (30% del total).

### Visibilidad orgánica: se duplicó

La visibilidad orgánica no-marca aumentó **+124% interanual**, pasando de **1,19M a 2,66M** impresiones.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.1;">Visibilidad orgánica x 2</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(59,130,246,0.2);background:rgba(59,130,246,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#3B82F6;margin-bottom:4px;">Impresiones Oct25–Feb26</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#1e40af;line-height:1.1;">2,66M</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">acumulado 5 meses</div>
    </div>
    <div style="border:1px solid rgba(59,130,246,0.2);background:rgba(59,130,246,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Crecimiento MoY</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#1e40af;line-height:1.1;">+124%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">vs 1,19M oct24–feb25</div>
    </div>
  </div>
  <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:24px 16px 16px;">
    <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:4px;">Impresiones mensuales · oct 2024 → feb 2026</div>
    <div style="font-size:12px;color:rgba(0,0,0,0.4);margin-bottom:20px;">Valores en miles · azul claro = pre-implementación</div>
    <div style="display:flex;align-items:flex-end;gap:3px;height:220px;position:relative;">
      <!-- Dashed line for implementation start between sep-25 and oct-25 -->
      <div style="position:absolute;left:67.6%;top:0;bottom:0;border-left:2px dashed #D97706;z-index:2;"></div>
      <div style="position:absolute;left:calc(67.6% - 60px);top:-4px;background:#FEF3C7;border:1px solid #D97706;border-radius:6px;padding:2px 8px;font-size:9px;font-weight:600;color:#92400E;z-index:3;white-space:nowrap;">▶ Inicio de implementaciones</div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#3B82F6;margin-bottom:2px;white-space:nowrap;">20.9k</div>
        <div style="width:100%;background:#BFDBFE;border-radius:3px 3px 0 0;height:3%;min-height:3px;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;white-space:nowrap;">oct-24</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#3B82F6;margin-bottom:2px;">216.9k</div>
        <div style="width:100%;background:#BFDBFE;border-radius:3px 3px 0 0;height:30%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">nov-24</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#3B82F6;margin-bottom:2px;">299.0k</div>
        <div style="width:100%;background:#BFDBFE;border-radius:3px 3px 0 0;height:41.4%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">dic-24</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#3B82F6;margin-bottom:2px;">332.6k</div>
        <div style="width:100%;background:#BFDBFE;border-radius:3px 3px 0 0;height:46.1%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">ene-25</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#3B82F6;margin-bottom:2px;">321.6k</div>
        <div style="width:100%;background:#BFDBFE;border-radius:3px 3px 0 0;height:44.6%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">feb-25</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#3B82F6;margin-bottom:2px;">374.5k</div>
        <div style="width:100%;background:#BFDBFE;border-radius:3px 3px 0 0;height:51.9%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">mar-25</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#3B82F6;margin-bottom:2px;">347.0k</div>
        <div style="width:100%;background:#BFDBFE;border-radius:3px 3px 0 0;height:48.1%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">abr-25</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#3B82F6;margin-bottom:2px;">416.8k</div>
        <div style="width:100%;background:#BFDBFE;border-radius:3px 3px 0 0;height:57.8%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">may-25</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#3B82F6;margin-bottom:2px;">469.4k</div>
        <div style="width:100%;background:#BFDBFE;border-radius:3px 3px 0 0;height:65%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">jun-25</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#3B82F6;margin-bottom:2px;">408.7k</div>
        <div style="width:100%;background:#BFDBFE;border-radius:3px 3px 0 0;height:56.6%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">jul-25</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#3B82F6;margin-bottom:2px;">411.4k</div>
        <div style="width:100%;background:#BFDBFE;border-radius:3px 3px 0 0;height:57%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">ago-25</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#93C5FD;margin-bottom:2px;">242.7k</div>
        <div style="width:100%;background:#BFDBFE;border-radius:3px 3px 0 0;height:33.6%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">sep-25</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#2563EB;margin-bottom:2px;font-weight:600;">258.0k</div>
        <div style="width:100%;background:rgba(59,130,246,0.5);border-radius:3px 3px 0 0;height:35.7%;border:1px solid #D97706;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">oct-25</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#2563EB;margin-bottom:2px;font-weight:600;">442.9k</div>
        <div style="width:100%;background:#60A5FA;border-radius:3px 3px 0 0;height:61.4%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">nov-25</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#2563EB;margin-bottom:2px;font-weight:600;">721.6k</div>
        <div style="width:100%;background:#60A5FA;border-radius:3px 3px 0 0;height:100%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">dic-25</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#2563EB;margin-bottom:2px;font-weight:600;">674.4k</div>
        <div style="width:100%;background:#60A5FA;border-radius:3px 3px 0 0;height:93.5%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">ene-26</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
        <div style="font-size:8px;color:#2563EB;margin-bottom:2px;font-weight:600;">568.3k</div>
        <div style="width:100%;background:#60A5FA;border-radius:3px 3px 0 0;height:78.7%;"></div>
        <div style="font-size:7px;color:rgba(0,0,0,0.35);margin-top:4px;">feb-26</div>
      </div>
    </div>
  </div>
</div>

Más del doble de exposición en búsquedas no-marca, ampliando significativamente la superficie de captación en el mercado. Esto no es un pico puntual — es una expansión estructural del alcance orgánico.

### Tráfico orgánico: se multiplicó x5

Los clics orgánicos no-marca crecieron **+434% interanual**, pasando de **5.369 a 28.662** en el período Oct-Feb.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.1;">Tráfico orgánicos x5</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(45,106,79,0.2);background:rgba(45,106,79,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#2D6A4F;margin-bottom:4px;">Clics Oct25–Feb26</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#1a1a1a;line-height:1.1;">28.662</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">acumulado 5 meses</div>
    </div>
    <div style="border:1px solid rgba(45,106,79,0.2);background:rgba(45,106,79,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Crecimiento MoY</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#2D6A4F;line-height:1.1;">+434%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">vs 5.369 oct24–feb25</div>
    </div>
  </div>
  <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:24px 16px 16px;">
    <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:4px;">Clics mensuales · oct 2024 → feb 2026</div>
    <div style="font-size:12px;color:rgba(0,0,0,0.4);margin-bottom:20px;">Valores absolutos · gris = pre-implementación</div>
    <svg viewBox="0 0 800 320" width="100%" style="display:block;">
      <!-- Grid lines -->
      <line x1="50" y1="280" x2="770" y2="280" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
      <line x1="50" y1="220" x2="770" y2="220" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <line x1="50" y1="160" x2="770" y2="160" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <line x1="50" y1="100" x2="770" y2="100" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <line x1="50" y1="40" x2="770" y2="40" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <!-- Y labels -->
      <text x="42" y="284" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">0</text>
      <text x="42" y="224" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">2.0k</text>
      <text x="42" y="164" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">4.0k</text>
      <text x="42" y="104" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">6.0k</text>
      <text x="42" y="44" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">8.0k</text>
      <!-- Implementation line -->
      <line x1="545" y1="20" x2="545" y2="280" stroke="#D97706" stroke-width="2" stroke-dasharray="6,4"/>
      <rect x="440" y="12" width="160" height="20" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/>
      <text x="520" y="26" font-size="9" fill="#92400E" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">▶ Inicio de implementaciones</text>
      <!-- Grey line (pre-implementation) -->
      <polyline points="75,277 120,264 165,260 210,263 255,264 300,260 345,261 390,254 435,249 480,247 525,252 570,259" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="75" cy="277" r="4" fill="rgba(0,0,0,0.2)"/><text x="75" y="271" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">116</text>
      <circle cx="120" cy="264" r="4" fill="rgba(0,0,0,0.2)"/><text x="120" y="258" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">1.2k</text>
      <circle cx="165" cy="260" r="4" fill="rgba(0,0,0,0.2)"/><text x="165" y="254" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">1.5k</text>
      <circle cx="210" cy="263" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="255" cy="264" r="4" fill="rgba(0,0,0,0.2)"/><text x="255" y="258" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">1.2k</text>
      <circle cx="300" cy="260" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="345" cy="261" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="390" cy="254" r="4" fill="rgba(0,0,0,0.2)"/><text x="390" y="248" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">1.9k</text>
      <circle cx="435" cy="249" r="4" fill="rgba(0,0,0,0.2)"/><text x="435" y="243" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">2.1k</text>
      <circle cx="480" cy="247" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="525" cy="252" r="4" fill="rgba(0,0,0,0.2)"/><text x="525" y="246" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">2.0k</text>
      <circle cx="570" cy="259" r="4" fill="rgba(0,0,0,0.2)"/><text x="570" y="253" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">1.6k</text>
      <!-- Green line (post-implementation) -->
      <polyline points="570,259 615,254 660,141 705,57 750,87 770,126" fill="none" stroke="#2D6A4F" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="615" cy="254" r="5" fill="#2D6A4F"/><text x="615" y="246" font-size="10" fill="#2D6A4F" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">1.9k</text>
      <circle cx="660" cy="141" r="5" fill="#2D6A4F"/><text x="660" y="133" font-size="10" fill="#2D6A4F" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">4.7k</text>
      <circle cx="705" cy="57" r="5" fill="#2D6A4F"/><text x="705" y="49" font-size="11" fill="#2D6A4F" text-anchor="middle" font-weight="700" style="font-family:Switzer,system-ui,sans-serif;">8.7k</text>
      <circle cx="750" cy="87" r="5" fill="#2D6A4F"/><text x="750" y="79" font-size="10" fill="#2D6A4F" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">7.5k</text>
      <circle cx="770" cy="126" r="5" fill="#2D6A4F"/><text x="770" y="118" font-size="10" fill="#2D6A4F" text-anchor="end" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">5.9k</text>
      <!-- X labels -->
      <text x="75" y="298" font-size="8" fill="rgba(0,0,0,0.3)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">oct-24</text>
      <text x="165" y="298" font-size="8" fill="rgba(0,0,0,0.3)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">dic-24</text>
      <text x="255" y="298" font-size="8" fill="rgba(0,0,0,0.3)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">feb-25</text>
      <text x="345" y="298" font-size="8" fill="rgba(0,0,0,0.3)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">abr-25</text>
      <text x="435" y="298" font-size="8" fill="rgba(0,0,0,0.3)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">jun-25</text>
      <text x="525" y="298" font-size="8" fill="rgba(0,0,0,0.3)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">ago-25</text>
      <text x="615" y="298" font-size="8" fill="rgba(0,0,0,0.3)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">oct-25</text>
      <text x="705" y="298" font-size="8" fill="rgba(0,0,0,0.3)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">dic-25</text>
      <text x="770" y="298" font-size="8" fill="rgba(0,0,0,0.3)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">feb-26</text>
    </svg>
  </div>
</div>

Multiplicar el tráfico por 5,3 veces en una ventana de 5 meses no es habitual. Este salto confirma que la mejora en posicionamiento ya está impactando directamente en **adquisición real de usuarios**.

### CTR: se duplicó

El CTR más que se duplicó, creciendo **+140%**, pasando de **0,45% a 1,08%**.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.1;">CTR duplicado - No marca</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(45,106,79,0.2);background:rgba(45,106,79,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#2D6A4F;margin-bottom:4px;">CTR prom. Oct25–Feb26</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#1a1a1a;line-height:1.1;">1,08%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">promedio 5 meses</div>
    </div>
    <div style="border:1px solid rgba(45,106,79,0.2);background:rgba(45,106,79,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Crecimiento MoY</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#2D6A4F;line-height:1.1;">+140%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">vs 0,45% oct24–feb25</div>
    </div>
  </div>
  <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:24px 16px 16px;">
    <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:4px;">CTR mensual · oct 2024 → feb 2026</div>
    <div style="font-size:12px;color:rgba(0,0,0,0.4);margin-bottom:20px;">Porcentaje · gris = pre-implementación</div>
    <svg viewBox="0 0 800 300" width="100%" style="display:block;">
      <line x1="50" y1="260" x2="770" y2="260" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
      <line x1="50" y1="195" x2="770" y2="195" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <line x1="50" y1="130" x2="770" y2="130" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <line x1="50" y1="65" x2="770" y2="65" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <text x="42" y="264" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">0.0%</text>
      <text x="42" y="199" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">0.5%</text>
      <text x="42" y="134" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">1.0%</text>
      <text x="42" y="69" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">1.5%</text>
      <line x1="545" y1="30" x2="545" y2="260" stroke="#D97706" stroke-width="2" stroke-dasharray="6,4"/>
      <rect x="440" y="22" width="160" height="20" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/>
      <text x="520" y="36" font-size="9" fill="#92400E" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">▶ Inicio de implementaciones</text>
      <!-- Grey line: 0.6, 0.56, 0.57, 0.50, 0.40, 0.37, 0.41, 0.41, 0.47, 0.46, 0.55, 0.49, 0.64 -->
      <polyline points="75,182 120,187 165,186 210,192 255,208 300,212 345,207 390,207 435,199 480,200 525,188 570,196" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="75" cy="182" r="4" fill="rgba(0,0,0,0.2)"/><text x="75" y="175" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">0.60%</text>
      <circle cx="120" cy="187" r="4" fill="rgba(0,0,0,0.2)"/><text x="120" y="180" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">0.56%</text>
      <circle cx="165" cy="186" r="4" fill="rgba(0,0,0,0.2)"/><text x="165" y="179" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">0.57%</text>
      <circle cx="210" cy="192" r="4" fill="rgba(0,0,0,0.2)"/><text x="210" y="205" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">0.50%</text>
      <circle cx="255" cy="208" r="4" fill="rgba(0,0,0,0.2)"/><text x="255" y="221" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">0.40%</text>
      <circle cx="300" cy="212" r="4" fill="rgba(0,0,0,0.2)"/><text x="300" y="225" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">0.37%</text>
      <circle cx="345" cy="207" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="390" cy="207" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="435" cy="199" r="4" fill="rgba(0,0,0,0.2)"/><text x="435" y="192" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">0.47%</text>
      <circle cx="480" cy="200" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="525" cy="188" r="4" fill="rgba(0,0,0,0.2)"/><text x="525" y="181" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">0.55%</text>
      <circle cx="570" cy="196" r="4" fill="rgba(0,0,0,0.2)"/><text x="570" y="209" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">0.64%</text>
      <!-- Green line: 0.75, 1.05, 1.20, 1.11, 1.04 -->
      <polyline points="570,196 615,163 660,123 705,107 750,115 770,124" fill="none" stroke="#2D6A4F" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="615" cy="163" r="5" fill="#2D6A4F"/><text x="615" y="155" font-size="10" fill="#2D6A4F" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">0.75%</text>
      <circle cx="660" cy="123" r="5" fill="#2D6A4F"/><text x="660" y="115" font-size="10" fill="#2D6A4F" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">1.05%</text>
      <circle cx="705" cy="107" r="5" fill="#2D6A4F"/><text x="705" y="99" font-size="11" fill="#2D6A4F" text-anchor="middle" font-weight="700" style="font-family:Switzer,system-ui,sans-serif;">1.20%</text>
      <circle cx="750" cy="115" r="5" fill="#2D6A4F"/><text x="750" y="107" font-size="10" fill="#2D6A4F" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">1.11%</text>
      <circle cx="770" cy="124" r="5" fill="#2D6A4F"/><text x="768" y="116" font-size="10" fill="#2D6A4F" text-anchor="end" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">1.04%</text>
    </svg>
  </div>
</div>

¿Por qué importa? Porque no solo aparecemos más, sino que generamos mayor intención de clic frente a la competencia. La mejora es consecuencia directa de mejores posiciones y mayor relevancia en las búsquedas.

### Posición promedio: de página 3 a página 1

La posición promedio mejoró **+57%**, pasando de **27,0 a 11,6**.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.1;">Posicionamiento orgánico</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(124,58,237,0.2);background:rgba(124,58,237,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#7C3AED;margin-bottom:4px;">Posición prom. Feb-26</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#1a1a1a;line-height:1.1;">11,6</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">vs 26,8 oct24–feb25</div>
    </div>
    <div style="border:1px solid rgba(124,58,237,0.2);background:rgba(124,58,237,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Mejora posición MoY</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#7C3AED;line-height:1.1;">+57%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">menor número = mejor ranking</div>
    </div>
  </div>
  <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:24px 16px 16px;">
    <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:4px;">Posición promedio · oct 2024 → feb 2026</div>
    <div style="font-size:12px;color:rgba(0,0,0,0.4);margin-bottom:20px;">Eje invertido: arriba = mejor posición · gris = pre-implementación</div>
    <svg viewBox="0 0 800 300" width="100%" style="display:block;">
      <line x1="50" y1="260" x2="770" y2="260" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
      <line x1="50" y1="195" x2="770" y2="195" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <line x1="50" y1="130" x2="770" y2="130" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <line x1="50" y1="65" x2="770" y2="65" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <!-- Y labels (inverted: top=0, bottom=40) -->
      <text x="42" y="69" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">pos. 0</text>
      <text x="42" y="134" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">pos. 15</text>
      <text x="42" y="199" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">pos. 25</text>
      <text x="42" y="264" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">pos. 40</text>
      <text x="25" y="160" font-size="9" fill="#7C3AED" text-anchor="middle" transform="rotate(-90 25 160)" style="font-family:Switzer,system-ui,sans-serif;">↑ mejor ranking</text>
      <line x1="545" y1="30" x2="545" y2="260" stroke="#D97706" stroke-width="2" stroke-dasharray="6,4"/>
      <rect x="440" y="22" width="160" height="20" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/>
      <text x="520" y="36" font-size="9" fill="#92400E" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">▶ Inicio de implementaciones</text>
      <!-- Grey line (inverted): pos 35,35,32,30,28,27,26,25,24,29,22,24 -->
      <!-- y = 65 + (pos/40)*195 -->
      <polyline points="75,236 120,236 165,221 210,211 255,201 300,196 345,191 390,187 435,182 480,206 525,172 570,182" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="75" cy="236" r="4" fill="rgba(0,0,0,0.2)"/><text x="75" y="250" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">35.0</text>
      <circle cx="120" cy="236" r="4" fill="rgba(0,0,0,0.2)"/><text x="120" y="250" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">35.0</text>
      <circle cx="165" cy="221" r="4" fill="rgba(0,0,0,0.2)"/><text x="165" y="235" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">32.0</text>
      <circle cx="210" cy="211" r="4" fill="rgba(0,0,0,0.2)"/><text x="210" y="225" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">30.0</text>
      <circle cx="255" cy="201" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="300" cy="196" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="345" cy="191" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="390" cy="187" r="4" fill="rgba(0,0,0,0.2)"/><text x="390" y="181" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">25.0</text>
      <circle cx="435" cy="182" r="4" fill="rgba(0,0,0,0.2)"/><text x="435" y="176" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">24.0</text>
      <circle cx="480" cy="206" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="525" cy="172" r="4" fill="rgba(0,0,0,0.2)"/><text x="525" y="166" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">22.0</text>
      <circle cx="570" cy="182" r="4" fill="rgba(0,0,0,0.2)"/><text x="570" y="196" font-size="9" fill="rgba(0,0,0,0.35)" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">24.0</text>
      <!-- Purple line: pos 20, 16, 13, 12, 11.6 -->
      <polyline points="615,162 660,131 705,118 750,124 770,121" fill="none" stroke="#7C3AED" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="615" cy="162" r="5" fill="#7C3AED"/><text x="615" y="155" font-size="10" fill="#7C3AED" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">20.0</text>
      <circle cx="660" cy="131" r="5" fill="#7C3AED"/><text x="660" y="124" font-size="10" fill="#7C3AED" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">16.0</text>
      <circle cx="705" cy="118" r="5" fill="#7C3AED"/><text x="705" y="111" font-size="10" fill="#7C3AED" text-anchor="middle" font-weight="700" style="font-family:Switzer,system-ui,sans-serif;">13.0</text>
      <circle cx="750" cy="124" r="5" fill="#7C3AED"/><text x="750" y="117" font-size="10" fill="#7C3AED" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">12.0</text>
      <circle cx="770" cy="121" r="5" fill="#7C3AED"/><text x="768" y="114" font-size="10" fill="#7C3AED" text-anchor="end" font-weight="700" style="font-family:Switzer,system-ui,sans-serif;">11.6</text>
    </svg>
  </div>
</div>

En términos prácticos, dejamos de competir en página 3 para consolidarnos en primera página. Esto transforma estructuralmente la probabilidad de captación de tráfico orgánico.

### Evolución de keywords: crecimiento explosivo

En solo 5 meses post-implementación, las keywords de no-marca en **Top 3 crecieron +281%** (de 163 a 660), el **Top 4-10 se cuadruplicó (+261%)** y el **Top 11-20 escaló +320%**.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.1;">Evolución Keywords</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Top 3 · Feb 2026</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#1a1a1a;line-height:1.1;">660</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">+305% vs Ene 2025 (163)</div>
    </div>
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Top 4–10 · Feb 2026</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#1a1a1a;line-height:1.1;">2.477</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">+392% vs Ene 2025 (503)</div>
    </div>
    <div style="border:1px solid rgba(45,106,79,0.3);background:#2D6A4F;border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-bottom:4px;">Top 11–20 · Feb 2026</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:white;line-height:1.1;">832</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.65);margin-top:4px;">+221% vs Ene 2025 (259)</div>
    </div>
  </div>
  <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:24px 16px 16px;">
    <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:4px;">Heatmap · Keywords no de marca por posición</div>
    <div style="font-size:12px;color:rgba(0,0,0,0.4);margin-bottom:16px;">Intensidad de color proporcional al volumen · Línea naranja = inicio de implementaciones (Sep 2025) · Línea roja = Google Core Update</div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;min-width:700px;">
        <thead>
          <tr>
            <th style="padding:8px 10px;text-align:left;font-size:10px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);border-bottom:2px solid rgba(0,0,0,0.1);"></th>
            <th style="padding:8px 6px;text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;color:rgba(0,0,0,0.4);border-bottom:2px solid rgba(0,0,0,0.1);">Ene<br><span style="font-weight:400;">25</span></th>
            <th style="padding:8px 6px;text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;color:rgba(0,0,0,0.4);border-bottom:2px solid rgba(0,0,0,0.1);">Feb<br><span style="font-weight:400;">25</span></th>
            <th style="padding:8px 6px;text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;color:#BF551A;border-bottom:2px solid rgba(0,0,0,0.1);">Mar<br><span style="font-weight:400;font-size:7px;">Core Update</span></th>
            <th style="padding:8px 6px;text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;color:rgba(0,0,0,0.4);border-bottom:2px solid rgba(0,0,0,0.1);">Abr<br><span style="font-weight:400;">25</span></th>
            <th style="padding:8px 6px;text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;color:rgba(0,0,0,0.4);border-bottom:2px solid rgba(0,0,0,0.1);">May<br><span style="font-weight:400;">25</span></th>
            <th style="padding:8px 6px;text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;color:rgba(0,0,0,0.4);border-bottom:2px solid rgba(0,0,0,0.1);">Jun<br><span style="font-weight:400;">25</span></th>
            <th style="padding:8px 6px;text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;color:rgba(0,0,0,0.4);border-bottom:2px solid rgba(0,0,0,0.1);">Jul<br><span style="font-weight:400;">25</span></th>
            <th style="padding:8px 6px;text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;color:rgba(0,0,0,0.4);border-bottom:2px solid rgba(0,0,0,0.1);">Ago<br><span style="font-weight:400;">25</span></th>
            <th style="padding:8px 6px;text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;color:#D97706;border-bottom:2px solid rgba(0,0,0,0.1);">Sep<br><span style="font-weight:400;font-size:7px;">▶ Inicio</span></th>
            <th style="padding:8px 6px;text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;color:rgba(0,0,0,0.4);border-bottom:2px solid rgba(0,0,0,0.1);">Oct<br><span style="font-weight:400;">25</span></th>
            <th style="padding:8px 6px;text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;color:rgba(0,0,0,0.4);border-bottom:2px solid rgba(0,0,0,0.1);border-left:2px solid #D97706;">Nov<br><span style="font-weight:400;">25</span></th>
            <th style="padding:8px 6px;text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;color:rgba(0,0,0,0.4);border-bottom:2px solid rgba(0,0,0,0.1);">Dic<br><span style="font-weight:400;">25</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:10px;font-weight:700;color:#1a1a1a;white-space:nowrap;">Top 3</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.08);border-radius:4px;font-weight:600;">163</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.12);border-radius:4px;font-weight:600;">187</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.06);border-radius:4px;font-weight:600;border-left:2px solid #BF551A;">141</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.08);border-radius:4px;font-weight:600;">164</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.10);border-radius:4px;font-weight:600;">179</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.20);border-radius:4px;font-weight:600;color:#2D6A4F;">277</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.12);border-radius:4px;font-weight:600;">185</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.08);border-radius:4px;font-weight:600;">151</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.10);border-radius:4px;font-weight:600;border-left:2px solid #D97706;">173</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.15);border-radius:4px;font-weight:600;">229</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.30);border-radius:4px;font-weight:700;color:#2D6A4F;border:2px solid #D97706;">366</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.30);border-radius:4px;font-weight:700;color:#2D6A4F;border:2px solid #D97706;">364</td>
          </tr>
          <tr>
            <td style="padding:10px;font-weight:700;color:#1a1a1a;white-space:nowrap;">Top 4–10</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.10);border-radius:4px;font-weight:600;">503</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.14);border-radius:4px;font-weight:600;">609</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.15);border-radius:4px;font-weight:600;border-left:2px solid #BF551A;">659</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.12);border-radius:4px;font-weight:600;">593</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.16);border-radius:4px;font-weight:600;">685</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.25);border-radius:4px;font-weight:600;color:#2D6A4F;">895</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.24);border-radius:4px;font-weight:600;color:#2D6A4F;">878</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.18);border-radius:4px;font-weight:600;">700</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.16);border-radius:4px;font-weight:600;border-left:2px solid #D97706;">683</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.30);border-radius:4px;font-weight:600;color:#2D6A4F;">1180</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.45);border-radius:4px;font-weight:700;color:white;background:#40916C;border:2px solid #D97706;">1586</td>
            <td style="padding:6px;text-align:center;background:#2D6A4F;border-radius:4px;font-weight:700;color:white;border:2px solid #D97706;">2048</td>
          </tr>
          <tr>
            <td style="padding:10px;font-weight:700;color:#1a1a1a;white-space:nowrap;">Top 11–20</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.10);border-radius:4px;font-weight:600;">259</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.16);border-radius:4px;font-weight:600;">377</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.13);border-radius:4px;font-weight:600;border-left:2px solid #BF551A;">327</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.15);border-radius:4px;font-weight:600;">373</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.16);border-radius:4px;font-weight:600;">395</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.22);border-radius:4px;font-weight:600;color:#2D6A4F;border:2px solid #BF551A;">498</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.13);border-radius:4px;font-weight:600;">331</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.13);border-radius:4px;font-weight:600;">329</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.07);border-radius:4px;font-weight:600;border-left:2px solid #D97706;">198</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.18);border-radius:4px;font-weight:600;">452</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.22);border-radius:4px;font-weight:600;color:#2D6A4F;border:2px solid #D97706;">511</td>
            <td style="padding:6px;text-align:center;background:rgba(45,106,79,0.30);border-radius:4px;font-weight:700;color:#2D6A4F;border:2px solid #D97706;">715</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="display:flex;gap:16px;align-items:center;margin-top:16px;flex-wrap:wrap;">
      <div style="display:flex;align-items:center;gap:4px;font-size:10px;color:rgba(0,0,0,0.4);">
        <span style="display:inline-block;width:40px;height:10px;border-radius:2px;background:linear-gradient(to right,rgba(45,106,79,0.06),#2D6A4F);"></span> Menos → Más
      </div>
      <div style="display:flex;align-items:center;gap:4px;font-size:10px;color:#D97706;">
        <span style="display:inline-block;width:12px;height:2px;background:#D97706;"></span> Inicio implementaciones
      </div>
      <div style="display:flex;align-items:center;gap:4px;font-size:10px;color:#BF551A;">
        <span style="display:inline-block;width:12px;height:2px;background:#BF551A;"></span> Google Core Update
      </div>
    </div>
  </div>
</div>

Incluso el Google Core Update de marzo 2025 no logró frenar la tendencia de alza. La base técnica sólida actuó como colchón.

### CTR de marca: más eficiente con menos demanda

Un dato que me parece clave: pese a que las impresiones de marca cayeron -60% MoY, los clics subieron. ¿Cómo? Por el CTR.

El CTR brand creció de **12% a 13,59%** — una mejora del **+13,3%** que representa más visitas sin invertir más en adquisición.

La optimización técnica no solo mejora el non-brand. Al eliminar la canibalización, **el 90% de las categorías de marca aumentaron clics** y el CTR se multiplicó hasta 4x en algunas de ellas.

---

## De 2% a 19% de tráfico no-marca: la transformación real

Este es el número que mejor resume el impacto del proyecto.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(24px,4vw,38px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.15;">Diversificación keywords no-marca</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Non-Brand Q4 2024</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:rgba(0,0,0,0.25);line-height:1.1;">2%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">del tráfico orgánico total</div>
    </div>
    <div style="border:1px solid rgba(45,106,79,0.2);background:rgba(45,106,79,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#2D6A4F;margin-bottom:4px;">Non-Brand Q4 2025</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#2D6A4F;line-height:1.1;">19%</div>
    </div>
  </div>
  <div style="display:flex;gap:20px;justify-content:center;margin-bottom:24px;">
    <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:#B7E4C7;border-radius:3px;display:inline-block;"></span><span style="font-size:13px;color:rgba(0,0,0,0.55);">Brand</span></div>
    <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:#2D6A4F;border-radius:3px;display:inline-block;"></span><span style="font-size:13px;color:rgba(0,0,0,0.55);">Non-Brand</span></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;">
    <div style="text-align:center;">
      <svg viewBox="0 0 200 200" width="180" height="180" style="display:block;margin:0 auto;">
        <circle cx="100" cy="100" r="75" fill="none" stroke="#B7E4C7" stroke-width="28"/>
        <circle cx="100" cy="100" r="75" fill="none" stroke="#2D6A4F" stroke-width="28" stroke-dasharray="9.42 471.24" stroke-dashoffset="0" transform="rotate(-90 100 100)" stroke-linecap="round"/>
        <text x="100" y="92" text-anchor="middle" font-size="28" font-weight="900" fill="rgba(0,0,0,0.25)" style="font-family:Switzer,system-ui,sans-serif;">2%</text>
        <text x="100" y="112" text-anchor="middle" font-size="11" fill="rgba(0,0,0,0.35)" style="font-family:Switzer,system-ui,sans-serif;">Non-Brand</text>
      </svg>
      <div style="font-size:14px;font-weight:700;color:rgba(0,0,0,0.4);margin-top:12px;">Q4 2024</div>
    </div>
    <div style="text-align:center;">
      <svg viewBox="0 0 200 200" width="180" height="180" style="display:block;margin:0 auto;">
        <circle cx="100" cy="100" r="75" fill="none" stroke="#B7E4C7" stroke-width="28"/>
        <circle cx="100" cy="100" r="75" fill="none" stroke="#2D6A4F" stroke-width="28" stroke-dasharray="89.54 471.24" stroke-dashoffset="0" transform="rotate(-90 100 100)" stroke-linecap="round"/>
        <text x="100" y="92" text-anchor="middle" font-size="28" font-weight="900" fill="#2D6A4F" style="font-family:Switzer,system-ui,sans-serif;">19%</text>
        <text x="100" y="112" text-anchor="middle" font-size="11" fill="rgba(0,0,0,0.35)" style="font-family:Switzer,system-ui,sans-serif;">Non-Brand</text>
      </svg>
      <div style="font-size:14px;font-weight:700;color:#2D6A4F;margin-top:12px;">Q4 2025</div>
    </div>
  </div>
</div>

En Q4 2024, prácticamente todo el tráfico orgánico venía de usuarios que ya buscaban la marca directamente. El canal era de **retención, no de adquisición**.

En Q4 2025, el 19% ya viene de búsquedas genéricas. Con un horizonte de 12 meses, la oportunidad de diversificación es significativamente mayor. Todavía hay categorías con alto potencial de captura genérica.

### Los clicks no-marca crecieron +848%

Los clicks no-marca pasaron de **1.078 a 10.221** — un crecimiento de **+848% interanual**.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.1;">Demanda genérica</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
    <div style="border:1px solid rgba(45,106,79,0.2);background:rgba(45,106,79,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#2D6A4F;margin-bottom:4px;">Categorías no-marca supera a marca</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#2D6A4F;line-height:1.1;">9 / 14</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">keywords con más clicks genéricos</div>
    </div>
    <div style="border:1px solid rgba(45,106,79,0.2);background:rgba(45,106,79,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#2D6A4F;margin-bottom:4px;">Crecimiento no-marca MoY</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#2D6A4F;line-height:1.1;">+848%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">crecimiento total interanual</div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Clicks no-marca Q4 2025</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:#1a1a1a;line-height:1.1;">10.221</div>
      <div style="font-size:13px;color:#2D6A4F;margin-top:4px;">↑ +848% vs Q4 2024</div>
    </div>
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Clicks no-marca Q4 2024</div>
      <div style="font-size:clamp(28px,4vw,36px);font-weight:900;color:rgba(0,0,0,0.25);line-height:1.1;">1.078</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">línea de base anterior</div>
    </div>
  </div>
  <div style="display:flex;gap:20px;margin-bottom:16px;">
    <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:#B7E4C7;border-radius:3px;display:inline-block;"></span><span style="font-size:13px;color:rgba(0,0,0,0.55);">Q4 2024</span></div>
    <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:#2D6A4F;border-radius:3px;display:inline-block;"></span><span style="font-size:13px;color:rgba(0,0,0,0.55);">Q4 2025</span></div>
  </div>
  <div style="display:flex;align-items:flex-end;gap:40px;justify-content:center;height:200px;padding:0 40px;">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;flex:1;">
      <div style="width:100%;background:#B7E4C7;border-radius:6px 6px 0 0;height:10.5%;min-height:8px;"></div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;flex:1;position:relative;">
      <div style="font-size:13px;font-weight:700;color:#2D6A4F;margin-bottom:4px;">+848%</div>
      <div style="width:100%;background:#2D6A4F;border-radius:6px 6px 0 0;height:100%;"></div>
    </div>
  </div>
  <div style="text-align:center;font-size:13px;color:rgba(0,0,0,0.4);margin-top:12px;">Clicks No-Marca</div>
</div>

Una nueva fuente de adquisición que el SEO está habilitando de forma sostenida. El tráfico no-marca está generando negocio desde búsquedas que antes la marca no capturaba.

Categorías como Vestido, Borcego, Jean y Bikini ahora reciben más tráfico de usuarios que buscan el producto genérico que de usuarios que ya conocen la marca.

### 9 de 14 categorías: más genérico que marca

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 12px;color:#1a1a1a;line-height:1.1;">Diversificación del negocio</h3>
  <div style="display:flex;gap:20px;justify-content:center;margin-bottom:24px;">
    <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:#B7E4C7;border-radius:3px;display:inline-block;"></span><span style="font-size:13px;color:rgba(0,0,0,0.55);">2024 % No-Marca</span></div>
    <div style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;background:#2D6A4F;border-radius:3px;display:inline-block;"></span><span style="font-size:13px;color:rgba(0,0,0,0.55);">2025 % No-Marca</span></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Borcego</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:95%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:3%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Bota</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:90%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:5%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Cartera</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:60%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:3%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Calzado</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:57%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:3%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Vestido</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:78%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:10%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Short</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:82%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:45%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Jean</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:82%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:48%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Remera</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:50%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:15%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Bikini</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:72%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:42%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Accesorio</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:30%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:5%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Sandalia</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:40%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:3%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Pantalón</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:58%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:48%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Zapatilla</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:8%;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:3%;margin-top:2px;"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center;">
      <div style="font-size:13px;font-weight:600;color:#1a1a1a;text-align:right;">Perfume</div>
      <div><div style="height:12px;background:#2D6A4F;border-radius:0 6px 6px 0;width:3%;min-width:4px;"></div><div style="height:8px;background:#B7E4C7;border-radius:0 6px 6px 0;width:2%;min-width:3px;margin-top:2px;"></div></div>
    </div>
  </div>
</div>

En Q4 2024 el canal dependía casi exclusivamente de usuarios que ya conocían la marca. Hoy, **9 de 14 categorías** reciben más tráfico de búsquedas genéricas que de marca.

El SEO está **captando clientes nuevos** que no conocían la marca, expandiendo el negocio más allá de la base existente. Eso es adquisición real.

---

## Liderazgo de mercado: ganamos market share

Este dato me enorgullece especialmente. No solo crecimos — **crecimos capturando market share real** frente a los competidores directos.

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(28px,5vw,42px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.1;">Ganamos Market Share</h3>
  <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:24px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:24px;">Share de IPS por dominio</div>
    <div style="text-align:center;margin-bottom:24px;">
      <svg viewBox="0 0 240 240" width="260" height="260" style="display:block;margin:0 auto;">
        <!-- Pie chart segments using stroke-dasharray on circles -->
        <!-- 47 Street: 35.7% = 269.3 of 754 (r=120, C=754.0) -->
        <circle cx="120" cy="120" r="90" fill="none" stroke="#2D6A4F" stroke-width="60" stroke-dasharray="201.95 565.49" stroke-dashoffset="0" transform="rotate(-90 120 120)"/>
        <!-- Portsaid: 28.4% = 160.6 -->
        <circle cx="120" cy="120" r="90" fill="none" stroke="#40916C" stroke-width="60" stroke-dasharray="160.60 565.49" stroke-dashoffset="-201.95" transform="rotate(-90 120 120)"/>
        <!-- Kosiuko: 10.2% = 57.68 -->
        <circle cx="120" cy="120" r="90" fill="none" stroke="#6B7280" stroke-width="60" stroke-dasharray="57.68 565.49" stroke-dashoffset="-362.55" transform="rotate(-90 120 120)"/>
        <!-- Desiderata: 5.1% -->
        <circle cx="120" cy="120" r="90" fill="none" stroke="#9CA3AF" stroke-width="60" stroke-dasharray="28.84 565.49" stroke-dashoffset="-420.23" transform="rotate(-90 120 120)"/>
        <!-- Como Quieres: 3.8% -->
        <circle cx="120" cy="120" r="90" fill="none" stroke="#B0B0B0" stroke-width="60" stroke-dasharray="21.49 565.49" stroke-dashoffset="-449.07" transform="rotate(-90 120 120)"/>
        <!-- Ay Not Dead: 3.2% -->
        <circle cx="120" cy="120" r="90" fill="none" stroke="#C4C4C4" stroke-width="60" stroke-dasharray="18.09 565.49" stroke-dashoffset="-470.56" transform="rotate(-90 120 120)"/>
        <!-- Complot: 2.8% -->
        <circle cx="120" cy="120" r="90" fill="none" stroke="#D1D5DB" stroke-width="60" stroke-dasharray="15.83 565.49" stroke-dashoffset="-488.65" transform="rotate(-90 120 120)"/>
        <!-- Sweet: 2.5% -->
        <circle cx="120" cy="120" r="90" fill="none" stroke="#D9D9D9" stroke-width="60" stroke-dasharray="14.14 565.49" stroke-dashoffset="-504.48" transform="rotate(-90 120 120)"/>
        <!-- Otros: ~8.3% -->
        <circle cx="120" cy="120" r="90" fill="none" stroke="#E5E7EB" stroke-width="60" stroke-dasharray="46.93 565.49" stroke-dashoffset="-518.62" transform="rotate(-90 120 120)"/>
        <!-- Center hole -->
        <circle cx="120" cy="120" r="60" fill="#FCFAF2"/>
        <!-- % labels -->
        <text x="168" y="68" font-size="13" font-weight="800" fill="white" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">35.7%</text>
        <text x="72" y="178" font-size="12" font-weight="700" fill="white" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">28.4%</text>
        <text x="42" y="96" font-size="10" font-weight="600" fill="white" text-anchor="middle" style="font-family:Switzer,system-ui,sans-serif;">10.2%</text>
      </svg>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:12px 20px;justify-content:center;">
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:10px;height:10px;background:#2D6A4F;border-radius:50%;display:inline-block;"></span><span style="font-size:12px;font-weight:700;color:#1a1a1a;">47 Street</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:10px;height:10px;background:#40916C;border-radius:50%;display:inline-block;"></span><span style="font-size:12px;color:rgba(0,0,0,0.55);">Portsaid</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:10px;height:10px;background:#6B7280;border-radius:50%;display:inline-block;"></span><span style="font-size:12px;color:rgba(0,0,0,0.55);">Kosiuko</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:10px;height:10px;background:#9CA3AF;border-radius:50%;display:inline-block;"></span><span style="font-size:12px;color:rgba(0,0,0,0.55);">Desiderata</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:10px;height:10px;background:#B0B0B0;border-radius:50%;display:inline-block;"></span><span style="font-size:12px;color:rgba(0,0,0,0.55);">Como Quieres</span></div>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:12px 20px;justify-content:center;margin-top:8px;">
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:10px;height:10px;background:#C4C4C4;border-radius:50%;display:inline-block;"></span><span style="font-size:12px;color:rgba(0,0,0,0.55);">Ay Not Dead</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:10px;height:10px;background:#D1D5DB;border-radius:50%;display:inline-block;"></span><span style="font-size:12px;color:rgba(0,0,0,0.55);">Complot</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:10px;height:10px;background:#D9D9D9;border-radius:50%;display:inline-block;"></span><span style="font-size:12px;color:rgba(0,0,0,0.55);">Sweet</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:10px;height:10px;background:#E5E7EB;border-radius:50%;display:inline-block;"></span><span style="font-size:12px;color:rgba(0,0,0,0.55);">King of the Kongo</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="width:10px;height:10px;background:#F3F4F6;border:1px solid #E5E7EB;border-radius:50%;display:inline-block;"></span><span style="font-size:12px;color:rgba(0,0,0,0.55);">Otros</span></div>
    </div>
  </div>
  <div style="border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:16px 20px;margin-top:20px;">
    <p style="font-size:13px;color:rgba(0,0,0,0.5);margin:0;line-height:1.5;">(*) Agrupamos la demanda no marca en clusters estratégicos y medimos el IPC (keywords posicionadas + tráfico) por categoría. Este enfoque permite identificar quién domina cada tópico y quién tiene mayor probabilidad de capturar demanda genérica.</p>
  </div>
</div>

La marca lidera en cuanto a share de mercado por tráfico orgánico no-marca, con el **35,7% del IPS total**. Le siguen Portsaid (28,4%) y Kosiuko (10,2%), siendo los dos únicos competidores con share de doble dígito.

El resto del mercado — Desiderata, Como Quieres, Ay Not Dead, Complot, Sweet, King of the Kongo — se reparte el 25,7% restante con participaciones menores al 10% cada uno.

Pasar de ser invisible en búsquedas genéricas a **liderar el market share orgánico no-marca** en 5 meses. Eso es lo que hace una [estrategia SEO](/estrategia-seo) bien ejecutada.

---

## El impacto real: cuánta plata generó el SEO

Para medir el verdadero impacto, hice un análisis contrafactual. Básicamente: ¿qué habría pasado si no hacíamos SEO? Comparé los resultados reales contra una proyección basada en la tendencia previa.

### Tráfico no-marca: +150% vs proyección

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(24px,4vw,38px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.15;">Análisis - Tráfico de Marca</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(191,85,26,0.2);background:rgba(191,85,26,0.05);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#BF551A;margin-bottom:4px;">Sin SEO — Proyectado</div>
      <div style="font-size:clamp(24px,3.5vw,32px);font-weight:900;color:#BF551A;line-height:1.1;">178.368</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">tendencia natural oct25–feb26</div>
    </div>
    <div style="border:1px solid rgba(45,106,79,0.2);background:rgba(45,106,79,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#2D6A4F;margin-bottom:4px;">Clics reales Oct25–Feb26</div>
      <div style="font-size:clamp(24px,3.5vw,32px);font-weight:900;color:#2D6A4F;line-height:1.1;">199.835</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">con implementación SEO</div>
    </div>
    <div style="border:1px solid rgba(45,106,79,0.2);background:rgba(45,106,79,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Crecimiento incremental</div>
      <div style="font-size:clamp(24px,3.5vw,32px);font-weight:900;color:#2D6A4F;line-height:1.1;">+12%</div>
      <div style="font-size:13px;color:rgba(0,0,0,0.45);margin-top:4px;">+21.467 clics adicionales (básicos)</div>
    </div>
  </div>
  <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:24px 16px 16px;">
    <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:4px;">Clics brand reales vs proyección sin intervención</div>
    <div style="font-size:12px;color:rgba(0,0,0,0.4);margin-bottom:20px;">Tendencia oct-24 → sep-25 · Divergencia desde oct-25</div>
    <svg viewBox="0 0 800 280" width="100%" style="display:block;">
      <line x1="50" y1="250" x2="770" y2="250" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
      <line x1="50" y1="190" x2="770" y2="190" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <line x1="50" y1="130" x2="770" y2="130" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <line x1="50" y1="70" x2="770" y2="70" stroke="rgba(0,0,0,0.04)" stroke-width="1" stroke-dasharray="4"/>
      <text x="42" y="254" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">0</text>
      <text x="42" y="194" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">30k</text>
      <text x="42" y="134" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">50k</text>
      <text x="42" y="74" font-size="10" fill="rgba(0,0,0,0.3)" text-anchor="end" style="font-family:Switzer,system-ui,sans-serif;">70k</text>
      <line x1="520" y1="30" x2="520" y2="250" stroke="#D97706" stroke-width="2" stroke-dasharray="6,4"/>
      <rect x="420" y="22" width="160" height="20" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/>
      <text x="500" y="36" font-size="9" fill="#92400E" text-anchor="middle" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">Inicio de implementaciones</text>
      <!-- Historical grey line (oct-24 to sep-25) -->
      <polyline points="75,160 130,90 185,120 240,150 295,165 350,160 405,130 460,135 520,155 560,180" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Projected dashed line (oct-25 to feb-26) -->
      <polyline points="560,180 620,170 660,195 710,215 760,180" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="2" stroke-dasharray="6,4" stroke-linejoin="round"/>
      <!-- Real blue line (oct-25 to feb-26) -->
      <polyline points="560,180 620,155 660,115 710,200 760,170" fill="none" stroke="#2563EB" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="620" cy="155" r="4" fill="#2563EB"/>
      <circle cx="660" cy="115" r="4" fill="#2563EB"/>
      <circle cx="710" cy="200" r="4" fill="#2563EB"/>
      <circle cx="760" cy="170" r="4" fill="#2563EB"/>
      <!-- Labels -->
      <text x="748" y="160" font-size="10" fill="#2563EB" font-weight="700" style="font-family:Switzer,system-ui,sans-serif;">Real</text>
      <text x="748" y="230" font-size="10" fill="rgba(0,0,0,0.3)" font-weight="600" style="font-family:Switzer,system-ui,sans-serif;">Sin SEO</text>
    </svg>
  </div>
  <div style="border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:16px 20px;margin-top:20px;">
    <p style="font-size:13px;color:rgba(0,0,0,0.5);margin:0;line-height:1.5;">La proyección se calculó extrapolando la tendencia histórica de clics previa a las implementaciones, construyendo un escenario contrafactual de crecimiento sin SEO y comparándolo contra el resultado real.</p>
  </div>
</div>

Sin intervención, el sitio hubiese generado solo **11.407 clics** no-marca entre oct-25 y feb-26. El resultado real fue **28.662 clics** — un excedente de **+17.255 clics (+150%)** que no existirían sin la implementación SEO.

### Facturación: +$42,8M ARS adicionales

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <h3 style="font-size:clamp(24px,4vw,38px);font-weight:900;text-align:center;margin:0 0 32px;color:#1a1a1a;line-height:1.15;">Análisis - Facturación</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Facturación real cases · Feb26</div>
      <div style="font-size:clamp(20px,3vw,28px);font-weight:900;color:#1a1a1a;line-height:1.1;">$205.146.018</div>
      <div style="font-size:12px;color:rgba(0,0,0,0.45);margin-top:4px;">1.837 ventas · CVR 1,09% · AOV $114M</div>
    </div>
    <div style="border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Facturación sin SEO (forecast)</div>
      <div style="font-size:clamp(20px,3vw,28px);font-weight:900;color:rgba(0,0,0,0.3);line-height:1.1;">$162.315.767</div>
      <div style="font-size:12px;color:rgba(0,0,0,0.45);margin-top:4px;">1.411 ventas · forecast sin intervención</div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid rgba(45,106,79,0.2);background:rgba(45,106,79,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#2D6A4F;margin-bottom:4px;">Facturación incremental</div>
      <div style="font-size:clamp(20px,3vw,28px);font-weight:900;color:#2D6A4F;line-height:1.1;">+$42.830.251</div>
      <div style="font-size:12px;color:rgba(0,0,0,0.45);margin-top:4px;">+26% sobre el escenario base</div>
    </div>
    <div style="border:1px solid rgba(45,106,79,0.2);background:rgba(45,106,79,0.04);border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#2D6A4F;margin-bottom:4px;">Ventas adicionales</div>
      <div style="font-size:clamp(20px,3vw,28px);font-weight:900;color:#2D6A4F;line-height:1.1;">+426 ventas</div>
      <div style="font-size:12px;color:rgba(0,0,0,0.45);margin-top:4px;">+30% vs forecast sin intervención</div>
    </div>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <thead>
      <tr style="border-bottom:2px solid rgba(0,0,0,0.1);">
        <th style="text-align:left;padding:12px 16px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.4);"></th>
        <th style="text-align:right;padding:12px 16px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.4);">Tráfico</th>
        <th style="text-align:right;padding:12px 16px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.4);">Ventas</th>
        <th style="text-align:right;padding:12px 16px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.4);">Facturación</th>
        <th style="text-align:right;padding:12px 16px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.4);">Var %</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
        <td style="padding:14px 16px;font-weight:600;color:rgba(0,0,0,0.5);">Forecast sin SEO</td>
        <td style="padding:14px 16px;text-align:right;color:rgba(0,0,0,0.5);">190.735</td>
        <td style="padding:14px 16px;text-align:right;color:rgba(0,0,0,0.5);">1.411</td>
        <td style="padding:14px 16px;text-align:right;color:rgba(0,0,0,0.5);">$162.315.767</td>
        <td style="padding:14px 16px;text-align:right;color:rgba(0,0,0,0.3);">—</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(0,0,0,0.06);background:rgba(45,106,79,0.03);">
        <td style="padding:14px 16px;font-weight:700;color:#2D6A4F;">Real con SEO</td>
        <td style="padding:14px 16px;text-align:right;font-weight:600;color:#2D6A4F;">228.497</td>
        <td style="padding:14px 16px;text-align:right;font-weight:600;color:#2D6A4F;">1.837</td>
        <td style="padding:14px 16px;text-align:right;font-weight:600;color:#2D6A4F;">$205.146.018</td>
        <td style="padding:14px 16px;text-align:right;font-weight:600;color:#2D6A4F;">—</td>
      </tr>
      <tr style="background:rgba(45,106,79,0.06);">
        <td style="padding:14px 16px;font-weight:800;color:#1a1a1a;">Diferencia incremental</td>
        <td style="padding:14px 16px;text-align:right;font-weight:800;color:#2D6A4F;">+37.762</td>
        <td style="padding:14px 16px;text-align:right;font-weight:800;color:#2D6A4F;">+426</td>
        <td style="padding:14px 16px;text-align:right;font-weight:800;color:#2D6A4F;">+$42.830.251</td>
        <td style="padding:14px 16px;text-align:right;font-weight:800;color:#2D6A4F;">+26%</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size:12px;color:rgba(0,0,0,0.35);margin:16px 0 0;font-style:italic;">Para estimar el impacto en facturación utilizamos un CR promedio de GA4 del 0,74% y un AOV de $115.000 aplicado de forma homogénea sobre el tráfico total del período.</p>
</div>

Bajo el escenario sin SEO, la proyección hubiese sido de **1.411 ventas** y **$162,3M** de facturación. Con las implementaciones, el resultado real alcanzó **1.837 ventas** y **$205,1M** de facturación.

**+426 ventas adicionales y +$42,8M ARS de facturación directamente atribuible al proyecto SEO.** Todo esto en 5 meses, habiendo completado únicamente la Fase 1 — el 30% del proyecto total.

---

## Resumen de la Fase 1

<div style="background:#FCFAF2;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:40px 32px 32px;margin:40px 0;font-family:Switzer,system-ui,sans-serif;">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;">
    <div>
      <h3 style="font-size:clamp(24px,4vw,34px);font-weight:900;margin:0 0 4px;color:#1a1a1a;line-height:1.15;">Resumen - Fase 1</h3>
      <div style="font-size:14px;color:rgba(0,0,0,0.45);margin-bottom:24px;">Oct 25 - Feb 26</div>
      <div style="display:flex;gap:8px;margin-bottom:16px;">
        <span style="background:#2D6A4F;color:white;font-size:10px;font-weight:700;padding:3px 10px;border-radius:999px;letter-spacing:0.05em;text-transform:uppercase;">Fase 1 · En curso</span>
        <span style="background:rgba(0,0,0,0.06);color:rgba(0,0,0,0.4);font-size:10px;font-weight:600;padding:3px 10px;border-radius:999px;">Tareas completadas: 9/10</span>
      </div>
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:48px;font-weight:900;color:#1a1a1a;line-height:1;">90%</span>
        </div>
        <div style="font-size:12px;color:rgba(0,0,0,0.4);margin-bottom:6px;">Progreso general Fase 1</div>
        <div style="height:10px;background:rgba(0,0,0,0.06);border-radius:999px;overflow:hidden;">
          <div style="height:100%;width:90%;background:#2D6A4F;border-radius:999px;"></div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div>
          <div style="font-size:12px;font-weight:600;color:#1a1a1a;margin-bottom:4px;">Fase 1 · Base técnica</div>
          <div style="height:6px;background:rgba(0,0,0,0.06);border-radius:999px;overflow:hidden;"><div style="height:100%;width:90%;background:#2D6A4F;border-radius:999px;"></div></div>
        </div>
        <div>
          <div style="font-size:12px;font-weight:600;color:rgba(0,0,0,0.4);margin-bottom:4px;">Fase 2 · Contenido y monetización</div>
          <div style="height:6px;background:rgba(0,0,0,0.06);border-radius:999px;overflow:hidden;"><div style="height:100%;width:5%;background:#B7E4C7;border-radius:999px;"></div></div>
        </div>
        <div>
          <div style="font-size:12px;font-weight:600;color:rgba(0,0,0,0.3);margin-bottom:4px;">Fase 3 · Escala y autoridad</div>
          <div style="height:6px;background:rgba(0,0,0,0.06);border-radius:999px;overflow:hidden;"><div style="height:100%;width:0%;background:#B7E4C7;border-radius:999px;"></div></div>
        </div>
        <div style="border-top:1px solid rgba(0,0,0,0.06);padding-top:10px;margin-top:4px;">
          <div style="font-size:12px;font-weight:700;color:#1a1a1a;margin-bottom:4px;">Proyecto total</div>
          <div style="height:6px;background:rgba(0,0,0,0.06);border-radius:999px;overflow:hidden;"><div style="height:100%;width:30%;background:linear-gradient(to right,#2D6A4F,#40916C);border-radius:999px;"></div></div>
          <div style="font-size:10px;color:rgba(0,0,0,0.35);margin-top:3px;">~30% completado</div>
        </div>
      </div>
    </div>
    <div style="font-size:13px;color:rgba(0,0,0,0.55);line-height:1.7;">
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div>• Se generaron <strong style="color:#1a1a1a;">+37.762 clics adicionales (+20%)</strong> vs proyección en Oct-Feb.</div>
        <div>• Ese diferencial produjo <strong style="color:#1a1a1a;">+426 ventas (+30%)</strong> y <strong style="color:#1a1a1a;">+$42,8M (+26%)</strong> vs escenario proyectado.</div>
        <div>• La visibilidad orgánica creció <strong style="color:#1a1a1a;">+124% interanual</strong>, duplicando la exposición en búsquedas no-marca.</div>
        <div>• Los clics orgánicos aumentaron <strong style="color:#1a1a1a;">+434%</strong>, multiplicando el tráfico por 5,3.</div>
        <div>• El <strong style="color:#1a1a1a;">CTR (+140%)</strong> y la <strong style="color:#1a1a1a;">posición promedio (+57%)</strong> consolidaron presencia en primera página.</div>
        <div>• Los clics no-marca crecieron <strong style="color:#1a1a1a;">+848%</strong>, creando una nueva fuente estructural de adquisición.</div>
        <div>• El <strong style="color:#1a1a1a;">65% de las categorías</strong> ya reciben más tráfico genérico que de marca.</div>
        <div>• Pese a una caída del <strong style="color:#1a1a1a;">-60%</strong> en impresiones brand, los clics subieron <strong style="color:#1a1a1a;">+83%</strong> por mejora de CTR y optimización técnica.</div>
        <div>• Tras eliminar la canibalización, el <strong style="color:#1a1a1a;">90% de las categorías de marca aumentaron clics</strong> y el <strong style="color:#1a1a1a;">CTR se multiplicó hasta 4x</strong>.</div>
        <div>• 47 Street lidera el no-marca con <strong style="color:#1a1a1a;">35,7% de share (IPS)</strong> y creció <strong style="color:#1a1a1a;">+68% en 5 semanas</strong>.</div>
      </div>
    </div>
  </div>
</div>

Para ponerlo en perspectiva, esto es lo que se logró con solo la base técnica resuelta:

- **+37.762 clics adicionales (+20%)** vs proyección sin SEO
- **+426 ventas (+30%)** y **+$42,8M (+26%)** en facturación adicional
- **Visibilidad orgánica +124% interanual**, duplicando la exposición en búsquedas no-marca
- **Clics orgánicos +434%**, multiplicando el tráfico por 5,3
- **CTR +140%** y **posición promedio +57%**, consolidando presencia en primera página
- **Clics no-marca +848%**, creando una nueva fuente estructural de adquisición
- **9 de 14 categorías** ya reciben más tráfico genérico que de marca
- **Liderazgo de market share** con 35,7% del IPS no-marca

Y el dato más importante: **las Fases 2 y 3 todavía están por delante.** El 70% del proyecto tiene el potencial de multiplicar estos resultados.

---

## Qué aprendí de este proyecto

El caso de este ecommerce de moda argentino me confirmó varias cosas que aplican a toda la industria:

**1. La canibalización por temporadas es el cáncer silencioso del fashion ecommerce.** Cada temporada nueva genera URLs nuevas, pero nadie limpia las viejas. Con el tiempo, Google tiene 4, 5, 9 URLs para la misma categoría y no sabe cuál mostrar. La solución es simple pero requiere disciplina: una URL canónica por intención.

**2. Dependencia de marca = fragilidad.** Si el 98% de tu tráfico orgánico viene de búsquedas de marca, no tenés canal de adquisición orgánico. Tenés un canal de retención. Y cuando la marca pierde búsquedas (que pasa), te quedás sin nada.

**3. La base técnica es lo primero, siempre.** Con solo resolver los problemas estructurales (Fase 1, el 30% del proyecto), ya se generó liderazgo de mercado. Sin content marketing, sin link building, sin blog. Solo corrigiendo lo que estaba roto.

**4. Los resultados se miden en facturación, no en rankings.** Subir posiciones está muy bien, pero este proyecto demuestra el impacto en ventas reales: +426 transacciones y +$42,8M ARS que no existirían sin la intervención SEO. Eso es [retorno de inversión en SEO](/blog/cuanto-cuesta-seo-chile) medible y verificable.

**5. El SEO para ecommerce de moda tiene oportunidades enormes en LATAM.** La mayoría de las marcas argentinas tienen exactamente los mismos problemas: canibalización por temporadas, dependencia de marca, categorías invisibles. El que lo resuelva primero, captura el mercado.

El SEO no es un gasto. Es una inversión que genera retornos medibles y sostenibles en el tiempo. Y este caso lo demuestra con datos, no con promesas.

---

*¿Tu ecommerce de moda tiene el mismo problema? ¿Dependés casi 100% de búsquedas de marca y las categorías genéricas son invisibles? [Hablemos de tu caso](/consultor-seo-chile) y te muestro qué oportunidades tiene tu sitio.*
