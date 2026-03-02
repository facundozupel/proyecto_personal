---
title: "Prompts de ChatGPT para SEO: Los Mejores Prompts para Posicionamiento"
description: "Los mejores prompts de ChatGPT para SEO organizados por tarea: keyword research, auditoría técnica, contenido, link building y SEO local. Prompts reales que uso en consultoría, incluyendo Claude."
author: "Facundo Zupel"
date: 2026-03-01
readTime: "14 minutos"
tags: ["IA", "ChatGPT", "SEO", "Prompts", "Automatización"]
draft: false
category: "ia-en-seo"
heroImage: "/assets/blog/prompts-chatgpt-seo/hero.webp"
---

Voy a ser honesto: la mayoría de los listados de "prompts de ChatGPT para SEO" que encontrás online son básicamente inútiles para el trabajo real.

"Generame 10 ideas de contenido para mi blog sobre [tema]". "Actuá como experto SEO y optimizá este texto". Sí, técnicamente son prompts de SEO. Pero son el equivalente a darle a alguien un bisturí y llamarlo cirujano.

Lo que voy a mostrarte acá es distinto. Son los prompts que uso en mi trabajo real como [consultor SEO](/consultor-seo-chile): prompts con estructura de cuatro componentes (rol + contexto + tarea + formato), organizados por la tarea SEO específica que resuelven, y con las variaciones que funcionan con distintos modelos.

También voy a incluir prompts para Claude — no solo para ChatGPT — porque en 2026 limitarse a un solo modelo es como usar solo un destornillador cuando tu caja de herramientas tiene veinte opciones.

---

## ¿Qué hace que un prompt de SEO sea bueno?

Un prompt de SEO funciona bien cuando tiene cuatro componentes: rol, contexto de datos reales, tarea específica y formato de salida. Sin datos externos, la IA adivina. Con datos de Google Search Console, DataForSEO o Ahrefs como input, se convierte en un asistente de análisis que realmente resuelve problemas.

La mayoría de los prompts genéricos que circulan solo tienen el componente de tarea. Y sin el contexto, el modelo de lenguaje hace lo que mejor sabe hacer: rellenar con palabras plausibles.

Esta es la estructura que uso:

```
ROL: Sos un especialista en SEO con +5 años en [verticales específicos].

CONTEXTO: [Datos reales: URLs, keywords, texto, datos GSC, CSV exportado]

TAREA: [Una sola instrucción concreta y acotada]

FORMATO: [Tabla, lista, JSON, HTML, texto plano — especificá el output exacto]

RESTRICCIONES: [Qué NO hacer: no inventar datos, no cambiar keywords exactas, mantener tono]
```

¿Por qué este orden? Porque las restricciones al final funcionan mejor que al principio. El modelo primero entiende qué debe hacer y después aplica los límites. Al revés, tiende a interpretar las restricciones como el objetivo principal.

Ahora sí, vamos a los prompts por tarea.

---

![Estructura de un prompt SEO efectivo: Rol, Contexto, Tarea, Formato y Restricciones](/assets/blog/prompts-chatgpt-seo/estructura-prompt-seo.webp)

## ¿Cuáles son los mejores prompts de ChatGPT para keyword research?

Los mejores prompts de keyword research con ChatGPT son los que usan datos que vos le proveés — listas de keywords con volúmenes, datos de GSC, o clusters de competidores — porque ChatGPT no tiene acceso a datos de búsqueda en tiempo real por sí solo.

Aclaro esto porque el error más común que veo es pedirle a ChatGPT que "encuentre keywords" sin darle datos. El modelo va a generar keywords que suenan razonables, pero no tiene forma de saber cuáles tienen volumen real, cuáles están trending o cuáles ya rankeas vos.

**Prompt 1 — Keyword clustering por intención**

Usalo cuando tenés una lista de keywords exportada de Semrush, Ahrefs o DataForSEO y necesitás agruparlas:

```
ROL: Sos un especialista en SEO con experiencia en arquitectura de contenido y análisis de intención de búsqueda.

CONTEXTO: Tenés este listado de keywords de un sitio de [temática]:
[PEGÁ TU LISTA DE KEYWORDS AQUÍ]

TAREA: Agrupalas por intención de búsqueda dominante. Las categorías posibles son: Informacional, Navegacional, Comercial (investigación de compra) y Transaccional.

FORMATO: Tabla con columnas: Keyword | Intención | Cluster temático | Página recomendada (formato /slug). Ordenada por intención de búsqueda.

RESTRICCIONES: No mezcles keywords de distinta intención en el mismo grupo aunque el tema sea similar. Si una keyword es ambigua, marcala con "(revisar)" en la columna de intención.
```

**Prompt 2 — Long-tail desde keywords de alta competencia**

Usalo cuando querés expandir keywords difíciles hacia variantes de cola larga con menor dificultad:

```
ROL: Sos especialista en keyword research con enfoque en estrategia de contenido para sitios con autoridad media-baja.

CONTEXTO: Tengo estas keywords principales para las que quiero rankear pero que tienen alta dificultad:
[LISTA DE KEYWORDS PRINCIPALES]

Mi sitio es [URL o descripción del sitio]. Autoridad de dominio: [DA/DR aproximado].

TAREA: Generá variaciones long-tail (3-5 palabras) de cada keyword que mantengan la intención de búsqueda pero con menor competencia probable. Priorizá variaciones de pregunta (¿cómo?, ¿qué es?, ¿cuánto?) y variaciones locales/específicas.

FORMATO: Para cada keyword original, 5 variaciones long-tail. Indicá si son tipo pregunta, local, o específica de nicho.

RESTRICCIONES: No inventes volúmenes. No asumas que una long-tail tiene menos competencia — solo generá variantes que tengan ese potencial para que yo las valide con herramientas de datos.
```

**Prompt 3 — Detectar intención de búsqueda de una keyword ambigua**

Usalo antes de crear contenido para keywords donde no sabés si Google premia artículo, landing o comparativa:

```
ROL: Sos experto en análisis de intención de búsqueda y SERP.

CONTEXTO: Quiero entender qué tipo de contenido debería crear para rankear con esta keyword: [KEYWORD].

El sector es [sector/industria]. El país/idioma objetivo es [país, ej: Chile / español].

TAREA: Basándote en el tipo de keyword, su estructura gramatical y el sector, inferí:
1. Qué intención de búsqueda tiene más probabilidad (informacional/comercial/transaccional/navegacional)
2. Qué formato de contenido probablemente premia Google (artículo, landing, listado, comparativa, herramienta)
3. Qué tipo de usuario la busca y en qué etapa del funnel está

FORMATO: Análisis en 3 bloques separados con las respuestas anteriores. Después, una recomendación final de 2-3 líneas sobre qué crear.

RESTRICCIONES: Aclará que estas inferencias son hipótesis basadas en el análisis semántico, no en datos SERP reales. Yo las valido después mirando Google.
```

---

## ¿Cuáles son los mejores prompts de ChatGPT para auditoría técnica SEO?

Los mejores prompts de ChatGPT para auditoría técnica son los que trabajan con datos de tu sitio — exports de Screaming Frog, GSC, PageSpeed — porque el modelo no puede rastrear URLs por sí solo.

ChatGPT no puede crawlear tu sitio. Eso es fundamental entenderlo. Lo que sí puede hacer es analizar datos que vos le pasás, detectar patrones y priorizar problemas. Basicamente, actúa como analista si le das la data cruda.

Para una [auditoría SEO completa](/auditoria-seo-chile) de tu sitio, estas tareas de análisis con IA son uno de los pasos, no el único paso.

**Prompt 4 — Priorización de problemas técnicos**

Usalo cuando tenés el export de Screaming Frog o una herramienta de crawling y necesitás saber por dónde empezar:

```
ROL: Sos consultor SEO técnico con experiencia en auditorías de sitios medianos y grandes.

CONTEXTO: Este es el reporte de problemas técnicos de mi sitio:
[PEGÁ EL EXPORT O LISTADO DE ERRORES AQUÍ]

Mi sitio es [URL]. Tiene aproximadamente [N] páginas indexadas. El objetivo principal es [aumentar tráfico orgánico / mejorar CTR / resolver errores de crawl / etc].

TAREA: Priorizá los problemas técnicos por impacto potencial en SEO. Usá una escala de 3 niveles: Crítico (resolver esta semana), Importante (próximo sprint), Menor (backlog).

FORMATO: Tabla con columnas: Problema | Nivel | Impacto esperado | Acción recomendada. Ordenada por nivel de urgencia.

RESTRICCIONES: No exageres la urgencia de problemas menores para que el listado parezca más grave. Si algo es menor, decilo. Si no tenés certeza del impacto, indicá "impacto variable según contexto".
```

**Prompt 5 — Análisis de meta titles y descriptions en masa**

Usalo cuando tenés URLs con CTR bajo en GSC y querés reescribir los meta datos:

```
ROL: Especialista en optimización de CTR orgánico y escritura de meta datos.

CONTEXTO: Estas URLs tienen CTR bajo (menor al 2%) con más de 100 impresiones mensuales en Google Search Console:
[FORMATO: URL | Title actual | Meta description actual | Keyword principal | Posición promedio]

TAREA: Reescribí el title y la meta description de cada URL para mejorar el CTR. El title debe: máximo 60 caracteres, incluir la keyword principal, tener una propuesta de valor concreta. La meta description: máximo 155 caracteres, complementar el title, incluir un CTA implícito.

FORMATO: Tabla con columnas: URL | Title nuevo | Meta description nueva | Caracteres title | Caracteres description.

RESTRICCIONES: No uses frases genéricas como "descubrí todo sobre" o "aprende más". No inventes beneficios. No uses clickbait que no se pueda sostener con el contenido real. Mantené el idioma del original.
```

**Prompt 6 — Detectar canibalización de keywords**

Usalo con el export de GSC organizado por página y keyword:

```
ROL: Especialista en arquitectura SEO y resolución de canibalización de keywords.

CONTEXTO: Este es el listado de páginas de mi sitio con sus keywords principales (según Google Search Console):
[URL | Keyword principal | Posición | Clics | Impresiones]

TAREA: Identificá pares de páginas que podrían estar canibalizando la misma keyword o keywords semánticamente equivalentes. Indicá qué página debería ser la dominante y qué hacer con la otra.

FORMATO: Para cada caso de canibalización detectado: Keyword en disputa | Página A (más fuerte) | Página B (más débil) | Recomendación (consolidar / redirigir / diferenciar intención).

RESTRICCIONES: Solo marcá canibalización cuando haya overlap real de intención, no solo de tema. Dos páginas sobre "SEO técnico" y "auditoría SEO técnica" pueden no estar canibalizando si sirven intenciones distintas.
```

---

## ¿Cuáles son los mejores prompts de ChatGPT para optimización de contenido?

Los mejores prompts de ChatGPT para contenido SEO son los que primero hacen un gap analysis semántico — identificar qué términos tienen los competidores y vos no — y después incorporan esos términos al texto original de forma contextualmente válida.

El error que comete el 90% de los que usan IA para contenido es pedirle que "optimice para SEO" sin decirle qué falta. Sin ese diagnóstico previo, la IA reescribe lo que ya tenés con otras palabras.

**Prompt 7 — Incorporar términos semánticos sin reescribir el texto**

Usalo después de analizar qué términos tienen los competidores y tu texto no:

```
ROL: Especialista en optimización semántica on-page.

CONTEXTO: Este es un artículo sobre [keyword] que quiero optimizar:
[TEXTO COMPLETO]

Estos son los términos que necesito incorporar al texto (son consensus terms que los competidores tienen y mi artículo no):
[LISTA DE TÉRMINOS SEMÁNTICOS]

TAREA: Incorporá estos términos al texto de forma natural. Podés añadir oraciones, expandir párrafos existentes o agregar una nueva sección donde tenga sentido contextual. No reescribas ni elimines el contenido que ya existe.

FORMATO: El texto completo con los cambios incorporados. Marcá con [AGREGADO] cada fragmento nuevo para que pueda revisarlo fácilmente.

RESTRICCIONES: Cada término debe aparecer en un contexto que aporte información real, no como relleno. Si un término no encaja naturalmente en ninguna parte del texto, indicámelo al final con una sugerencia de dónde y cómo crearlo.
```

