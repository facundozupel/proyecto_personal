---
title: "Claude Code para SEO - Guía 2026"
description: "Cómo uso Claude Code como consultor SEO: topical maps con IA, MCPs para DataForSEO y Google Search Console, redacción con voice cloning y scripts de indexación. Guía práctica con mi framework real."
author: "Facundo Zupel"
date: 2026-02-12
readTime: "22 minutos"
tags: ["SEO", "Claude Code", "IA", "Automatización", "MCPs", "Topical Map"]
draft: false
category: "ia-en-seo"
---

Voy a ser directo: Claude Code me cambió la forma de trabajar SEO. No como buzzword, no como "el futuro de la IA" — sino como herramienta concreta que uso todos los días para hacer keyword research, armar topical maps, redactar contenido y hasta enviar URLs a la Indexing API de Google.

Este artículo no es un tutorial genérico de "qué es Claude Code". Es un recorrido por mi stack real: cómo lo configuré, qué MCPs le conecté, y cómo cada pieza se integra para que el flujo de trabajo SEO deje de ser tedioso y pase a ser escalable.

Si trabajás en [posicionamiento web](/posicionamiento-web-chile) y todavía estás saltando entre 15 pestañas para armar un artículo, esto te va a interesar.

![Flujo de trabajo SEO con Claude Code: terminal conectado a herramientas SEO como DataForSEO, Google Search Console y la Indexing API](/assets/blog/claude-code-seo/flujo-claude-code-seo.webp)

---

## Qué es Claude Code y por qué importa para SEO

Claude Code es la CLI oficial de Anthropic para trabajar con Claude directamente desde la terminal. No es un chat web — es un agente que vive en tu proyecto, lee tus archivos, ejecuta comandos y puede conectarse a herramientas externas mediante MCPs (Model Context Protocol).

¿Por qué eso cambia el juego para SEO? Porque el 80% del trabajo de un [consultor SEO](/consultor-seo-chile) es cruzar datos de distintas fuentes, tomar decisiones basadas en esos datos y ejecutar acciones repetitivas. Claude Code puede hacer las tres cosas sin que salgas de la terminal.

En mi caso, lo uso para:

- **Keyword research** con datos en vivo de DataForSEO
- **Análisis de rendimiento** consultando Google Search Console vía SQL
- **Redacción de contenido** con mi voz clonada y optimización SEO
- **Topical maps completos** con análisis de entidades y microsemántica
- **Indexación automatizada** de URLs nuevas vía Google Indexing API

Básicamente, lo que antes me llevaba un día entero de saltar entre Semrush, planillas y Google Docs, ahora lo hago en una conversación con Claude Code.

---

## Mi stack: MCPs conectados a Claude Code

Acá es donde se pone entretenido. Claude Code por sí solo es un modelo de lenguaje potente. Pero cuando le conectás MCPs — o sea, servidores que le dan acceso a herramientas externas — se convierte en algo completamente distinto. Escribí una [guía completa sobre MCP Servers para SEO](/blog/mcp-servers-seo) con la configuración de cada uno, pero acá va el resumen de mi stack.

### MCP de DataForSEO: keyword research en tiempo real

DataForSEO es la API que uso para todo lo que tiene que ver con investigación de keywords. En vez de abrir Semrush o Ahrefs, le pido a Claude Code que ejecute las consultas directamente.

Las herramientas que tengo configuradas:

| Tool MCP | Qué hace | Para qué lo uso |
|---|---|---|
| `KeywordSuggestions` | Keywords relacionadas y long-tail | Expandir clusters del topical map |
| `KwsRelacionadas` | Co-ocurrencia semántica | Armar el inventario microsemántico |
| `SerpResultados` | SERP features, AI Overviews, URLs que rankean | Analizar qué tipo de contenido premia Google |
| `RankedKeywordsGeneral` | Keywords de competidores | Detectar content gaps |
| `TopicalAuthority` | Score de autoridad temática por dominio | Benchmark vs competidores |
| `TraficoEstimado` | Tráfico orgánico estimado de cualquier dominio | Validar oportunidades |
| `Tendencias` | Estacionalidad y trending topics | Identificar trending nodes |

¿Cómo se ve en la práctica? Le digo a Claude Code: "Haceme un keyword research para 'seo técnico' en Chile" y ejecuta en paralelo `KeywordSuggestions`, `KwsRelacionadas` y `SerpResultados`. En 30 segundos tengo el mapa completo de keywords, la intención de búsqueda y qué están haciendo los competidores.

