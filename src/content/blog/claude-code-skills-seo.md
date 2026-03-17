---
title: "Claude Code Skills para SEO: Guía Completa con Ejemplos Reales [2026]"
description: "Qué son los skills de Claude Code, cómo los uso para automatizar workflows SEO reales y cómo crear tu primer skill desde cero. Con ejemplos de skill.md, diferencia vs MCPs y resultados concretos."
author: "Facundo Zupel"
date: 2026-02-24
readTime: "14 minutos"
tags: ["SEO", "Claude Code", "IA", "Automatización", "Skills"]
draft: false
category: "ia-en-seo"
---

Hay una parte de trabajar con [Claude Code para SEO](/blog/claude-code-seo) que la mayoría de la gente no aprovecha: los skills.

No porque sean difíciles de usar. Sino porque no se habla de ellos. La mayoría de los artículos sobre Claude Code se quedan en los MCPs, en los agentes, en la configuración base. Y los skills quedan en un segundo plano que, honestamente, es un error enorme.

Un skill bien armado convierte un workflow SEO que normalmente implicaría 20 minutos de prompting manual en algo que se activa con una sola instrucción. Eso no es menor. Cuando estás haciendo keyword research, analizando competidores, redactando contenido y verificando internal links todo en la misma sesión, la acumulación de esos 20 minutos empieza a pesar.

En este artículo te muestro qué son los skills de Claude Code, cómo funcionan por dentro con ejemplos reales de los que yo uso, la diferencia concreta con MCPs y subagentes, y cómo crear el tuyo desde cero. Sin teoría de más — datos del workflow real.

---

## ¿Qué son los skills de Claude Code y por qué cambian el juego para SEO?

Los skills de Claude Code son archivos de instrucciones especializadas — básicamente `skill.md` — que le enseñan al agente cómo ejecutar un workflow complejo de manera consistente, reproducible y alineada con tu forma de trabajar. No son plugins ni extensiones: son documentos en Markdown que el agente lee como contexto. Es la feature de Claude Code que más impacto tiene en flujos SEO, porque cada skill SEO codifica un proceso que de otro modo repetirías manualmente cada vez.

Cuando le decís a Claude Code "usá el skill de redacción SEO", el agente carga ese documento, entiende el proceso completo que describe, y lo ejecuta siguiendo cada paso sin que tengas que repetir las instrucciones cada vez.

Para SEO, esto es particularmente valioso por tres razones:

**1. Consistencia entre proyectos.** Sin skills, cada vez que le pedís a Claude Code que redacte un artículo, tenés que explicarle el contexto: la metodología, el tono, la estructura, los internal links obligatorios, los consensus terms. Con un skill cargado, ese contexto ya está. El output es consistente entre el artículo número 1 y el número 30.

**2. Conocimiento especializado codificado.** Un skill puede capturar años de experiencia en un formato que el agente puede aplicar en segundos. Mi skill de análisis de intención de búsqueda, por ejemplo, clasifica el intent en TOFU/MOFU/BOFU, identifica el content type ganador para cada SERP y define la estructura ideal del artículo — todo siguiendo un marco que me llevó meses desarrollar.

**3. Composabilidad.** Podés encadenar skills. En mi pipeline de creación de contenido, el skill de `search-intent-analyzer` alimenta al skill de `redaccion-seo-blog`, que a su vez usa el `voice-cloning-framework`. Cada uno hace una cosa concreta, y juntos producen un artículo completo listo para publicar.

