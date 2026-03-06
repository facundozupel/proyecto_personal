---
title: "Automatizar Keyword Research con IA: Mi Workflow con Claude Code y DataForSEO"
description: "Cómo automaticé mi keyword research con Claude Code, MCP servers y DataForSEO. El workflow completo que uso para facundogrowth.com, con análisis de entropía Shannon incluido."
author: "Facundo Zupel"
date: 2026-03-06
readTime: "12 minutos"
tags: ["IA", "SEO", "Automatización", "Claude Code", "Keyword Research"]
image: /assets/blog/automatizar-keyword-research-ia/hero.webp
draft: false
---

Antes de implementar este workflow, el keyword research me llevaba entre 4 y 6 horas por artículo. Abrir Ahrefs, exportar, cruzar con Search Console, analizar la SERP manualmente, identificar intención, redactar el brief. Todo manual, todo lento, todo tedioso.

Hoy ese mismo proceso me lleva 20 minutos. Y el output es mejor, no peor.

¿Cómo? Con [Claude Code como agente central para SEO](/blog/claude-code-seo), DataForSEO como fuente de datos y MCP servers como el puente entre los dos. En este artículo te muestro el workflow completo que uso para facundogrowth.com: los pasos exactos, los endpoints reales y los resultados concretos que produce.

---

## ¿Por qué automaticé el keyword research con IA?

El keyword research manual tiene un problema estructural: el cuello de botella no es la falta de datos, sino el tiempo que lleva procesarlos. Con las herramientas disponibles tenés acceso a miles de keywords, pero tu capacidad de análisis es limitada.

Automatizar el keyword research con IA no significa delegar la estrategia. Significa eliminar el trabajo mecánico —extraer datos, cruzar métricas, filtrar por intención de búsqueda— para concentrar tu tiempo en las decisiones que requieren criterio real.

El problema que yo tenía era concreto: estaba construyendo el [topical map de facundogrowth.com](/) y necesitaba escalar la producción de contenido sin escalar las horas. O encontraba una forma de hacer el keyword research más rápido, o el proyecto no era viable.

