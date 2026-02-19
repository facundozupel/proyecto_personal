---
title: "Auditoría SEO con Claude Code: Automatiza tu Diagnóstico Paso a Paso"
description: "Cómo hacer una auditoría SEO automatizada con Claude Code, MCP servers y prompts reales. Mi workflow completo paso a paso para diagnosticar sitios web con IA desde la terminal."
author: "Facundo Zupel"
date: 2026-02-19
readTime: "20 minutos"
tags: ["SEO", "Claude Code", "Auditoría SEO", "IA", "Automatización", "MCP"]
draft: false
category: "ia-en-seo"
---

Hacer una auditoría SEO a mano es uno de los procesos más tediosos que existen. Abrir Screaming Frog, cruzar data con Search Console, revisar Core Web Vitals, chequear la jerarquía de encabezados, validar el schema markup, analizar competidores... fácil te lleva un día entero para un solo sitio.

Y lo peor: siempre te olvidás de algo.

Yo hacía exactamente eso hasta que empecé a usar [Claude Code](/blog/claude-code-seo) con los MCPs correctos conectados. Ahora, una auditoría SEO técnica que antes me llevaba 6-8 horas la resuelvo en una conversación desde la terminal. Con datos reales, no estimaciones.

En este artículo te muestro paso a paso cómo armé mi workflow de auditoría SEO automatizada con Claude Code. No es teoría — es el proceso que uso con clientes reales en mi trabajo como [consultor SEO](/consultor-seo-chile).

![Flujo de auditoría SEO automatizada con Claude Code: desde la terminal, pasando por MCPs conectados a fuentes de datos, hasta el reporte final con issues críticos, oportunidades y quick wins](/assets/blog/auditoria-seo-claude-code/flujo-auditoria-seo-claude-code.webp)

---

## Qué es una auditoría SEO (y por qué tiene sentido automatizarla)

Una auditoría SEO es un diagnóstico completo del estado de un sitio web en términos de posicionamiento orgánico. Cubre desde lo técnico (rastreo, indexación, velocidad) hasta el contenido (keywords, estructura, internal linking) y la autoridad (backlinks, competencia).

¿El problema? Es un proceso que involucra cruzar datos de 5-6 fuentes distintas. Google Search Console por un lado, una herramienta de crawling por otro, datos de keywords por acá, análisis de competidores por allá. Cada fuente tiene su interfaz, su formato de exportación y sus limitaciones.

Automatizar no significa que la IA haga todo sin supervisión. Significa que Claude Code se conecta a todas esas fuentes, extrae los datos, los cruza y te presenta un diagnóstico estructurado que vos validás y ajustás. La decisión final siempre es tuya — pero el trabajo pesado de recopilar y organizar data lo hace la máquina.

¿Por qué Claude Code y no otra herramienta? Porque los [MCP servers](/blog/mcp-servers-seo) le dan acceso directo a las APIs que necesitás: DataForSEO para keywords, Google Search Console para rendimiento real, Chrome DevTools para inspeccionar páginas, y más. Todo desde la misma terminal, sin saltar entre pestañas.

---

## Qué es Claude Code y por qué sirve para auditorías

Si ya leíste mi [guía de Claude Code para SEO](/blog/claude-code-seo), esto te va a sonar familiar. Si no, acá va el resumen rápido.

Claude Code es la CLI oficial de Anthropic. O sea, es un agente de IA que vive en tu terminal, lee tus archivos, ejecuta comandos y se conecta a herramientas externas. No es un chat web con límite de tokens — es un entorno de trabajo completo.

Para auditorías SEO tiene tres ventajas clave:

- **Acceso a datos en tiempo real** vía MCPs (Search Console, DataForSEO, Chrome DevTools)
- **Contexto persistente** — puede leer tu CLAUDE.md, tus skills y entender el framework de auditoría que definiste
- **Ejecución directa** — no solo te dice qué revisar, sino que lo revisa, extrae los datos y arma el reporte

La diferencia con hacer una auditoría en ChatGPT o Gemini es que Claude Code realmente se conecta a las fuentes de datos. No te da sugerencias genéricas basadas en su training — te muestra datos reales de tu sitio y de tus competidores.

---

## Los MCP servers que necesitás para auditar

Acá es donde se pone entretenido. Claude Code por sí solo es inteligente, pero sin MCPs no tiene acceso a datos externos. Para una auditoría SEO completa yo uso este stack:

