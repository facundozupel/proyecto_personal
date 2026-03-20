---
title: "Claude Code para SEO: Cómo Automatizar tu Flujo de Trabajo en 2026"
description: "Cómo uso Claude Code para SEO todos los días: MCPs conectados a DataForSEO y GSC, topical maps automatizados y scripts de indexación. Mi stack real."
author: "Facundo Zupel"
date: 2026-02-12
readTime: "22 minutos"
tags: ["SEO", "Claude Code", "IA", "Automatización", "MCPs", "Topical Map"]
draft: false
category: "ia-en-seo"
youtubeId: "lgdQ_tszbY4"
---

Voy a ser directo: Claude Code me cambió la forma de trabajar SEO. No como buzzword, no como "el futuro de la IA" — sino como herramienta concreta que uso todos los días para hacer keyword research, armar topical maps, redactar contenido y hasta enviar URLs a la Indexing API de Google.

Este artículo no es un tutorial genérico de "qué es Claude Code". Es un recorrido por mi stack real: cómo lo configuré, qué MCPs le conecté, y cómo cada pieza se integra para que el flujo de trabajo SEO deje de ser tedioso y pase a ser escalable.

Si trabajás en [posicionamiento web](/posicionamiento-web-chile) y todavía estás saltando entre 15 pestañas para armar un artículo, esto te va a interesar. Y si ya escuchaste hablar de OpenClaw y te preguntás cómo se compara, escribí una [comparativa de Claude Code vs OpenClaw para SEO](/blog/claude-code-vs-openclaw-seo) enfocada en tareas reales de posicionamiento.

![Flujo de trabajo SEO con Claude Code: terminal conectado a herramientas SEO como DataForSEO, Google Search Console y la Indexing API](/assets/blog/claude-code-seo/flujo-claude-code-seo.webp)

---

## ¿Puede Claude Code hacer SEO?

Sí. Claude Code puede ejecutar keyword research con APIs de datos en vivo, analizar la SERP, crawlear competidores, redactar contenido optimizado y hasta enviar URLs a la Indexing API de Google — todo desde la terminal, sin abrir un navegador.

Lo que no puede hacer es reemplazar el criterio estratégico. Los datos los cruza él, las decisiones las tomás vos.

---

## Qué es Claude Code y por qué importa para SEO

Claude Code es la CLI oficial de Anthropic para trabajar con Claude directamente desde la terminal. No es un chat web — es un agente que vive en tu proyecto, lee tus archivos, ejecuta comandos y puede conectarse a herramientas externas mediante MCPs (Model Context Protocol).

¿Por qué importa para SEO? Porque el 80% del trabajo de un [consultor SEO](/consultor-seo-chile) es cruzar datos de distintas fuentes, decidir qué hacer con esos datos y ejecutar tareas repetitivas. Claude Code hace las tres cosas sin que salgas de la terminal.

En mi caso lo uso para keyword research con datos en vivo de DataForSEO, analizar rendimiento consultando Google Search Console vía SQL, redactar contenido con mi voz clonada, armar topical maps con análisis de entidades, y enviar URLs nuevas a la Indexing API de Google.

Lo que antes me llevaba un día entero de saltar entre Semrush, planillas y Google Docs, ahora lo resuelvo en una sesión de terminal.

---

## Cómo instalar Claude Code

Si llegaste hasta acá y todavía no lo tenés instalado, tres comandos y listo:

```bash
# Opción recomendada (nativa, sin Node.js)
curl -fsSL https://claude.ai/install.sh | bash

# Alternativa con npm (requiere Node.js 18+)
npm install -g @anthropic-ai/claude-code

# Verificar instalación
claude --version
```

Al primer inicio te pide autenticación. Seleccioná la opción de suscripción Claude Pro/Max para uso ilimitado — es lo que tiene sentido si lo vas a usar para SEO en serio.

---

## Mi stack: MCPs conectados a Claude Code

Acá es donde se pone entretenido. Claude Code solo es un modelo de lenguaje. Cuando le conectás MCPs (servidores que le dan acceso a herramientas externas) pasa a ser otra cosa: un agente que consulta APIs, ejecuta scripts y toma acciones. Escribí una [guía completa sobre MCP Servers para SEO](/blog/mcp-servers-seo) con la configuración de cada uno, pero acá va el resumen de mi stack.

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

¿Cómo se ve en la práctica? Le digo "Haceme un keyword research para 'seo técnico' en Chile" y ejecuta en paralelo `KeywordSuggestions`, `KwsRelacionadas` y `SerpResultados`. En 30 segundos tengo las keywords mapeadas, la intención de búsqueda clara y un panorama de lo que están haciendo los competidores.

Si querés ver la configuración detallada de este MCP y los workflows completos, está todo en la [guía de MCP Servers para SEO](/blog/mcp-servers-seo).