Según [Backlinko](https://backlinko.com/content-marketing-stats), el 94% del contenido publicado en internet no recibe ningún enlace externo. La mayoría de ese contenido existe porque alguien eligió una keyword sin entender la intención de búsqueda real. Un workflow automatizado no te garantiza éxito, pero sí te da más señales antes de escribir una sola palabra.

---

## ¿Cuál es el stack que uso para automatizar el keyword research?

Mi stack tiene tres componentes: Claude Code como agente orquestador, DataForSEO como fuente de datos de keywords y SERP, y MCP servers como capa de integración entre los dos.

**Claude Code** es el agente que orquesta todo el proceso. No es un chatbot donde yo hago preguntas y él responde. Es un agente que ejecuta herramientas, procesa datos, toma decisiones intermedias y genera outputs estructurados. La diferencia es importante: Claude Code no solo sugiere, actúa. Si querés entender cómo funciona en el contexto más amplio del SEO, lo explico en el [artículo central sobre Claude Code para SEO](/blog/claude-code-seo).

**DataForSEO** es la API que uso para extraer datos de keywords, volúmenes de búsqueda, dificultad, co-ocurrencia semántica y resultados de SERP. Tiene endpoints específicos para cada capa del análisis y los costos son razonables para el volumen que manejo.

**MCP servers** son los conectores que exponen los endpoints de DataForSEO como herramientas nativas dentro de Claude Code. Básicamente, Claude Code puede llamar a `KeywordSuggestions`, `KwsRelacionadas` o `SerpResultados` directamente, sin que yo tenga que copiar y pegar nada. Para ver cómo se configuran en detalle, tengo un artículo específico sobre [MCP servers para SEO](/blog/mcp-servers-seo).

---

## ¿Cómo funciona el workflow de keyword research automatizado paso a paso?

El workflow tiene seis pasos que Claude Code ejecuta de forma secuencial, con un paso de síntesis al final. Te lo cuento como lo ejecuto realmente, no como una versión idealizada para una demo.

### ¿Qué hace el Paso 1 con las seed keywords?

El primer paso es darle a Claude Code una seed keyword y pedirle que ejecute `KeywordSuggestions` a través del MCP de DataForSEO. Este endpoint devuelve keywords relacionadas con métricas reales: volumen de búsqueda mensual, CPC, dificultad de keyword (KD) y tendencia.

El output típico para una seed keyword como "keyword research" en Chile incluye entre 80 y 200 variaciones con datos concretos. Claude Code no me tira ese listado crudo: lo procesa, filtra por volumen mínimo, agrupa por intención aparente y marca las long-tail con baja competencia.

Lo que me ahorra este paso es la parte más tediosa del keyword research manual: expandir manualmente una keyword en todas sus variaciones. Antes tardaba 45 minutos en esto. Ahora tarda 90 segundos.

### ¿Cómo amplía la cobertura semántica el Paso 2?

El segundo paso usa `KwsRelacionadas`, que es un endpoint diferente al de sugerencias. Mientras `KeywordSuggestions` trabaja con variaciones de la keyword principal, `KwsRelacionadas` mapea co-ocurrencia semántica: términos que aparecen frecuentemente juntos a tu keyword en el corpus de búsquedas real.

Esto me dice que si escribo sobre "keyword research automatizado", debo incluir términos como "search intent", "análisis semántico", "contenido pilar" y "content calendar". No porque sean sinónimos, sino porque los documentos que rankean para ese tema los tienen en común.

Estos términos de co-ocurrencia son lo que en SEO semántico llamamos microsemántica. Incorporarlos de forma natural le dice a Google que el artículo tiene profundidad conceptual real, no solo densidad de keyword. La lógica de cómo los skills y sub-agents de Claude Code aplican esto en la práctica la explico en el artículo sobre [Claude Code Skills para SEO](/blog/claude-code-skills-seo).

### ¿Qué información extrae el análisis de SERP en el Paso 3?

El tercer paso es donde más tiempo ahorraba antes, porque analizar la SERP manualmente es agotador. Claude Code ejecuta `SerpResultados` para la keyword principal y devuelve la composición completa del resultado de búsqueda: presencia de AI Overview, SERP features activos (People Also Ask, featured snippets, Knowledge Panel), tipos de resultado que dominan (artículos, videos, herramientas, landing pages) y las URLs de los top 10 orgánicos.

Con esa información, Claude Code infiere el content type ganador. Si el top 3 son artículos tipo "cómo hacer X paso a paso", el formato ganador es tutorial. Si dominan las comparativas, el formato ganador es "X vs Y". Si hay mucha presencia de herramientas, hay intención transaccional mezclada con informacional.

Este análisis antes me llevaba 30 a 40 minutos leyendo cada resultado. Ahora tengo la síntesis en 2 minutos y puedo profundizar en los competidores específicos que me interesan.

### ¿Qué es el análisis de entropía SEO y por qué lo agregué al workflow?

Este es el paso que más me diferencia de los workflows que vi publicados por otros. El análisis de entropía SEO usa el concepto de [entropía de Shannon](https://en.wikipedia.org/wiki/Entropy_(information_theory)) para clasificar los términos del contenido de los competidores en dos categorías: **consensus terms** (entropía normalizada baja, H_norm < 0.3) y **specialist terms** (entropía normalizada alta, H_norm > 0.7).

Los consensus terms son los que aparecen en prácticamente todos los artículos que rankean para una keyword. Son obligatorios. Si no los incluís, Google probablemente considera que tu artículo está incompleto para el tema. Los specialist terms, en cambio, son los que diferencian al contenido especializado del contenido genérico.

Tengo un script en Python que hace este análisis: `scripts/seo-entropy/analyze.py`. Claude Code lo ejecuta pasándole las URLs de los top competidores, y el output es un JSON con los términos clasificados. Los consensus terms se convierten en requisitos obligatorios del brief de contenido.

Para la keyword "keyword research automatizado", los consensus terms que emergieron del análisis fueron: "intención de búsqueda", "volumen de búsqueda", "herramientas SEO", "búsqueda orgánica", "análisis de contenido". Los specialist terms que uso para diferenciar: "entropía de Shannon", "co-ocurrencia semántica", "MCP servers", "análisis agéntico".

### ¿Cómo filtra Claude Code el listado final de keywords?

El quinto paso es la síntesis inteligente. Claude Code tiene en este punto tres datasets: las sugerencias de keywords con métricas, los términos de co-ocurrencia semántica y el análisis de SERP con los content types ganadores.

Con esa información, aplica un filtro multi-criterio. Prioriza keywords que combinan: volumen suficiente para justificar el esfuerzo, dificultad manejable para el perfil de autoridad del sitio, intención coherente con la etapa del topical map donde va el artículo (TOFU, MOFU o BOFU) y ausencia de canibalización con contenido existente en el sitio.

A ver, te lo explico mejor con un ejemplo concreto. Para este artículo, el filtro eliminó variaciones como "keyword research gratis" (intención de herramienta, no de aprendizaje), "keyword research seo" (demasiado genérica, ya cubierta en otro artículo) y "keyword research avanzado" (sin volumen suficiente en Chile). El resultado es el cluster semántico que ves reflejado en el frontmatter y la estructura de este artículo.

Este filtrado inteligente conecta directamente con la estrategia de [automatización SEO con Python](/blog/automatizacion-seo-python) que implementé antes de migrar a Claude Code: los criterios son los mismos, lo que cambió es quién los aplica.

### ¿Qué genera el workflow como output final?

El output final no es una lista de keywords. Es un brief de contenido estructurado.

El brief incluye: la keyword principal con sus variaciones semánticas, los consensus terms obligatorios identificados por el análisis de entropía, el content type ganador según la SERP (con ejemplos de competidores reales), la estructura de H2/H3 sugerida basada en los People Also Ask y los encabezados que más se repiten en el top 10, las páginas del sitio que corresponde enlazar internamente, y una estimación de longitud objetivo.

Con ese brief, redactar el artículo es más rápido porque no hay incertidumbre sobre qué incluir. Las decisiones estratégicas ya están tomadas. Lo que queda es la escritura y el criterio editorial, que esos sí requieren juicio humano.

El brief también sirve como input para generar un content calendar. Claude Code puede tomar diez seed keywords, ejecutar el workflow en paralelo para todas y devolver diez briefs ordenados por prioridad estratégica según el topical map.

---

## ¿Cuánto tiempo ahorra este workflow en la práctica?

Antes de implementarlo, el keyword research más el análisis de intención más el brief para un artículo me llevaba entre 4 y 6 horas. Desglosado: 45 minutos expandiendo la seed keyword, 30 minutos analizando la SERP manualmente, 2 a 3 horas leyendo competidores y extrayendo estructura, 1 hora redactando el brief.

Con el workflow automatizado el proceso completo lleva entre 15 y 25 minutos. Los primeros cuatro pasos los ejecuta Claude Code sin intervención mía. El filtrado final requiere que yo revise el output y valide las decisiones estratégicas, lo que lleva 5 a 10 minutos. El brief está listo al terminar.

| Etapa del proceso | Tiempo manual | Tiempo automatizado |
|---|---|---|
| Expansión de seed keywords | 45 min | 90 segundos |
| Análisis de co-ocurrencia semántica | 30 min | 2 minutos |
| Análisis de SERP y content type | 40 min | 2 minutos |
| Análisis de entropía (competidores) | 90 min | 5 minutos |
| Filtrado y brief de contenido | 60 min | 10 minutos |
| **Total** | **4-6 horas** | **15-25 minutos** |

El ahorro mensual para facundogrowth.com, donde publico entre 6 y 10 artículos por mes, es de entre 25 y 55 horas. Literalmente un trabajo a tiempo parcial que eliminé del proceso.

No te voy a mentir: el setup inicial tomó tiempo. Configurar los MCP servers, ajustar los criterios de filtrado, construir el script de entropía, depurar el workflow completo. Fueron aproximadamente 20 horas de trabajo de infraestructura. Pero se recuperó en el primer mes de uso.

---

## ¿Cuándo no funciona el workflow automatizado?

Hay situaciones donde el workflow da outputs menos útiles y necesito intervenir más manualmente.

**Keywords con volumen muy bajo o cero.** DataForSEO no tiene datos confiables para keywords con menos de 10 búsquedas mensuales. Para estrategias first mover —como algunas que ejecuto en facundogrowth.com— el análisis de SERP es casi vacío porque no hay competidores establecidos. Ahí el criterio estratégico propio pesa más que los datos.

**Nichos muy locales.** El corpus de co-ocurrencia semántica está sesgado hacia términos en inglés y mercados grandes. Para nichos muy específicos de Chile o LATAM, los términos de co-ocurrencia a veces no reflejan cómo realmente habla la audiencia local.

**Canibalización no evidente.** El filtro de Claude Code detecta canibalización si le das las URLs existentes del sitio, pero no detecta oportunidades de consolidación que requieren análisis editorial profundo. Eso sigo haciéndolo manualmente.

Básicamente, el workflow automatiza el 80% del proceso con precisión alta. El 20% restante sigue requiriendo juicio humano. Y eso está bien: no busco automatizar el criterio, busco automatizar la recolección y el procesamiento de datos para tomar mejores decisiones más rápido.

---

## ¿Cómo podés replicar este workflow?

Si querés implementar algo similar, te doy el camino más directo, sin rodeos.

**Primero:** Necesitás acceso a la API de DataForSEO. El costo depende del volumen de llamadas, pero para un sitio pequeño o mediano, el gasto mensual ronda los 20 a 50 USD. Mucho menos que una suscripción a Ahrefs o Semrush.

**Segundo:** Necesitás Claude Code con los MCP servers de DataForSEO configurados. La [documentación oficial de Anthropic sobre MCP](https://docs.anthropic.com/en/docs/claude-code/mcp) explica el proceso de configuración. Los endpoints que uso para el keyword research son `KeywordSuggestions`, `KwsRelacionadas` y `SerpResultados`.

**Tercero:** El análisis de entropía requiere que el contenido de los competidores esté extraído. Uso Crawl4AI para esto, que es una herramienta de scraping diseñada para LLMs. El script `analyze.py` toma el JSON con el contenido y devuelve la clasificación por nivel de entropía normalizada.

**Cuarto:** El filtrado inteligente de Claude Code depende del contexto que le das sobre tu sitio. Necesitás darle información sobre tu topical map, las URLs existentes, el perfil de autoridad objetivo y la etapa de madurez del sitio. Sin ese contexto, el filtrado es genérico y menos preciso.

Si estás empezando y querés algo más simple, podés ejecutar solo los pasos 1 a 3 con los MCP servers de DataForSEO y hacer el análisis de intención manualmente. Ya ahorrás el 60% del tiempo sin necesitar el script de entropía.

Para comparar este stack con otras opciones del mercado, el artículo sobre [Claude Code vs Cursor para SEO](/blog/claude-code-vs-cursor-seo) tiene un análisis detallado de los trade-offs.

---

## Preguntas frecuentes sobre automatizar keyword research con IA

### ¿Se puede automatizar el keyword research con ChatGPT?

ChatGPT puede ayudar con análisis de intención y generación de variaciones semánticas, pero sin integración con una API de datos reales, los volúmenes de búsqueda y la dificultad son estimaciones, no datos. Para un workflow serio, necesitás una fuente de datos real además del modelo de lenguaje. Cómo comparo los enfoques de los distintos modelos lo desarrollo en el artículo sobre [ChatGPT para SEO](/blog/chatgpt-para-seo).

### ¿Cuánto cuesta implementar este workflow?

Los costos principales son DataForSEO API (estimado 20 a 50 USD por mes para uso moderado), Claude Code incluido en el plan de Anthropic que uses, y Crawl4AI si lo desplegás en servidor propio (costo de infraestructura, no de licencia, porque es open source). La inversión de setup es de tiempo, no de software.

### ¿Es necesario saber programar para usar este workflow?

Para el flujo básico con MCP servers y Claude Code, no necesitás programar. Claude Code puede ejecutar los endpoints de DataForSEO directamente si los MCP servers están configurados. El script de análisis de entropía sí requiere Python básico para instalarlo y correrlo, pero no para entender sus resultados ni para modificarlo.

### ¿El keyword research automatizado reemplaza a los consultores SEO?

No, y creo que esta es la confusión más común sobre IA y SEO. El workflow automatizado reemplaza la parte mecánica del keyword research: extraer datos, cruzar métricas, formatear briefs. La parte estratégica —qué temas construyen autoridad topical, cómo posicionar el sitio frente a la competencia, cuándo atacar keywords de alta dificultad— sigue requiriendo experiencia y contexto del negocio. Si querés profundizar en cómo pienso la estrategia de keywords, podés ver la [guía de keyword research](/blog/keywords-research-guia).

---

## ¿Qué viene después de automatizar el keyword research?

El keyword research automatizado es el primer paso de un workflow SEO más amplio. Una vez que tenés el brief, el siguiente cuello de botella es la producción de contenido: cómo redactar artículos que cumplan con la estructura que la SERP premia sin perder la voz propia del sitio.

Eso también lo estoy automatizando, pero con un enfoque diferente al que probablemente estás pensando. No es generar contenido con IA de forma genérica. Es usar Claude Code con skills especializados y frameworks de voz para producir drafts que requieren edición mínima.

Si te interesa ver cómo funciona esa parte del pipeline, [agenda un diagnóstico SEO gratuito](/) y te cuento cómo está implementado para facundogrowth.com y cómo podría funcionar para tu proyecto.
