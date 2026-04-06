---
title: "n8n para SEO: Qué Es, Cómo Funciona y 7 Workflows de Automatización que Uso"
description: "Guía práctica de n8n aplicado a SEO: qué es n8n, cómo funciona, por qué es mejor que Zapier/Make para automatización SEO, y 7 workflows reales que uso para automatizar auditorías, keyword research, reportes y más."
date: 2026-04-05
author: "Facundo Zupel"
tags: ["n8n", "automatizacion seo", "n8n seo", "n8n que es", "workflows seo", "automatizacion"]
readTime: "22 min"
draft: false
category: "ia-en-seo"
---

Si buscás "n8n" en Google, te van a aparecer definiciones genéricas: "plataforma de automatización de flujos de trabajo de código abierto". Eso es como decir que un auto es "un vehículo con cuatro ruedas" — técnicamente cierto, pero no te dice nada de lo que podés hacer con él.

Acá arranco desde lo básico (qué es n8n, cómo funciona, cuánto cuesta) y paso a lo que me interesa de verdad: workflows de automatización SEO que uso como [consultor SEO](/consultor-seo-chile), con integraciones a Google Search Console, APIs de keyword research y modelos de IA.

Todo viene de automatizar procesos de [SEO técnico](/seo-tecnico) y análisis de datos que antes me llevaban horas.

![Workflows de automatización SEO con n8n — nodos conectados representando tareas de SEO automatizadas con IA](/assets/blog/n8n-seo-automatizacion/hero.webp)

---

## Qué es n8n

n8n (se pronuncia "n-eight-n", abreviación de "nodemation") es una plataforma open source para automatizar flujos de trabajo. Conectás aplicaciones, APIs y servicios entre sí para que las tareas se ejecuten solas.

Ejemplo concreto: todas las tareas repetitivas que hacés en SEO — extraer datos de Google Search Console, cruzarlos con Google Analytics, generar un reporte, mandarlo por email o Slack. Con n8n, creás un flujo visual donde cada paso es un "nodo" que se conecta al siguiente. Lo configurás una vez y después corre solo.

La interfaz es visual y basada en nodos — arrastrás bloques, los conectás, y cada bloque representa una acción: "traer datos de GSC", "filtrar por páginas con más de 100 impresiones", "enviar por Slack". No necesitás saber programar para empezar, pero si sabés JavaScript, podés meter lógica custom en nodos de código y la cosa cambia bastante.

### Lo que diferencia a n8n de Zapier y Make

Hay tres plataformas que siempre se comparan: Zapier, Make (ex Integromat) y n8n. La diferencia principal es esta:

| Característica | Zapier | Make | n8n |
|---|---|---|---|
| **Modelo** | SaaS cerrado | SaaS cerrado | Open source + Cloud |
| **Self-hosting** | No | No | Sí (Docker, Kubernetes) |
| **Pricing** | Por tarea/zap | Por operación | Por workflow (o gratis self-hosted) |
| **Integraciones** | 7,000+ | 1,800+ | 400+ nativas + HTTP/API ilimitadas |
| **Flexibilidad técnica** | Baja | Media | Alta (JavaScript, API custom) |
| **Agentes de IA** | Limitado | Limitado | Nativo (nodos de IA integrados) |
| **Control de datos** | En sus servidores | En sus servidores | En tu servidor |

Para SEO, n8n gana por lejos en un punto clave: la flexibilidad técnica. Zapier es increíble para integraciones simples (webhook → Slack), pero cuando necesitás parsear un JSON de la API de DataForSEO, cruzar datos con un CSV de Screaming Frog y enviar el resultado a un modelo de IA para análisis, n8n te da el control total.

Y después está el self-hosting. Podés instalar n8n en tu propio servidor con Docker en 5 minutos, y todos tus datos (credenciales de API, resultados de auditorías, datos de clientes) quedan bajo tu control. Si trabajás con datos de clientes como yo, esto no es un nice-to-have — es un requisito.

---

## Cómo funciona n8n: los conceptos clave

Antes de entrar a los workflows, 4 conceptos que tenés que manejar:

### 1. Nodos

Cada nodo es una acción: "Traer datos de una API", "Filtrar resultados", "Enviar email", "Ejecutar código JavaScript". Los nodos se conectan entre sí formando un flujo lineal o con bifurcaciones.

n8n tiene más de 400 nodos nativos (Google Sheets, Slack, Notion, MySQL, HTTP Request) y un nodo genérico de HTTP que te permite conectar literalmente cualquier API que tenga endpoints REST.

### 2. Triggers (disparadores)

Un trigger es el nodo que inicia el workflow. Puede ser:

- **Schedule trigger:** corre cada X minutos/horas/días (ideal para reportes automáticos)
- **Webhook trigger:** se activa cuando una URL recibe datos (ideal para integraciones en tiempo real)
- **Manual trigger:** lo ejecutás vos con un clic (ideal para tareas bajo demanda)

### 3. Workflows

Un workflow es el flujo completo: trigger + nodos conectados = automatización. Se puede activar, desactivar, duplicar y exportar como JSON — así que podés compartir workflows con tu equipo o importar los de la comunidad.

### 4. Credenciales

n8n maneja las credenciales de APIs de forma centralizada. Configurás una vez tu API key de Google Search Console, y la reutilizás en todos los workflows que la necesiten. Si estás self-hosted, las credenciales quedan encriptadas en tu servidor.

---

## Cuánto cuesta n8n

Depende de cómo lo uses:

**Self-hosted (gratis):** Instalás n8n en tu servidor con Docker. El software es 100% gratuito. Solo pagás el hosting (un VPS de $5-10/mes alcanza para la mayoría de workflows de SEO).

**n8n Cloud (desde $20/mes):** Si no querés manejar infraestructura, n8n ofrece planes cloud:

- **Starter ($20/mes):** 2,500 ejecuciones/mes, usuarios ilimitados
- **Pro ($50/mes):** 10,000 ejecuciones/mes, variables globales, ejecuciones prioritarias
- **Enterprise (personalizado):** para equipos grandes con necesidades de seguridad y compliance

Para un consultor SEO independiente o una pyme, el self-hosted o el Starter alcanzan de sobra. Yo uso la versión self-hosted con Docker en un servidor propio y no paso de 500 ejecuciones por mes.

---

## Por qué n8n es perfecto para automatización SEO

El 70% del laburo en SEO es repetitivo: extraer datos, cruzar métricas, generar reportes, monitorear posiciones, auditar páginas. Todo eso se puede automatizar.

n8n encaja bien en el stack de cualquier consultor o equipo SEO por varias razones:

1. **Conecta con todas las APIs de SEO:** Google Search Console, Google Analytics, Semrush, Ahrefs, DataForSEO, Screaming Frog — todo se integra vía HTTP Request o nodos nativos.

2. **Integración nativa con IA:** n8n tiene nodos para OpenAI, Anthropic (Claude), Google Gemini, Ollama y más. Podés procesar datos SEO con modelos de lenguaje directamente dentro del workflow.

3. **Procesamiento de datos avanzado:** Nodos de JavaScript, merge de datasets, filtrado condicional, transformación de JSON. Todo lo que necesitás para manipular datos de SEO sin salir de la plataforma.

4. **Automatización de reportes:** Schedule trigger + extracción de datos + formateo + envío por email/Slack = reportes automáticos sin tocar una planilla.

5. **Escalabilidad:** Un workflow que monitorea el rendimiento orgánico de 1 sitio funciona igual para 50 sitios. Solo cambiás las credenciales y los parámetros.

---

## 7 workflows de automatización SEO con n8n

Workflows que uso para automatizar procesos de [posicionamiento web](/posicionamiento-web-chile). Todos están probados en producción.

### 1. Monitor de posiciones con Google Search Console

**Qué hace:** Extrae datos de GSC cada lunes a las 8am, filtra las keywords con caída de posición mayor a 3 puestos, y manda una alerta por Slack.

**Nodos:**
- Schedule Trigger → cada lunes 8:00
- HTTP Request → GSC API (query performance, últimos 7 días vs 7 días anteriores)
- Code Node (JavaScript) → calcula delta de posición por keyword
- IF Node → filtra solo keywords con caída > 3 posiciones
- Slack → envía alerta con lista de keywords afectadas

**Por qué importa:** Si una keyword cae 5 posiciones y no te enterás en una semana, el [tráfico orgánico](/blog/que-es-seo) ya se fue. Sin esto, tenés que entrar a GSC manualmente cada semana y comparar datos — 30+ minutos por sitio.

### 2. Auditoría técnica automatizada

**Qué hace:** Recibe una URL por webhook, crawlea las páginas principales, verifica títulos, H1s, meta descriptions, status codes, y genera un reporte en Google Sheets.

**Nodos:**
- Webhook Trigger → recibe URL del sitio
- HTTP Request → crawl de las primeras 50 páginas (sitemap.xml como fuente)
- Code Node → parsea HTML, extrae title, H1, meta description, canonical, robots
- Code Node → valida: H1 faltante, title duplicado, meta description larga, 404s
- Google Sheets → escribe resultados en una planilla organizada por prioridad

**Por qué importa:** Una [auditoría SEO](/auditoria-seo-chile) técnica básica tarda 2-4 horas a mano. Con este workflow, la tenés en 5 minutos. No reemplaza un crawl profundo con Screaming Frog, pero para diagnósticos rápidos y monitoreo continuo va sobrado.