### Claude Code vs Semrush: ¿por qué migré?

Si buscás "Claude Semrush" o "Claude Code SEO plugin", probablemente estés evaluando lo mismo que me pregunté yo: ¿puedo reemplazar mi herramienta SEO con un agente de IA? Claude Code no es un plugin SEO. Es una CLI que se conecta a APIs como DataForSEO y funciona como centro de operaciones.

Usé Semrush durante años. Es sólido, pero el flujo tiene fricción: abrís la interfaz, hacés una búsqueda, exportás a CSV, abrís otra pestaña para SERP analysis, exportás de nuevo, pegás todo en un documento y recién ahí empezás a decidir. Con DataForSEO conectado a Claude Code, todo eso pasa en una sola sesión de terminal.

La diferencia no está en los datos (Semrush y DataForSEO acceden a bases similares), sino en cómo los usás. En Semrush consultás datos y después los interpretás manualmente. Con Claude Code, los datos se consultan, se cruzan y se interpretan en el mismo paso. Le pedís "buscame keywords de oportunidad para 'auditoría seo' donde la dificultad sea menor a 40 y el volumen mayor a 200" y te devuelve la tabla filtrada con su lectura, lista para actuar.

¿Semrush sigue siendo útil? Sí, especialmente si preferís interfaz visual o necesitás reportes para clientes que quieren dashboards gráficos. Pero para el trabajo operativo del día a día — research, análisis competitivo, detección de gaps — Claude Code con MCPs es más rápido y flexible.

### MCP de Google Search Console con SQL

El MCP que más uso. Tengo toda la data de GSC volcada a una base de datos SQL, y Claude Code puede consultarla directamente.

Las queries que uso más:

| Tool MCP | Qué consulta | Caso de uso |
|---|---|---|
| `gsc_keyword` | Métricas GSC con keywords: clics, impresiones, posición, CTR | Análisis de rendimiento por keyword, detección de long-tail |
| `gsc_page` | Métricas a nivel página sin desglose de keywords | Identificar Quality Nodes, detectar páginas con alto potencial |
| `gsc_share` | Share of voice competitivo | Benchmark de autoridad vs competidores |

¿Por qué SQL y no la API de GSC directo? Porque con SQL puedo hacer queries complejas que en la interfaz de GSC son imposibles: filtrar por rango de posiciones, cruzar CTR con impresiones, segmentar brand vs no-brand, comparar períodos. Y Claude Code escribe las queries por mí.

Le digo: "¿Qué keywords están ganando impresiones pero tienen CTR menor al 2%?" y me devuelve la tabla con las oportunidades de optimización de titles y meta descriptions. Eso es el Paso 10 de la metodología de Koray — iteración basada en datos reales, no en estimaciones.

### MCP de entidades NLP

Para el [análisis de entidades](/blog/que-es-seo) uso `AnalizarEntidades`, que trabaja con la API de Google NLP. Extrae las entidades de cualquier texto o URL y me muestra las relaciones semánticas que Google espera encontrar.

Lo uso sobre todo para armar el inventario microsemántico: los términos que desambiguan tu contenido y lo ubican en el contexto técnico correcto para los rastreadores.

---

## El Topical Map: mi framework completo generado con Claude Code

![Arquitectura de un Topical Map SEO: estructura hub-spoke con entidad central, clusters y nodos conectados](/assets/blog/claude-code-seo/topical-map-arquitectura.webp)

Acá viene la parte que más me costó sistematizar, y la que más mueve la aguja en el [posicionamiento orgánico](/estrategia-seo) de un sitio.

Un topical map no es una lista de keywords. Es la arquitectura semántica que le dice a Google "este sitio es la autoridad en este tema". Armarlo bien requiere cruzar análisis de entidades, keyword research, SERP analysis, microsemántica y una estructura de internal linking coherente.

### La estructura del template

Armé un template de topical map que Claude Code usa como framework cada vez que necesito crear uno. Tiene 15 secciones. Las más importantes:

Primero, el análisis de entidades. Definís la entidad central, sus atributos (Root, Rare, Unique), las entidades relacionadas por co-ocurrencia semántica y el inventario microsemántico global. Todo lo demás se construye sobre esto.

Después viene la Core Section (las páginas que monetizan, organizadas en clusters hub-spoke) y la Author Section (artículos de blog que demuestran expertise y enlazan a la Core, mínimo 15-25 artículos).

Algo que la mayoría se saltea: los Topical Borders. Qué temas están dentro del scope y cuáles no. Si escribís sobre cualquier cosa, diluís tu autoridad temática.

El Information Tree define la jerarquía de especificidad creciente: cada nivel más específico que el anterior, cada hoja conectada lógicamente con el tronco.