Según [la documentación oficial de Anthropic sobre Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview), el sistema de instrucciones basadas en markdown es una de las formas más eficientes de especializar al agente sin fine-tuning ni configuraciones complejas. Si querés ver la referencia completa de cómo crear y configurar skills, la [documentación de skills en Claude Code](https://code.claude.com/docs/en/skills) lo cubre paso a paso.

---

## ¿Cómo funciona un skill de SEO por dentro?

Un `skill.md` tiene una estructura simple pero muy deliberada. No es un prompt cualquiera — es un documento que define el contexto, el proceso y los criterios de éxito de una tarea específica.

La estructura básica de cualquier skill que funciona bien tiene estos componentes:

```markdown
---
name: nombre-del-skill
description: Qué hace este skill y cuándo usarlo
---

# Nombre del Skill

## Triggers
- Qué instrucciones activan este skill
- "Frases clave" que lo invocan

## Parámetros
| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| keyword   | Sí        | La keyword principal del artículo |

## Proceso Paso a Paso

### Paso 1: [Nombre del paso]
1. Instrucción concreta
2. Qué herramienta usar o qué consultar
3. Qué output se espera

### Paso 2: [Siguiente paso]
[...]

## Output Esperado
Qué debe producir el agente al final del skill
```

Lo que diferencia a un skill útil de uno que no sirve es la granularidad del "Proceso Paso a Paso". Si el proceso dice "analizar la SERP", el agente va a hacer algo vagamente. Si dice "ejecutar `SerpResultados` con la keyword principal, extraer los top 5 resultados orgánicos, navegar cada URL con Chrome DevTools y capturar estructura de H2s, FAQs y CTAs", el output va a ser consistente y accionable.

Básicamente, un skill le dice al agente exactamente qué hacer, en qué orden, con qué herramientas y con qué criterio de calidad. O sea, codifica tu metodología de trabajo.

---

## ¿Qué skills SEO tengo funcionando en mi workflow?

Acá viene la parte que más me pidieron: mostrar los skills reales. No ejemplos genéricos — los archivos que yo tengo en producción para este sitio y para clientes.

Los tengo organizados en `~/.claude/skills/` (globales) y en `.claude/skills/` dentro de cada proyecto (específicos de ese proyecto). Los globales aplican en cualquier sesión de Claude Code. Los del proyecto aplican solo cuando trabajás dentro de ese directorio.

### `voice-cloning-framework` — Que la IA suene como vos

Este es el skill que más impacto tiene en la calidad del contenido. Codifica cómo comunico yo: los patrones retóricos, el ciclo cognitivo, el diccionario personalizado, la calibración emocional.

El skill define, entre otras cosas, que mi arquetipo comunicacional es el "Traductor Entusiasta" — sé mucho pero bajo al nivel del otro y me emociono al compartir. Define que uso la auto-entrevista socrática (me hago preguntas y me respondo), el puente traductor (término técnico + "o sea" + explicación simple) y que nunca doy respuestas absolutas sobre presupuestos.

```markdown
# Framework de Clonación de Voz Cognitiva

## Ciclo Cognitivo Central
1. Identificación del dolor manual →
2. Descubrimiento técnico →
3. Simplificación para la audiencia →
4. Demostración de resultados ("la alegría")

## Arquetipos Comunicacionales
EXPERTO + CERCANO = "Traductor Entusiasta"
→ Sabe mucho pero baja al nivel del otro
→ Se emociona al compartir

## Patrones Retóricos Obligatorios
- Auto-entrevista socrática: [Pregunta] + [Respuesta] + [Justificación con "O sea"]
- Puente traductor: [Término técnico] + "o sea" + [Traducción coloquial]
- Corrección en tiempo real: "A ver, te lo explico mejor..."
```

El resultado concreto: cada artículo del blog suena como yo lo escribiría, no como una IA genérica. Eso no es un detalle estético — es E-E-A-T. Google premia el contenido con voz y perspectiva propias.

### `redaccion-seo-blog` — Metodología Koray aplicada a cada artículo

Este skill codifica la metodología SEO de Koray Tuğberk Gübür adaptada a mi flujo. Define que todos los H2 y H3 son preguntas, que cada sección empieza con un snippet de 30-40 palabras, que la expansión tiene datos factuales y microsemántica, que los internal links siguen reglas específicas de anchor text.

Es básicamente la guía de redacción que aplico en cada artículo, codificada para que Claude Code la aplique sin que yo tenga que recordársela cada vez.

### `search-intent-analyzer` — Clasificar la intención antes de escribir

Antes de redactar cualquier artículo, necesito entender qué busca realmente el usuario detrás de esa keyword. Este skill toma los datos del research (keywords, SERP features, URLs que rankean, tipos de resultado) y produce un brief estructurado con:

- Clasificación del intent (TOFU/MOFU/BOFU)
- Content type ganador para esa SERP
- Estructura de H2s recomendada
- Consensus terms obligatorios (los términos que aparecen en todos los competidores)
- Gaps de contenido a explotar

### `geo-landing-generator` — Landings geolocalizadas sin repetición

Para generar landing pages de "Consultor SEO en [Ciudad]", tengo un skill que lee el template base, extrae metadata de un JSON de ciudades y reescribe el contenido con contexto local real. No es find-and-replace — cada landing tiene redacción única adaptada a la ciudad.

---

## ¿Cuál es la diferencia entre skills, subagentes y MCPs?

Esta es la pregunta que más confusión genera. Y entiendo por qué — los tres amplían lo que Claude Code puede hacer, pero desde ángulos completamente distintos.

| | Skills | MCPs | Subagentes |
|---|---|---|---|
| **Qué son** | Archivos de instrucciones (skill.md) | Servidores que conectan Claude a herramientas externas | Instancias de Claude que trabajan en paralelo o en secuencia |
| **Qué le dan a Claude** | Metodología y contexto especializado | Acceso a datos y herramientas en tiempo real | Capacidad de ejecución paralela y división de tareas |
| **Ejemplo SEO** | Cómo redactar un artículo con metodología Koray | Ejecutar keyword research en DataForSEO | Analizar 5 competidores al mismo tiempo |
| **Configuración** | Archivo Markdown en `.claude/skills/` | Servidor externo declarado en `claude_mcp_config.json` | Se declaran dentro de un skill o agente |
| **Persistencia** | Permanente (en el directorio del skill) | Permanente (configuración de Claude Code) | Por sesión / tarea |
| **Costo computacional** | Bajo (contexto adicional) | Variable (depende de la API) | Alto (múltiples instancias del modelo) |

La distinción más importante para SEO: **los MCPs traen datos, los skills procesan esos datos con criterio, y los subagentes distribuyen el trabajo a escala**.

Un ejemplo concreto de cómo interactúan los tres en mi workflow:

1. **MCP** `DataForSEO` ejecuta el keyword research y trae datos en vivo
2. **Skill** `search-intent-analyzer` procesa esos datos y clasifica la intención
3. **Skill** `redaccion-seo-blog` + `voice-cloning-framework` redactan el artículo con criterio metodológico y voz propia
4. **Subagente** (opcional) analiza simultáneamente los top 5 competidores mientras se redacta

Sin skills, tenés datos pero no criterio para procesarlos. Sin MCPs, tenés criterio pero no datos frescos. Sin subagentes, podés hacer todo pero en secuencia. Los tres juntos es cuando el flujo se vuelve realmente escalable.

Si querés profundizar en la configuración de MCPs, tengo una [guía completa de MCP Servers para SEO](/blog/mcp-servers-seo) con la configuración exacta de cada servidor que uso.

---

## ¿Cómo creo mi primer skill SEO desde cero?

Acá viene la parte práctica. Voy a mostrarte el proceso completo para armar un skill de análisis de keywords que sea realmente útil — no un ejemplo de juguete.

### Paso 1: Elegir una tarea concreta y repetitiva

Los mejores skills resuelven tareas que hacés seguido y que requieren los mismos pasos cada vez. Malos candidatos: tareas que varían mucho según el contexto. Buenos candidatos: procesos con estructura fija que solo cambian en los datos de entrada.

Para keyword research, por ejemplo, siempre hago lo mismo: ejecuto `KeywordSuggestions`, cruzo con `KwsRelacionadas`, analizo la SERP con `SerpResultados` y clasifico las keywords por intent y dificultad. Eso es un buen skill.

### Paso 2: Documentar el proceso como si se lo explicaras a alguien nuevo

Esto es lo más importante. Antes de escribir el `skill.md`, escribí el proceso en papel (o Notion, o donde sea) como si le explicaras a un junior cómo hacerlo. Cada paso, cada decisión, cada criterio de calidad.

Si no podés documentar el proceso, no podés hacer un skill. El skill es la documentación del proceso — no se puede inventar.

### Paso 3: Crear el archivo `skill.md`

Creá la carpeta en `.claude/skills/{nombre-del-skill}/` y dentro el archivo `skill.md`. Esta es la estructura mínima que necesitás:

```markdown
---
name: keyword-research-seo
description: >
  Ejecuta keyword research completo para un tema dado.
  Combina DataForSEO tools para mapear el universo semántico,
  clasificar intención de búsqueda y priorizar oportunidades.
---

# Keyword Research SEO

## Triggers
- "Haceme un keyword research para [tema]"
- "Analizá las keywords de [tema]"
- "Necesito keywords para [tema]"

## Parámetros
| Parámetro    | Requerido | Descripción                              |
|--------------|-----------|------------------------------------------|
| `keyword`    | Sí        | La keyword o tema central a analizar     |
| `pais`       | No        | País objetivo (default: Chile)           |
| `idioma`     | No        | Idioma (default: es)                     |

## Proceso

### Paso 1: Ejecutar research en paralelo
Ejecutar simultáneamente:
1. `KeywordSuggestions` con la keyword principal → keywords relacionadas y long-tail
2. `KwsRelacionadas` → co-ocurrencia semántica
3. `SerpResultados` → SERP features, AI Overviews, URLs que rankean, tipos de resultado

### Paso 2: Clasificar por intención
Para cada keyword obtenida, clasificar:
- **TOFU** (informacional): "qué es", "cómo funciona", "guía de"
- **MOFU** (comparación): "vs", "alternativas", "mejor"
- **BOFU** (transaccional): "precio", "contratar", "cotización"

### Paso 3: Priorizar oportunidades
Ordenar por: (Volumen de búsqueda / KD) × relevancia para el negocio
Marcar como prioritarias las keywords con:
- KD < 30 y volumen > 100
- O KD < 10 con cualquier volumen (first mover)

### Paso 4: Entregar tabla estructurada
Output obligatorio en formato tabla:
| Keyword | Volumen | KD | Intent | Prioridad | Notas |

## Criterio de Calidad
- Mínimo 30 keywords en el output
- Al menos 1 keyword BOFU identificada
- Consensus terms del cluster anotados
```

### Paso 4: Ubicar el skill en el directorio correcto

- `~/.claude/skills/{nombre}/skill.md` → Skill global (disponible en todos tus proyectos)
- `.claude/skills/{nombre}/skill.md` → Skill específico del proyecto (solo en ese directorio)

Para workflows de SEO que usás en múltiples proyectos de clientes, global. Para skills que usan archivos o contexto específico de un proyecto (como el `geo-landing-generator` que lee un JSON de ciudades), dentro del proyecto.

### Paso 5: Iterar

El primer skill nunca es el definitivo. Usalo 3-4 veces, anotá qué outputs no son como esperabas, y ajustá el proceso. Los mejores skills los terminé de pulir después de la quinta o sexta ejecución real.

---

## ¿Qué resultados reales da usar skills en un flujo SEO?

Voy a ser honesto: no tengo un A/B test científico con grupo de control. Lo que tengo son números del workflow antes y después de sistematizar los skills.

**Tiempo de creación de un artículo completo:**
- Antes (sin skills, prompting manual): 3-4 horas desde keyword a archivo publicado
- Ahora (con pipeline de skills): 45-90 minutos para el mismo output

El cambio más grande no es la velocidad en sí — es la consistencia. Antes, el artículo número 15 no necesariamente tenía la misma calidad que el artículo número 3, porque dependía de qué tan bien había promteado ese día. Ahora, el proceso es el mismo para cada artículo porque el skill no olvida, no improvisa y no toma atajos.

**Cobertura de consensus terms:**
Antes de tener el `search-intent-analyzer` codificado como skill, me olvidaba de incluir términos que los competidores tenían consistentemente. Ahora el skill los identifica automáticamente en el paso de análisis de entropía semántica y los marca como obligatorios en el brief.

**Internal linking:**
Uno de los errores más comunes en producción de contenido a escala es olvidar los internal links o poner anchor text genérico. El skill de redacción tiene los links obligatorios hardcodeados por tipo de artículo — el agente los incluye aunque yo no se los pida explícitamente.

Para ver esto aplicado a un caso real, tengo el detalle de cómo lo usé en la [auditoría SEO con Claude Code](/blog/auditoria-seo-claude-code) de un proyecto real, con los issues que encontré y las correcciones que ejecuté.

---

## Preguntas frecuentes sobre skills de Claude Code para SEO

### ¿Cuál es la diferencia entre un skill de Claude Code y un prompt de sistema?

Un prompt de sistema aplica a toda la sesión y define el comportamiento general del agente. Un skill es contexto especializado que se activa para una tarea específica y puede convivir con el prompt de sistema. Podés tener un `CLAUDE.md` con las reglas generales del proyecto y múltiples skills que se invocan según la tarea — redacción, keyword research, auditoría, generación de imágenes.

### ¿Los skills funcionan con cualquier modelo de Claude?

Sí, los skills son archivos de instrucciones en Markdown — no tienen dependencia del modelo específico. Funcionan con Claude Sonnet, Claude Opus y cualquier versión futura. La diferencia es que los modelos más capaces siguen las instrucciones del skill con más fidelidad y manejan mejor la complejidad de workflows multistep.

### ¿Cuántos skills puedo tener activos simultáneamente?

No hay límite técnico, pero hay un límite práctico: el contexto de Claude Code tiene una ventana de tokens. Si cargás demasiados skills muy extensos en la misma sesión, empezás a consumir contexto que necesitás para los datos y el contenido. Mi recomendación: skills específicos y concisos, de 200-400 líneas máximo, que hagan una sola cosa bien.

### ¿Los skills de SEO reemplazan herramientas como Semrush o Ahrefs?

No reemplazan los datos — eso lo hacen los MCPs conectados a APIs como DataForSEO. Los skills reemplazan el tiempo de prompting manual y la variabilidad de los outputs. Si tenés acceso a datos de calidad vía MCP, los skills los procesan con criterio metodológico consistente. Sin datos de calidad, los skills siguen siendo útiles pero el análisis va a estar limitado. Para más detalles sobre cómo automatizar con Python más allá de los skills, tengo una guía de [automatización SEO con Python](/blog/automatizacion-seo-python) con scripts concretos.

### ¿Necesito saber programar para crear un skill?

No. Un `skill.md` es un archivo de texto en Markdown. Si sabés escribir una lista numerada y una tabla en Markdown, podés crear un skill. La complejidad está en documentar bien el proceso — eso requiere que entiendas tu propio workflow, no que sepas programar.

---

## El siguiente paso: aplicar esto en tu flujo real

Los skills de Claude Code no son una feature avanzada para usuarios técnicos. Son documentación de workflows — algo que cualquier [consultor SEO](/consultor-seo-chile) que trabaje con IA debería tener desde el primer mes.

Si ya usás Claude Code para SEO, el primer skill que te recomiendo crear es el de redacción: documentá exactamente cómo estructurás tus artículos, qué elementos son obligatorios, cómo manejás los internal links y cómo suena tu voz. Ese solo skill va a mejorar la consistencia de tu contenido en semanas.

Si todavía no usás Claude Code y querés entender el setup completo antes de meterte con skills, el punto de partida es mi [guía de Claude Code para SEO](/blog/claude-code-seo) — ahí tengo el stack completo con MCPs, scripts y el flujo de trabajo de principio a fin.

Y si preferís que armemos el workflow juntos para tu proyecto específico, podés [pedirme una auditoría SEO](/auditoria-seo-chile) donde evaluamos qué parte de tu proceso tiene más para ganar con automatización.
