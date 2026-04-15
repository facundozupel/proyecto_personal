---
title: "Claude Code Routines: Automatización con IA que Trabaja Mientras Dormís"
description: "Claude Code Routines permite programar tareas automáticas con IA: SEO, reportes, code review y más. Cómo funcionan los triggers scheduled, API y GitHub, y casos reales de automatización para negocios."
author: "Facundo Zupel"
date: 2026-04-14
readTime: "14 minutos"
tags: ["Claude Code", "Automatización", "IA", "SEO", "Routines", "Negocios"]
draft: false
category: "ia-en-seo"
---

Anthropic acaba de lanzar Routines en Claude Code. La versión corta: ahora podés empaquetar un prompt, conectarlo a tus repos y herramientas, y que Claude lo ejecute solo. Por horario, por API call, o cuando pasa algo en GitHub. Todo corre en la nube de Anthropic, sin depender de que tu laptop esté prendida.

Si ya venías usando `/schedule` en la CLI, eso ahora son scheduled routines. Pero le sumaron dos triggers más: API y GitHub webhooks.

En este artículo voy a mostrar cómo funciona cada trigger, qué estoy armando con esto para SEO, y en qué casos le veo sentido real para negocios que no son empresas de software.

![Claude Code Routines: terminal con automatizaciones programadas ejecutándose en la nube](/assets/blog/claude-code-routines/hero-routines.webp)

---

## Qué son las Claude Code Routines

Una routine tiene tres partes: el prompt (la instrucción), los repositorios sobre los que trabaja, y los conectores a herramientas externas (Slack, Linear, Jira, o cualquier MCP server que le hayas configurado).

Corren en sesiones cloud completas de Claude Code. No piden aprobación durante la ejecución. Claude tiene autonomía total para leer archivos, ejecutar comandos y hacer cambios. Eso tiene sus ventajas y sus riesgos, y los dos dependen de qué tan bien escribiste el prompt.