**Prompt 8 — Generar el snippet ganador para el párrafo de apertura**

Usalo para estructurar el primer párrafo de cada sección H2 de forma que capture featured snippets:

```
ROL: Especialista en optimización de featured snippets y posicionamiento de respuestas directas.

CONTEXTO: Quiero posicionar esta sección de mi artículo para que Google la use como respuesta directa (featured snippet / AI Overview):

Keyword objetivo: [KEYWORD]
H2 de la sección: [TÍTULO H2]
Contenido actual de la sección: [CONTENIDO]

TAREA: Reescribí los primeros dos párrafos de esta sección para que respondan la pregunta del H2 de forma directa, en máximo 40 palabras en el primer párrafo, y luego expandan con contexto en el segundo. Este es el formato que Google premia para snippets.

FORMATO: Dos párrafos separados. El primero debe ser la respuesta directa y autocontenida. El segundo expande con datos o contexto.

RESTRICCIONES: El primer párrafo debe poder leerse solo y responder la pregunta completamente. No empieces con "Sí" o "No" sin contenido inmediato después. No uses frases vagas como "esto depende de".
```

**Prompt 9 — Generar FAQs con schema markup incluido**

Usalo para crear la sección de preguntas frecuentes con el JSON-LD listo para implementar:

```
ROL: Especialista en datos estructurados y optimización para AI Overviews.

CONTEXTO: Este es mi artículo sobre [keyword]:
[TEXTO COMPLETO O RESUMEN]

Las preguntas que más aparecen en "la gente también pregunta" para esta keyword son:
[LISTA DE PREGUNTAS DE PAA]

TAREA:
1. Generá respuestas de 40-80 palabras para cada pregunta, en tono [informal/formal], que complementen el contenido del artículo y no lo repitan
2. Generá el schema FAQPage en JSON-LD válido con todas las preguntas y respuestas

FORMATO: Primero el bloque de FAQs en markdown (### pregunta / párrafo respuesta). Después el JSON-LD en bloque de código separado.

RESTRICCIONES: Las respuestas deben ser específicas y con datos cuando sea posible. No inventes estadísticas. El JSON-LD debe seguir la especificación de schema.org/FAQPage.
```

---

## ¿Cuáles son los mejores prompts de ChatGPT para link building?

Los mejores prompts de ChatGPT para link building son los que ayudan a identificar oportunidades, personalizar outreach en escala y analizar el perfil de backlinks, no los que intentan generar backlinks directamente — eso no es algo que un modelo de lenguaje pueda hacer.

**Prompt 10 — Personalizar emails de outreach a escala**

Usalo cuando tenés una lista de sitios de donde querés conseguir enlaces:

```
ROL: Especialista en outreach de link building con experiencia en personalización de emails de alta conversión.

CONTEXTO: Quiero conseguir un enlace desde estos sitios para mi artículo [URL]:
[LISTA DE SITIOS TARGET CON INFORMACIÓN: URL | Nombre del editor/autor si lo sabés | Tema del sitio | Por qué mi artículo les aportaría valor]

Mi propuesta de valor: [Qué ofrece tu artículo que no tienen ellos / por qué deberían enlazarlo]

TAREA: Para cada sitio, escribí un email de outreach personalizado de 3-4 párrafos que: referencie algo específico de ese sitio para demostrar que lo leíste, explique por qué mi artículo complementa su contenido, pida el enlace de forma directa pero no agresiva.

FORMATO: Un email por sitio, separados por una línea. Asunto del email al inicio de cada uno.

RESTRICCIONES: No uses la misma frase de apertura en dos emails. No empieces con "Espero que este email te encuentre bien". No uses jerga corporativa. Máximo 150 palabras por email.
```

