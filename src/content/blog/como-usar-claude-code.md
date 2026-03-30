---
title: "Cómo Usar Claude Code: Guía Práctica desde la Terminal hasta MCPs y Skills [2026]"
description: "Guía completa para usar Claude Code en 2026: instalación paso a paso, comandos esenciales, MCPs, Skills, subagentes y cómo lo uso para SEO todos los días. Con ejemplos reales."
author: "Facundo Zupel"
date: 2026-03-30
readTime: "18 minutos"
tags: ["Claude Code", "IA", "Tutorial", "MCPs", "Skills", "Automatización", "SEO"]
category: "ia-en-seo"
draft: false
---

Claude Code es la CLI de Anthropic que te permite trabajar con un agente de IA directamente desde tu terminal. No es un chat web, no es un copiloto de autocompletado — es un agente que lee tu proyecto, ejecuta comandos, edita archivos y se conecta a herramientas externas.

Lo uso todos los días para SEO, y no exagero. Keyword research, auditorías técnicas, redacción de contenido, análisis de competidores, deploy. Todo desde la terminal sin abrir un navegador.

Este artículo no es la documentación oficial repetida. Es cómo yo uso Claude Code en la práctica: desde la instalación hasta MCPs, Skills y subagentes. Si ya leíste tutoriales genéricos y querés ir más allá, esto es para vos.

![Terminal con Claude Code ejecutando tareas de desarrollo y SEO en un entorno profesional](/assets/blog/como-usar-claude-code/hero-claude-code-terminal.webp)

---

## ¿Qué es Claude Code y para qué sirve?

Claude Code es la herramienta de línea de comandos oficial de Anthropic. Funciona como un agente de IA que vive dentro de tu proyecto: lee archivos, entiende la arquitectura del código, ejecuta comandos del sistema y puede modificar cualquier archivo con tu aprobación.

¿Por qué importa? Porque no es solo un chat que te responde preguntas. Es un agente que puede:

- Navegar y entender codebases grandes (miles de archivos)
- Editar múltiples archivos en una sola tarea
- Ejecutar tests, builds y deploys
- Conectarse a APIs externas mediante MCPs
- Crear workflows reutilizables con Skills
- Delegar tareas a subagentes especializados

La diferencia con Claude web o con herramientas como [ChatGPT para SEO](/blog/chatgpt-para-seo) es que Claude Code opera directamente en tu entorno de desarrollo. No copiás y pegás código de un chat — el agente lo escribe, lo testea y lo commitea por vos.

---

## Paso 1: Instalar Claude Code

La instalación toma menos de un minuto. Tenés dos opciones:

### Opción A: Instalación nativa (recomendada)

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Sin dependencias. Funciona en macOS, Linux y Windows via WSL2.

### Opción B: Via npm

```bash
npm install -g @anthropic-ai/claude-code
```

Requiere Node.js 18 o superior.

Verificá que quedó bien:

```bash
claude --version
```

### Requisitos previos

- **Sistema operativo**: macOS 10.15+, Ubuntu 20.04+, o Windows con WSL2
- **Cuenta de Anthropic**: Necesitás una suscripción a Claude (Pro, Max o Teams) o una cuenta API
- **Git**: Recomendado para aprovechar la integración con repositorios

---

## Paso 2: Configuración inicial y primera sesión

Navegá a la carpeta de tu proyecto y ejecutá:

```bash
cd tu-proyecto
claude
```

La primera vez te va a pedir autenticación vía navegador. Seguí las instrucciones, autorizá el acceso y listo.

Una vez dentro, ya podés hablar en lenguaje natural. Probá algo simple:

```
Explicame la estructura de este proyecto
```

Claude va a escanear los archivos, entender las dependencias y darte un resumen claro. Ese es el punto de partida.

### Comandos esenciales dentro de Claude Code

| Comando | Qué hace |
|---------|----------|
| `/clear` | Limpia la conversación. Usalo cada vez que cambies de tarea |
| `/compact` | Compacta el historial para ahorrar tokens |
| `/chat` | Inicia una nueva conversación |
| `/review` | Revisa los cambios realizados |
| `/terminal-setup` | Configura tu terminal para Shift+Enter y otras funciones |
| `Escape` | Detiene a Claude (no uses Ctrl+C, eso cierra todo) |

