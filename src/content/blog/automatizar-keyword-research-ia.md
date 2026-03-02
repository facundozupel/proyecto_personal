---
title: "Automatizar Keyword Research con IA: Mi Workflow con Claude Code y DataForSEO"
description: "Cómo pasé de 4-6 horas de keyword research manual a 15-20 minutos con Claude Code y DataForSEO MCP. Mi workflow paso a paso con análisis de entropía Shannon incluido."
author: "Facundo Zupel"
date: 2026-03-01
readTime: "14 minutos"
tags: ["SEO", "IA", "Keyword Research", "Claude Code", "DataForSEO", "Automatización"]
draft: false
category: "ia-en-seo"
heroImage: "/assets/blog/automatizar-keyword-research-ia/hero.webp"
---

En 2023 yo hacía keyword research igual que todos: abría Semrush, Ahrefs y Google Keyword Planner en tres pestañas distintas, exportaba CSVs, los cruzaba en una planilla de Google Sheets con un café al lado y rezaba para no confundir las columnas. Cuatro a seis horas por cliente, por ciclo de contenido.

Hoy lo hago en 15 a 20 minutos. Y no porque haya encontrado un atajo que omite pasos importantes, sino porque automaticé el proceso completo con Claude Code, los MCP de DataForSEO y un algoritmo de análisis de entropía que me dice exactamente qué términos no pueden faltar en el artículo si quiero rankear.

Este artículo documenta ese workflow. No es teoría — es el proceso real que uso para cada cliente hoy, el mismo que describo en el [artículo de Claude Code para SEO](/blog/claude-code-seo) que tiene más detalles sobre la arquitectura general del stack.

---

## ¿Qué significa automatizar el keyword research con IA?

Automatizar el keyword research con IA significa conectar modelos de lenguaje con APIs de datos reales para que el análisis de keywords, co-ocurrencias semánticas, SERPs y competidores se ejecute en paralelo y se interprete en una sola conversación, sin planillas intermedias.

No es pedirle a ChatGPT "dame keywords para escribir sobre SEO". Eso no es research — es generación de texto sin datos. El keyword research real requiere volúmenes reales, dificultad real y análisis de la SERP real. Lo que cambia con IA es quién ejecuta esas consultas y cómo se interpretan los resultados.

