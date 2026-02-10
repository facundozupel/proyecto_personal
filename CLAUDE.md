# Directrices del Proyecto facundogrowth.com

## Contexto del Proyecto

**IMPORTANTE**: Antes de cualquier acción, lee el archivo `CONTEXTO-PROYECTO.md` para entender:
- La estrategia SEO y Topical Map del sitio
- Los topical borders (qué contenido crear y cuál NO)
- Las reglas de internal linking
- La guía de estilo y tono
- Las keywords por página
- La priorización de contenido

---

## Flujos de Trabajo Obligatorios

### 1. Crear Página Nueva de Blog
**Agente**: `blog-post-publisher`

Cuando el usuario solicite crear un nuevo artículo de blog:
1. **PRIMERO** usar el skill `search-intent-analyzer` para analizar la intención de búsqueda de la keyword objetivo
2. **LUEGO** usar el agente `blog-post-publisher` para crear el artículo siguiendo el flujo correcto de Astro (crear .md en src/content/blog/ y hacer build)

### 2. Crear Página Nueva (Core Section)
**Skill requerido**: `search-intent-analyzer`

Cuando el usuario solicite crear una nueva página de servicio:
1. **PRIMERO** usar el skill `search-intent-analyzer` para analizar la intención de búsqueda
2. Crear la página en `src/pages/` siguiendo la estructura existente
3. Asegurar que cumple con las directrices de CONTEXTO-PROYECTO.md

### 3. Verificar Estructura del Proyecto
**Agente**: `astro-project-navigator`

Cuando necesites:
- Ubicar dónde crear archivos nuevos
- Entender la organización del código
- Verificar la estructura de componentes, páginas o layouts

Usar el agente `astro-project-navigator` para obtener guía sobre la ubicación correcta.

### 4. Analizar Competidores
**Herramienta**: MCP de Chrome DevTools

Cuando el usuario necesite:
- Ver cómo están estructuradas las páginas de competidores
- Analizar el contenido de la competencia
- Capturar screenshots de sitios competidores
- Inspeccionar elementos de UI/UX de otros sitios

Usar las herramientas del MCP `chrome-devtools` para navegar e inspeccionar sitios.

### 5. Generar Landing Geolocalizada
**Skill**: `geo-landing-generator`

Cuando el usuario solicite crear una landing de "Consultor SEO en [Ciudad]":
1. Ejecutar `/geo-landing [ciudad]` o usar el skill `geo-landing-generator`
2. El skill lee el template `src/pages/consultor-seo-chile.astro` y la metadata de `cities-data.json`
3. Genera un archivo `.astro` en `src/pages/consultor-seo-{slug}.astro` con contenido reescrito
4. Ejecuta build del proyecto

**NO** es un find-and-replace. Cada landing tiene redaccion unica con contexto local.

### 6. Limpiar Código Innecesario
**Agente**: `code-cleanup-analyzer`

Cuando detectes o el usuario solicite:
- Identificar archivos .md sin usar
- Encontrar código muerto
- Detectar dependencias no utilizadas
- Limpiar imports innecesarios

Usar el agente `code-cleanup-analyzer` para análisis conservador con backup antes de eliminar.

---

## Deploy y Infraestructura

### Vercel
- **Adapter**: `@astrojs/vercel` en `astro.config.mjs`
- **Output**: `server` (SSR por defecto, páginas pueden optar por `prerender`)
- **Site URL**: `https://facundogrowth.com`
- **Build**: `npm run build` genera en `dist/` y `.vercel/output/`
- Push a `main` despliega automáticamente en Vercel

### Variables de Entorno (.env)
- `OPENAI_API_KEY` — API key de OpenAI (para el analizador SEO)
- `CRAWL4AI_URL` — Endpoint de Crawl4AI (default: `http://157.180.72.189:11235/crawl`)

### Webhook de Leads
- Configurado en `src/config/api.ts`
- Endpoint: `https://hooksnochon.facundo.click/webhook/contacto-perso`
- Recibe: nombre, email, URL analizada, objetivo SEO del usuario

---

## Analizador SEO (Feature Principal)

Herramienta interactiva en `/analizador-seo` que analiza cualquier URL y genera un diagnóstico SEO con IA.

### Flujo del Usuario
1. Ingresa URL → Crawl4AI extrae HTML, markdown, metadata
2. Se envía a OpenAI (`gpt-4o-mini`) para generar diagnóstico
3. **Popup obligatorio** aparece antes de ver el resultado: nombre + email + objetivo SEO
4. Usuario ve diagnóstico y puede hacer hasta **3 preguntas** de follow-up
5. Email gate adicional aparece en pregunta 2 si no completó el mandatory