**Tip que me costó descubrir**: para pegar imágenes desde el portapapeles usá Control+V, no Command+V. Y si arrastrás archivos desde el finder, mantené Shift para referenciarlos en vez de abrirlos.

---

## Paso 3: El flujo de trabajo diario

A ver, te explico cómo es mi flujo real de trabajo con Claude Code. No el teórico — el que uso todos los días.

### El ciclo básico

1. **Abrí la terminal** en la raíz del proyecto
2. **Iniciá Claude** con `claude`
3. **Pedí lo que necesitás** en lenguaje natural
4. **Revisá los cambios** que te muestra como diff
5. **Aceptá o rechazá** cada modificación

Básicamente es conversacional. Le decís "creá una nueva API de usuarios con autenticación JWT" y Claude va a crear los archivos, escribir el código, y mostrarte exactamente qué cambió antes de guardar.

### Queue de mensajes

Una funcionalidad que me cambió la forma de trabajar: podés encolar múltiples instrucciones. Escribí tres o cuatro prompts seguidos y Claude los procesa en orden inteligentemente. Si necesita tu input, para y te pregunta. Si puede seguir solo, avanza.

Esto me permite arrancar una sesión, dejar varias tareas en cola, ir a hacer otra cosa y volver con todo resuelto. Antes hacía lo mismo con Cursor y tenía que ir pegando prompt por prompt manualmente.

---

## Paso 4: CLAUDE.md — El archivo que define todo

Acá es donde la cosa se pone entretenida. El archivo `CLAUDE.md` en la raíz de tu proyecto es básicamente el cerebro de Claude Code para ese proyecto específico.

¿Qué ponés ahí? Las instrucciones que Claude debe seguir siempre:

- La estructura del proyecto
- Comandos importantes (build, test, deploy)
- Convenciones de código
- Reglas de negocio
- Lo que NO debe hacer

```markdown
# Mi Proyecto

## Comandos
- Build: `npm run build`
- Test: `npm test`
- Deploy: `vercel --prod`

## Reglas
- Siempre usar TypeScript strict
- No modificar archivos en /dist
- Los componentes van en /src/components
```

En mi caso, el [CLAUDE.md que uso para SEO](/blog/claude-md-seo) tiene más de 500 líneas: define el topical map, las reglas de internal linking, la guía de estilo, los flujos de trabajo completos. Claude lee eso antes de cada tarea y actúa en consecuencia.

Es literalmente la diferencia entre un asistente genérico y un agente que conoce tu proyecto como si fuera parte del equipo.

---

## Paso 5: MCPs — Conectar Claude Code al mundo exterior

Los MCPs (Model Context Protocol) son lo que transforma a Claude Code de un editor de código inteligente a un sistema de automatización completo. Básicamente son servidores que le dan a Claude acceso a herramientas externas.

![Flujo de trabajo con Claude Code: terminal conectada a MCPs, Skills y subagentes](/assets/blog/como-usar-claude-code/flujo-trabajo-claude-code.webp)

### ¿Cómo funcionan?

Un MCP es un servidor que expone herramientas (funciones) que Claude puede invocar. Cuando le pedís algo que requiere datos externos, Claude llama al MCP correspondiente y usa la respuesta para continuar su trabajo.

### MCPs que uso todos los días para SEO

| MCP | Para qué lo uso |
|-----|-----------------|
| **DataForSEO** | Keyword research, SERP analysis, volúmenes de búsqueda |
| **Google Search Console** | Datos reales de rendimiento orgánico, CTR, posiciones |
| **Chrome DevTools** | Crawlear competidores, auditorías técnicas, screenshots |
| **Google Analytics** | Métricas de tráfico, conversiones, comportamiento |

### Configurar un MCP

