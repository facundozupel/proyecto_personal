---
title: "El Método Wiki de Karpathy con Obsidian y Claude Code: Guía Práctica para Armar tu Segundo Cerebro con IA"
description: "Cómo implementar el LLM Wiki de Andrej Karpathy paso a paso: Obsidian como frontend, Claude Code como motor de IA, y carpetas raw/wiki para que tu conocimiento se mantenga solo. Con mi setup real."
author: "Facundo Zupel"
date: 2026-04-13
readTime: "16 minutos"
tags: ["Claude Code", "IA", "Obsidian", "Productividad", "Automatización", "Knowledge Base"]
draft: false
category: "ia-en-seo"
---

Andrej Karpathy dejó de usar IA para escribir código. Así, tal cual. El tipo que acuñó el término "vibe coding", cofundador de OpenAI, exlíder de IA en Tesla, publicó un gist en GitHub diciendo que ahora usa Claude Code para otra cosa: construir y mantener una wiki personal que se actualiza sola.

Y no es un experimento de fin de semana. Habla de 100 artículos, 400.000 palabras, todo generado y mantenido por el modelo sin edición humana. Backlinks automáticos entre conceptos, categorización, detección de contradicciones. Básicamente, un segundo cerebro que crece cada vez que le tirás un paper o un artículo.

Cuando vi eso, lo primero que pensé fue: "esto es exactamente lo que necesito para gestionar el conocimiento SEO que acumulo todos los días". Papers de Google, actualizaciones de algoritmo, notas de clientes, research de keywords. Todo eso vive disperso en carpetas, Notion, bookmarks que nunca vuelvo a abrir.

Así que lo implementé. Y en este artículo te cuento paso a paso cómo armé mi propia versión del LLM Wiki de Karpathy usando Obsidian como frontend visual y [Claude Code](/blog/como-usar-claude-code) como motor de procesamiento.

![Flujo del LLM Wiki de Karpathy: carpeta raw con fuentes, Claude Code como compilador, y wiki de Obsidian con grafo de conocimiento interconectado](/assets/blog/karpathy-obsidian-claude-code-wiki/flujo-karpathy-wiki-obsidian.webp)

---

## Tabla de contenidos