Y la Internal Linking Architecture pone reglas concretas: el hub recibe links de todas las páginas, cada artículo enlaza a mínimo 2 páginas Core, anchor text distribuido en 30% exact match, 40% partial, 30% natural.

### Cómo Claude Code genera el topical map

El proceso es así:

1. Le doy la entidad central y el contexto del negocio
2. Claude Code ejecuta `KeywordSuggestions` y `KwsRelacionadas` para mapear el universo semántico
3. Usa `SerpResultados` para analizar qué tipo de contenido premia Google
4. Ejecuta `RankedKeywordsGeneral` en los competidores para detectar gaps
5. Usa `AnalizarEntidades` para extraer entidades y co-ocurrencias
6. Arma el documento completo siguiendo el template

El resultado son 700+ líneas con datos reales de volumen, dificultad y análisis competitivo. No es un borrador genérico, es un plan de contenido ejecutable con prioridades claras.

El template es reutilizable. Ya lo usé para mi propio sitio y para proyectos de clientes. Misma estructura, datos completamente distintos.

---

## Cómo escribo artículos SEO con Claude Code

Redactar contenido con IA no es copiar y pegar lo que sale del modelo. Si hacés eso, tu contenido suena genérico y Google lo detecta a kilómetros.

Mi enfoque tiene dos partes:

### Voice Cloning: que la IA suene como vos

Armé un framework de clonación de voz cognitiva que analiza cómo comunico y lo traduce en instrucciones para el agente. No es un find-and-replace de palabras, es un análisis de 6 fases.

Primero extraigo mi modelo mental: cómo pienso un tema (identifico el dolor manual, descubro la solución técnica, la simplifico, muestro el resultado). Después mapeo mis patrones retóricos: la auto-entrevista socrática (me hago preguntas y me respondo), el puente traductor (término técnico + "o sea" + explicación simple).

El framework también incluye mi diccionario personal ("alegría" cuando algo funciona, "tedioso" cuando algo es manual), la secuencia narrativa que sigo naturalmente (nombrar, definir, contextualizar, mostrar resultado, cerrar con emoción), la calibración emocional (frío para costos, tibio para procesos, caliente para resultados) y los anti-patrones: lo que nunca haría, como hablar como manual técnico o dar respuestas absolutas sobre presupuestos.

Cada artículo que sale de Claude Code suena como yo lo escribiría. No perfecto (eso sería sospechoso), sino con las mismas muletillas, la misma estructura de ideas y el tono directo que uso cuando hablo con un cliente.

### El pipeline completo de redacción

Cuando creo un artículo nuevo, el proceso sigue este orden:

1. Selección de keyword del topical map
2. Research con DataForSEO: `KeywordSuggestions`, `KwsRelacionadas`, `SerpResultados` en paralelo
3. Navego los top 3-5 resultados con Chrome DevTools y extraigo estructura, H2s, FAQs
4. Clasifico el intent (TOFU/MOFU/BOFU), defino el content type ganador
5. Claude Code redacta con el voice cloning framework, respetando internal links, microsemántica y tono de marca
6. Se genera el .md, se buildea y Vercel lo despliega

Sin Google Docs, sin Notion, sin idas y vueltas.

---

## MCPs para análisis de rendimiento: GSC + SQL

![Arquitectura de MCPs conectando Claude Code con fuentes de datos SEO: SQL, DataForSEO y Google Indexing API](/assets/blog/claude-code-seo/mcps-seo-arquitectura.webp)

Una cosa es publicar contenido. Otra es medir si funciona y optimizarlo.

Acá el MCP de Google Search Console con SQL se gana el lugar. Puedo preguntarle a Claude Code cosas como:

- "¿Qué páginas Core tienen más de 500 impresiones pero CTR menor al 3%?"
- "¿Cuáles son las keywords no-brand donde estamos ganando posiciones?"
- "Comparame el rendimiento del blog este mes vs el anterior"

Y me devuelve tablas con datos reales, no estimaciones de herramientas terceras.

### Iteración basada en datos

El ciclo que sigo: reviso posición, clics, CTR e impresiones por página y keyword. Busco keywords con impresiones altas y CTR bajo (señal de que el title o la meta description no convencen). Identifico long-tail donde ya tenemos impresiones pero sin clics. Actualizo el contenido: agrego secciones Q&A, refuerzo microsemántica, ajusto internal links. Y después mido de nuevo comparando contra el período anterior.

Esto no es algo que inventé yo. Es el Paso 10 de la metodología de Koray Tuğberk Gübür, monitoreo e iteración continua. La diferencia es que con Claude Code y el MCP de SQL, este ciclo que antes tomaba medio día ahora lo hago en 15 minutos.

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

¿Por qué es útil? Porque después de crear un artículo con Claude Code y hacer build, puedo pedirle al mismo agente que ejecute el script de indexación. El ciclo completo, desde research hasta indexación, sin salir de la terminal.