**Prompt 11 — Identificar páginas con potencial de broken link building**

Usalo cuando tenés un listado de páginas de competidores que ya no existen (404 o redirigidas):

```
ROL: Especialista en broken link building y recuperación de menciones.

CONTEXTO: Estos son recursos de mi sector que ya no están disponibles (404 o redirigidos a páginas irrelevantes):
[URL ORIGINAL | Dónde estaba enlazada | Tema que cubría]

Mi sitio tiene este contenido que podría reemplazarlos: [URL de tu recurso | Descripción breve]

TAREA: Para cada caso, evaluá si mi recurso es una reemplazante válida y generá el pitch de outreach para los sitios que enlazan a la URL rota.

FORMATO: Para cada URL rota: [Válido/No válido como reemplazo] + [Justificación] + [Pitch de 2-3 oraciones si es válido].

RESTRICCIONES: Solo marcá como válido si hay match real de intención entre el recurso roto y el mío. No fuerces la conexión para que parezca que tengo más oportunidades.
```

---

## ¿Cuáles son los mejores prompts de ChatGPT para SEO local?

Los mejores prompts de ChatGPT para SEO local son los que trabajan con la información específica del negocio — categorías de Google Business Profile, reseñas existentes, keywords locales — porque el SEO local es altamente dependiente del contexto de cada negocio y ubicación.

Para una estrategia local completa, si trabajás como [consultor SEO](/consultor-seo-chile) en Chile o en cualquier mercado hispanohablante, los prompts de abajo son los que más impacto me han dado en la práctica.

**Prompt 12 — Optimizar la descripción de Google Business Profile**

```
ROL: Especialista en SEO local y optimización de Google Business Profile.

CONTEXTO:
Negocio: [NOMBRE]
Rubro: [CATEGORÍA]
Ubicación: [CIUDAD, PAÍS]
Descripción actual: [DESCRIPCIÓN ACTUAL O "ninguna"]
Servicios principales: [LISTA]
Keywords locales objetivo: [KEYWORDS]

TAREA: Escribí 3 versiones de descripción para el Google Business Profile, cada una con enfoque distinto: una orientada a servicios, una a resultados/beneficios, y una a la diferenciación del negocio. Máximo 750 caracteres cada una.

FORMATO: 3 bloques separados, con el recuento de caracteres al final de cada uno y una recomendación de cuál usar según el perfil del negocio.

RESTRICCIONES: No uses palabras spam (mejor, líder, número 1, garantizado). No repitas la ciudad más de 2 veces. Incluí las keywords de forma natural, sin keyword stuffing.
```

**Prompt 13 — Responder reseñas negativas en escala**

```
ROL: Especialista en gestión de reputación online y SEO local.

CONTEXTO: Estas son reseñas negativas de mi negocio [NOMBRE] en Google:
[RESEÑA 1 — 2 estrellas: "texto de la reseña"]
[RESEÑA 2 — 1 estrella: "texto de la reseña"]

TAREA: Escribí una respuesta para cada reseña que: reconozca el problema sin invalidar al cliente, ofrezca una solución o próximo paso concreto, mantenga un tono profesional pero empático, y cierre con una invitación a continuar la conversación en privado.

FORMATO: Una respuesta por reseña. Máximo 150 palabras cada una.

RESTRICCIONES: No uses respuestas genéricas del tipo "Gracias por tu feedback, lo tendremos en cuenta". No seas defensivo. No des excusas. Si el cliente tiene razón, reconocelo.
```

---

## ¿Cuáles son los mejores prompts para análisis de competidores?

Los mejores prompts para análisis de competidores con ChatGPT son los que procesan contenido que vos extrajiste de los sitios competidores — estructura de H2s, textos, meta datos — porque el modelo no puede navegar a las URLs por sí solo.

Para esta tarea, en mi stack uso Chrome DevTools MCP para navegar y extraer el contenido de los competidores, y después le paso esa data a Claude para el análisis. Es la combinación que más me funciona en la práctica.

