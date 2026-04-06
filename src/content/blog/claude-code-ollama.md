---
title: "Claude Code con Ollama: Cómo Usar Modelos Locales en tu Terminal [2026]"
description: "Guía paso a paso para conectar Claude Code con Ollama y ejecutar modelos de IA locales. Configuración, modelos recomendados, requisitos de hardware y casos de uso reales para SEO y desarrollo."
author: "Facundo Zupel"
date: 2026-04-05
readTime: "14 minutos"
tags: ["Claude Code", "Ollama", "IA", "Modelos Locales", "Automatización", "Open Source"]
category: "ia-en-seo"
draft: false
---

Claude Code cambió cómo trabajo desde la terminal. Pero hay algo que mucha gente no sabe: no necesitás pagar la suscripción de Anthropic para usarlo. Podés conectarlo a modelos open source que corren en tu propia máquina, con Ollama, y tener un agente de código funcional sin gastar un peso en tokens.

¿Es igual que usar Claude Sonnet o Opus directo? No. Pero para muchas tareas del día a día — generar boilerplate, explorar un codebase, hacer refactors simples — funciona sorprendentemente bien. Y lo más importante: tus datos nunca salen de tu computadora.

Acá te muestro cómo configurar todo paso a paso, qué modelos usar, qué hardware necesitás y cuándo tiene sentido (y cuándo no) este setup.

![Claude Code con Ollama para ejecutar modelos locales](/assets/blog/claude-code-ollama/hero.webp)

---

## ¿Qué es Ollama y por qué conectarlo a Claude Code?

Ollama es una herramienta que permite correr modelos de lenguaje directamente en tu computadora. O sea, en vez de mandar tus prompts a un servidor remoto (como hace Claude por defecto), todo se procesa localmente.

A principios de 2026, Ollama lanzó soporte para la API de Anthropic Messages. Esto fue clave porque significó que cualquier herramienta que use la API de Anthropic — como Claude Code — puede apuntar a Ollama en vez del servidor de Anthropic.

¿Por qué importa? Tres razones:

1. **Privacidad total**: Tu código, tus prompts, tus datos nunca salen de tu máquina. Para proyectos con información sensible, no hay mejor opción.
2. **Costo cero en tokens**: Corrés el modelo localmente, no hay consumo de API. Si tenés el hardware, es gratis.
3. **Sin dependencia de internet**: Funciona offline. Avión, zona con mala conexión, o simplemente no querés depender de un servicio externo.

Eso sí, los modelos locales están bastante por debajo de Claude Sonnet o Opus en capacidad. Pero para muchos flujos de trabajo, sobran.

---

## Requisitos de hardware: ¿qué necesitás para correr esto?

Antes de instalar nada, hablemos de hardware. Porque acá es donde muchos se frustran: descargan un modelo de 70B parámetros en una laptop con 8GB de RAM y se preguntan por qué tarda 3 minutos por respuesta.

### Hardware mínimo

| Componente | Mínimo | Recomendado |
|-----------|--------|-------------|
| **RAM** | 16 GB | 32 GB (Apple Silicon) o 32 GB + GPU |
| **GPU** | No requerida (pero muy lenta sin ella) | NVIDIA RTX 3090/4090 (24 GB VRAM) |
| **Almacenamiento** | 10 GB libres | 50 GB+ (los modelos pesan) |
| **CPU** | Cualquier x86_64 o ARM64 | Apple M2 Pro o superior |

### Lo que yo uso

Mi setup es un MacBook Pro con chip M3 Max y 64 GB de RAM unificada. Con esto corro modelos de hasta 32B parámetros sin problemas. Los modelos más chicos (7B-14B) vuelan literalmente.

Si tenés un Mac con Apple Silicon (M1, M2, M3, M4) y 32 GB de RAM, estás bien para la mayoría de modelos. Si estás en Windows o Linux, vas a necesitar una GPU NVIDIA con al menos 16 GB de VRAM para que la experiencia sea fluida.

**Regla rápida**: el modelo necesita entre 0.5 y 1 GB de RAM por cada mil millones de parámetros (en cuantización Q4). Un modelo de 14B necesita ~8 GB, uno de 32B necesita ~18 GB.

---

## Paso 1: Instalar Ollama