---

## Lo que funciona y lo que no

Sería deshonesto decir que todo es perfecto. Acá va lo que aprendí después de meses usando este stack.

El keyword research automatizado anda muy bien: DataForSEO con Claude Code es más rápido que cualquier herramienta con interfaz gráfica, y los topical maps salen consistentes porque el template fuerza la estructura. Analizar GSC con SQL en segundos (queries que en la interfaz web tomarían horas) y redactar con voz propia gracias al voice cloning framework son las dos piezas que más tiempo me ahorraron. En general, lo que antes era un día de trabajo ahora son 2-3 horas.

Pero hay cosas que requieren supervisión. Claude Code puede cruzar toda la data, pero la decisión estratégica la tomás vos. El voice cloning necesita iteración: las primeras versiones suenan artificiales y hay que ajustar el framework con muestras reales. El link building, las relaciones con clientes y la interpretación de cambios algorítmicos siguen siendo trabajo humano. Y si le das instrucciones vagas, te devuelve contenido vago.

---

## Cómo empezar

Si querés replicar algo de este setup:

1. Instalá Claude Code (la CLI de Anthropic, necesitás una API key o suscripción)
2. Configurá un MCP. Uno solo. Si tenés acceso a DataForSEO, empezá por ese
3. Armá tu CLAUDE.md con los flujos de trabajo, las reglas y las herramientas disponibles
4. Creá tu topical map usando el template como base y completalo con datos reales de tu nicho
5. Iterá. El primer artículo no va a ser perfecto. El quinto ya va a tener tu voz

No hace falta tener el setup completo desde el día uno. Empezá con una pieza y construí encima.

Para profundizar en cada pieza del stack:
- [Guía de MCP Servers para SEO](/blog/mcp-servers-seo): la configuración de cada servidor que uso
- [Skills de SEO para Claude Code](/blog/claude-code-skills-seo): workflows reutilizables desde keyword research hasta publicación
- [CLAUDE.md para SEO](/blog/claude-md-seo): cómo configurar el archivo de instrucciones para que Claude Code entienda tu flujo SEO
- [Subagentes de Claude Code para SEO](/blog/claude-code-subagentes-seo): cómo paralelizar tareas y escalar análisis de competidores
- [Cuánto cuesta Claude Code](/blog/claude-code-precio): desglose real de precios, planes y mi gasto mensual
- [Grok para tareas SEO de tendencias](/blog/grok-ia-seo): guía práctica para complementar con otras IAs

---

## Preguntas frecuentes sobre Claude Code para SEO

**¿Puede Claude hacer SEO?**
Sí. Claude puede ejecutar keyword research, analizar SERPs, redactar contenido optimizado, detectar keywords de oportunidad en Google Search Console y automatizar la indexación. Lo hace conectado a APIs de datos reales mediante MCPs, no con estimaciones.

**¿Qué se puede hacer con Claude Code?**
Con Claude Code podés: hacer keyword research vía DataForSEO, consultar tu GSC con SQL, crawlear competidores con Chrome DevTools, generar topical maps completos, redactar artículos con voz propia y ejecutar scripts de Python desde la terminal. Todo en una sola conversación.

**¿Cuánto cuesta usar Claude Code?**
Claude Code en sí es gratuito como CLI. El costo real es la suscripción a Claude (desde $20/mes con Claude Pro) o el consumo de API si lo usás por API key. Para flujos SEO intensivos, la suscripción Pro/Max conviene más que pagar por token. Tengo el [desglose completo de precios de Claude Code](/blog/claude-code-precio) con mi gasto real mensual.

**¿Necesito saber programar para usar Claude Code?**
No. Las tareas SEO se ejecutan en lenguaje natural — le describís lo que querés y Claude lo hace. La terminal puede intimidar al principio, pero instalación y uso básico no requieren código. Para workflows avanzados con MCPs sí ayuda entender la lógica, pero no hace falta saber programar.

---

## Hacia dónde va esto

Los consultores SEO que no incorporen [IA a su flujo de trabajo](/blog/ia-seo-2026) van a quedarse atrás. No porque la IA reemplace al consultor, sino porque el que la usa puede hacer más con el mismo tiempo.

Con Claude Code puedo entregar un topical map en una tarde, publicar un artículo optimizado en una hora y monitorear 50 keywords sin abrir una planilla. No me hace mejor SEO. Me hace más eficiente, y en consultoría eso se traduce en más valor para el cliente.

Si querés ver cómo aplico todo esto en una [auditoría SEO real](/auditoria-seo-chile), o necesitás ayuda para armar tu propia [estrategia de posicionamiento](/estrategia-seo), estoy del otro lado.

Y si querés probar algo rápido, pegá tu URL en el [analizador SEO gratuito](/analizador-seo) y mirá qué sale.