**Prompt 14 — Gap analysis de contenido vs competidores**

```
ROL: Especialista en análisis competitivo de contenido SEO.

CONTEXTO: Esta es la estructura de los 3 principales competidores para la keyword [KEYWORD]:

Competidor 1 ([URL]):
H2s: [lista de H2s]
Temas cubiertos: [resumen]

Competidor 2 ([URL]):
H2s: [lista de H2s]
Temas cubiertos: [resumen]

Competidor 3 ([URL]):
H2s: [lista de H2s]
Temas cubiertos: [resumen]

Mi contenido actual sobre este tema cubre: [resumen de tu contenido o "ninguno todavía"]

TAREA:
1. Identificá los temas/secciones que los 3 competidores tienen en común (consensus content — lo que Google espera ver)
2. Identificá los temas que solo 1 o 2 competidores cubren (oportunidades de diferenciación)
3. Identificá los temas que ningún competidor cubre pero son relevantes para la keyword

FORMATO: 3 listas separadas con título claro. En la tercera lista, agregá una nota de si ese gap existe porque el tema no tiene demanda o porque ninguno lo vio todavía.
```

---

## ¿Cómo usar Claude para SEO además de ChatGPT?

Claude es especialmente útil para SEO cuando necesitás procesar documentos largos, mantener consistencia de voz en redacción extensa, o conectar herramientas externas mediante MCPs — algo que ChatGPT no puede hacer de forma nativa.

La pregunta que recibo seguido es: ¿ChatGPT o Claude para SEO? No es lo uno o lo otro. Son herramientas con fortalezas distintas.

ChatGPT en su versión con navegación es bueno para consultas ad-hoc donde necesitás que el modelo busque información actualizada. Claude, especialmente en la versión Claude Code, es mejor cuando necesitás automatización real: conectarle DataForSEO, Google Search Console, o un crawleador web mediante MCPs y que ejecute workflows completos sin que vos intervengas en cada paso.

Si te interesa ver cómo se ve ese workflow automatizado, escribí una [guía completa de Claude Code para SEO](/blog/claude-code-seo) con la configuración real de los MCPs que uso en producción.

**Prompt 15 — Brief de artículo para Claude**

Este prompt funciona especialmente bien con Claude porque tiene ventana de contexto grande y sigue instrucciones estructuradas más consistentemente:

```
ROL: Sos un especialista en SEO con voz propia y directa. Redactás en español rioplatense. Sabés mucho pero bajás al nivel del lector — sos un Traductor Entusiasta.

CONTEXTO:
Keyword objetivo: [KEYWORD]
Intención de búsqueda: [Informacional/Comercial/etc]
Audiencia: [descripción de quién lee esto]
Consensus terms (obligatorios en el texto): [LISTA]
Internal links obligatorios: [URL1 (anchor: "texto"), URL2 (anchor: "texto")]
Competidores principales: [URL1, URL2, URL3]
Lo que los competidores tienen y yo quiero superar: [gap específico]

TAREA: Escribí un artículo completo de 2500-3000 palabras optimizado para esta keyword. Estructura: H2s como preguntas que el usuario haría en Google. Cada H2 abre con un snippet de respuesta directa de 30-40 palabras. Después expande con datos, ejemplos y contexto.

FORMATO: Markdown. No incluyas el H1 (va en el frontmatter). Incluí una sección de FAQs al final con 4 preguntas. Internal links integrados naturalmente en el texto.

RESTRICCIONES: No uses jerga corporativa vacía. No inventes estadísticas. Si usás datos, indicá de dónde vienen. Mantené el tono directo a lo largo de todo el artículo.
```

---

## ¿Cuáles son los prompts para hacer keyword research con Claude Code?

Los mejores prompts para keyword research con Claude Code son los que activan los MCPs de DataForSEO directamente — porque a diferencia de ChatGPT, Claude Code puede ejecutar queries en tiempo real contra APIs de datos y no depende de que vos le pases información.