### 3. Extracción y análisis de keyword research

**Qué hace:** Toma una keyword semilla, consulta la API de DataForSEO (keyword suggestions + related keywords), filtra por volumen mínimo y KD máximo, y organiza todo en un Google Sheet listo para trabajar.

**Nodos:**
- Manual Trigger → ingresás la keyword semilla
- HTTP Request → DataForSEO Labs - Keyword Suggestions
- HTTP Request → DataForSEO Labs - Related Keywords
- Merge Node → combina ambas fuentes eliminando duplicados
- Code Node → filtra: vol > 10, KD < 40 (ajustable)
- Google Sheets → exporta con columnas: keyword, volumen, KD, CPC, intent

**Por qué importa:** [Keyword research](/estrategia-seo) manual: 1 hora mínimo por seed keyword. Con este workflow, 30 segundos. Y lo reutilizás para cada cliente o proyecto nuevo.

### 4. Generador de reportes SEO semanales

**Qué hace:** Cada viernes a las 17:00, extrae datos de GSC y GA4, calcula variaciones WoW (week-over-week), genera un resumen ejecutivo con IA, y lo envía por email al cliente.

**Nodos:**
- Schedule Trigger → viernes 17:00
- HTTP Request → GSC API (clics, impresiones, CTR, posición media)
- HTTP Request → GA4 API (sesiones orgánicas, conversiones, bounce rate)
- Code Node → calcula deltas WoW para cada métrica
- OpenAI Node → genera resumen ejecutivo en lenguaje no-técnico
- Email Node → envía reporte formateado al cliente

**Por qué importa:** Los reportes SEO son obligatorios para retener clientes, pero me consumían 1-2 horas semanales por cuenta. Ahora se generan solos. La capa de IA transforma los números en un texto que el cliente entiende sin que yo tenga que redactar cada párrafo.

### 5. Monitor de backlinks nuevos

**Qué hace:** Cada día verifica si el sitio recibió backlinks nuevos (vía API de Ahrefs o DataForSEO), evalúa la calidad del dominio referente, y notifica si el backlink es de alta calidad o potencialmente tóxico.

**Nodos:**
- Schedule Trigger → diario, 09:00
- HTTP Request → Ahrefs/DataForSEO - New Backlinks
- Code Node → clasifica por Domain Rating: alto (>50), medio (20-50), bajo (<20)
- IF Node → bifurca entre backlinks de calidad y potencialmente tóxicos
- Slack → notificación diferenciada: verde para calidad, rojo para tóxicos

**Por qué importa:** El perfil de enlaces pesa mucho en la autoridad de dominio. Con esto te enterás rápido si te cae un ataque de negative SEO — o si un sitio groso te enlazó y conviene amplificar esa página.

### 6. Alertas de Core Web Vitals

**Qué hace:** Semanalmente ejecuta un test de PageSpeed Insights para las URLs principales del sitio, compara con los resultados de la semana anterior, y alerta si algún Core Web Vital se degradó.

**Nodos:**
- Schedule Trigger → semanal
- Code Node → lee lista de URLs a monitorear desde Google Sheets
- HTTP Request (loop) → PageSpeed Insights API para cada URL
- Code Node → extrae LCP, FID/INP, CLS y compara con valores previos
- IF Node → filtra solo URLs con degradación significativa
- Slack → alerta con URL, métrica afectada y valor actual vs anterior

**Por qué importa:** Una degradación de LCP puede pasar semanas sin que nadie la note, hasta que ves la caída en tráfico y ya perdiste posiciones. Con esto, la detectás en 7 días máximo.

### 7. Content gap analysis automatizado

**Qué hace:** Toma tu dominio y 3 competidores, extrae las keywords para las que ellos rankean y vos no, filtra por oportunidad (volumen, KD, intent), y genera un brief de contenido con IA para cada gap identificado.

**Nodos:**
- Manual Trigger → ingresás tu dominio + 3 competidores
- HTTP Request → DataForSEO Labs - Domain Intersection (por cada competidor)
- Merge Node → consolida gaps de los 3 competidores
- Code Node → elimina duplicados, filtra: vol > 20, KD < 50
- OpenAI/Claude Node → genera brief de contenido para cada keyword gap
- Google Sheets → exporta con columnas: keyword, volumen, KD, brief sugerido

**Por qué importa:** Content gap manual — exportar CSVs de Semrush o Ahrefs, cruzar en Excel, filtrar — son 3-4 horas fácil. Esto lo resuelve en minutos y te escupe un brief con estructura sugerida, listo para escribir.

---