Los MCPs se configuran en `.claude/settings.json`:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-chrome-devtools"]
    }
  }
}
```

Una vez configurado, Claude puede usar todas las herramientas del MCP automáticamente. Le decís "navegá a la web del competidor y extraé la estructura de H2s" y lo hace.

Si querés profundizar, escribí una [guía completa de MCP Servers para SEO](/blog/mcp-servers-seo) con todos los que uso y cómo configurarlos.

---

## Paso 6: Skills — Workflows reutilizables

Los Skills son la evolución natural de los MCPs. Si un MCP es una herramienta individual (como un destornillador), un Skill es un flujo de trabajo completo (como el manual de armado de un mueble).

### ¿Qué es un Skill?

Un archivo markdown que define un proceso paso a paso para que Claude lo ejecute. Incluye:

- **Cuándo activarse** (triggers)
- **Qué herramientas usar** (MCPs, scripts)
- **En qué orden** (pasos secuenciales)
- **Qué output generar**

### Ejemplo: mi Skill de publicación de blog

Tengo un Skill que cubre el pipeline completo de creación de un artículo:

1. Selecciona la keyword del backlog
2. Hace research con DataForSEO (volúmenes, SERP, competidores)
3. Crawlea los top 5 resultados con Chrome DevTools
4. Analiza la intención de búsqueda
5. Redacta el artículo con mi voz clonada
6. Genera imágenes si corresponde
7. Ejecuta el build

Todo automatizado. Lo que antes me llevaba un día entero de trabajo manual, ahora corre en una sesión de terminal.

Si querés ver más ejemplos, tengo un artículo dedicado a [Skills de SEO para Claude Code](/blog/claude-code-skills-seo) donde muestro los workflows que más uso.

---

## Paso 7: Subagentes — Delegar tareas en paralelo

Los subagentes son instancias independientes de Claude que procesan tareas de forma aislada. O sea, Claude Code puede lanzar mini-agentes especializados que trabajan en paralelo.

### ¿Cuándo uso subagentes?

- **Investigación paralela**: Analizar 5 competidores simultáneamente
- **Tareas independientes**: Generar meta descriptions para 20 páginas
- **Exploración del codebase**: Buscar patrones en múltiples archivos a la vez

La ventaja es que cada subagente tiene su propio contexto y no consume tokens del hilo principal. Es como tener un equipo de especialistas que le reportan al coordinador.

Escribí un artículo completo sobre [subagentes de Claude Code para SEO](/blog/claude-code-subagentes-seo) si querés entender el tema en profundidad.

---

## Cómo usar Claude Code en VS Code

Si preferís no salir de tu editor, Claude Code se integra directo con VS Code (y también con Cursor y otros editores basados en VS Code).

### Instalación

1. Instalá la extensión "Claude Code" desde el marketplace
2. Abrí la terminal integrada (`Ctrl + backtick`)
3. Ejecutá `claude` como lo harías en cualquier terminal

### VS Code vs Terminal pura

Personalmente uso ambos. La terminal pura para tareas largas donde encolo múltiples instrucciones. VS Code cuando estoy revisando código y necesito hacer cambios puntuales.

La extensión no agrega funcionalidad nueva — básicamente es un launcher que facilita abrir Claude Code dentro del editor. Pero la comodidad de tener el agente y el código en la misma ventana tiene su valor.

---

## ¿Cuánto cuesta Claude Code?

Los planes actuales en 2026:

| Plan | Precio | Para quién |
|------|--------|-----------|
| **Pro** | $20/mes | Uso básico, ideal para empezar |
| **Max 5x** | $100/mes | Uso intensivo diario (mi plan) |
| **Max 20x** | $200/mes | Equipos o uso extremo |
| **API** | Por consumo | Automatización programática |

¿Vale la pena? Mirá, yo pago $100/mes por el plan Max y lo uso 6-8 horas por día. Si calculás lo que cuesta una hora de trabajo de un desarrollador o consultor SEO en cualquier parte del mundo, es absurdamente barato.

Para un análisis detallado de costos, escribí sobre [el precio de Claude Code en 2026](/blog/claude-code-precio) con mi gasto real mensual y cuándo conviene cada plan.

---

## Seguridad y permisos

Claude Code tiene acceso a todos los archivos de tu directorio de trabajo. Eso es lo que lo hace potente, pero también requiere criterio.

### Lo que tenés que saber

- **Claude pide permiso** antes de editar archivos o ejecutar comandos (por defecto)
- **Podés skipear los permisos** con `claude --dangerously-skip-permissions` si confiás en lo que estás haciendo
- **Tu código se procesa en servidores de Anthropic** para generar las respuestas
- **Revisá siempre los diffs** antes de aceptar cambios, especialmente en producción

### Hooks de seguridad

Podés configurar hooks que se ejecuten automáticamente antes o después de cada edición:

```json
{
  "hooks": [
    {
      "matcher": "Edit|Write",
      "hooks": [
        {
          "type": "command",
          "command": "prettier --write \"$CLAUDE_FILE_PATHS\""
        }
      ]
    }
  ]
}
```

Esto asegura que cada archivo editado por Claude pase por Prettier automáticamente. Podés hacer lo mismo con linters, type checks o cualquier otro validador.

---

## Casos de uso reales más allá del código

Lo que nadie te cuenta en los tutoriales genéricos es que Claude Code no es solo para programar. Yo lo uso para trabajo profesional que tiene poco que ver con escribir código:

### SEO y marketing digital

- **Keyword research automatizado**: Claude consulta DataForSEO, analiza volúmenes, competencia y tendencias, y me arma el brief del artículo
- **Auditorías técnicas**: Con el MCP de Chrome DevTools, crawlea sitios y genera diagnósticos completos
- **Redacción de contenido**: Con mi voz clonada y las reglas del CLAUDE.md, escribe artículos que suenan como yo
- **Internal linking**: Analiza la estructura del sitio y sugiere enlaces entre páginas

### Análisis de datos

- **Google Search Console**: Extrae datos de rendimiento y cruza con GA4
- **Reportes automatizados**: Genera informes HTML con gráficos interactivos
- **Análisis de competidores**: Crawlea, extrae y compara contenido de la competencia

Si querés ver cómo armé este stack completo, el artículo de [Claude Code para SEO](/blog/claude-code-seo) tiene todo el detalle de mi configuración real.

---

## Preguntas frecuentes

### ¿Claude Code es gratis?

No del todo. Existe un plan Free con funciones muy limitadas. Para uso real necesitás mínimo el plan Pro a $20/mes. Para trabajo intensivo, el Max a $100/mes.

### ¿Cuál es la diferencia entre Claude y Claude Code?

Claude es el chatbot web de Anthropic (como ChatGPT). Claude Code es la CLI que funciona como agente dentro de tu terminal y proyectos. Uno es para chatear, el otro es para ejecutar tareas reales sobre tu código y archivos.

### ¿Puedo usar Claude Code en Windows?

Sí, pero necesitás WSL2 (Windows Subsystem for Linux). No funciona nativamente en PowerShell o CMD.

### ¿Claude Code tiene acceso a todo mi código?

Sí, tiene acceso a todos los archivos del directorio donde lo ejecutás. Por eso es importante usarlo en la carpeta correcta y revisar los cambios antes de aceptarlos.

### ¿Qué modelo usa Claude Code?

Por defecto usa Opus (el más capaz) hasta cierto límite de uso, y después baja a Sonnet para optimizar costos. Podés elegir manualmente con `Shift+Tab` para cambiar entre modos.

### ¿Vale la pena si no soy programador?

Depende de tu caso de uso. Si trabajás con datos, archivos o procesos repetitivos, sí. La curva de aprendizaje de la terminal existe, pero una vez que la superás, la productividad que ganás es enorme. Yo vengo del mundo del [posicionamiento web](/posicionamiento-web-chile), no de desarrollo, y es la herramienta que más impacto tuvo en mi trabajo.

---

## Conclusión: para quién es y para quién no

Claude Code es para vos si:

- Trabajás con código o archivos de forma regular
- Querés automatizar flujos de trabajo repetitivos
- Te sentís cómodo (o querés aprender) a trabajar desde la terminal
- Necesitás un agente que entienda el contexto completo de tu proyecto

No es para vos si:

- Buscás un chat simple para preguntas puntuales (usá Claude web)
- No querés que una IA modifique tus archivos directamente
- Tu trabajo no involucra ningún tipo de proceso automatizable

Mi recomendación: instalalo, jugá una semana con el plan Pro, y después decidí. La curva de aprendizaje es de 2-3 días. Después de eso, no vas a querer volver al copy-paste entre pestañas.

Si necesitás ayuda configurándolo para un caso de uso específico como [consultoría SEO](/consultor-seo-chile) o [auditoría técnica](/auditoria-seo-chile), me escribís y lo vemos.