Esto es el diferenciador principal entre Claude Code y ChatGPT para SEO. Le pedís a Claude Code que haga keyword research y lo hace con datos reales de volumen, competencia y tendencias. No infiere, consulta.

Un ejemplo de cómo funciona en la práctica:

```
Haceme un keyword research para "auditoría SEO" en Chile.
Ejecutá en paralelo KeywordSuggestions, KwsRelacionadas y SerpResultados.
Después organizá los resultados en clusters por intención de búsqueda y dame las
top 20 oportunidades ordenadas por ratio volumen/dificultad.
```

Claude Code ejecuta eso. En 30 segundos tenés el mapa completo. Para ver la guía de [keyword research](/blog/keywords-research-guia) con este enfoque y cómo se integra en una [estrategia SEO](/estrategia-seo) completa, los tenés en esos artículos.

---

## Preguntas frecuentes sobre prompts de ChatGPT para SEO

### ¿ChatGPT puede hacer keyword research real?

No por sí solo. ChatGPT no tiene acceso a datos de volumen de búsqueda ni a tendencias actuales en tiempo real. Puede ayudarte a clustering de keywords que vos le das, inferir intención de búsqueda o generar variaciones long-tail para validar — pero para datos reales necesitás herramientas como Semrush, Ahrefs o DataForSEO.

### ¿Es mejor ChatGPT o Claude para SEO?

Depende de la tarea. Para consultas ad-hoc y redacción de contenido, son comparables. Para automatización con herramientas externas (conectar DataForSEO, GSC, crawleadores), Claude con MCPs tiene ventaja significativa porque puede ejecutar workflows completos. Para keyword research con datos reales, ninguno reemplaza herramientas nativas de datos de búsqueda.

### ¿El contenido generado con IA penaliza en Google?

Google no penaliza el contenido generado por IA por el hecho de serlo. Lo que sí puede afectar negativamente es el contenido de baja calidad, sin E-E-A-T, sin perspectiva de primera mano o sin información original. La pauta oficial de Google es que el contenido que prioriza al usuario se posiciona bien, independientemente de cómo se produjo.

### ¿Cuántos prompts hay que iterar antes de tener un buen resultado?

En mi experiencia, el primer prompt casi nunca da el output ideal. El proceso que uso: ejecutar el prompt, identificar qué parte del output es genérica o incorrecta, agregar contexto específico para esa parte, y re-ejecutar. Con 2-3 iteraciones por prompt generalmente llegás a algo reutilizable como template.

### ¿Qué hago si ChatGPT empieza a inventar datos?

Es el problema más común y el más peligroso. La regla que aplico es fija: cualquier estadística, porcentaje o referencia a estudios que genere ChatGPT necesita verificación antes de publicar. Agregá siempre la restricción "no inventes datos — si no tenés la información, indicámelo" en tus prompts. Y si el modelo te da un número con fuente citada, verificá esa fuente antes de usarlo.

---

## Cómo empezar con prompts SEO hoy

Si nunca usaste prompts estructurados para SEO, el mejor punto de entrada es el Prompt 5 de este artículo — reescritura de meta titles y descriptions.

Por qué ese específicamente: es una tarea acotada, con input claro (export de GSC), output medible (CTR en 2-4 semanas) y bajo riesgo si el resultado no es perfecto (siempre podés revertir el cambio).

Una vez que tenés esa tarea sistematizada, agregás una herramienta nueva por sprint.

Si además de usar prompts querés entender cómo armar una estrategia que los integre — qué páginas trabajar primero, qué keywords priorizar, qué problemas técnicos resolver antes de invertir en contenido — eso es lo que analizo en detalle en una [auditoría SEO completa](/auditoria-seo-chile). Revisamos tu sitio, te doy el diagnóstico y salís con un plan priorizado.

Seguí explorando el tema en la guía de [ChatGPT para SEO](/blog/chatgpt-para-seo), que es el hub donde profundizo en cada capacidad del modelo más allá de los prompts. Y si querés ver el nivel siguiente — automatización real con datos en vivo — la [guía de Claude Code para SEO](/blog/claude-code-seo) muestra cómo se ve eso en producción.