### Arquitectura de Archivos

**API Routes** (server-side, `export const prerender = false`):
- `src/pages/api/crawl.ts` — Recibe URL, llama a Crawl4AI, devuelve `SeoExtractedData`
- `src/pages/api/chat.ts` — Recibe seoData + messages, llama a OpenAI, streama respuesta SSE
- `src/pages/api/lead.ts` — Captura lead (nombre, email, objetivo) y envía al webhook

**Componentes React** (`src/components/seo-analyzer/`):
- `SeoAnalyzer.tsx` — Orquestador principal: maneja estados, límites, flujo completo
- `UrlInput.tsx` — Input de URL
- `CrawlProgress.tsx` — Loading state durante crawl/análisis
- `ChatInterface.tsx` — Chat con streaming de markdown
- `EmailGateModal.tsx` — Popup de captura de leads (mandatory + follow-up)
- `CtaScheduleCall.tsx` — Banner CTA post-email-gate

**Utils**:
- `src/utils/seo-extractor.ts` — Parsea respuesta de Crawl4AI a `SeoExtractedData`
- `src/utils/system-prompt.ts` — Construye el system prompt con datos SEO + markdown (max 6000 chars)

**Tipos**: `src/types/seo-analyzer.ts`
**Config**: `src/config/api.ts` (webhook URL, Crawl4AI URL)

### Constantes Clave
- **Modelo**: `gpt-4o-mini` (`chat.ts:99`)
- **Max tokens**: 1500 (`chat.ts:103`)
- **Max preguntas por sesión**: 3 (`SeoAnalyzer.tsx:10`)
- **Email gate follow-up**: después de 2 preguntas (`SeoAnalyzer.tsx:9`)
- **Max markdown en prompt**: 6000 chars (`system-prompt.ts:3`)
- **Max largo mensaje usuario**: 500 chars (`chat.ts:9`)

### Reglas del Analizador
- El popup de leads es **obligatorio** — no se puede cerrar ni skipear
- El diagnóstico ya está generado pero oculto detrás del popup
- Si OpenAI falla, el error detallado (status + message) se muestra al usuario
- Crawl4AI corre en servidor externo (`157.180.72.189:11235`)
- Prompt injection: mensajes del usuario se sanitizan y filtran contra patrones conocidos

---

## Reglas Generales

### Antes de Crear Contenido
1. Verificar en `CONTEXTO-PROYECTO.md` que el tema está DENTRO del scope (topical borders)
2. Identificar si es Core Section o Author Section
3. Analizar la intención de búsqueda con `search-intent-analyzer`
4. Asegurar que el contenido incluye los internal links requeridos

### Estructura del Proyecto Astro
- **Páginas**: `src/pages/`
- **Blog posts**: `src/content/blog/` (archivos .md)
- **Componentes**: `src/components/`
- **Layouts**: `src/layouts/`
- **Estilos**: `src/styles/`

### Sitemap
- El sitemap se genera **automáticamente** con `@astrojs/sitemap` en cada `npm run build`
- Todas las páginas (blog, servicios, landings geo) se incluyen sin configuración adicional
- El `robots.txt` en `public/` ya referencia `sitemap-index.xml`
- **No es necesario editar el sitemap manualmente** — solo hacer build después de crear/eliminar páginas

### NO Editar Directamente
- Nunca editar archivos en `dist/` - siempre trabajar en source y hacer build
- Nunca crear contenido fuera del topical border definido

---

## Skills y Agentes Disponibles

| Necesidad | Herramienta |
|-----------|-------------|
| Crear artículo de blog | `blog-post-publisher` + `search-intent-analyzer` |
| Crear página de servicio | `search-intent-analyzer` + edición manual |
| Verificar estructura proyecto | `astro-project-navigator` |
| Analizar competidores | MCP `chrome-devtools` |
| Limpiar código/archivos | `code-cleanup-analyzer` |
| Analizar intención de búsqueda | `search-intent-analyzer` |
| Generar landing geolocalizada | `geo-landing-generator` (`/geo-landing [ciudad]`) |

---

## Referencias

- **Contexto SEO completo**: `CONTEXTO-PROYECTO.md`
- **Agente navegador Astro**: `.claude/agents/astro-project-navigator.md`
- **Agente publicador blog**: `.claude/agents/blog-post-publisher.md`
- **Skill geo-landing**: `.claude/skills/geo-landing-generator/skill.md`