La distinción es importante. Varios artículos sobre este tema confunden "usar IA para keyword research" con pedirle a un modelo que genere ideas de keywords. [joselab.com](https://joselab.com) tiene un artículo con "4 ideas brutales" que básicamente describe eso: usar ChatGPT como catalizador de ideas para keywords LSI, geolocalizadas o de contenido complejo. No está mal como punto de partida, pero no resuelve el problema central: esas ideas no tienen datos de volumen ni análisis de intención de búsqueda. Y el propio artículo aclara que "la IA no tiene acceso a datos de búsqueda reales".

Exacto. Por eso conecto Claude Code con DataForSEO vía MCP.

---

## ¿Por qué fui de Python a MCP Servers con Claude Code?

Mi workflow de keyword research evolucionó en tres etapas. Entender ese recorrido ayuda a entender por qué cada cambio fue necesario y no un capricho tecnológico.

### ¿Cómo era el workflow manual?

El proceso manual tenía estos pasos: abrir Semrush o Ahrefs, buscar la keyword principal, exportar suggestions, abrir otra pestaña para keywords relacionadas, copiar todo a Sheets, eliminar duplicados, filtrar por volumen y KD, mirar la SERP manualmente para entender el intent, tomar notas en un documento separado. Entre 4 y 6 horas de trabajo que producía un brief decente pero inconsistente. El tiempo variaba según el tema y cuánto café tenía encima.

### ¿Qué cambió con Python y la API de DataForSEO?

La [automatización SEO con Python](/blog/automatizacion-seo-python) fue el primer salto. Con scripts de Python conectados directamente a la API de DataForSEO podía ejecutar keyword suggestions, co-ocurrencias y SERP analysis en batch. Un script corría, guardaba los resultados en un JSON y yo los interpretaba. 1 a 2 horas en vez de 4 a 6.

Pero todavía había fricción: tenía que ejecutar el script, esperar, abrir el JSON, interpretarlo mentalmente, decidir qué hacer y ejecutar el siguiente script. El proceso era más rápido, pero seguía siendo secuencial y requería que yo fuera el conductor de cada paso.

### ¿Qué cambia con Claude Code y MCP Servers?

[Claude Code para SEO](/blog/claude-code-seo) conectado a los [MCP Servers para SEO](/blog/mcp-servers-seo) colapsa los tres pasos en uno. Claude Code ejecuta las consultas a DataForSEO en paralelo, interpreta los resultados en tiempo real y propone el brief directamente. No hay JSON intermediario que yo tenga que leer. No hay secuencia de scripts que tenga que orquestar manualmente.

Le digo: "Haceme el keyword research para 'automatizar keyword research ia' en Chile" y en 15-20 minutos tengo el mapa semántico completo, el análisis de la SERP, los términos obligatorios y opcionales, y el brief del artículo.

El ahorro de tiempo no es trivial:

| Etapa | Tiempo |
|---|---|
| Manual (planillas + herramientas visuales) | 4-6 horas |
| Python + API DataForSEO | 1-2 horas |
| Claude Code + MCP DataForSEO | 15-20 minutos |

---

## ¿Cuáles son los pasos del workflow real?

Mi proceso de keyword research automatizado con Claude Code sigue 5 pasos concretos. Los detallo con el código y las herramientas MCP que se ejecutan en cada uno.

### Paso 1: seed keywords y expansión semántica

El punto de entrada es siempre una keyword seed — el término que el cliente ya conoce, el que describe su servicio, el que usa en sus conversaciones con clientes. Desde ahí, Claude Code ejecuta dos tools MCP en paralelo:

**`KeywordSuggestions`** — Devuelve el universo de keywords relacionadas y long-tail con volumen de búsqueda, dificultad (KD) y CPC. Para "automatizar keyword research" en Chile aparecen variantes como "keyword research automatico", "herramienta keyword research ia" y "investigacion de palabras clave automatica".

**`KwsRelacionadas`** — Analiza co-ocurrencia semántica. No keywords similares — keywords que los documentos que rankean tienen en común. Esto construye el mapa de términos que Google espera encontrar en un documento sobre este tema.

```python
# Equivalente conceptual de lo que Claude Code ejecuta vía MCP
# En la práctica esto corre directamente desde Claude sin código manual

import requests

# KeywordSuggestions via DataForSEO API
payload = {
    "keyword": "automatizar keyword research ia",
    "location_code": 2152,  # Chile
    "language_code": "es",
    "limit": 100,
    "filters": [["keyword_data.keyword_info.search_volume", ">", 0]]
}

# KwsRelacionadas (Related Keywords)
payload_related = {
    "keyword": "automatizar keyword research ia",
    "location_code": 2152,
    "language_code": "es",
    "limit": 50
}
```

El resultado es un mapa de 50 a 150 keywords con datos reales. Sin inventar, sin adivinar volúmenes.

### Paso 2: análisis de la SERP

Con el universo de keywords mapeado, el siguiente paso es entender qué está pasando en la SERP. Esto es crítico porque el formato de contenido que rankea no es el mismo para todos los intent.

**`SerpResultados`** ejecuta el análisis de la SERP para las keywords más relevantes y devuelve:

- SERP features presentes (AI Overview, video carrusel, PAA, featured snippets)
- URLs de los 10 primeros resultados orgánicos
- Tipo de contenido dominante (listas, how-to, comparativas, herramientas)
- Presencia de pack local, knowledge panel y otros elementos

Para "automatizar keyword research" la SERP muestra videos en primera posición y PAAs como "Can I use ChatGPT for keyword research?", "How to do keyword research using AI?" y "How to master keyword research?". Eso me dice dos cosas: el intent tiene componente tutorial fuerte (explica por qué el formato how-to funciona acá) y hay búsquedas en inglés mezcladas con españolas (señal de que es un tema que todavía no tiene suficiente cobertura en español).

Eso último es la oportunidad. First mover en un tema con intent tutorial claro.

### Paso 3: análisis de competidores con Chrome DevTools

Una vez que sé qué URLs rankean, uso el MCP de Chrome DevTools para navegar a cada una y extraer estructura:

```bash
# Claude Code ejecuta esto via Chrome DevTools MCP
# navigate_page → take_snapshot → extraer H2s, FAQs, estructura
```

El análisis de los competidores reales para "keyword research con ia" muestra que HubSpot rankea en pos 3 con un enfoque de lista de herramientas, y joselab.com en pos 5 con ideas superficiales sin datos. Lo que no tiene ninguno: un workflow real con código, datos de API y análisis de entropía semántica.

Eso define el ángulo diferencial del artículo. No compito en lo mismo — ofrezco lo que ellos no tienen.

### Paso 4: análisis de entropía Shannon (el paso que cambia todo)

Este es el paso que más diferencia hace en la calidad del contenido final, y el menos conocido. El análisis de entropía de Shannon aplicado a SEO identifica qué términos tienen entropía baja en los documentos que rankean — o sea, qué términos aparecen en casi todos los competidores y por lo tanto son "obligatorios" para Google — versus qué términos tienen entropía alta, los que diferencian.

El script vive en `scripts/seo-entropy/analyze.py`:

```bash
/opt/anaconda3/envs/env_prueba/bin/python scripts/seo-entropy/analyze.py \
  --input /tmp/competitors_keyword_research_ia.json \
  --output /tmp/entropy_results.json \
  --top 20
```

El input es un JSON con el contenido de los competidores extraído en el paso 3. El output clasifica los términos en dos categorías:

**`consensus_terms`** (H_normalizada < 0.3): Términos que aparecen en prácticamente todos los documentos. Si no los incluís, Google percibe que tu documento está incompleto para el tema. Para keyword research con IA, estos términos son: volumen de búsqueda, intención de búsqueda, dificultad de keyword, SERP, keyword research, herramientas SEO, búsqueda orgánica.

**`specialist_terms`** (H_normalizada > 0.7): Términos que solo aparecen en uno o dos documentos. Son los diferenciadores — los que permiten distinguirte en un tema donde hay mucha competencia homogénea. Para este tema: análisis de entropía, co-ocurrencia semántica, Model Context Protocol, topical authority, microsemántica.

Los `consensus_terms` son obligatorios en el contenido. No opcionales. Si falta alguno, el artículo tiene un hoyo semántico que Google puede detectar cuando compara tu documento con los que ya rankean.

### Paso 5: generación del brief

Con toda esa data, Claude Code arma el brief del artículo: estructura de H2s basada en las PAAs y el análisis de intent, longitud recomendada según los competidores, términos obligatorios y diferenciadores, ángulo editorial único y sugerencia de internal links.

Ese brief es lo que convierte 15 minutos de research en un artículo que compite bien desde el día uno.

---

## ¿Qué herramientas MCP de DataForSEO uso para keyword research?

Para el keyword research con Claude Code uso siete herramientas MCP de DataForSEO. Cada una tiene un propósito específico en el pipeline.

| Tool MCP | Qué hace | Cuándo la uso |
|---|---|---|
| `KeywordSuggestions` | Keywords relacionadas y long-tail con volumen y KD | Paso 1: expansión semántica inicial |
| `KwsRelacionadas` | Co-ocurrencia semántica entre términos | Paso 1: mapa microsemántico |
| `SerpResultados` | SERP features, URLs que rankean, tipo de contenido dominante | Paso 2: análisis de intención de búsqueda |
| `RankedKeywordsGeneral` | Keywords de cualquier dominio competidor | Paso 3: content gap analysis |
| `TopicalAuthority` | Score de autoridad temática por dominio | Benchmark vs competidores |
| `TraficoEstimado` | Tráfico orgánico estimado de un sitio | Validar oportunidades antes de crear contenido |
| `Tendencias` | Estacionalidad y trending topics | Identificar si el tema está creciendo o cayendo |

La combinación de `KeywordSuggestions` + `KwsRelacionadas` + `SerpResultados` en paralelo es el núcleo del proceso. Las tres corren simultáneamente y Claude Code cruza los resultados para producir el mapa semántico completo.

La documentación oficial de la API de DataForSEO tiene las especificaciones técnicas de cada endpoint si querés implementar esto por tu cuenta con Python puro antes de migrar a MCPs.

---

![Comparativa de workflows: manual vs Python vs Claude Code con MCP](/assets/blog/automatizar-keyword-research-ia/comparativa-workflows.webp)

## ¿Cómo se compara con Python puro?

Antes de los MCPs hacía exactamente esto pero con Python. Y vale la pena explicar la diferencia concreta, porque no es solo "uno es más rápido que el otro".

Con Python puro el flujo era:

```python
# Script 1: obtener keyword suggestions
python scripts/keyword_suggestions.py --keyword "automatizar keyword research" --output /tmp/suggestions.json

# Script 2: analizar co-ocurrencias (requería output del script 1)
python scripts/co_ocurrencias.py --input /tmp/suggestions.json --output /tmp/co_ocurrencias.json

# Script 3: analizar SERP (requería decisiones sobre qué keywords analizar)
python scripts/serp_analysis.py --keywords "automatizar keyword research,keyword research ia" --output /tmp/serp.json

# Script 4: cruzar todo manualmente...
```

Cada script era secuencial porque yo tenía que interpretar el output de uno para configurar el siguiente. Eso es la fricción que hace que 1-2 horas no se comprime más.

Con Claude Code y MCPs:

```
"Haceme el keyword research completo para 'automatizar keyword research ia'
en Chile. Necesito keyword suggestions, co-ocurrencias semánticas, análisis
de SERP y top competidores."
```

Claude Code ejecuta los tres primeros pasos en paralelo, interpreta los resultados en tiempo real y me da el brief directamente. Sin JSON intermediario que yo tenga que leer, sin decisiones sobre qué keywords analizar primero.

La diferencia no es solo tiempo — es calidad de las decisiones. Con Python yo tomaba decisiones sobre el proceso mientras ejecutaba. Con Claude Code, el modelo toma esas decisiones microoperativas y yo me concentro en las decisiones estratégicas: qué ángulo tomar, qué formato usar, cómo conectar este artículo con el topical map existente.

---

## ¿Puede ChatGPT hacer keyword research real?

ChatGPT sin acceso a APIs externas no puede hacer keyword research real. Puede generar ideas de keywords basadas en su entrenamiento, pero no tiene datos de volumen de búsqueda, dificultad o análisis de SERP actualizados.

Las preguntas "Can I use ChatGPT for keyword research?" y "How to do keyword research using AI?" que aparecen en el PAA para estas queries reflejan exactamente esta confusión. La respuesta corta: sí podés usar IA para keyword research, pero necesitás conectar esa IA a fuentes de datos reales. ChatGPT con GPT-4 + plugin de Semrush puede hacer algo parecido a lo que yo hago con Claude Code + DataForSEO MCP. La diferencia está en el workflow: Claude Code vive en tu proyecto, lee tus archivos, conoce tu topical map y puede ejecutar research dentro del contexto de toda tu [estrategia SEO](/estrategia-seo).

Google Keyword Planner sigue siendo útil para validar volúmenes porque es la fuente primaria — los datos que Google usa para sus propias campañas. Pero como herramienta de research aislada tiene limitaciones conocidas: agrupa keywords similares, muestra rangos en vez de números exactos y no tiene análisis de intención de búsqueda. DataForSEO accede a los mismos datos de fondo con más granularidad.

---

## ¿Qué resultados concretos produce este workflow?

Después de aplicar este proceso en mi propio sitio y en proyectos de consultoría, los resultados concretos son:

**Cobertura semántica**: Los artículos producidos con este workflow tienen todos los `consensus_terms` del análisis de entropía y varios `specialist_terms` que los diferencia. Eso se traduce en mejor cobertura de entidades desde el día uno, sin tener que volver a actualizar el artículo por "huecos semánticos".

**Identificación de oportunidades reales**: El cruce de `SerpResultados` con `TraficoEstimado` de los competidores que rankean permite identificar keywords donde hay tráfico real pero los competidores no tienen contenido específico. Para este blog, varios artículos del cluster de IA y SEO nacieron de identificar esos huecos.

**Tiempo de investigación**: El salto de 4-6 horas a 15-20 minutos no es de eficiencia marginal — es de orden de magnitud. Eso cambia lo que es factible: puedo hacer research para 3-4 artículos por semana sin que eso sea el cuello de botella del proceso de contenido.

Este workflow es lo que uso como [consultor SEO](/consultor-seo-chile) cuando armo la estrategia de contenido para clientes. No una versión simplificada para demostración — el proceso real.

---

## ¿Cómo empezar si no tenés acceso a DataForSEO MCP?

Si todavía no tenés Claude Code configurado con MCPs, el camino más corto es este:

**1. Instalar Claude Code**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**2. Conseguir acceso a DataForSEO**

DataForSEO tiene un modelo de prepago sin suscripción mensual. Podés empezar con $50 que duran meses en uso moderado. Si venís de pagar $200/mes de Semrush o Ahrefs, el costo es radicalmente menor.

**3. Configurar el MCP de DataForSEO**

El MCP se configura en el archivo de configuración de Claude Code con las credenciales de la API:

```json
{
  "mcpServers": {
    "dataforseo": {
      "command": "uvx",
      "args": ["dataforseo-mcp"],
      "env": {
        "DATAFORSEO_USERNAME": "tu_email",
        "DATAFORSEO_PASSWORD": "tu_api_key"
      }
    }
  }
}
```

**4. Primer keyword research**

Con eso configurado, el primer research es tan simple como describir lo que querés en lenguaje natural. Claude Code sabe qué tools MCP ejecutar para cada tarea.

Si querés explorar más configuraciones del stack completo, tenés la [guía de MCP Servers para SEO](/blog/mcp-servers-seo) con la configuración detallada de cada herramienta y los casos de uso específicos para análisis de rastreo e indexación, métricas de performance y rendimiento orgánico.

---

## ¿Por qué esto importa más allá de ahorrar tiempo?

Esta sección me la pregunto yo mismo regularmente, porque la respuesta obvia es "ahorro tiempo y soy más eficiente". Pero creo que el impacto real es diferente.

Cuando el keyword research manual tomaba 4-6 horas, yo hacía 1-2 investigaciones por semana. Las priorizaba cuidadosamente porque cada una tenía un costo alto. Eso significaba que muchas oportunidades de contenido quedaban sin explorar simplemente por tiempo.

Cuando el research toma 15-20 minutos, puedo explorar 10-15 ideas por semana. La mayoría no van a ningún lado — no tienen volumen suficiente o el intent no cuadra con lo que quiero publicar. Pero algunas sí, y esas no las hubiera encontrado con el proceso manual.

La velocidad no reemplaza el criterio. Sigo tomando yo la decisión de qué publicar, con qué ángulo y cómo conectarlo al topical map existente. Pero tengo más datos para esa decisión y la tomo más rápido.

Si querés ver cómo este workflow de [keyword research](/blog/keywords-research-guia) se integra con el proceso completo de publicación — desde research hasta build en Astro — la [guía de automatización SEO con Python](/blog/automatizacion-seo-python) tiene el contexto de cómo funcionaba antes, y el artículo de [Claude Code para SEO](/blog/claude-code-seo) muestra cómo funciona el pipeline completo hoy.

---

## Preguntas frecuentes sobre automatizar keyword research con IA

### ¿Puede la IA reemplazar completamente el keyword research manual?

La IA puede ejecutar todas las tareas operativas del keyword research: consultar APIs de datos, filtrar por volumen y dificultad, analizar SERPs y co-ocurrencias semánticas. Lo que no puede reemplazar es el criterio estratégico: qué oportunidades priorizar según el negocio del cliente, qué ángulo diferencial tiene sentido para ese topical map, y cómo conectar las keywords al funnel de conversión. La IA es más rápida en la ejecución; el consultor sigue siendo necesario para la estrategia.

### ¿DataForSEO tiene mejores datos que Semrush para keyword research?

Los datos de fondo son similares — ambas plataformas acceden a fuentes parecidas. La diferencia principal está en el modelo de acceso y la flexibilidad de la API. DataForSEO tiene prepago sin suscripción mensual, lo que lo hace más económico para uso esporádico o para conectar a MCPs. Semrush tiene mejor interfaz visual y más herramientas integradas para quien prefiere trabajar sin código. Para workflows automatizados con Claude Code, DataForSEO gana por la granularidad de la API y la ausencia de límites de interfaz.

### ¿Cuánto cuesta implementar este workflow?

El costo principal es la suscripción a Claude (desde $20/mes con Claude Pro, o $100/mes con Claude Max para uso intensivo). DataForSEO tiene prepago — $50 duran varios meses en un proyecto de consultoría normal. Si venís de pagar $200/mes de Semrush, el cambio tiene retorno positivo desde el primer mes. El costo real es el tiempo de configuración inicial: instalar Claude Code, configurar los MCPs y hacer los primeros 2-3 research para ajustar los prompts.

### ¿Se puede usar con cualquier idioma o mercado?

Sí. DataForSEO soporta más de 200 países y todos los idiomas principales. Para mercados hispanohablantes como Chile, Argentina, México o España, el location_code cambia pero el workflow es idéntico. Las `KwsRelacionadas` y los `SerpResultados` se devuelven en el idioma del mercado seleccionado.

### ¿Necesito saber programar para implementar esto?

No. El workflow completo se ejecuta en lenguaje natural desde Claude Code. Los bloques de código en este artículo son para mostrar qué está pasando detrás — no tenés que escribirlos vos. Si querés entender la lógica o personalizar el proceso, Python ayuda; pero para usar el workflow tal como está descrito acá, no es necesario.

---

## Siguiente paso

Si leíste hasta acá y querés implementar algo de esto, el primer paso concreto es instalar Claude Code y hacer un primer research con el MCP de DataForSEO. No hace falta tener todo el stack configurado desde el día uno — empezá por el research y añadí capas cuando tengas el flujo básico funcionando.

Si querés que aplique este proceso para tu sitio — keyword research completo, análisis de entropía, brief con estructura de H2s y términos obligatorios — eso es exactamente lo que hago como [consultor SEO](/consultor-seo-chile). Podés empezar por la [auditoría SEO gratuita](/auditoria-seo-chile) para ver el estado actual de tu sitio antes de decidir qué keywords atacar.
