---
title: "Claude Code Subagentes SEO: Guía Práctica con Mis Agentes de Producción"
description: "Qué son los subagentes de Claude Code, cómo los uso para SEO en producción, cómo crear uno personalizado y cómo correr 5 análisis de competidores en paralelo. Con ejemplos reales."
author: "Facundo Zupel"
date: 2026-03-17
readTime: "13 minutos"
tags: ["SEO", "Claude Code", "Subagentes", "IA", "Automatización"]
category: "ia-en-seo"
draft: false
---

Cuando empecé a usar [Claude Code para SEO](/blog/claude-code-seo), la primera semana me quedé en la superficie: le pedía cosas al agente principal, uno por uno, de forma secuencial. Funcionaba, pero era básicamente automatización manual con mejores palabras.

El salto real ocurrió cuando entendí los subagentes.

Los subagentes de Claude Code son contextos de IA aislados que podés especializar, nombrar, reutilizar y —esto es lo que cambia todo— correr en paralelo. O sea: mientras un subagente está crawleando y analizando al competidor A, otro está haciendo lo mismo con el competidor B, y un tercero ya está redactando el brief. Todo al mismo tiempo.

Para SEO, eso no es una mejora incremental. Es un cambio de paradigma completo.

En este artículo te explico qué son exactamente los subagentes, cómo los diferencio de los skills y los MCPs, cuáles uso en producción con sus archivos `.md` reales, cómo crear el tuyo desde cero, y los errores que cometí al principio para que vos no los repitas.

---

## ¿Qué son los subagentes de Claude Code?

Los subagentes de Claude Code son instancias de IA con contexto propio, separadas del agente principal, que podés crear para que se especialicen en una tarea específica y reutilizarlas indefinidamente. Cada subagente tiene su propio historial de conversación, sus herramientas disponibles y su conjunto de instrucciones, sin contaminar el contexto del agente raíz.

La diferencia con simplemente escribirle al agente principal es concreta: el agente principal acumula contexto de todo lo que hablaste en la sesión. Si pasaste una hora haciendo keyword research, analizando código y redactando contenido, ese contexto mezclado empieza a generar interferencia. Un subagente, en cambio, arranca con un contexto limpio definido exactamente para la tarea que tiene que hacer.

