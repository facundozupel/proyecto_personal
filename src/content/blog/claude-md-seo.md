---
title: "CLAUDE.md para SEO: Cómo Configurar tu Archivo para Automatizar tu Estrategia"
description: "Aprende qué es CLAUDE.md, cómo estructurarlo para proyectos SEO, qué secciones son obligatorias y cómo diferenciarlo de skills y settings.json. Con ejemplos reales."
author: "Facundo Zupel"
date: 2026-03-17
readTime: "12 minutos"
tags: ["SEO", "Claude Code", "CLAUDE.md", "Configuración", "IA"]
draft: false
---

La primera vez que abrí Claude Code y vi el archivo `CLAUDE.md` vacío, pensé: "bueno, es solo un README más". Error garrafal. Ese archivo es, literalmente, la diferencia entre un agente que entiende tu proyecto SEO desde el primer mensaje y uno que te hace repreguntar lo mismo veinte veces.

O sea, `CLAUDE.md` es la memoria de Claude. Sin él, cada sesión empieza desde cero. Con él bien configurado, Claude sabe tu topical map, tu tono de marca, qué páginas no tocar, dónde están los archivos, qué herramientas MCP usar para keyword research. Básicamente, convierte a Claude Code en un asistente SEO senior que ya trabajó contigo antes.

En este artículo te explico exactamente cómo estructurarlo para proyectos SEO, qué secciones son obligatorias, cómo diferenciarlo de los skills y el `settings.json`, y te muestro el CLAUDE.md real que uso en este sitio.

---

## Tabla de contenidos