| MCP Server | Qué audita | Datos que aporta |
|-----------|------------|------------------|
| **DataForSEO** | Keywords, SERP, competencia | Volumen, dificultad, rankings, SERP features, AI Overview |
| **Google Search Console (SQL)** | Rendimiento orgánico real | Clics, impresiones, CTR, posición media por query y URL |
| **Chrome DevTools** | Página en vivo | HTML, meta tags, encabezados, schema, Core Web Vitals, mobile |
| **Google Analytics 4** | Comportamiento de usuarios | Sesiones orgánicas, tasa de rebote, conversiones |
| **NLP Entities** | Análisis semántico | Entidades detectadas por Google NLP, relevancia, salience |

![Stack de MCP servers para auditoría SEO: Claude Code conectado a DataForSEO, Google Search Console, Chrome DevTools, Google Analytics 4 y NLP Entities](/assets/blog/auditoria-seo-claude-code/stack-mcps-auditoria-seo.webp)

¿Necesitás los cinco? No necesariamente. Con DataForSEO y Chrome DevTools ya podés hacer una auditoría técnica sólida. Google Search Console le agrega la capa de rendimiento real. Los otros dos son para auditorías más profundas.

Si querés ver cómo se configura cada MCP, tengo una [guía completa de MCP servers para SEO](/blog/mcp-servers-seo) con los archivos de configuración, pero básicamente vas al `claude_desktop_config.json` o al `.mcp.json` de tu proyecto y agregás los servidores que necesitás.

---

## Configuración inicial: CLAUDE.md para auditorías

Antes de pedirle a Claude Code que audite un sitio, necesitás darle contexto. Y la forma más eficiente de hacerlo es con un archivo CLAUDE.md en la raíz de tu proyecto.

¿Qué es CLAUDE.md? Es un archivo de instrucciones que Claude Code lee automáticamente cada vez que iniciás una sesión. Básicamente le decís quién sos, qué herramientas tiene disponibles y cómo querés que trabaje.

Para auditorías, yo incluyo una sección específica que define el framework:

```markdown
## Framework de Auditoría SEO

Cuando te pida auditar un sitio, seguí este orden:

### 1. Auditoría Técnica
- Crawleá la URL con Chrome DevTools
- Verificá: meta tags (title, description, robots), canonical, hreflang
- Chequeá jerarquía de encabezados (H1 único, H2-H3 lógicos)
- Validá schema markup (JSON-LD)
- Revisá Core Web Vitals (LCP, FID, CLS)
- Chequeá robots.txt y sitemap.xml

### 2. Auditoría de Contenido
- Extraé keywords rankeadas de GSC para esa URL
- Compará con keywords objetivo de DataForSEO
- Evaluá cobertura semántica vs competidores top 3
- Detectá gaps de contenido (H2s que faltan)
- Revisá internal linking (entrantes y salientes)

### 3. Auditoría Competitiva
- Identificá top 3 competidores para la keyword principal
- Compará estructura, profundidad y elementos diferenciales
- Detectá keywords que rankean ellos pero vos no

### 4. Reporte
- Generá un reporte .md con: issues críticos, oportunidades, quick wins
- Priorizá por impacto (alto/medio/bajo)
- Incluí acciones concretas para cada issue
```

![Framework de auditoría SEO automatizada en 4 pasos: auditoría técnica, auditoría de contenido, auditoría competitiva y reporte final](/assets/blog/auditoria-seo-claude-code/framework-auditoria-4-pasos.webp)

Esto no es decoración. Cada vez que le digo "auditá este sitio", Claude Code sigue este framework automáticamente. Sin CLAUDE.md, tendrías que repetir las instrucciones en cada sesión.

---

## Paso a paso: auditoría SEO técnica automatizada

Vamos a lo práctico. Te muestro el flujo real que uso cuando un cliente me pide una [auditoría SEO](/auditoria-seo-chile).

### Paso 1: Crawl técnico con Chrome DevTools

Lo primero es que Claude Code visite la página y extraiga toda la información técnica. Con el MCP de Chrome DevTools conectado, le digo algo así:

```
Navegá a https://ejemplo.com y hacé un snapshot completo.
Extraé: title tag, meta description, canonical, robots meta,
todos los encabezados H1-H3, schema markup, y cualquier
problema técnico que detectes.
```

Claude Code abre un navegador headless, navega a la URL, toma un snapshot del DOM y analiza todo. En segundos te devuelve algo como:

- **Title tag**: "Ejemplo - Bienvenidos" (problema: no contiene keyword principal)
- **Meta description**: vacía (crítico)
- **H1**: 2 encontrados (problema: debería haber solo 1)
- **Schema**: ninguno detectado (oportunidad: agregar Organization + BreadcrumbList)
- **Canonical**: apunta a sí misma (correcto)
- **Robots**: index, follow (correcto)

Esto solo te llevaría 15-20 minutos haciéndolo a mano con DevTools. Claude Code lo hace en 10 segundos.

### Paso 2: Análisis de rendimiento con Search Console