La instalación es trivial. Andá a [ollama.com](https://ollama.com) y descargá el instalador para tu sistema operativo. En macOS y Windows es un `.dmg` o `.exe` normal. En Linux:

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

Verificá que quedó instalado:

```bash
ollama --version
```

Ollama corre como un servicio local en el puerto `11434`. Una vez instalado, ya está listo para recibir peticiones.

---

## Paso 2: Descargar un modelo

Acá viene lo importante: qué modelo bajar. No todos funcionan bien con Claude Code porque necesitás soporte para **tool calling** (llamadas a herramientas) y un **contexto amplio** (mínimo 32K tokens, idealmente 64K).

### Modelos recomendados para Claude Code

| Modelo | Parámetros | Contexto | Tool calling | Para qué es bueno |
|--------|-----------|----------|--------------|-------------------|
| **qwen3.5** | 32B | 128K | Sí | El mejor equilibrio calidad/velocidad para código |
| **glm-4.7-flash** | 9B | 128K | Sí | Rápido, liviano, ideal para máquinas con poca RAM |
| **kimi-k2.5:cloud** | — | 128K | Sí | Modelo cloud via Ollama, excelente para código |
| **glm-5:cloud** | — | 128K | Sí | Último modelo de Zhipu, muy capaz |
| **qwen3.5:cloud** | — | 128K | Sí | Versión cloud, sin requisitos de hardware |

Para descargar un modelo local:

```bash
ollama pull qwen3.5
```

O si tu máquina tiene menos RAM, probá con el modelo más liviano:

```bash
ollama pull glm-4.7-flash
```

Los modelos con `:cloud` en el nombre se ejecutan en servidores remotos de Ollama, no en tu máquina. Esto es un punto medio entre privacidad total (modelo local) y capacidad máxima (API de Anthropic).

---

## Paso 3: Instalar Claude Code

Si ya tenés Claude Code instalado, saltá este paso. Si no:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

O via npm:

```bash
npm install -g @anthropic-ai/claude-code
```

Verificá:

```bash
claude --version
```

Si querés una guía más completa de instalación y configuración inicial, tengo un artículo dedicado sobre [cómo usar Claude Code desde cero](/blog/como-usar-claude-code).

---

## Paso 4: Conectar Claude Code con Ollama

Acá es donde se conecta todo. Hay dos formas: la rápida y la manual.

### Opción A: Setup rápido (recomendada)

Ollama tiene un comando integrado que configura todo automáticamente:

```bash
ollama launch claude
```

Esto abre Claude Code apuntando al modelo por defecto de Ollama. Si querés especificar un modelo:

```bash
ollama launch claude --model qwen3.5
```

Listo. Ya estás usando Claude Code con un modelo local. Así de simple.

### Opción B: Setup manual (variables de entorno)

Si preferís controlar todo vos, podés setear las variables de entorno a mano. Útil si querés que la configuración persista entre sesiones.

Agregá estas líneas a tu `~/.zshrc` o `~/.bashrc`:

```bash
export ANTHROPIC_AUTH_TOKEN=ollama
export ANTHROPIC_API_KEY=""
export ANTHROPIC_BASE_URL=http://localhost:11434
```

Recargá tu shell:

```bash
source ~/.zshrc
```

Y ahora ejecutá Claude Code especificando el modelo:

```bash
claude --model qwen3.5
```

### Opción C: Variables inline (una sola sesión)

Si solo querés probar sin modificar nada permanente:

```bash
ANTHROPIC_AUTH_TOKEN=ollama ANTHROPIC_BASE_URL=http://localhost:11434 ANTHROPIC_API_KEY="" claude --model glm-4.7-flash
```

**Importante**: Claude Code necesita un contexto amplio para funcionar bien. Ollama usa 2048 tokens por defecto, lo cual es insuficiente. Asegurate de configurar al menos 32K, idealmente 64K. Consultá la [documentación de Ollama sobre contexto](https://docs.ollama.com/context-length) para ajustar esto.

---

## Paso 5: Modo headless (sin interacción)

Esto es para los que quieren usar Claude Code con modelos locales en pipelines automatizados, Docker o CI/CD:

```bash
ollama launch claude --model kimi-k2.5:cloud --yes -- -p "Explicá la estructura de este proyecto"
```

El flag `--yes` acepta todo automáticamente (pull del modelo, selección). Los argumentos después de `--` se pasan directo a Claude Code. El `-p` es el prompt inicial.

Re útil para [automatizar tareas de SEO con IA](/blog/automatizacion-seo-python) donde necesitás que el agente corra solo.

---

## ¿Qué funciona y qué no con modelos locales?

Seamos claros. Un modelo local de 14B parámetros no es lo mismo que Claude Opus con 1M de contexto. Hay trade-offs y está bueno que los tengas claros antes de decidir.

### Lo que funciona bien

- **Explorar un codebase**: Que te explique la estructura de un proyecto, qué hace cada archivo, cómo se conectan las piezas.
- **Generar boilerplate**: Componentes React, APIs REST, archivos de configuración. Para código repetitivo, van perfecto.
- **Refactors simples**: Renombrar variables, extraer funciones, reorganizar imports.
- **Escribir tests**: Unitarios y de integración para funciones existentes.
- **Documentación**: Docstrings, README, comentarios de código.

### Lo que no funciona tan bien

- **Tareas complejas multi-archivo**: Si necesitás que coordine cambios en 10 archivos a la vez, se pierde.
- **Razonamiento largo**: Cadenas de pensamiento de muchos pasos donde un error temprano se propaga. Opus brilla acá; los modelos locales, no.
- **Tool calling avanzado**: Los MCPs andan, pero con menos precisión. A veces no llama a la herramienta correcta o formatea mal los parámetros.
- **Contexto muy largo**: Aunque el modelo soporte 128K tokens en papel, en la práctica el rendimiento se cae bastante después de 32K.

### Mi recomendación

Uso modelos locales para un 30% de mis tareas diarias — las rápidas, que no necesitan razonamiento complejo ni herramientas externas. El resto, API de Anthropic.

Ollama para lo rápido y privado, Claude con API para lo pesado. No es uno u otro — es saber cuándo usar cada uno.

---

## Modelos locales vs. API de Anthropic: cuándo elegir cada uno

| Criterio | Modelo local (Ollama) | API de Anthropic |
|----------|----------------------|-----------------|
| **Costo** | Gratis (si tenés hardware) | $20-200/mes según plan |
| **Privacidad** | Total, nada sale de tu máquina | Los datos van a servidores de Anthropic |
| **Velocidad** | Depende de tu hardware | Consistente y rápido |
| **Calidad** | Buena para tareas simples | Superior en todo |
| **Tool calling** | Básico | Completo y preciso |
| **Contexto** | Hasta 128K (con degradación) | Hasta 1M tokens |
| **Disponibilidad** | Funciona offline | Requiere internet |

Privacidad (código propietario, datos sensibles, compliance) = modelos locales. Calidad máxima y proyectos complejos = API de Anthropic.

---

## Configuración avanzada: tips que me sirvieron

### Ajustar el tamaño del contexto

Por defecto, Ollama usa un contexto muy chico. Para Claude Code necesitás más. Creá un `Modelfile` personalizado:

```
FROM qwen3.5
PARAMETER num_ctx 65536
```

Y creá el modelo:

```bash
ollama create qwen3.5-64k -f Modelfile
```

Ahora usá `qwen3.5-64k` en vez de `qwen3.5`.

### Deshabilitar tráfico innecesario

Si estás usando modelos locales por privacidad, agregá esta variable:

```bash
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

Esto evita que Claude Code envíe telemetría o haga requests que no son estrictamente necesarios.

### Web search desde Ollama

Claude Code puede hacer búsquedas web a través de la API de web search de Ollama. Esto es útil si querés que el agente investigue sin salir de tu terminal. Consultá la [documentación de web search](https://docs.ollama.com/capabilities/web-search) para configurarlo.

### Tareas programadas con /loop

Poco conocido: podés programar tareas recurrentes dentro de Claude Code con modelos locales:

```
/loop 30m Revisá los PRs abiertos y resumí su estado
```

```
/loop 1h Investigá las últimas noticias de IA y hacé un resumen
```

Monitoreo automatizado sin gastar en API.

---

## Casos de uso: cómo lo aplico en mi trabajo SEO

Esto es lo que hago concretamente con modelos locales en mi [consultoría SEO](/consultor-seo-chile):

### 1. Análisis rápido de estructura de sitios

Le tiro una carpeta de un proyecto y que analice la arquitectura de información, las URLs, los internal links. No necesita herramientas externas — solo leer archivos. Un modelo de 14B lo resuelve bien.

### 2. Generación de meta descriptions en batch

Tengo 50 páginas sin meta description. Le paso la lista y las genera en minutos. Para esto no necesito Opus — necesito velocidad y que no me cueste tokens.

### 3. Limpieza de código

Encontrar código muerto, imports sin usar, archivos que sobran. El modelo local lee el codebase y me da el reporte. Antes lo hacía a mano y tardaba horas.

### 4. Prototipos rápidos

Para probar ideas de scripts o componentes nuevos antes de invertir tiempo en pulirlos. Si el prototipo funciona, después lo refino con Claude Opus.

Para [auditorías SEO técnicas](/auditoria-seo-chile) o análisis de competidores con MCPs, sigo con la API de Anthropic. Los modelos locales no dan la precisión que necesitás para tool calling avanzado.

---

## Problemas comunes y cómo resolverlos

### "Claude Code se queda pensando eternamente"

Seguramente el modelo es demasiado grande para tu hardware. Bajá a uno más chico (glm-4.7-flash es el más liviano) o aumentá el contexto de a poco.

### "Las respuestas son incoherentes"

El contexto por defecto de 2048 tokens no alcanza para Claude Code. Subilo a 32K o 64K como expliqué arriba.

### "El tool calling no funciona"

No todos los modelos soportan tool calling. Usá exclusivamente los modelos recomendados: qwen3.5, glm-4.7-flash, o los modelos cloud.

### "Es demasiado lento"

Tres opciones: modelo más chico, cuantización Q4 en vez de Q8, o si no tenés GPU, los modelos `:cloud` de Ollama que corren en sus servidores.

---

## Telegram: Claude Code desde el celular

Dato: podés conectar Claude Code con Ollama a Telegram. Chateás con tu agente de código desde el celular.

```bash
ollama launch claude -- --channels plugin:telegram@claude-plugins-official
```

Necesitás crear un bot con [@BotFather](https://t.me/BotFather) y configurar el plugin. No lo uso todos los días, pero para consultas rápidas cuando estoy lejos de la computadora, va.

---

## ¿Vale la pena? Mi opinión honesta

Los modelos locales no reemplazan a Claude con API. La diferencia de calidad en razonamiento complejo y tool calling es grande.

Pero esa no es la pregunta.

La pregunta es: ¿tiene sentido tener un agente de código gratis en tu máquina, con privacidad total, para las tareas del día a día que no necesitan el modelo más capaz del mundo?

Sí. Totalmente.

Mi flujo: Ollama con qwen3.5 para lo rápido y privado (30%), Claude Code con API para lo que necesita calidad máxima (70%). Desde que armé este setup, gasto menos en tokens y no perdí productividad.

Si trabajás con [automatización SEO con Python](/blog/automatizacion-seo-python) o te interesa [aplicar IA a SEO](/blog/agentes-ia-guia), tener un entorno local para experimentar sin costos marca la diferencia. Probá, jugá con los modelos, encontrá cuál te va mejor.

Y si necesitás ayuda para integrar estas herramientas en tu estrategia de posicionamiento web, [hablemos](/consultor-seo-chile).

---

## Preguntas frecuentes

### ¿Puedo usar Claude Code con Ollama completamente gratis?

Sí, con modelos locales (no cloud). Necesitás el hardware, pero no hay costo de API ni suscripción. Claude Code es gratuito — lo que pagás normalmente es el acceso a los modelos de Anthropic.

### ¿Qué modelo local es el mejor para programar?

Qwen 3.5 (32B) es actualmente el mejor para tareas de código. Si tu máquina no lo banca, GLM 4.7 Flash es la alternativa liviana más capaz.

### ¿Los MCPs funcionan con modelos locales?

Sí, pero con limitaciones. El tool calling de los modelos locales es menos preciso que el de Claude Sonnet/Opus. Para MCPs simples funciona; para orquestaciones complejas con múltiples herramientas, recomiendo la API de Anthropic.

### ¿Necesito GPU para correr modelos locales?

No es obligatorio, pero sin GPU la inferencia es muy lenta. En un Mac con Apple Silicon, la memoria unificada actúa como VRAM y anda bien. En Windows/Linux, una GPU NVIDIA con 16GB+ de VRAM es lo que necesitás.

### ¿Puedo alternar entre modelo local y API de Anthropic?

Sí. Cambiás las variables de entorno o usás `ollama launch claude` para local y `claude` a secas para API. Podés tener ambos y elegir según lo que necesites.