1. [¿Qué es CLAUDE.md y por qué es clave para SEO?](#qué-es-claudemd-y-por-qué-es-clave-para-seo)
2. [¿Cómo se carga CLAUDE.md jerárquicamente?](#cómo-se-carga-claudemd-jerárquicamente)
3. [¿Qué secciones necesita un CLAUDE.md orientado a SEO?](#qué-secciones-necesita-un-claudemd-orientado-a-seo)
4. [¿Cómo es la estructura de un CLAUDE.md SEO completo?](#cómo-es-la-estructura-de-un-claudemd-seo-completo)
5. [¿Cuál es la diferencia entre CLAUDE.md, settings.json y skills?](#cuál-es-la-diferencia-entre-claudemd-settingsjson-y-skills)
6. [¿Cómo usar hooks de Claude Code para SEO?](#cómo-usar-hooks-de-claude-code-para-seo)
7. [¿Cuáles son los errores más comunes al configurar CLAUDE.md?](#cuáles-son-los-errores-más-comunes-al-configurar-claudemd)
8. [Mi CLAUDE.md real: walkthrough del archivo que uso en facundogrowth.com](#mi-claudemd-real-walkthrough-del-archivo-que-uso-en-facundogrowthcom)
9. [Preguntas frecuentes sobre CLAUDE.md](#preguntas-frecuentes-sobre-claudemd)

---

## ¿Qué es CLAUDE.md y por qué es clave para SEO?

`CLAUDE.md` es un archivo markdown que Claude Code carga automáticamente al inicio de cada sesión, dándole contexto persistente sobre el proyecto, las convenciones y los flujos de trabajo. Para proyectos SEO, es el mecanismo que permite que el agente opere con coherencia estratégica sin necesidad de explicarle el contexto cada vez.

A ver, te lo explico mejor. Cuando arrancás una sesión nueva de Claude Code sin `CLAUDE.md`, el modelo no sabe nada: no sabe que tu sitio es un blog de consultoría SEO en Chile, no sabe que tenés un topical map definido, no sabe que no debe tocar los archivos en `dist/`, no sabe qué herramientas MCP conectar para hacer keyword research. Cada tarea empieza con una explicación que puede durar párrafos.

Con `CLAUDE.md` bien configurado, todo eso se carga en el contexto de inicio. Claude ya sabe cuál es tu estrategia, cuáles son los topical borders, qué workflows seguir para crear un artículo nuevo y qué herramientas usar. La diferencia en productividad es gigantesca.

Para SEO en particular, `CLAUDE.md` resuelve tres problemas concretos:

**Consistencia estratégica**: sin instrucciones persistentes, Claude puede crear contenido que se canibalice con páginas existentes, usar un tono inconsistente o enlazar incorrectamente. El `CLAUDE.md` actúa como un brief estratégico que el agente consulta en cada tarea.

**Automatización de flujos**: podés definir workflows completos (pipeline de creación de artículos, proceso de auditoría, generación de landings geolocalizadas) directamente en el archivo, y Claude los seguirá sin que los tengas que re-explicar.

**Context window eficiente**: según la [documentación oficial de Anthropic](https://docs.anthropic.com/en/docs/claude-code/memory), `CLAUDE.md` se carga al inicio y consume context window de manera controlada. Mejor tener un archivo bien estructurado y conciso que estar pegando instrucciones largas en cada mensaje.

---

## ¿Cómo se carga CLAUDE.md jerárquicamente?

Claude Code carga archivos `CLAUDE.md` en cascada desde tres niveles: enterprise (configuración corporativa), usuario (`~/.claude/CLAUDE.md`) y proyecto (`./CLAUDE.md` en la raíz). Los tres se fusionan, con el nivel más específico sobreescribiendo al más general.

Esta jerarquía es impresionante para proyectos SEO porque permite separar configuración personal de configuración de proyecto.

### ¿Qué va en el CLAUDE.md de usuario (~/.claude/CLAUDE.md)?

Las preferencias que aplican a todos tus proyectos independientemente del cliente o sitio. Por ejemplo: qué herramientas CLI tenés disponibles en tu máquina, tu formato preferido para commits de git, o configuraciones de entorno que son iguales para todos tus proyectos.

En mi caso, en `~/.claude/CLAUDE.md` tengo definido `html2pdf`, mi conversor de HTML a PDF para informes, y preferencias generales de formato de código.

### ¿Qué va en el CLAUDE.md del proyecto (./CLAUDE.md)?

Todo lo específico del sitio: la estrategia SEO, el topical map, las reglas de internal linking, la estructura del proyecto Astro, los workflows de creación de contenido, las variables de entorno, las integraciones con Vercel. Todo lo que Claude necesita saber para trabajar en ese proyecto específico.

La clave está en que cuando trabajás en un archivo como `src/components/blog/BlogCard.tsx`, Claude carga automáticamente el `CLAUDE.md` de la raíz del proyecto y el de los directorios padres. O sea, el contexto se acumula de manera inteligente según dónde está trabajando.

---

## ¿Qué secciones necesita un CLAUDE.md orientado a SEO?

Un `CLAUDE.md` efectivo para proyectos SEO necesita cubrir cinco áreas: contexto estratégico del sitio, estructura del proyecto, workflows de creación de contenido, reglas de configuración técnica y referencias a recursos externos. Cada área resuelve un tipo de error diferente que comete Claude cuando no tiene esa información.

### ¿Por qué incluir el contexto estratégico SEO?

Sin contexto estratégico, Claude puede crear contenido fuera del topical border, canibalizar keywords existentes o proponer una estructura que no refuerza la entidad central. Al incluir el topical map, los topical borders y la entidad central, el agente puede tomar decisiones editoriales autónomas correctas.

Esto es especialmente relevante cuando trabajás con la metodología de Koray: necesitás que Claude entienda qué términos microsemánticos corresponden a cada cluster, cuáles son las páginas Core Section vs Author Section, y cómo funciona la Link Priority Matrix del sitio.

### ¿Por qué incluir la estructura del proyecto?

Claude Code puede editar cualquier archivo del sistema de archivos. Sin una sección que diga explícitamente "nunca edites `dist/`, los cambios van en `src/`", el agente va a tomar el camino más corto, que a veces significa editar el output generado directamente.

Para proyectos Astro, Next.js o cualquier framework con build step, esta sección es crítica. Incluí también los comandos de build, preview y deploy para que Claude no tenga que adivinar.

### ¿Por qué incluir los workflows de contenido?

Los workflows son los que multiplican la productividad. En lugar de explicarle a Claude "primero hacé keyword research con DataForSEO, después analizá los competidores con Chrome DevTools, después usá el skill de search intent..." cada vez que querés crear un artículo, lo describís una vez en `CLAUDE.md` y Claude lo sigue sistemáticamente.

Si querés profundizar en cómo los [skills de Claude Code se integran en estos workflows](/blog/claude-code-skills-seo), tengo un artículo dedicado a eso.

---

## ¿Cómo es la estructura de un CLAUDE.md SEO completo?

Un `CLAUDE.md` completo para SEO tiene estas secciones en este orden: contexto del proyecto, flujos de trabajo obligatorios con pasos numerados, estructura de archivos del proyecto, configuración técnica (deploy, variables de entorno) y referencias a recursos externos.

Acá te muestro la estructura base que uso:

```markdown
# Directrices del Proyecto [nombre-sitio]

## Contexto del Proyecto
[Referencia al topical map y contexto estratégico]

## Flujos de Trabajo Obligatorios

### 1. Crear Artículo de Blog (Pipeline Completo)
#### Paso 1: Selección de keyword
#### Paso 2: Research con DataForSEO
#### Paso 3: Análisis de competidores
#### Paso 4: Search Intent Analyzer
#### Paso 5: Escritura del artículo
#### Paso 6: Generación de imágenes (condicional)

### 2. Crear Página Core Section
### 3. Generar Landing Geolocalizada
### 4. Analizar Competidores
[...más workflows]

## Estructura del Proyecto
[Árbol de directorios con descripción de cada carpeta]

## Deploy e Infraestructura
[Adapter, variables de entorno, URL, comandos de build]

## Skills y Agentes Disponibles
[Tabla de skills con su uso específico]

## Referencias
[Links a archivos de contexto adicionales]
```

Lo importante acá no es la cantidad de texto, sino la especificidad. Un `CLAUDE.md` de 100 líneas con instrucciones precisas es más útil que uno de 500 líneas lleno de generalidades.

### ¿Cómo documentar los workflows SEO para que Claude los siga correctamente?

Cada workflow necesita tres elementos: un trigger claro (cuándo activarse), pasos numerados con las herramientas exactas a usar, y el objetivo de cada paso. Sin el objetivo, Claude no puede adaptar el proceso si algo falla.

Por ejemplo, así documento el paso de análisis de competidores:

```markdown
#### Paso 3: Análisis de competidores con Chrome DevTools
**Tools MCP** `chrome-devtools`:
- `navigate_page` → Entrar a los top 3-5 resultados orgánicos
- `take_snapshot` → Extraer estructura de H2s, formato, profundidad, FAQs

**Objetivo**: Ver el contenido real que Google premia para esa keyword.
```

El "objetivo" al final de cada paso es lo que permite a Claude razonar cuando el proceso exacto no aplica al 100% del caso de uso.

---

## ¿Cuál es la diferencia entre CLAUDE.md, settings.json y skills?

`CLAUDE.md` es contexto y memoria del proyecto. `settings.json` es configuración de comportamiento del agente (permisos, herramientas habilitadas). Los skills son capacidades especializadas que Claude invoca automáticamente según el contexto de la tarea. Los tres son complementarios, no equivalentes.

Esta distinción es la que más confunde a quienes empiezan con Claude Code, así que la voy a desarmar capa por capa.

### ¿Cuándo usar CLAUDE.md?

Cuando necesitás que Claude recuerde contexto, siga convenciones del proyecto o ejecute workflows específicos. Es narrativo: le contás al agente cómo funciona el proyecto y qué se espera de él.

Ejemplos de qué va en `CLAUDE.md`:
- "Este proyecto usa Astro con SSR. El output está en `dist/` y nunca se edita manualmente."
- "Para crear artículos, seguir el pipeline de 6 pasos definido en la sección de workflows."
- "Los internal links a páginas Core deben usar anchor text descriptivo, nunca 'clic aquí'."

### ¿Cuándo usar settings.json?

Cuando necesitás controlar el comportamiento del agente a nivel de herramientas y permisos. `settings.json` no es narrativo, es declarativo.

```json
{
  "permissions": {
    "allow": ["Bash(npm:*)", "Bash(git:*)"],
    "deny": ["Bash(rm:-rf*)"]
  }
}
```

Para SEO, `settings.json` es útil para habilitar específicamente los MCP servers que usás (DataForSEO, Chrome DevTools, Google Search Console) y deshabilitar los que no.

### ¿Cuándo usar skills?

Cuando tenés un proceso especializado que Claude debe ejecutar de manera consistente en múltiples proyectos o contextos. Los skills son archivos markdown en `.claude/skills/` que se activan automáticamente cuando Claude detecta que la tarea los requiere.

La diferencia clave con `CLAUDE.md`: los skills son transportables entre proyectos. Si tenés un skill de análisis de search intent, funciona igual en tu proyecto Astro, en el cliente de Next.js y en el proyecto de ecommerce. `CLAUDE.md` es específico del proyecto.

En el contexto de SEO, tengo documentado en detalle cómo [los MCP servers se integran con esta arquitectura](/blog/mcp-servers-seo). La combinación CLAUDE.md + skills + MCP es lo que permite escalar el trabajo SEO sin perder coherencia estratégica.

---

## ¿Cómo usar hooks de Claude Code para SEO?

Los hooks de Claude Code son scripts que se ejecutan automáticamente en respuesta a eventos del ciclo de vida del agente: `PreToolUse`, `PostToolUse`, `PreCompact`, `Stop`. Para SEO, los casos de uso más valiosos son validación de contenido antes de publicar y notificaciones post-build.

Básicamente, los hooks son el mecanismo que te permite insertar lógica personalizada en el flujo de Claude sin tener que decírselo cada vez. Son declarativos: los definís una vez en `settings.json` y se ejecutan solos.

### ¿Qué hooks son útiles para proyectos SEO?

**Hook PostToolUse en Bash (después de npm run build)**

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "node scripts/validate-seo-build.js"
      }]
    }]
  }
}
```

Este hook corre un script de validación SEO después de cada build. El script puede verificar que todas las páginas tienen meta description, que los canonical están bien configurados, que el sitemap se generó correctamente.

**Hook PreToolUse en Write (antes de crear un archivo)**

Útil para validar que el frontmatter del markdown tenga todos los campos obligatorios antes de escribir el archivo. Si Claude intenta crear un `.md` sin `description` o con `draft: true`, el hook puede alertar antes de proceder.

**Hook Stop (al finalizar la sesión)**

Podés configurar un hook que al cerrar la sesión genere un resumen de los cambios hechos y actualice un log de actividad SEO. Tedioso de hacer manualmente, automatizable en dos líneas de configuración.

Los hooks están en etapa relativamente nueva de Claude Code y [la documentación oficial de Anthropic](https://docs.anthropic.com/en/docs/claude-code/hooks) los está expandiendo constantemente. Vale la pena revisarla periódicamente.

---

## ¿Cuáles son los errores más comunes al configurar CLAUDE.md?

Los errores más frecuentes son: archivo demasiado largo con instrucciones redundantes, falta de especificidad en los workflows, ausencia de límites claros ("no tocar dist/"), y no referenciar los skills y agentes disponibles.

Voy directo a los que más duelen:

### Error 1: El CLAUDE.md como manual de 2000 líneas

Cada línea en `CLAUDE.md` consume context window. Si llenás el archivo con documentación exhaustiva de todo el proyecto, le estás robando espacio al contexto de trabajo real.

La solución: en `CLAUDE.md` ponés la referencia, no el contenido. En lugar de pegar todo el topical map, escribís "**IMPORTANTE**: antes de cualquier acción, lee `CONTEXTO-PROYECTO.md` para entender la estrategia SEO". El contexto adicional se lee bajo demanda.

### Error 2: Workflows sin herramientas específicas

"Hacer keyword research antes de escribir" no es un workflow. Es una intención. Un workflow es: "Usar `KeywordSuggestions`, `KwsRelacionadas` y `SerpResultados` de DataForSEO MCP en paralelo, luego analizar los top 3 resultados con Chrome DevTools."

Sin especificidad de herramientas, Claude va a improvisar. Y cuando improvisa en SEO, puede perfectamente hacer keyword research con una búsqueda web genérica cuando vos tenés acceso a DataForSEO con datos reales de volumen.

### Error 3: No definir los topical borders

Este es el error que más duele a mediano plazo. Si Claude no sabe qué temas están fuera del scope del sitio, puede proponer artículos que diluyen la autoridad temática o que entran en conflicto con páginas existentes.

Para un sitio de consultoría SEO, los topical borders están claros: SEO, automatización SEO, IA aplicada a SEO. Fuera del border: marketing de redes sociales, publicidad paga, diseño web (a menos que afecte directamente el SEO técnico).

### Error 4: No mantener el archivo actualizado

`CLAUDE.md` refleja el estado actual del proyecto. Si agregaste un nuevo skill, un nuevo agente, o cambiaste la arquitectura de deploy, el archivo debe actualizarse. Un `CLAUDE.md` desactualizado es peor que uno inexistente, porque le da instrucciones incorrectas al agente con plena confianza.

### Error 5: Instrucciones ambiguas en la negativa

"No hacer cosas raras con los archivos" no funciona. "Nunca editar archivos en `dist/`. Todos los cambios van en `src/` y se regeneran con `npm run build`" sí funciona.

Las instrucciones de lo que Claude NO debe hacer necesitan ser tan específicas como las de lo que sí debe hacer. Si leés el guía completa de [Claude Code para SEO](/blog/claude-code-seo), hay una sección dedicada a cómo estructurar las restricciones para que el agente las respete consistentemente.

---

## Mi CLAUDE.md real: walkthrough del archivo que uso en facundogrowth.com

El `CLAUDE.md` de facundogrowth.com tiene cuatro secciones principales: contexto del proyecto (con referencia al topical map), workflows obligatorios (pipeline de 6 pasos para artículos), sistema visual del sitio y configuración de deploy. No es el más corto que podría hacer, pero cada sección tiene una razón de ser.

Acá te walkthrough de las decisiones de diseño, no del contenido textual completo.

### La sección de contexto del proyecto

En lugar de pegar el topical map completo, puse una instrucción de lectura obligatoria:

```markdown
## Contexto del Proyecto

**IMPORTANTE**: Antes de cualquier acción, lee el archivo `CONTEXTO-PROYECTO.md`
para entender:
- La estrategia SEO y Topical Map del sitio
- Los topical borders (qué contenido crear y cuál NO)
- Las reglas de internal linking
- La guía de estilo y tono
```

Esto mantiene el `CLAUDE.md` limpio y delega el detalle a un archivo separado. El `CONTEXTO-PROYECTO.md` puede tener 5000 palabras sin afectar el contexto de inicio de sesión, porque Claude solo lo lee cuando lo necesita.

### Los workflows con pasos numerados

Cada workflow tiene nombre, herramientas específicas y objetivo por paso. El workflow de creación de artículos tiene 6 pasos: selección de keyword, research con DataForSEO, análisis de competidores con Chrome DevTools, análisis de search intent con el skill dedicado, escritura del artículo y generación de imágenes (condicional).

Lo que hace que funcione es el nivel de especificidad en cada paso. No digo "hacer keyword research", digo qué herramienta MCP usar, qué endpoints ejecutar en paralelo y cuál es el output esperado.

### La tabla de skills y agentes

Al final del archivo hay una tabla que mapea necesidades a herramientas:

```markdown
| Necesidad | Herramienta |
|-----------|-------------|
| Crear artículo de blog | blog-post-publisher + search-intent-analyzer |
| Analizar intención de búsqueda | search-intent-analyzer |
| Generar landing geolocalizada | geo-landing-generator |
| Extraer datos GSC | scripts/gsc-extract/extract.py |
```

Esta tabla parece simple pero es una de las partes más valiosas del archivo. Claude la consulta para saber qué invocar cuando una tarea calza con una de las categorías. Sin ella, el agente puede resolver una tarea de manera correcta pero ineficiente (haciendo keyword research manualmente cuando hay un MCP específico para eso).

### La sección de sistema visual

Para facundogrowth.com, que tiene un diseño tipo Bauhaus/Groth Studio bastante específico, documenté la paleta de colores, las clases CSS del sistema, la estructura de secciones y las reglas de botones. Esto evita que Claude rompa el sistema visual cuando crea componentes nuevos o modifica secciones existentes.

Para sitios con un design system establecido, esta sección vale su peso en oro. El tiempo que ahorrás en correcciones de estilo más que justifica las líneas adicionales en el archivo.

---

## Preguntas frecuentes sobre CLAUDE.md

### ¿Qué es Claude MD?

`CLAUDE.md` es un archivo de memoria persistente que Claude Code carga automáticamente al inicio de cada sesión. Contiene el contexto del proyecto, las convenciones del código, los flujos de trabajo y las instrucciones específicas que el agente debe seguir. A diferencia de los mensajes del chat, persiste entre sesiones y se carga en el contexto del sistema, no del usuario.

### ¿Cuál es la diferencia entre CLAUDE.md y un skill?

`CLAUDE.md` define el contexto y los workflows de un proyecto específico: arquitectura, instrucciones de comportamiento, herramientas disponibles, restricciones. Un skill es una capacidad especializada y reutilizable que Claude puede invocar en múltiples proyectos: por ejemplo, un skill de voice cloning que define cómo escribir en el tono de una persona, o un skill de análisis de search intent. `CLAUDE.md` es el "¿cómo funciona este proyecto?", los skills son el "¿cómo hago X tarea en cualquier proyecto?".

### ¿CLAUDE.md afecta el context window?

Sí. El contenido de `CLAUDE.md` se carga en el contexto de sistema al inicio de cada sesión y consume tokens del context window disponible. Por eso la recomendación es mantenerlo conciso y referenciar archivos adicionales (`CONTEXTO-PROYECTO.md`, skills externos) en lugar de incluir todo el contenido directamente. Para proyectos complejos, un `CLAUDE.md` de 200-400 líneas bien estructurado es el rango óptimo.

### ¿Se puede tener más de un CLAUDE.md en el mismo proyecto?

Sí. Podés tener `CLAUDE.md` en subdirectorios del proyecto, y Claude los cargará según el directorio donde esté trabajando. Esto es útil para proyectos con múltiples módulos: el `CLAUDE.md` de la raíz define las convenciones globales, y el de `src/components/` puede definir convenciones específicas de componentes. Para la mayoría de proyectos SEO, un solo `CLAUDE.md` en la raíz es suficiente.

### ¿Cuáles son los 4 pilares de un SEO bien documentado en CLAUDE.md?

Un `CLAUDE.md` orientado a SEO necesita cubrir: (1) contexto estratégico (topical map, entidad central, topical borders), (2) workflows de contenido (pipeline de creación, reglas de internal linking, estructura de encabezados), (3) configuración técnica (estructura del proyecto, comandos de build, variables de entorno) y (4) referencias a recursos (skills disponibles, agentes, scripts de automatización). Estos cuatro pilares garantizan que el agente pueda operar con autonomía estratégica y técnica.

---

## ¿Cómo empezar a configurar tu CLAUDE.md para SEO hoy?

Si ya estás usando Claude Code para SEO pero no tenés `CLAUDE.md` configurado, el primer paso es el más valioso: documentar lo que más frecuentemente le tenés que explicar al agente. Ese dolor de repetición es exactamente lo que `CLAUDE.md` resuelve.

Empezá con estas tres secciones:

1. **Una oración sobre qué es el proyecto** (sitio, audiencia, objetivo SEO principal)
2. **Los comandos de build/deploy** (para que Claude no pregunte cómo publicar cambios)
3. **La instrucción más importante** que siempre tenés que repetir (no editar dist/, seguir el topical map, usar cierto tono)

Con esas tres cosas ya vas a notar la diferencia en la primera sesión. Después vas iterando: agregás workflows cuando un proceso se repite, agregás restricciones cuando Claude comete el mismo error, agregás referencias cuando empezás a usar skills nuevos.

Si querés ver cómo esto se integra con el ecosistema completo de Claude Code para SEO, el artículo de [Claude Code para SEO](/blog/claude-code-seo) es el hub donde está todo conectado. Y si ya llegaste hasta acá, probablemente te interese también cómo trabajo con los [MCP servers para automatizar el keyword research](/blog/mcp-servers-seo).

¿Dudas sobre cómo estructurar tu `CLAUDE.md` para tu proyecto específico? [Agendá un diagnóstico SEO gratuito](/consultor-seo-chile) y lo vemos en detalle.