Sin abrir una sola pestaña del navegador. Si querés ver la configuración detallada de este MCP y los workflows completos, está todo en la [guía de MCP Servers para SEO](/blog/mcp-servers-seo).

### MCP de Google Search Console con SQL

Este es probablemente el MCP más valioso del setup. Tengo toda la data de GSC volcada a una base de datos SQL, y Claude Code puede consultarla directamente.

Las queries que uso más:

| Tool MCP | Qué consulta | Caso de uso |
|---|---|---|
| `gsc_keyword` | Métricas GSC con keywords: clics, impresiones, posición, CTR | Análisis de rendimiento por keyword, detección de long-tail |
| `gsc_page` | Métricas a nivel página sin desglose de keywords | Identificar Quality Nodes, detectar páginas con alto potencial |
| `gsc_share` | Share of voice competitivo | Benchmark de autoridad vs competidores |

¿Por qué SQL y no la API de GSC directo? Porque con SQL puedo hacer queries complejas que en la interfaz de GSC son imposibles: filtrar por rango de posiciones, cruzar CTR con impresiones, segmentar brand vs no-brand, comparar períodos. Y Claude Code escribe las queries por mí.

Le digo: "¿Qué keywords están ganando impresiones pero tienen CTR menor al 2%?" y me devuelve la tabla con las oportunidades de optimización de titles y meta descriptions. Eso es el Paso 10 de la metodología de Koray — iteración basada en datos reales, no en estimaciones.

### MCP de entidades NLP

Para el [análisis de entidades](/blog/que-es-seo) uso la herramienta `AnalizarEntidades`, que trabaja con la API de Google NLP. Me permite extraer las entidades de cualquier texto o URL y entender las relaciones semánticas que Google espera encontrar.

Esto es fundamental para armar el inventario microsemántico: esos términos que desambiguan tu contenido y lo colocan en el contexto técnico correcto para los rastreadores.

---

## El Topical Map: mi framework completo generado con Claude Code

![Arquitectura de un Topical Map SEO: estructura hub-spoke con entidad central, clusters y nodos conectados](/assets/blog/claude-code-seo/topical-map-arquitectura.webp)

Acá viene la parte que más me costó sistematizar — y la que más impacto tiene en el [posicionamiento orgánico](/estrategia-seo) de cualquier sitio.

Un topical map no es una lista de keywords. Es una arquitectura semántica completa que le dice a Google: "este sitio es la autoridad en este tema". Y armarlo bien requiere cruzar análisis de entidades, keyword research, SERP analysis, microsemántica y una estructura de internal linking coherente.

### La estructura del template

Armé un template de topical map que Claude Code usa como framework cada vez que necesito crear uno. Tiene 15 secciones y cada una tiene un propósito específico:

**1. Análisis de Entidades** — Definís la entidad central, sus atributos (Root, Rare, Unique), las entidades relacionadas por co-ocurrencia semántica y el inventario microsemántico global. Esta es la base de todo.

**2. Core Section** — Las páginas que monetizan. Servicios, productos, lo que sea que genere conversiones. Organizadas en clusters con hub principal y spokes.

**3. Author Section** — Artículos de blog que demuestran expertise. Contenido educacional que enlaza siempre a la Core Section. Mínimo 15-25 artículos.

**4. Topical Borders** — Qué temas están dentro del scope y cuáles NO. Esto es crítico. Si escribís sobre cualquier cosa, diluís tu autoridad temática.

**5. Information Tree** — La jerarquía de especificidad creciente. Cada nivel debe ser más específico que el anterior, y cada hoja debe conectar lógicamente con el tronco.

**6. Internal Linking Architecture** — Reglas concretas: el hub recibe links de todas las páginas, cada artículo enlaza a mínimo 2 páginas Core, anchor text distribuido en 30% exact match, 40% partial, 30% natural.

### Cómo Claude Code genera el topical map

El proceso es así:

1. Le doy la entidad central y el contexto del negocio
2. Claude Code ejecuta `KeywordSuggestions` y `KwsRelacionadas` para mapear el universo semántico
3. Usa `SerpResultados` para analizar qué tipo de contenido premia Google
4. Ejecuta `RankedKeywordsGeneral` en los competidores para detectar gaps
5. Usa `AnalizarEntidades` para extraer entidades y co-ocurrencias
6. Arma el documento completo siguiendo el template