## n8n + IA: automatización con cerebro

n8n como herramienta de automatización ya rinde. Pero lo que le agregó otra dimensión fue la integración nativa con modelos de IA.

Desde el editor podés conectar directamente con:

- **OpenAI (GPT-4o, GPT-4o-mini):** para análisis de contenido, generación de metas, resúmenes ejecutivos
- **Anthropic (Claude):** para razonamiento complejo, análisis de datos SEO, generación de briefs
- **Google Gemini:** para procesamiento multimodal (texto + imágenes)
- **Ollama (modelos locales):** para procesamiento privado sin enviar datos a terceros
- **Hugging Face:** para modelos especializados de NLP

En la práctica, tus workflows de SEO no solo mueven datos de un lado a otro — los procesan y generan análisis.

El workflow de reportes semanales es un buen ejemplo. El nodo de IA agarra las tendencias y las interpreta: "el tráfico a páginas de producto subió 15% pero las conversiones bajaron 3% — posible problema de UX". Eso va directo al email del cliente, sin que yo toque nada.

Si te interesa la parte de [IA aplicada a SEO](/blog/ia-seo-2026) o los [agentes de IA](/blog/agentes-ia-guia), n8n es la infraestructura sobre la que corre todo eso.

---

## Cómo empezar con n8n: paso a paso

Si nunca tocaste n8n, esto es lo que yo hice:

### 1. Instalación

La forma más rápida es con Docker:

```bash
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n
```

Abrís `localhost:5678` y ya tenés n8n corriendo. Si preferís la nube, [n8n.io](https://n8n.io) tiene un plan gratuito de prueba de 14 días.

### 2. Tu primer workflow

Empezá con algo simple: un Schedule Trigger que cada hora haga un HTTP Request a la API de Google Search Console y guarde los datos en Google Sheets. Eso te da la base para entender cómo fluyen los datos entre nodos.

### 3. Conectar credenciales

Configurá las APIs que más usás: Google Search Console, Google Analytics, Slack/Email. En n8n, las credenciales se configuran una vez y se reutilizan en todos los workflows.

### 4. Escalar gradualmente

Cuando los workflows básicos ya corren, empezá a sumar: nodos de IA para análisis, bifurcaciones condicionales, loops para procesar múltiples URLs, webhooks para integraciones en tiempo real.

---

## Preguntas frecuentes sobre n8n

### ¿n8n es gratis?

Sí y no. El software es open source, o sea, gratuito para usar y modificar. Si lo instalás en tu servidor (self-hosted), no pagás licencia. Solo el costo del servidor. Si usás n8n Cloud, los planes arrancan en $20/mes.

### ¿Qué es mejor, n8n o Make?

Depende de tu caso de uso. Make es más fácil de aprender y tiene más integraciones pre-configuradas. n8n es más flexible técnicamente, permite self-hosting, y tiene mejores integraciones con IA. Para SEO técnico y automatización avanzada, n8n gana. Para automatizaciones simples de marketing, Make puede ser suficiente.

### ¿Necesito saber programar para usar n8n?

No para empezar. La interfaz visual te permite crear workflows arrastrando nodos sin código. Pero si sabés JavaScript, podés hacer cosas mucho más avanzadas con los nodos de código. Yo diría que el 80% de los workflows de SEO se resuelven sin programar.

### ¿Se puede usar n8n para SEO local?

Sí. Podés armar workflows que monitoreen tu posición en Google Maps, extraigan reseñas de Google Business Profile, y te avisen cuando aparece una reseña nueva. Si hacés [SEO local](/seo-local-chile) y manejás múltiples ubicaciones, te ahorra un dolor de cabeza importante.

---

## n8n en mi stack de automatización SEO

Así queda n8n dentro de mi stack de automatización SEO:

- **n8n:** orquestador central de workflows — conecta APIs, procesa datos, envía alertas
- **Python:** scripts especializados de análisis (entropía SEO, TF-IDF, NLP)
- **Claude Code:** agente de IA para tareas complejas que requieren razonamiento (auditorías, estrategia, redacción)
- **Google Search Console + GA4:** fuentes de datos primarias de rendimiento orgánico
- **DataForSEO:** API de keyword research, SERP analysis, tendencias

n8n no reemplaza a Python ni a Claude Code — los conecta. Python analiza, Claude Code razona, n8n orquesta y ejecuta. Cada herramienta en lo suyo.

Si querés arrancar, instalá Docker, levantá una instancia y armá el workflow de monitoreo de GSC. En 30 minutos tenés tu primera automatización corriendo.

Y si necesitás ayuda para armar una [estrategia de automatización SEO](/estrategia-seo) adaptada a tu negocio, podés agendar una consulta conmigo.