Una vez que tenés el diagnóstico técnico, necesitás data real de rendimiento. Acá entra el MCP de Google Search Console.

```
Consultá en GSC las queries con más impresiones para
https://ejemplo.com en los últimos 90 días.
Mostrá clics, impresiones, CTR y posición media.
```

Claude Code ejecuta la consulta SQL contra los datos de Search Console y te devuelve una tabla con las keywords reales por las que ese sitio aparece en Google. No estimaciones de Semrush — data real.

Lo que buscás acá son:

- **Keywords en posiciones 5-15** con muchas impresiones → oportunidades de optimización
- **Keywords con CTR bajo** vs lo esperado para su posición → problema de snippet
- **Keywords canibalizadas** → misma query rankeando con distintas URLs

### Paso 3: Research de keywords con DataForSEO

Con los datos de Search Console sabés para qué keywords ya rankeás. Ahora necesitás saber qué keywords deberías estar atacando y no lo estás haciendo.

```
Buscá keywords sugeridas para "keyword principal del sitio"
en Chile. Después analizá la SERP de las top 5 por volumen.
```

Claude Code usa el MCP de DataForSEO para extraer keywords relacionadas con volumen, dificultad y tendencia. Después analiza la SERP de cada una para ver qué tipo de contenido está ganando.

Esto es clave para la parte de "gap analysis" de la auditoría: keywords con volumen que tu sitio debería cubrir pero no lo hace.

---

## Paso a paso: auditoría de contenido y keywords

La parte técnica es importante pero no suficiente. El contenido es lo que realmente determina si rankeás o no.

### Análisis de cobertura semántica

Le pido a Claude Code que compare el contenido de la página auditada contra los competidores que rankean en posiciones 1-3:

```
Navegá a las 3 primeras URLs que rankean para "keyword objetivo".
Extraé la estructura de H2s de cada una.
Compará con la estructura actual de mi página y decime
qué secciones me faltan.
```

Claude Code va a cada competidor, extrae los encabezados y hace el cruce. El output es una lista concreta de subtemas que tus competidores cubren y vos no. O sea, gaps de contenido accionables.

### Análisis de internal linking

Otra parte que suele quedar corta en las auditorías manuales. Claude Code puede analizar los links internos de una página y detectar:

- Páginas huérfanas (sin links entrantes)
- Oportunidades de linking contextual no aprovechadas
- Anchor texts genéricos que deberían ser descriptivos

Esto lo cruza con el topical map del sitio para sugerir links que refuercen la [estrategia SEO](/estrategia-seo) general.

---

## Paso a paso: auditoría de competidores

No podés saber si tu sitio está bien posicionado sin entender contra quién competís.

### Identificar competidores reales

Un error común es asumir que tus competidores de negocio son tus competidores SEO. No siempre es así. Le pido a Claude Code:

```
Analizá la SERP de mis 5 keywords principales.
¿Qué dominios aparecen más veces en top 10?
Esos son mis competidores SEO reales.
```

Con DataForSEO, Claude Code analiza las SERPs y te dice qué dominios tienen más visibilidad para tu set de keywords. A veces aparecen blogs, marketplaces o directorios que no tenías en el radar.

### Comparar keyword profiles

Una vez identificados los competidores, Claude Code extrae sus keywords rankeadas y las compara con las tuyas:

- **Keywords que comparten**: competencia directa, hay que ganar posiciones
- **Keywords que tienen ellos pero vos no**: oportunidades de contenido nuevo
- **Keywords que tenés vos pero ellos no**: tu ventaja competitiva

---

## El reporte: qué genera Claude Code

Al final de la auditoría, Claude Code genera un archivo `.md` con el diagnóstico completo. La estructura que yo uso es:

```markdown
# Auditoría SEO - ejemplo.com
Fecha: 2026-02-19

## Resumen Ejecutivo
- Issues críticos: X
- Oportunidades detectadas: X
- Quick wins: X

## Issues Críticos (impacto alto)
1. [Issue] — Descripción — Cómo solucionarlo
2. ...

## Oportunidades (impacto medio)
1. [Oportunidad] — Descripción — Acción recomendada
2. ...

## Quick Wins (bajo esfuerzo, impacto rápido)
1. [Quick win] — Qué hacer — Tiempo estimado
2. ...

## Datos de Soporte
- Tabla de keywords GSC
- Gaps vs competidores
- Issues técnicos detallados
```

No es un PDF bonito con gráficos — es un documento accionable que podés usar directamente para priorizar el trabajo. Si necesitás presentarlo al cliente con formato, lo convertís a HTML o PDF después.

---

## Mi workflow real: cómo audito sitios de clientes

Te lo cuento sin filtro. Cuando un cliente me contrata una [auditoría SEO en Chile](/auditoria-seo-chile), mi proceso es este:

1. **Recibo la URL y los objetivos** — qué quiere lograr el cliente, cuál es su mercado
2. **Abro Claude Code en la carpeta del proyecto** — donde tengo el CLAUDE.md con el framework de auditoría
3. **Le digo: "auditá [URL] para la keyword [X] en Chile"** — Claude Code ejecuta todo el framework
4. **Reviso el output** — valido los findings, descarto falsos positivos, agrego contexto de negocio
5. **Entrego el reporte** — con priorización y plan de acción

El paso 3 es donde pasa la magia. Claude Code ejecuta la auditoría técnica, de contenido y competitiva en una sola sesión. Lo que antes eran 6-8 horas de trabajo se comprime a 30-40 minutos de ejecución + revisión.

¿La revisión humana es necesaria? Absolutamente. Claude Code puede detectar que falta un H1 o que el CTR es bajo, pero no entiende el contexto de negocio del cliente. Eso lo ponés vos. La IA hace el 80% del trabajo operativo para que vos te concentres en el 20% estratégico.

---

## Limitaciones y cuándo necesitás intervención manual

No quiero venderte humo. Hay cosas que Claude Code hace perfecto y otras donde todavía necesitás intervenir:

**Lo que hace bien:**
- Crawl técnico completo (meta tags, encabezados, schema, velocidad)
- Extracción de datos de GSC y DataForSEO
- Comparación estructural vs competidores
- Detección de gaps de keywords
- Generación de reportes estructurados

**Donde necesitás intervención manual:**
- **Contexto de negocio** — la IA no sabe que tu cliente está pivoteando de producto
- **Priorización estratégica** — qué optimizar primero depende de recursos y objetivos
- **UX y diseño** — Claude Code analiza código, no experiencia visual
- **Backlinks** — el análisis de perfil de enlaces todavía requiere herramientas especializadas
- **Decisiones editoriales** — qué tono usar, qué mensaje comunicar

La auditoría con IA no reemplaza al [consultor SEO](/consultoria-seo-mensual). Lo que hace es eliminar las horas de trabajo operativo para que el consultor se enfoque en lo que realmente importa: la estrategia.

---

## Preguntas frecuentes

### ¿Puede Claude Code hacer una auditoría SEO?

Sí, pero con matices. Claude Code puede ejecutar un diagnóstico técnico completo (meta tags, velocidad, schema, encabezados), analizar keywords reales de Search Console, investigar competidores y generar un reporte estructurado. Lo que no puede hacer es interpretar el contexto de negocio ni tomar decisiones estratégicas — eso requiere un profesional.

### ¿Cómo hacer una auditoría SEO paso a paso con IA?

El flujo es: 1) Configurar CLAUDE.md con tu framework de auditoría, 2) Conectar los MCPs necesarios (Chrome DevTools, GSC, DataForSEO), 3) Pedirle a Claude Code que ejecute la auditoría para una URL específica, 4) Revisar y validar los findings, 5) Generar el reporte con priorización.

### ¿Qué es una auditoría SEO y cuánto cuesta automatizarla?

Una auditoría SEO es un diagnóstico del estado de posicionamiento orgánico de un sitio web. Automatizarla con Claude Code requiere la suscripción a Claude ($20/mes) más los MCPs que uses (DataForSEO tiene planes desde $50/mes). El ahorro en horas de trabajo manual justifica la inversión desde la primera auditoría.

### ¿Claude Code es mejor que Screaming Frog para auditorías?

Son complementarios. Screaming Frog es un crawler dedicado con funcionalidades muy específicas (crawl budget, redirect chains, hreflang validation). Claude Code es más flexible: puede combinar crawling con análisis de keywords, comparar competidores y generar reportes — todo en una sesión. Para auditorías técnicas profundas, yo uso ambos.

### ¿Qué MCPs necesito para una auditoría SEO con Claude Code?

Como mínimo: Chrome DevTools (para crawl técnico) y DataForSEO (para keyword research y SERP analysis). Si tenés acceso, agregar Google Search Console te da datos de rendimiento reales. Google Analytics 4 y NLP Entities son opcionales pero aportan profundidad.

---

## Próximos pasos

Si ya usás [Claude Code para SEO](/blog/claude-code-seo), agregar auditorías a tu workflow es natural. Empezá con el CLAUDE.md que te mostré arriba, conectá al menos Chrome DevTools como MCP y probá auditar tu propio sitio.

Si todavía no configuraste los MCPs, empezá por la [guía de MCP servers para SEO](/blog/mcp-servers-seo) — ahí tenés la configuración de cada uno.

Y si preferís que alguien haga la auditoría por vos con este mismo framework, podés [agendar un diagnóstico SEO gratuito](/#contacto) y lo revisamos juntos.