El resultado es un documento de 700+ líneas con datos reales de volumen, dificultad y análisis competitivo. No es un borrador genérico — es un plan de contenido ejecutable con prioridades claras.

Lo mejor es que el template es reutilizable. Ya lo usé para mi propio sitio y para proyectos de clientes. Cada topical map sale con la misma estructura pero con datos completamente distintos.

---

## Cómo escribo artículos SEO con Claude Code

Redactar contenido con IA no es copiar y pegar lo que sale del modelo. Si hacés eso, tu contenido suena genérico, no tiene personalidad y Google lo detecta a kilómetros.

Mi enfoque tiene dos componentes que hacen la diferencia:

### Voice Cloning: que la IA suene como vos

Armé un framework de clonación de voz cognitiva que analiza cómo comunico y lo traduce en instrucciones para el agente. No es un find-and-replace de palabras — es un análisis de 6 fases:

1. **Extracción del modelo mental** — Mi ciclo cognitivo: identifico el dolor manual → descubro la solución técnica → la simplifico para la audiencia → muestro el resultado con emoción
2. **Mapeo retórico** — Mis patrones sintácticos recurrentes: la auto-entrevista socrática (me hago preguntas y me respondo), el puente traductor (término técnico + "o sea" + explicación simple)
3. **Arquitectura léxica** — Mi diccionario personalizado: "alegría" cuando algo funciona, "tedioso" cuando algo es manual, "basicamente" para resumir
4. **Algoritmo narrativo** — La secuencia: nombrar → definir → contextualizar → detallar → mostrar resultado → cerrar con emoción
5. **Calibración emocional** — Frío cuando hablo de costos, tibio cuando explico procesos, caliente cuando muestro resultados
6. **Anti-patrones** — Lo que nunca haría: hablar como manual técnico, usar jerga corporativa vacía, dar respuestas absolutas sobre presupuestos

¿El resultado? Cada artículo que sale de Claude Code suena como yo lo escribiría. No perfecto — eso sería sospechoso. Sino con las mismas muletillas, la misma estructura de ideas y el mismo tono directo que uso cuando hablo con un cliente.

### El pipeline completo de redacción

Cuando creo un artículo nuevo para el blog, el proceso sigue este orden:

1. **Selección de keyword** del topical map
2. **Research con DataForSEO** — `KeywordSuggestions`, `KwsRelacionadas`, `SerpResultados` en paralelo
3. **Análisis de competidores** — Navego los top 3-5 resultados con Chrome DevTools y extraigo estructura, H2s, FAQs
4. **Análisis de intención de búsqueda** — Clasifico el intent (TOFU/MOFU/BOFU), defino el content type ganador
5. **Escritura** — Claude Code redacta con el voice cloning framework, respetando internal links, microsemántica y tono de marca
6. **Build y deploy** — Se genera el .md en el directorio correcto, se buildea el proyecto y Vercel lo despliega

Todo en una sola sesión de terminal. Sin Google Docs, sin Notion, sin idas y vueltas.

---

## MCPs para análisis de rendimiento: GSC + SQL

![Arquitectura de MCPs conectando Claude Code con fuentes de datos SEO: SQL, DataForSEO y Google Indexing API](/assets/blog/claude-code-seo/mcps-seo-arquitectura.webp)

Una cosa es publicar contenido. Otra es medir si funciona y optimizarlo.

Acá es donde el MCP de Google Search Console con SQL se vuelve indispensable. Puedo preguntarle a Claude Code cosas como:

- "¿Qué páginas Core tienen más de 500 impresiones pero CTR menor al 3%?"
- "¿Cuáles son las keywords no-brand donde estamos ganando posiciones?"
- "Comparame el rendimiento del blog este mes vs el anterior"

Y me devuelve tablas con datos reales, no estimaciones de herramientas terceras.

### Iteración basada en datos

El ciclo de mejora que sigo es:

1. **Revisar métricas** — Posición, clics, CTR, impresiones por página y keyword
2. **Detectar oportunidades** — Keywords con impresiones altas y CTR bajo = optimizar title y meta description
3. **Identificar long-tail** — Keywords de cola larga donde ya tenemos impresiones pero sin clics
4. **Actualizar contenido** — Agregar secciones Q&A, reforzar microsemántica, ajustar internal links
5. **Medir de nuevo** — Comparar período anterior vs actual

Esto no es algo que inventé yo. Es el Paso 10 de la metodología de Koray Tuğberk Gübür — monitoreo e iteración continua. La diferencia es que con Claude Code y el MCP de SQL, este ciclo que antes tomaba medio día ahora lo hago en 15 minutos.