Disponibles en planes Pro, Max, Team y Enterprise con [Claude Code en la web](https://claude.ai/code) habilitado. Límites diarios: 5 routines en Pro, 15 en Max, 25 en Team/Enterprise. Podés ejecutar más con usage adicional.

---

## Los tres tipos de triggers

### Scheduled: ejecución por horario

Definís una cadencia (cada hora, cada noche, cada lunes) y Claude ejecuta tu prompt automáticamente.

Ejemplo: "Cada lunes a las 8am, extraé los datos de [Google Search Console](/blog/google-search-console-guia) de la última semana, compará con la semana anterior, y posteá un resumen en Slack con las páginas que subieron y las que cayeron."

Antes, eso era un cron job + script de Python + formateo + envío manual a Slack. Ahora es un prompt. El setup baja de horas a minutos.

Otro patrón que están usando los early adopters: una routine nocturna que lee los issues abiertos, los clasifica por área del código, asigna prioridad, y postea un resumen en Slack antes de que el equipo arranque. Nadie llega a un backlog desordenado.

### API: ejecución por HTTP request

Cada routine con trigger API recibe su propio endpoint y token. Hacés un POST con un mensaje, la routine se ejecuta y te devuelve una URL de sesión.

Esto te permite conectar Claude a cualquier sistema que hable HTTP. Tu pipeline de deploy, tu herramienta de alertas, un botón en tu dashboard interno.

Ejemplo: tu CI/CD envía un POST después de cada deploy a producción. Claude corre smoke tests, escanea logs buscando regresiones, y postea un go/no-go en el canal de releases. Si algo rompe, abre un issue con el contexto. Nadie tuvo que hacer nada.

De los tres triggers, este es el más flexible porque el evento de disparo lo controlás vos.

### GitHub: ejecución por eventos del repositorio

Suscribís una routine a eventos de GitHub: pull requests, pushes, issues, workflow runs. Claude crea una sesión nueva por cada evento que matchee tus filtros de branch, label, path o autor.

La diferencia con el API trigger: para PRs, Claude mantiene la misma sesión para updates subsecuentes. Si alguien comenta, el CI falla, o llegan nuevos commits, Claude recibe esa info y actúa con contexto. Como si hubiera estado siguiendo la conversación.

Ejemplo: cada PR que toca `/src/pages/` o `/src/content/` triggerea una routine que verifica meta tags, chequea que los internal links apunten a URLs que existen, y pasa el contenido por el checklist SEO del equipo. Deja comentarios inline. El revisor humano llega con los problemas mecánicos ya resueltos.

---

## Casos de uso para negocios (más allá del desarrollo)

Algo que me llamó la atención de las routines es que no son solo para equipos de ingeniería. Si tu negocio genera datos y tiene procesos repetitivos, esto aplica.

### Reportes automáticos de rendimiento

Tengo una scheduled routine semanal que extrae datos de Google Analytics 4 y Google Search Console, cruza [métricas SEO](/blog/metricas-seo) con conversiones, y postea un resumen en Slack.

La diferencia con un dashboard: esto no es pasivo. No esperás a que alguien abra Looker Studio. Claude te avisa qué cambió, qué páginas perdieron tráfico orgánico, y qué deberías mirar primero. Hacerlo a mano me llevaba entre 30 minutos y 2 horas por semana. Ahora tarda segundos.

### Monitoreo de competidores

Una routine nocturna que crawlea las páginas principales de tus competidores, detecta cambios en títulos, metas, headings. Si un competidor publica contenido nuevo o empieza a rankear por una keyword tuya, te enterás al día siguiente.

Para un [consultor SEO](/consultor-seo-santiago) o equipo de marketing, esto reemplaza parte de lo que hacen Semrush y Ahrefs en modo alerta, pero sin pagar por cada dominio monitoreado.

### Verificación post-deploy

Tu CI/CD dispara una API routine después de cada deploy. Claude corre tests de humo, verifica que las URLs críticas respondan bien, chequea el sitemap, escanea logs.

Si detecta regresiones, abre un issue con la URL que falló, el status code, el log relevante, y la comparación con la versión anterior. El equipo llega al issue con todo armado.

---

## Donde le veo más potencial: SEO

El trabajo SEO tiene una característica rara: combina tareas repetitivas con decisiones que requieren criterio. Las routines encajan bien acá porque cubren la parte repetitiva sin reemplazar el juicio estratégico. Esto es lo que estoy armando como extensión de mi [flujo de automatización SEO con Python](/blog/automatizacion-seo-python).

### Auditoría continua de contenido

Una routine semanal que escanea los PRs mergeados, identifica cuáles modificaron páginas con keyword research asignado, y verifica que la optimización on-page siga intacta: titles, metas, heading hierarchy, [internal links](/blog/link-building-guia).

Si un meta description se cortó, un H1 cambió y ya no incluye la keyword objetivo, o un internal link quedó roto, la routine abre un PR de corrección. El contenido deja de degradarse en silencio entre una revisión manual y la siguiente.

### Detección de canibalización

Una routine mensual que extrae desde Google Search Console todas las keywords por las que rankea cada URL, detecta overlap entre páginas, y genera un reporte con recomendaciones: consolidar, redireccionar, o diferenciar la intención de búsqueda.

Esto es uno de los problemas más comunes en sitios con más de 50 páginas y de los más difíciles de ver a ojo. Según datos de Ahrefs, más del 45% de los blogs activos tienen canibalización no detectada. Con una routine mensual, el problema pasa de invisible a un reporte que podés leer con el café.

### SEO técnico después de cada deploy

Una routine post-deploy que verifica: páginas sin canonical, robots.txt bloqueando URLs que deberían indexarse, datos estructurados inválidos según [Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), Core Web Vitals que empeoraron, 404s nuevos.

Es una [auditoría SEO técnica](/blog/checklist-seo) continua. Detectar un problema de indexación a las 24 horas vale mucho más que descubrirlo en la revisión mensual, cuando ya perdiste 3 semanas de rastreo.

### Actualización de topical maps

Si trabajás con una estrategia de [topical authority](/blog/que-es-seo), podés tener una routine mensual que analice tu topical map contra datos frescos de ranking. Detecta qué clusters están cubiertos, cuáles tienen gaps, y sugiere el próximo artículo basándose en rendimiento orgánico real.

Es la parte de la estrategia de contenido que más pereza da hacer a mano, y la que más impacto tiene cuando se hace bien.

---

## Cómo crear tu primera routine

Los tres caminos llegan al mismo lugar. Lo que creás en uno aparece en los otros.

La más directa: entrá a [claude.ai/code/routines](https://claude.ai/code/routines). Definís prompt, repos, conectores, trigger. Todo visual.

Si ya estás en la terminal, `/schedule` crea scheduled routines sin salir de la sesión. Aparecen en la web automáticamente.

Desde la app Desktop: "New task" → "New remote task". Cuidado con "New local task", que crea algo que corre en tu máquina y se apaga con ella.

---

## Lo que aprendí sobre routines que funcionan (y las que no)

Vengo experimentando con automatizaciones similares usando [Claude Code para SEO](/blog/claude-code-seo) desde hace meses. Algunas cosas que hacen la diferencia:

El prompt es el 80% del resultado. Las routines corren sin nadie mirando. Si el prompt es ambiguo, Claude va a hacer lo que le parezca razonable, y "razonable" sin contexto puede ser cualquier cosa. Especificá qué querés que haga, qué archivos toque, qué ignore, qué formato use para la salida.

Empezá con lectura, no con escritura. Tu primera routine debería leer datos y generar reportes. No crear PRs ni pushear cambios. Cuando veas que Claude entiende tu codebase, ahí escalás.

Conectores antes de activar. Si tu routine necesita datos de Slack o Linear, configurá los conectores primero. Una routine con contexto toma mejores decisiones. Una routine ciega adivina.

Probá el prompt en una sesión interactiva antes de automatizarlo. Es obio pero lo menciono porque yo lo salteé las primeras veces y perdí tiempo. Verificá que el output sea lo que esperás, y recién ahí programalo.

Las primeras 2-3 corridas, mirátelas completas. Cada routine genera una sesión visible en [claude.ai/code](https://claude.ai/code). Si el comportamiento varía entre corridas para el mismo input, el prompt necesita más precisión.

---

## Routines vs hooks vs scripts headless

Esto confunde a mucha gente, así que lo simplifico:

| Herramienta | Para qué sirve |
|---|---|
| Hooks | Reacciones automáticas dentro de una sesión activa. Ej: formatear código antes de guardar. |
| Scripts (`-p` headless) | Tareas puntuales desde un cron job o CI/CD. Requieren tu máquina prendida. |
| Routines | Tareas recurrentes en la nube de Anthropic. No dependen de tu infra. |

Las routines no reemplazan a las otras dos. Son para cosas distintas. Un hook es control en tiempo real. Un script headless es automatización one-shot desde tu servidor. Una routine es automatización continua sin servidor.

---

## Lo que esto significa en la práctica

Hasta ahora, automatizar con Claude Code requería mantener un servidor encendido, configurar cron jobs, manejar autenticación. Para pymes y negocios sin equipo de DevOps, ese costo de setup era la barrera real.

Las routines sacan esa parte de la ecuación. Monitoreo de SEO, reportes semanales, triage de issues, verificación de deploys: todo corre en la nube de Anthropic con un prompt bien escrito. Los early adopters reportan reducciones de 3-5 horas semanales en tareas repetitivas.

La barrera ahora es otra: saber qué automatizar y cómo escribirlo. Eso requiere entender tu negocio, no saber de infraestructura. Y honestamente, me parece una barrera mucho más sana.

Hay algo un poco inquietante en tener agentes corriendo a las 3am sin que nadie mire. Pero si el prompt es preciso, si empezaste con lectura y fuiste escalando, y si monitoreás las primeras corridas, el riesgo baja bastante. Una tarea bien automatizada es una tarea que no te va a consumir tiempo de vuelta. Y en SEO, donde el 70% del trabajo es repetitivo pero necesita contexto, eso vale mucho.

---

## Preguntas frecuentes

### ¿Las routines son gratuitas?

No. Necesitás plan Pro ($20/mes), Max, Team o Enterprise. Límites diarios: 5 en Pro, 15 en Max, 25 en Team/Enterprise. Podés pagar usage extra si necesitás más.

### ¿Puedo usar routines sin saber programar?

Depende de qué entiendas por programar. No necesitás escribir código. Pero sí necesitás pensar en lógica: qué debería hacer Claude, en qué condiciones, con qué output. La interfaz web ayuda, pero el prompt lo escribís vos.

### ¿Pueden acceder a herramientas externas?

Sí. A través de conectores (MCP servers) podés conectar Slack, Linear, Jira, APIs custom, bases de datos. Los configurás una vez y quedan disponibles para cualquier routine.

### ¿Es seguro darle autonomía total?

El riesgo depende del scope que le des. Empezá con solo lectura (reportes, monitoreo). Escalá a escritura cuando hayas verificado que el comportamiento es predecible. Una routine que probaste interactivamente primero tiene mucho menos margen de sorpresas.

### ¿Qué eventos de GitHub soportan?

Pull requests (opened, synchronized, closed, reopened), pushes, issues (opened, edited, closed), y workflow runs (completed). Podés filtrar por branch, labels, paths y autor.