1. [¿Qué es el LLM Wiki de Karpathy?](#qué-es-el-llm-wiki-de-karpathy)
2. [Por qué Obsidian y no Notion o Google Docs](#por-qué-obsidian-y-no-notion-o-google-docs)
3. [Estructura de carpetas: raw/, wiki/ y el CLAUDE.md](#estructura-de-carpetas-raw-wiki-y-el-claudemd)
4. [El CLAUDE.md que configura todo](#el-claudemd-que-configura-todo)
5. [Los tres workflows: ingest, query y lint](#los-tres-workflows-ingest-query-y-lint)
6. [Cómo funciona el ingest en la práctica](#cómo-funciona-el-ingest-en-la-práctica)
7. [Query: preguntarle a tu propia wiki](#query-preguntarle-a-tu-propia-wiki)
8. [Lint: la salud de tu base de conocimiento](#lint-la-salud-de-tu-base-de-conocimiento)
9. [LLM Wiki vs RAG: cuándo conviene cada uno](#llm-wiki-vs-rag-cuándo-conviene-cada-uno)
10. [Mi setup real para SEO](#mi-setup-real-para-seo)
11. [Errores que cometí y cómo evitarlos](#errores-que-cometí-y-cómo-evitarlos)
12. [Preguntas frecuentes](#preguntas-frecuentes)

---

## ¿Qué es el LLM Wiki de Karpathy?

La idea suena obvia una vez que la escuchás: en vez de guardar tu conocimiento en 47 herramientas distintas y después depender de tu memoria para encontrarlo, lo centralizás en archivos markdown planos y dejás que un LLM los mantenga organizados.

Karpathy lo plantea con una analogía de compilador. Hay un directorio `raw/` que es tu "código fuente" — ahí tirás papers, artículos, notas crudas, lo que sea. El LLM funciona como compilador: lee esas fuentes y genera una wiki estructurada en `wiki/` con artículos interconectados, índice actualizado y log de operaciones. El lint es como los tests: chequea contradicciones, páginas huérfanas y claims desactualizados.

¿Por qué funciona? Porque el modelo hace el trabajo que nadie quiere hacer: leer un paper de 30 páginas, extraer los 5 conceptos clave, conectarlos con lo que ya sabés, actualizar las páginas afectadas y dejar todo indexado. Eso a mano toma horas. Con Claude Code toma minutos.

Y lo más interesante es lo que Karpathy llama "knowledge compounding" — conocimiento compuesto. Cada fuente nueva no se queda aislada. El LLM detecta conexiones con conceptos que ya están en tu wiki, actualiza esas páginas, crea links cruzados. Tu base de conocimiento se vuelve más valiosa con cada ingesta, no más caótica.

---

## Por qué Obsidian y no Notion o Google Docs

A ver, aclaremos algo: Claude Code no necesita Obsidian. Le da exactamente lo mismo qué editor uses. Lo que necesita son archivos markdown en un directorio local.

Pero Obsidian tiene ventajas concretas que lo hacen calzar perfecto con este workflow.

La primera: es local-first. Tus archivos son `.md` en una carpeta de tu computadora. Sin servidor, sin cuenta premium, sin depender de la conexión. Claude Code opera sobre el filesystem local, así que la integración es directa — ambos leen y escriben en la misma carpeta sin intermediarios.

Después está el graph view, que para mí fue lo que terminó de convencerme. Cada `[[wikilink]]` que el LLM crea se transforma en un nodo visual. Cuando tu wiki pasa de 50 páginas, el grafo te muestra clusters de conocimiento que no veías. Yo tengo un cluster de "actualizaciones de algoritmo" conectado con otro de "SEO técnico" que se formó solo. Nadie lo planificó. El modelo detectó las conexiones y las armó.

Y el Dataview plugin. Esto es oro para auditar tu wiki. Podés hacer queries sobre el frontmatter de las páginas:

```
TABLE type, confidence, updated
FROM "wiki/concepts"
WHERE confidence = "low"
SORT updated ASC
```

Eso te tira una tabla con todas las páginas de baja confianza ordenadas por antigüedad. O sea, te dice exactamente qué investigar primero.

Notion y Google Docs no te dan nada de esto. Son herramientas de escritura, no de gestión de conocimiento estructurado. Y lo más importante: con Notion le estás dando tu data a un servidor externo. Con Obsidian, todo vive en tu disco.

---

## Estructura de carpetas: raw/, wiki/ y el CLAUDE.md

Esta es la estructura base que propone Karpathy y que yo adapté para mi caso de uso:

```
mi-wiki/
├── raw/                    # Fuentes originales (INMUTABLES)
│   ├── articles/           # Artículos web clipeados
│   ├── papers/             # PDFs y research
│   ├── notes/              # Notas crudas propias
│   └── data/               # CSVs, exports, datasets
├── wiki/                   # Generado por el LLM
│   ├── index.md            # Catálogo por categoría
│   ├── log.md              # Registro cronológico
│   ├── concepts/           # Páginas de conceptos
│   ├── entities/           # Herramientas, personas, empresas
│   ├── sources/            # Resúmenes de fuentes
│   └── comparisons/        # Comparativas entre conceptos
├── outputs/                # Reportes, exports, lints
├── CLAUDE.md               # Configuración del agente
└── .gitignore
```

La clave acá es la inmutabilidad de `raw/`. El LLM nunca toca esas carpetas. Las lee, las procesa, pero todo lo que genera va a `wiki/`. ¿Por qué importa? Porque si algo sale mal — si el modelo interpreta un paper incorrectamente — vos podés volver a la fuente original y verificar. Es tu verdad de piso.

Dentro de `wiki/` hay dos archivos especiales:

- **`index.md`**: es el catálogo maestro. Cada vez que el LLM ingesta una fuente nueva, actualiza este índice. Así, cuando hacés un query, Claude lee primero el `index.md` para saber qué páginas existen y cuáles son relevantes. Esto es más eficiente que escanear toda la carpeta.

- **`log.md`**: registro cronológico de todas las operaciones. Cuándo se ingirió qué, qué páginas se crearon o actualizaron. Es tu audit trail.

---

## El CLAUDE.md que configura todo

Acá es donde se pone entretenido. Si ya leíste mi artículo sobre [CLAUDE.md para SEO](/blog/claude-md-seo), sabés que este archivo es la memoria persistente de Claude Code. Para el LLM Wiki, el `CLAUDE.md` define las reglas del juego.

Te comparto un template basado en el patrón de Karpathy y adaptado con las convenciones que me funcionaron:

```markdown
# Research Wiki

## Estructura del proyecto
- `raw/` — Fuentes originales. NUNCA modificar archivos acá.
- `wiki/` — Páginas generadas y mantenidas por el LLM.
- `wiki/index.md` — Catálogo maestro. Actualizar en cada operación.
- `wiki/log.md` — Log cronológico (append-only).
- `outputs/` — Reportes y resultados de lint.

## Convenciones de páginas

Cada página wiki DEBE tener este frontmatter YAML:

---
title: Título de la página
type: concept | entity | source-summary | comparison
sources:
  - raw/articles/nombre-archivo.md
related:
  - "[[concepto-relacionado]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
confidence: high | medium | low
---

### Nombres de archivo
- Kebab-case: `core-web-vitals.md`, `google-search-console.md`
- Cross-references: siempre usar [[wikilinks]]
- Referencias a fuentes: siempre linkear al path en raw/

## Workflows

### Ingest
1. Leer documento fuente en raw/
2. Discutir hallazgos clave con el usuario
3. Crear wiki/sources/[nombre-fuente].md con resumen
4. Actualizar o crear páginas de conceptos/entidades
5. Actualizar wiki/index.md
6. Append a wiki/log.md

### Query
1. Leer wiki/index.md para identificar páginas relevantes
2. Leer esas páginas y sintetizar respuesta
3. Citar fuentes con [[wikilinks]]
4. Ofrecer guardar respuestas valiosas como páginas nuevas

### Lint
1. Escanear todas las páginas wiki buscando contradicciones
2. Identificar páginas huérfanas (sin links entrantes)
3. Flaggear conceptos referenciados pero sin página propia
4. Detectar claims desactualizados por fuentes más nuevas
5. Guardar resultados en outputs/lint-YYYY-MM-DD.md
```

Sin este archivo, Claude genera contenido pero sin estructura. Con él, cada operación sigue un protocolo: ingesta, indexación, cross-referencing, log. Pasa de ser un chatbot a ser un bibliotecario con reglas claras.

Si querés profundizar en cómo estructurar un `CLAUDE.md` para otros casos de uso (no solo wikis), en [esa guía](/blog/claude-md-seo) cubro la jerarquía de archivos, la diferencia con `settings.json` y los hooks.

---

## Los tres workflows: ingest, query y lint

El sistema opera con tres operaciones fundamentales. Pensalo como un ciclo: ingresás conocimiento (ingest), lo consultás (query) y lo mantenés saludable (lint).

### Ingest: alimentar la wiki

El ingest es cuando le tirás una fuente nueva al sistema. Puede ser un artículo que clipaste de la web, un paper que descargaste, tus propias notas de una reunión. Lo dejás en `raw/` y le pedís a Claude que lo procese.

### Query: consultar tu conocimiento

En vez de abrir 15 archivos buscando esa nota que tomaste hace tres meses, le preguntás a Claude. El modelo lee tu `index.md`, identifica qué páginas son relevantes, las lee y te sintetiza una respuesta con citas a tus propias fuentes.

### Lint: chequeo de salud

Como cualquier base de datos, una wiki se degrada si no la mantenés. El lint escanea todo buscando problemas: contradicciones entre páginas, conceptos mencionados pero sin página propia, información desactualizada por fuentes más nuevas.

---

## Cómo funciona el ingest en la práctica

A ver, te lo explico con un ejemplo concreto. Digamos que leo un artículo sobre el último Core Update de Google y quiero incorporarlo a mi wiki.

**Paso 1:** Clipeo el artículo a markdown (uso la extensión Markdownload del browser o el Web Clipper de Obsidian) y lo dejo en `raw/articles/core-update-abril-2026.md`.

**Paso 2:** Abro la terminal en la carpeta de la wiki y lanzo Claude Code:

```bash
cd ~/wiki-seo
claude
```

**Paso 3:** Le pido que ingiera la fuente:

```
Ingestá el artículo en raw/articles/core-update-abril-2026.md.
Creá el summary, actualizá los conceptos afectados y el index.
```

Lo que pasa después es lo interesante. Claude no solo crea un resumen del artículo. Lee el `index.md` para ver qué conceptos ya existen en la wiki, identifica cuáles se ven afectados por la información nueva, y actualiza esas páginas.

Si el artículo menciona cambios en cómo Google evalúa E-E-A-T y yo ya tengo una página `wiki/concepts/eeat.md`, Claude la actualiza con la nueva info, agrega la referencia a la fuente y actualiza el campo `updated` del frontmatter. Si menciona un concepto que no tiene página propia, la crea.

Un solo ingest puede tocar 10-15 páginas. Eso es lo que Karpathy llama knowledge compounding: cada fuente nueva enriquece toda la wiki, no solo una página.

Al final, todo queda registrado en `wiki/log.md`:

```
2026-04-13 | INGEST | raw/articles/core-update-abril-2026.md
  - Creado: wiki/sources/core-update-abril-2026.md
  - Actualizado: wiki/concepts/eeat.md (nueva evaluación)
  - Actualizado: wiki/concepts/core-updates.md (historial)
  - Creado: wiki/concepts/site-reputation-abuse.md (nuevo)
  - Actualizado: wiki/index.md
```

---

## Query: preguntarle a tu propia wiki

Acá es donde el LLM Wiki se despega de un Google Drive con carpetas. No buscás archivos. Le preguntás cosas.

```
¿Qué cambios en la evaluación de E-E-A-T hubo
en los últimos 3 Core Updates?
```

Claude lee `wiki/index.md`, identifica que necesita las páginas `eeat.md`, `core-updates.md` y los summaries de los últimos 3 updates. Las lee, sintetiza la respuesta y te la da con citas a tus fuentes:

> Los últimos tres Core Updates muestran una tendencia clara hacia...
> Según [[core-update-abril-2026]], Google ahora evalúa...
> Esto contrasta con [[core-update-diciembre-2025]], donde...

La respuesta no viene de internet. Viene de TU conocimiento procesado. Si la fuente original está en `raw/`, podés verificarla. Si falta info, sabés exactamente qué necesitás investigar.

Y acá viene un detalle fino: cuando la respuesta del query tiene valor propio, Claude te ofrece guardarla como una página nueva de la wiki. Así, tu base de conocimiento crece no solo por lo que leés, sino por las preguntas que te hacés.

---

## Lint: la salud de tu base de conocimiento

El lint es lo que la mayoría se saltea. Y es un error, porque sin él tu wiki acumula deuda de conocimiento: páginas que nadie lee, conceptos que se contradicen entre sí, claims que ya no aplican.

```
Corré un lint completo de la wiki.
Guardá los resultados en outputs/lint-2026-04-13.md
```

Claude escanea toda la wiki y reporta:

```markdown
## Resultado del Lint — 2026-04-13

### Contradicciones detectadas (2)
- wiki/concepts/crawl-budget.md dice "Googlebot rastrea 10K URLs/día"
  pero wiki/sources/google-io-2026.md reporta "ya no hay un límite fijo"

### Páginas huérfanas (3)
- wiki/entities/bing-webmaster-tools.md (0 links entrantes)
- wiki/comparisons/screaming-frog-vs-sitebulb.md (0 links entrantes)
- wiki/concepts/passage-indexing.md (0 links entrantes)

### Conceptos sin página propia (5)
- [[topical authority]] (mencionado en 4 páginas)
- [[search generative experience]] (mencionado en 2 páginas)
- ...

### Claims potencialmente desactualizados (1)
- wiki/concepts/core-web-vitals.md última actualización 2025-11-20
  Hay fuentes más nuevas que podrían actualizarla
```

Con eso tenés una lista de acciones concreta. Es parecido a lo que hacemos con las auditorías de contenido en SEO, pero aplicado a tu propio conocimiento. En vez de auditar páginas web, estás auditando lo que creés que sabés.

---

## LLM Wiki vs RAG: cuándo conviene cada uno

Apenas conté que estaba usando este sistema, la primera pregunta que me llegó fue: "¿No es lo mismo que RAG?". No, y la diferencia no es menor.

| Dimensión | LLM Wiki | RAG |
|-----------|----------|-----|
| **Estado** | Stateful — el conocimiento se acumula | Stateless — cada query empieza de cero |
| **Infraestructura** | Carpeta de archivos `.md` | Vector DB, pipeline de embeddings, retrieval |
| **Cross-references** | Pre-construidas por el LLM | Se descubren ad-hoc en cada query |
| **Costo por query** | Bajo (lee index + páginas target) | Alto (retrieve + re-rank + generate) |
| **Trazabilidad** | Citás hasta la fuente en `raw/` | Citás chunks (a veces imprecisos) |
| **Mantenimiento** | El LLM actualiza las páginas | Hay que rebuildar embeddings |

**El LLM Wiki conviene cuando:** tenés menos de 200 documentos fuente, querés que el conocimiento se acumule y conecte entre sí, necesitás trazabilidad total y preferís cero infraestructura.

**RAG conviene cuando:** manejás miles o millones de documentos, necesitás latencia baja a escala, o el contenido se actualiza constantemente sin que necesites entender las conexiones.

Para un profesional individual o un equipo chico, que es el caso de la mayoría de consultores SEO, devs, researchers, el LLM Wiki gana de lejos. Es una carpeta de archivos y un `CLAUDE.md`. No necesitás Pinecone, ni Weaviate, ni pipeline de embeddings. Es markdown en tu disco, nada más.

---

## Mi setup real para SEO

Voy a ser transparente: mi wiki SEO no sigue el patrón de Karpathy al pie de la letra. Lo adapté a mi flujo de trabajo como [consultor SEO](/). Básicamente tengo estas carpetas en `raw/`:

```
raw/
├── algorithm-updates/    # Papers y anuncios de Google
├── industry/             # Artículos de Search Engine Journal, Ahrefs blog, etc.
├── client-learnings/     # Notas anonimizadas de aprendizajes con clientes
├── tools/                # Documentación de herramientas (Screaming Frog, GSC, etc.)
└── research/             # Mis propios análisis y experiments
```

Y en `wiki/` tengo clusters que se formaron orgánicamente:

- **concepts/**: `eeat.md`, `topical-authority.md`, `crawl-budget.md`, `ai-overviews.md`
- **entities/**: `google-search-console.md`, `screaming-frog.md`, `claude-code.md`
- **comparisons/**: `seo-vs-sem.md`, `ahrefs-vs-semrush.md`
- **sources/**: un resumen por cada artículo o paper ingerido

Lo que me sorprendió es cómo el grafo de Obsidian empezó a revelar patrones. Hay un cluster denso alrededor de "algoritmo de Google" conectado con "E-E-A-T" y "Core Updates". Otro alrededor de "[automatización](/blog/automatizacion-seo-python)" conectado con "Python", "[Claude Code](/blog/claude-code-seo)" y "[MCPs](/blog/mcp-servers-seo)". Esos clusters no los planifiqué — emergieron de las fuentes que fui ingiriendo.

Y lo más práctico: cuando un cliente me pregunta algo que ya investigué, no necesito buscar en mi historial de browser ni en Notion. Le pregunto a la wiki y en segundos tengo la respuesta con las fuentes que la respaldan.

---

## Errores que cometí y cómo evitarlos

No te voy a mentir, los primeros días fueron de prueba y error. Acá van los errores más costosos que cometí:

El primero fue ingestar todo junto. Al principio le tiré 20 artículos de una sola vez. Resultado: páginas wiki superficiales, cross-references incorrectos y un `index.md` que no tenía sentido. Ahora mi regla es máximo 3 fuentes por sesión. El modelo necesita contexto para hacer conexiones de calidad, y si lo saturás pierde el hilo.

Otro costoso: no versionar con Git. La primera semana no tenía Git inicializado. Cuando el modelo interpretó mal un paper y actualizó incorrectamente 8 páginas, no tenía forma de volver atrás. Ni les cuento la frustración. Ahora hago commit después de cada sesión de ingest. Es un `git add . && git commit -m "ingest: nombre-fuente"` y listo.

El tercer error fue el `CLAUDE.md` demasiado genérico. El primero que armé decía algo como "mantené una wiki organizada". Claude tomaba decisiones inconsistentes sobre naming, frontmatter, estructura de páginas. El template que te compartí arriba es el resultado de iterar varias veces hasta que el output fue predecible.

También ignoré el lint durante un mes entero. Cuando finalmente lo corrí, había 12 páginas huérfanas, 3 contradicciones y 7 conceptos referenciados sin página. Ahora lo corro cada viernes. Son 5 minutos.

Y un detalle menor pero que frustra: si tenés Obsidian abierto mientras Claude Code escribe archivos, a veces Obsidian no detecta los cambios inmediatamente. Refrescá el vault (Ctrl/Cmd + R) después de cada sesión de ingest y listo.

---

## Preguntas frecuentes

### ¿Necesito saber programar para implementar esto?

No. El sistema opera con archivos markdown y Claude Code. No escribís código — le das instrucciones en lenguaje natural. Lo más técnico es crear las carpetas y escribir el `CLAUDE.md`, que es un archivo de texto plano.

### ¿Cuánto cuesta mantener una wiki con Claude Code?

Si tenés Claude Pro ($20/mes) o Max ($100/mes), el uso de Claude Code está incluido. No hay costo adicional por las operaciones de ingest, query o lint. Lo que consumís es context window, pero con el patrón de leer `index.md` primero, el consumo es eficiente.

### ¿Funciona con otros LLMs además de Claude Code?

El patrón es agnóstico del modelo. Karpathy lo plantea como idea, no como implementación. Dicho eso, Claude Code tiene acceso directo al filesystem — lee y escribe archivos sin wrappers intermedios. Con otros modelos tendrías que armar esa capa vos.

### ¿Hay límite de tamaño para la wiki?

En la práctica, funciona bien con hasta 200-300 páginas wiki y unos 100K tokens de contenido total. Más allá de eso, el `index.md` se vuelve muy largo y empezás a tener problemas de context window. Para wikis más grandes, la comunidad está experimentando con búsqueda híbrida (BM25 + vector search) como QMD.

### ¿Puedo usar esto para trabajo en equipo?

Sí, si versionás con Git. Cada miembro del equipo puede ingestar fuentes, y los commits mantienen un historial claro de quién agregó qué. Lo que no funciona bien (todavía) es el ingest simultáneo — si dos personas ingestan al mismo tiempo, pueden generar conflictos en `index.md` y `log.md`.

### ¿Es lo mismo que el sistema de memoria de Claude Code?

No. El [sistema de memoria](/blog/claude-md-seo) de Claude Code (`~/.claude/` con archivos de memoria) está diseñado para recordar preferencias y contexto entre sesiones. El LLM Wiki es una base de conocimiento estructurada sobre un dominio específico. Son complementarios: la memoria de Claude Code recuerda CÓMO trabajar, la wiki contiene QUÉ sabés.

---

Karpathy cerró su gist con una frase que me quedó dando vueltas: "The LLM writes and maintains all of the data of the wiki. I rarely touch it directly." O sea, el humano cura las entradas, decide qué leer, qué investigar. La IA se encarga del bookkeeping: organizar, conectar, indexar, mantener.

No te voy a decir que esto reemplaza el pensamiento, porque no lo hace. Seguís siendo vos el que decide qué fuentes valen la pena, qué preguntas hacer, qué conexiones son reales y cuáles son ruido del modelo. Pero el trabajo mecánico de organizar, indexar y cross-referenciar — eso sí se lo podés delegar sin culpa.

Si ya usás [Claude Code para SEO](/blog/claude-code-seo) o para cualquier otro dominio, probá armar una wiki con 5 fuentes y el `CLAUDE.md` que te compartí. Dejalo crecer una semana y después contame si no te cambia la forma en que gestionás lo que sabés.