---

## Script de Google Indexing API: que Google se entere rápido

Cuando publicás contenido nuevo, no querés esperar semanas a que Google lo descubra. Para eso tengo un script de Python que usa la Indexing API de Google para notificar URLs recién publicadas. Si te interesa la [automatización SEO con Python](/blog/automatizacion-seo-python) más allá de la indexación, ahí profundizo en otros scripts que uso.

```python
# Indexar una URL nueva
python scripts/google-indexing/index.py --action index \
  --urls https://facundogrowth.com/blog/claude-code-seo

# Indexar varias URLs de un archivo
python scripts/google-indexing/index.py --action index --file urls.txt

# Desindexar una URL vieja
python scripts/google-indexing/index.py --action deindex \
  --urls https://facundogrowth.com/pagina-vieja
```

El script se autentica con una service account de Google Cloud, envía la notificación a la Indexing API y te confirma el status de cada URL. Soporta indexación y desindexación, URLs individuales o masivas desde archivo.

¿Por qué es útil? Porque después de crear un artículo con Claude Code y hacer build, puedo pedirle al mismo agente que ejecute el script de indexación. El ciclo completo — desde research hasta indexación — sin salir de la terminal.

---

## Lo que funciona y lo que no

Sería deshonesto decir que todo es perfecto. Así que acá va lo que aprendí después de meses usando este stack:

**Lo que funciona muy bien:**

- **Keyword research automatizado** — La combinación de DataForSEO con Claude Code es más rápida y completa que cualquier herramienta con interfaz gráfica
- **Topical maps estructurados** — El template fuerza consistencia. Cada mapa sale con la misma profundidad
- **Análisis de GSC con SQL** — Queries complejas en segundos que en la interfaz web tomarían horas
- **Redacción con voz propia** — El voice cloning framework produce contenido que no suena a IA genérica
- **Velocidad de ejecución** — Lo que antes era un día de trabajo ahora son 2-3 horas

**Lo que requiere supervisión:**

- **Los datos no reemplazan el criterio** — Claude Code puede cruzar toda la data, pero la decisión estratégica la tomás vos
- **El voice cloning necesita iteración** — Las primeras versiones suenan artificiales. Hay que ajustar el framework con muestras reales
- **No todo se automatiza** — El link building, las relaciones con clientes y la interpretación de cambios algorítmicos siguen siendo humanos
- **La calidad del output depende del input** — Si le das instrucciones vagas, te devuelve contenido vago

---

## Cómo empezar

Si querés replicar algo de este setup, estos son los pasos concretos:

1. **Instalá Claude Code** — Es la CLI de Anthropic. Necesitás una API key
2. **Configurá MCPs** — Empezá por uno solo. Si tenés acceso a DataForSEO, conectá ese primero
3. **Armá tu CLAUDE.md** — Es el archivo de instrucciones del proyecto. Definí los flujos de trabajo, las reglas y las herramientas disponibles
4. **Creá tu topical map** — Usá el template como base y completalo con datos reales de tu nicho
5. **Iterá** — El primer artículo no va a ser perfecto. El quinto ya va a tener tu voz

Lo importante no es tener el setup perfecto desde el día uno. Es empezar con una pieza — un MCP, un script, un template — y construir encima. Si querés profundizar en los MCPs específicos, leé la [guía de MCP Servers para SEO](/blog/mcp-servers-seo) donde detallo la configuración de cada uno.

---

## Esto recién empieza

Estoy convencido de que los consultores SEO que no incorporen [IA a su flujo de trabajo](/blog/ia-seo-2026) van a quedar en desventaja. No porque la IA reemplace al consultor, sino porque multiplica lo que un consultor puede hacer.

Con Claude Code, yo puedo entregar un topical map completo en una tarde, publicar un artículo optimizado en una hora y monitorear el rendimiento de 50 keywords sin abrir una planilla. Eso no me hace mejor SEO — me hace más eficiente. Y la eficiencia en consultoría se traduce directamente en más valor para el cliente.

Si querés ver cómo aplico todo esto en una [auditoría SEO real](/auditoria-seo-chile), o necesitás ayuda para armar tu propia [estrategia de posicionamiento](/estrategia-seo), estoy del otro lado.

Y si querés probar algo rápido antes de agendar una reunión, pegá tu URL en el [analizador SEO gratuito](/analizador-seo) y mirá qué sale.