Según la [documentación oficial de subagentes de Claude Code](https://code.claude.com/docs/es/sub-agents), los subagentes pueden usar el mismo set de herramientas que el agente principal — MCPs, operaciones de archivo, comandos de terminal — pero con instrucciones focalizadas que mejoran la precisión de cada tarea.

Para trabajos SEO donde la calidad de cada paso importa (el análisis de competidores tiene que ser exhaustivo, la redacción tiene que respetar la voz de marca, el internal linking tiene que seguir reglas específicas), tener subagentes especializados hace una diferencia medible en el output final.

---

## ¿Subagentes vs skills vs MCPs: cuándo usar cada uno?

Esta es la pregunta que más me hacen cuando explico mi stack. Y la confusión es lógica porque los tres mejoran lo que Claude Code puede hacer, pero desde ángulos completamente distintos.

| Herramienta | Qué es | Para qué sirve | Ejemplo SEO |
|---|---|---|---|
| **Subagente** | Instancia de IA con contexto propio | Especializar un agente en una tarea compleja y reutilizarlo | Agente de análisis de competidores |
| **Skill** | Archivo `.md` con instrucciones de proceso | Codificar un workflow repetible con pasos, criterios y formato | Skill de redacción SEO con metodología Koray |
| **MCP** | Server externo que expone herramientas | Conectar al agente con datos o APIs externas | DataForSEO, Google Search Console, Chrome DevTools |

La regla práctica que uso:

- **MCP** → cuando necesito datos de afuera (SERP, GSC, métricas de dominio)
- **Skill** → cuando necesito que el agente siga un proceso específico de forma consistente
- **Subagente** → cuando esa tarea es suficientemente compleja como para merecer contexto propio, o cuando necesito correr varias instancias en paralelo

A ver, te lo explico mejor con un caso real: para crear un artículo de blog, uso los tres. El MCP de DataForSEO me trae la data de keywords y SERP. El skill de redacción SEO define cómo estructurar y escribir el artículo. Y el subagente de análisis de competidores crawlea los top resultados mientras el subagente de planificación arma el brief — en paralelo.

Si querés profundizar en cómo funcionan los [skills de Claude Code para SEO](/blog/claude-code-skills-seo), ahí explico cada skill con su estructura interna y ejemplos de `skill.md` reales. Para los [MCP servers en SEO](/blog/mcp-servers-seo), ese artículo cubre los servers que uso y cómo los configuro por proyecto.

---

## ¿Cuáles son mis subagentes SEO reales en producción?

Tengo cuatro subagentes que uso en el día a día. No son teóricos — son los que están corriendo mientras escribo esto.

### ¿Cómo funciona el subagente de análisis de competidores?

El subagente de análisis de competidores recibe una keyword y las URLs de los top resultados orgánicos, crawlea cada página usando Chrome DevTools MCP, extrae estructura de headings, profundidad de contenido, FAQs y CTAs, y devuelve un informe estructurado listo para alimentar el brief.

Básicamente, hace lo que yo hacía manualmente antes: abrir cada competidor, revisar su estructura H2/H3, anotar qué tienen en común, identificar los gaps. Lo que me tomaba 45 minutos por keyword ahora tarda menos de 5.

El archivo que define este subagente (`.claude/agents/competitor-analyzer.md`) tiene estas instrucciones clave:

```markdown
---
name: competitor-analyzer
description: Analiza los top 3-5 resultados orgánicos de una keyword. Extrae headings, depth, FAQs y CTAs. Devuelve un informe estructurado para alimentar el brief de contenido.
---

Para cada URL recibida:
1. Usar chrome-devtools para navegar y tomar snapshot del contenido
2. Extraer todos los H2 y H3 como lista ordenada
3. Contar palabras aproximadas por sección
4. Identificar si tiene FAQ section y listar las preguntas
5. Registrar CTAs presentes (tipo y posición)
6. Calcular profundidad total del contenido

Output obligatorio:
- Tabla comparativa de H2s entre competidores
- Términos que aparecen en 3+ competidores (consensus terms)
- Gaps de contenido identificados
```

Lo que hace impresionante a este subagente no es que crawlee (eso lo puede hacer el agente principal). Es que al tener contexto limpio y focalizado, no se distrae con otras cosas. Su único trabajo es análisis de competidores, y lo hace con toda la atención del agente.

### ¿Cómo funciona el subagente explorador de codebase?

El subagente explorador — que en la documentación de Claude Code llaman "Explore agent" — tiene un propósito específico en mi flujo SEO: entender la estructura del proyecto antes de crear o modificar archivos.

Cuando voy a crear una landing nueva o un blog post, este subagente recorre el árbol de archivos, lee los componentes relevantes, verifica el schema de las colecciones y devuelve un mapa de dónde y cómo crear cada archivo. Así el subagente de redacción no tiene que "aprender" el proyecto desde cero.

El patrón de uso es simple:

```
> /agente explorador-codebase
> Mapea la estructura del proyecto y dame las reglas para crear un nuevo blog post
```

El agente devuelve: ubicación exacta del archivo, campos obligatorios del frontmatter, convenciones de slug, internal links mínimos según el topical map. Todo en menos de 30 segundos.

### ¿Cómo funciona el subagente de planificación?

El subagente de planificación convierte la data de keywords y el análisis de competidores en un brief estructurado: intent clasificado, content type ganador, estructura de H2s propuesta, consensus terms obligatorios, internal links recomendados y estimación de palabras.

Más que generador de contenido, es un arquitecto de contenido. Su valor está en que le llega data cruda (volúmenes, SERPs, snapshots de competidores) y devuelve algo accionable: el brief que el subagente de redacción va a usar.

Lo que hace en la práctica se parece a ejecutar el skill `search-intent-analyzer`, pero con la ventaja de que puede recibir grandes volúmenes de data sin saturar el contexto del agente principal.

### ¿Cómo funciona el subagente de redacción con voice cloning?

Este es el que más tiempo me tomó afinar, y el que más valor entrega.

El subagente de redacción tiene cargado el framework de voz de Facundo Zupel, la metodología SEO de Koray, las reglas de internal linking del proyecto y el brief que generó el subagente de planificación. Su única tarea es redactar el artículo completo siguiendo todos esos parámetros.

La clave es que el voice cloning no es solo "escribí como yo". Es un sistema completo que codifica patrones retóricos específicos: la auto-entrevista socrática, el puente traductor entre término técnico y explicación coloquial, la escalera de abstracción de concepto a ejemplo concreto. Cuando el subagente tiene ese framework cargado, el output suena como yo escribo — no como una IA genérica.

El resultado es que los artículos que salen de este subagente pasan directo a revisión editorial, no a reescritura. Esa diferencia en el proceso es, literalmente, horas por semana.

---

## ¿Cómo crear un subagente personalizado para SEO paso a paso?

Crear un subagente en Claude Code es más directo de lo que parece. Básicamente, es crear un archivo `.md` en la carpeta correcta con la estructura adecuada.

**Paso 1: Definí el propósito único del subagente.**

Antes de escribir una línea, respondé esta pregunta: ¿qué hace ESTE subagente que no debería hacer ningún otro? Si la respuesta tiene más de una oración, probablemente deberías dividirlo en dos.

**Paso 2: Creá el archivo en `.claude/agents/`.**

```
.claude/
  agents/
    competitor-analyzer.md
    content-planner.md
    voice-writer.md
    codebase-explorer.md
```

**Paso 3: Escribí el frontmatter y las instrucciones.**

La estructura mínima que funciona:

```markdown
---
name: nombre-del-subagente
description: Una oración que describe exactamente qué hace y cuándo usarlo.
---

## Contexto y propósito

[Qué es este agente, para qué sirve, desde qué perspectiva opera]

## Proceso obligatorio

1. [Paso 1 con detalle específico]
2. [Paso 2 con criterios de calidad]
3. [Paso 3 con formato de output esperado]

## Herramientas disponibles

- [MCP o herramienta 1]: para qué se usa
- [MCP o herramienta 2]: para qué se usa

## Output esperado

[Formato exacto del resultado: tabla, JSON, markdown, etc.]

## Restricciones

- [Lo que NO debe hacer este agente]
- [Errores comunes a evitar]
```

**Paso 4: Invocalo desde el agente principal con `/agentes`.**

```
> /agente competitor-analyzer
> Analiza estos 5 competidores para la keyword "consultor seo chile":
  - https://competidor1.cl
  - https://competidor2.cl
  ...
```

El agente principal carga el subagente, que trabaja en su contexto aislado y devuelve el resultado.

**Paso 5: Iterá el archivo `.md` basándote en el output.**

El primer subagente nunca es el definitivo. Revisá el output, identificá dónde se desvía de lo que necesitás, ajustá las instrucciones del `.md` y volvé a probarlo. En 2-3 iteraciones tenés algo sólido.

---

## ¿Cómo analizar 5 competidores al mismo tiempo con subagentes en paralelo?

Esta es la funcionalidad que más impacto tiene en el tiempo real de trabajo. En lugar de analizar competidores de forma secuencial (termino el primero, arranco el segundo), puedo correr 5 instancias del subagente de análisis en paralelo.

Claude Code soporta la ejecución de múltiples subagentes en paralelo. Cuando le pedís al agente principal que dispare varios subagentes para tareas independientes, los puede correr de forma concurrente. Según el [repositorio awesome-claude-code-subagents en GitHub](https://github.com/hesreallyhim/awesome-claude-code), este patrón de paralelización es uno de los casos de uso más documentados por la comunidad.

El prompt que uso en producción:

```
Analizá estos 5 competidores en paralelo usando el subagente competitor-analyzer:

1. https://competidor1.cl — keyword: "consultor seo chile"
2. https://competidor2.cl — keyword: "consultor seo chile"
3. https://competidor3.cl — keyword: "consultor seo chile"
4. https://competidor4.cl — keyword: "consultor seo chile"
5. https://competidor5.cl — keyword: "consultor seo chile"

Una vez que tengas los 5 informes, unificá los consensus terms y los gaps identificados en un brief consolidado.
```

El agente principal dispara 5 instancias del subagente de análisis de forma concurrente. Mientras todas trabajan, el principal espera. Cuando terminan todas, consolida los resultados.

El tiempo total es aproximadamente el de analizar UN competidor, no cinco. Eso no es una mejora del 20% — es cuatro horas que se convierten en cuarenta minutos.

Una aclaración importante: la paralelización funciona mejor cuando las tareas son genuinamente independientes. Cinco competidores diferentes analizando la misma keyword: independientes, perfectas para paralelizar. Un análisis que depende del resultado del anterior: secuencial.

---

## ¿Cuáles son los errores más comunes al usar subagentes?

Yo cometí todos estos. Los enumero para que vos no pierdas el tiempo que perdí yo.

### ¿Por qué los subagentes no comparten estado entre ellos?

El aislamiento de contexto es una característica, no un bug, pero genera confusión la primera vez. Si el subagente A genera un análisis de competidores y el subagente B tiene que usarlo para armar el brief, ese traspaso no es automático. El subagente A tiene que devolver el resultado al agente principal, que luego lo pasa como input al subagente B.

O sea: el flujo de datos entre subagentes siempre pasa por el agente principal como intermediario. Si no lo planificás así, terminás con subagentes que trabajan en paralelo pero que no se "ven" entre sí.

### ¿Cuánto contexto consume un subagente?

Cada subagente consume tokens de su propio contexto, que tiene límites. Para análisis de competidores que implican crawlear 5 URLs largas, el contexto se puede llenar más rápido de lo esperado.

La solución práctica es instruir al subagente para que sea selectivo: no guarde el HTML completo de cada página, sino solo los datos procesados (headings, word count, FAQs, CTAs). Un subagente bien instruido extrae lo relevante y descarta el ruido, lo que reduce el consumo de contexto a menos de la mitad.

### ¿Cuánto cuesta en tokens correr subagentes en paralelo?

Acá hay que ser directo: correr 5 subagentes en paralelo consume más tokens que correr 1. El costo es aproximadamente lineal — 5x el costo de un subagente individual, no 1x.

Para análisis de alto impacto (keyword research para un cluster completo, análisis competitivo profundo antes de una estrategia nueva), vale la pena. Para tareas cotidianas de menor escala, a veces es más eficiente correr el análisis en secuencia con el agente principal.

Depende de tu caso de uso. Yo uso paralelización cuando el ahorro de tiempo supera con creces el costo de tokens. Para proyectos grandes, siempre supera.

### ¿Los subagentes tienen acceso a todos los MCPs?

Por defecto, un subagente hereda los MCPs del agente principal. Pero podés definir qué herramientas tiene disponibles cada subagente en su archivo `.md`. Tener MCPs innecesarios cargados en un subagente es ruido: el agente puede "tentarse" de usar herramientas que no necesita para la tarea.

Mi práctica: cada subagente tiene explícitamente listados los MCPs que usa y declarados los que NO debe usar. Eso mejora la consistencia del output.

---

## ¿Cómo funciona el stack completo: subagentes + skills + MCPs?

El pipeline completo de creación de un artículo en mi flujo actual combina los tres en secuencia:

**Fase 1 — Data (MCPs)**

El agente principal usa `DataForSEO` para traer volúmenes, keywords relacionadas y SERP features. Usa `Google Search Console` para ver qué keywords ya tienen impresiones sin clics. Todo esto es data cruda.

**Fase 2 — Análisis (Subagentes en paralelo)**

El agente dispara el subagente de análisis de competidores para los top 5 resultados, en paralelo. Mientras trabajan, puede hacer otras cosas. Cuando terminan, dispara el subagente de planificación con toda la data consolidada. El planificador devuelve el brief.

**Fase 3 — Redacción (Skill + Subagente)**

El subagente de redacción tiene cargado el skill de `redaccion-seo-blog` y el framework de voz. Recibe el brief y produce el artículo siguiendo la metodología Koray: snippets de 30-40 palabras debajo de cada H2, expansión con datos, microsemántica integrada, internal links en posición contextual.

**Fase 4 — Publicación (Agente principal)**

El agente principal crea el archivo `.md` en `src/content/blog/`, verifica el frontmatter, y ejecuta `npm run build`. El artículo está publicado.

El tiempo total de ese flujo para un artículo de 2.500 palabras en 2026: entre 40 y 60 minutos. Un año atrás, sin este stack, eran 4-6 horas. La diferencia no viene de que la IA haga todo — viene de que el flujo elimina todas las esperas y los procesos manuales repetitivos.

Para entender cómo se complementan los MCPs en este stack, el artículo sobre [MCP servers para SEO](/blog/mcp-servers-seo) explica qué data trae cada servidor y cómo configurarlos por proyecto.

---

## Preguntas frecuentes

### ¿Los subagentes son lo mismo que los "custom agents" de Claude.ai?

No. Los subagentes de Claude Code son específicos del CLI y están diseñados para trabajar en el contexto de un proyecto (codebase, archivos, herramientas de terminal). Los agentes de Claude.ai son contextos de conversación persistentes sin acceso directo al sistema de archivos ni a MCPs de proyecto.

### ¿Puedo usar subagentes sin MCPs?

Sí. Un subagente que solo trabaja con archivos del proyecto (lee y escribe `.md`, analiza código, genera contenido) funciona perfectamente sin MCPs. Los MCPs amplían las capacidades, pero no son requisito para empezar.

### ¿Cuántos subagentes puedo tener en paralelo?

Técnicamente, Claude Code puede despachar múltiples subagentes en paralelo sin límite explícito documentado. En la práctica, el límite lo pone el consumo de tokens y la capacidad de tu API key. Para la mayoría de los flujos SEO, 3-5 en paralelo es el rango donde el costo/beneficio tiene más sentido.

### ¿Qué pasa si un subagente falla a mitad de la tarea?

El subagente devuelve un error al agente principal, que puede reintentar o continuar con los demás. A diferencia de un proceso de Python donde un error rompe todo, la arquitectura de subagentes es inherentemente más resiliente: si el análisis del competidor 3 falla, los otros 4 siguen.

### ¿Se puede crear un subagente para SEO local?

Sí, y es uno de los casos de uso más interesantes. Un subagente especializado en SEO local puede tener cargado el contexto específico de una ciudad (búsquedas típicas, competidores locales, entidades geográficas), generar la landing geolocalizada, verificar internal links y publicar — todo en un flujo automatizado.

---

## ¿Por dónde empezar con los subagentes SEO?

Si estás empezando con Claude Code para SEO, mi recomendación es esta: antes de los subagentes, asegurate de tener el flujo básico funcionando con el agente principal y los MCPs correctos.

Una vez que tenés eso, el primer subagente que recomiendo crear es el de análisis de competidores. Es el que tiene el ROI más claro: tiempo ahorrado por análisis versus costo de tokens. Armá el archivo `.md` siguiendo la estructura que describí arriba, probalo con 2-3 competidores de una keyword que ya conocés (para validar que el output es útil), y ajustá las instrucciones hasta que el informe que devuelve sea accionable.

De ahí, el siguiente paso natural es automatizar la paralelización para proyectos nuevos. Cuando tenés que analizar un cluster completo antes de armar una estrategia de contenido, la diferencia de tiempo entre secuencial y paralelo justifica el esfuerzo de configurarlo.

Si querés que te muestre cómo armar este stack para tu proyecto específico — el topical map, los subagentes correctos para tu flujo, los MCPs que tienen sentido para tu negocio — podés [agendar un diagnóstico SEO gratuito](/consultor-seo-chile). Lo vemos en detalle y armamos la arquitectura que tiene sentido para vos.
