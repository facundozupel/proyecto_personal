---
title: "Goals y Loops en Claude Code: Automatizar Tareas Largas de Marketing Digital"
description: "Cómo usar /goal y /loop de Claude Code para tareas largas de SEO y marketing: auditorías técnicas completas, migraciones, monitoreo de rankings y content refresh. Diferencias con /schedule y casos reales."
author: "Facundo Zupel"
date: 2026-05-14
readTime: "15 minutos"
tags: ["Claude Code", "Automatización", "IA", "SEO", "Marketing Digital", "Goals", "Loops"]
draft: false
category: "ia-en-seo"
---

Anthropic sumó dos comandos a Claude Code que cambian cómo se trabajan las tareas largas: `/goal` y `/loop`. Los dos atacan el mismo problema desde ángulos distintos. Una tarea de marketing digital rara vez se resuelve en un solo paso: una auditoría técnica son decenas de chequeos, una migración SEO son cientos de redirects, un monitoreo de rankings es algo que hacés todas las semanas. Hasta ahora, eso significaba quedarte mirando la terminal o escribir scripts a mano.

`/goal` le da a Claude un objetivo y lo deja trabajar solo hasta cumplirlo. `/loop` repite un prompt cada cierto intervalo mientras tu sesión esté abierta. En este artículo voy a explicar cómo funciona cada uno, en qué se diferencian de `/schedule` y las [Routines](/blog/claude-code-routines), y los casos concretos donde los uso para SEO y marketing.

![Goals y Loops en Claude Code: terminal ejecutando una tarea larga de SEO de forma autónoma](/assets/blog/claude-code-goals-loops/hero-goals-loops.webp)

---

## El problema: las tareas de marketing no son de un solo paso

Pensá en el trabajo real de un mes de SEO. Una [auditoría técnica](/seo-tecnico) no es "revisá esta página". Es: revisar el rastreo e indexación, validar la jerarquía de headings en 200 URLs, chequear Core Web Vitals, detectar canibalización de keywords, verificar el sitemap y el robots.txt, cruzar todo con datos de Search Console. Cada uno de esos pasos depende del anterior y, si algo falla, hay que volver atrás y corregir.

Una IA que responde una vez y se detiene no sirve para eso. Necesitás algo que itere: que intente, valide, encuentre el error, lo arregle y vuelva a probar. Eso es exactamente lo que resuelven `/goal` y `/loop`. Uno trabaja hasta terminar un objetivo; el otro repite una tarea en el tiempo.

---

## Qué es /goal y cómo funciona

`/goal` llegó en la versión 2.1.139 de Claude Code, lanzada el 12 de mayo de 2026. La idea es simple: en vez de darle a Claude una instrucción que ejecuta una vez, le definís una **condición de finalización** y lo dejás trabajar a través de múltiples turnos hasta cumplirla.

Le decís algo como "migrá todos los componentes de auth al nuevo design system y asegurate de que los tests pasen". Claude escribe código, corre los tests, detecta los que fallan, los debuggea, vuelve a correr los tests. Y sigue en ese ciclo solo, sin pedirte aprobación entre cada paso.

### El detalle clave: dos modelos, no uno

Lo más interesante del diseño es que `/goal` **separa el modelo que trabaja del que decide si terminó**. Mientras Claude ejecuta la tarea, otro modelo —Haiku por defecto— revisa el transcript y verifica si la condición de finalización se cumplió de verdad.

¿Por qué importa esto? Porque un agente que se autoevalúa tiende a confundir lo que ya hizo con lo que falta. Se "convence" de que terminó. Al poner un evaluador independiente, el goal solo se cierra cuando un segundo modelo confirma que el objetivo está cumplido. Recién ahí recuperás tu terminal.

El sistema además trackea el tiempo transcurrido, la cantidad de turnos y el consumo de tokens, así que sabés cuánto te está costando la tarea mientras corre.

### Cómo se define un buen goal

Acá está el 80% del resultado. Un goal vago da un loop infinito; un goal medible se cierra solo. La regla es: la condición tiene que ser **verificable**, no interpretable.

Mal goal: "mejorá el SEO técnico del sitio".

Buen goal: "todas las páginas del sitemap devuelven 200, la jerarquía de headings no tiene saltos, el Lighthouse de las 10 URLs principales da más de 95 y los Core Web Vitals están en verde".

El segundo tiene endpoints concretos que el evaluador puede chequear. El primero no termina nunca porque "mejor" no es un estado, es una opinión.

---

## Qué es /loop y cómo funciona

`/loop` resuelve el otro tipo de tarea larga: la que no termina, la que se repite. Re-ejecuta un prompt automáticamente cada cierto intervalo mientras tu sesión de Claude Code siga abierta.

La sintaxis es `/loop [intervalo] [prompt]`. El intervalo es un número seguido de una unidad: `m` para minutos, `h` para horas, `d` para días. El mínimo es un minuto, porque por debajo usa cron. Si no le ponés intervalo, Claude se autoregula el ritmo según la tarea.

Tres cosas que tenés que saber sí o sí:

- **Vive en la sesión.** Si cerrás la terminal, perdés la conexión o reiniciás la app, el loop desaparece. No hay persistencia.
- **Caduca a los 7 días.** Un loop se autoelimina una semana después de creado. Dispara una última vez y se borra. Eso evita que un loop olvidado corra para siempre.
- **Hasta 50 tareas por sesión.** En la práctica nunca llegás, pero está bueno saberlo.

`/loop` es para chequeos temporales mientras trabajás: pollear una API que todavía está cambiando, monitorear si un deploy rompió algo, revisar un dato cada media hora. Liviano y descartable.

---

## /goal vs /loop vs /schedule: cuál usar

Esto confunde, así que lo aclaro con una tabla. Los tres parecen "automatización", pero resuelven cosas distintas.

| Comando | Para qué sirve | Vive en | Termina cuando |
|---|---|---|---|
| `/goal` | Una tarea larga con un objetivo concreto. Itera hasta cumplirlo. | La sesión activa | El evaluador confirma que la condición se cumplió |
| `/loop` | Repetir un prompt cada cierto intervalo durante tu sesión | La sesión activa | Cerrás la sesión o pasan 7 días |
| `/schedule` / Routines | Tareas recurrentes en la nube de Anthropic, sin tu máquina prendida | La infraestructura de Anthropic | Vos lo desactivás |

La diferencia mental es esta: `/goal` es "trabajá hasta terminar **esto**". `/loop` es "hacé **esto** cada tanto, mientras yo esté acá". `/schedule` es "hacé **esto** cada tanto, aunque yo no esté" — y de eso ya hablé a fondo en el artículo sobre [Claude Code Routines](/blog/claude-code-routines).

Para tareas de marketing: usás `/goal` para una auditoría o migración puntual que querés terminar hoy. Usás `/loop` para monitorear algo durante una sesión de trabajo. Usás Routines para el reporte semanal que tiene que salir el lunes sí o sí.

---

## Casos reales de /goal para marketing digital

Acá es donde esto se vuelve útil de verdad. Estos son los usos que le encuentro a `/goal` en trabajo SEO real.

### Auditoría técnica completa de punta a punta

Una [auditoría SEO](/auditoria-seo-chile) tiene decenas de chequeos encadenados. Con `/goal` definís el estado final que querés y dejás que Claude lo recorra entero.

Goal de ejemplo: "Auditá facundogrowth.com. La auditoría está completa cuando: tengas el listado de todas las URLs con status code distinto de 200, el reporte de jerarquía de headings rota, las páginas con title duplicado, los Core Web Vitals de las 15 URLs con más tráfico orgánico, y un markdown final con los hallazgos priorizados por impacto."

Claude crawlea, cruza datos, detecta problemas, arma el reporte. Si un paso falla —por ejemplo, una URL que no responde— lo registra y sigue. Profundicé en el flujo de auditoría con IA en el artículo sobre [auditoría SEO con Claude Code](/blog/auditoria-seo-claude-code).

### Migración SEO sin perder tráfico

Una migración es el caso perfecto para `/goal`: muchísimos pasos, todos verificables, y un costo alto si algo se escapa.

Goal de ejemplo: "Generá el mapa de redirects 301 del dominio viejo al nuevo. Está listo cuando: cada URL indexada del sitio anterior tenga su redirect mapeado, no haya cadenas de redirects de más de un salto, los redirects estén en el formato del servidor de destino, y exista un CSV de validación con la URL origen, la URL destino y el status code esperado."

El evaluador no cierra el goal hasta que ese CSV exista y esté completo. Eso te da una garantía que un prompt suelto no te da.

### Optimización de Core Web Vitals

Este es el ejemplo que más me gusta porque la condición de finalización es puro número.

Goal de ejemplo: "Optimizá la performance de la home y las 5 landing principales. El goal se cumple cuando el Lighthouse de cada una da más de 90 en Performance y los tres Core Web Vitals (LCP, INP, CLS) están en verde."

Claude itera: mide, identifica el cuello de botella, aplica el cambio, vuelve a medir. No para hasta que el número está donde lo pusiste. Eso es optimización on-page con un criterio de cierre objetivo.

### Generación masiva de datos estructurados

Si tenés un ecommerce con cientos de fichas de producto sin schema, `/goal` se encarga del lote entero.

Goal de ejemplo: "Agregá schema Product en JSON-LD a todas las fichas de producto del sitio. Está completo cuando cada ficha tenga el schema válido según el validador de Google y no haya errores ni warnings."

---

## Casos reales de /loop para marketing digital

`/loop` es para lo que se repite en el tiempo, no para lo que termina. Estos son los usos que le doy.

### Monitoreo de indexación post-publicación

Cuando publico contenido nuevo o pido indexación, quiero saber cuándo Google lo levanta. En vez de chequear a mano:

`/loop 2h "Revisá si las 5 URLs nuevas que publicamos hoy ya están indexadas en Google. Avisame en cuanto alguna aparezca."`

El loop pollea cada dos horas durante tu sesión de trabajo y te avisa cuando hay novedad.

### Vigilancia de rankings durante un cambio

Si hiciste un cambio fuerte —reescribiste una página clave, cambiaste la estructura interna de enlaces— querés ver el efecto sin obsesionarte.

`/loop 6h "Chequeá la posición de nuestras 10 keywords principales y compará con el último chequeo. Marcá movimientos de más de 3 posiciones."`

### Detección de cambios en SERP de competidores

`/loop 12h "Revisá la SERP de 'consultor seo chile' y avisame si cambió el top 5 o si aparecieron nuevas SERP features."`

Esto te da inteligencia competitiva pasiva mientras hacés otra cosa. Y conecta con un punto importante: muchas tareas de [automatización con IA para empresas](/blog/automatizacion-ia-empresas) no son tareas grandes, son tareas chicas que se repiten y te comen el día.

### Polling de un reporte que tarda en generarse

A veces extraés datos de una API o herramienta que tarda. En vez de quedarte mirando:

`/loop 5m "Revisá si el export de datos de Search Console ya terminó. Cuando esté, procesalo y armame el resumen."`

---

## Cómo escribir condiciones de finalización que funcionan

Tanto `/goal` como `/loop` viven o mueren por cómo escribís el prompt. Después de usarlos un tiempo, estas son las reglas que me funcionan:

**1. La condición tiene que ser un estado, no una dirección.** "Mejorá", "optimizá", "revisá bien" no son estados. "Lighthouse > 90", "cero errores en el validador", "el CSV existe y tiene N filas" sí lo son.

**2. Definí el scope, no solo el objetivo.** "Auditá el sitio" es infinito. "Auditá las 20 URLs con más tráfico orgánico de los últimos 28 días" es acotado. Un goal sin borde no se cierra nunca.

**3. Empezá con solo lectura.** Antes de darle un goal que escribe archivos o hace cambios, probalo con uno que solo analiza y reporta. Cuando confiás en el comportamiento, escalás.

**4. Tené un plan B.** Goals complejos pueden chocar con edge cases. Si el objetivo no se cumple, querés poder cortar y revisar, no descubrir a las tres horas que se trabó.

**5. Para `/loop`, pensá el intervalo en serio.** Un loop cada minuto sobre una tarea que cambia una vez por día es plata tirada. Ajustá la cadencia a la velocidad real del dato que estás vigilando.

---

## Riesgos y cuándo no usarlos

No todo es para automatizar. `/goal` le da a Claude autonomía para iterar sin pedirte permiso entre pasos. Eso es potente y también peligroso si el prompt está mal escrito o el scope es difuso.

Lo que no haría con `/goal`: tareas creativas abiertas (redactar la estrategia de contenido, decidir el topical map), nada que toque producción sin un entorno de prueba primero, y nada cuyo "terminado" sea subjetivo. Si no podés escribir la condición de finalización como algo verificable, la tarea no es para `/goal`.

Lo que no haría con `/loop`: nada que tenga que sobrevivir al cierre de la terminal —para eso están las Routines—, y nada con un intervalo tan corto que el costo no justifique el ahorro de tiempo.

La barrera con estas herramientas ya no es técnica. Es saber qué tarea vale la pena automatizar y cómo describir su estado final. Eso requiere entender tu trabajo de marketing, no saber de programación. Si querés ver cómo encaja todo el ecosistema de IA en un flujo SEO, lo cubrí en la [guía de Claude Code para SEO](/blog/claude-code-seo).

---

## Preguntas frecuentes

### ¿Cuál es la diferencia entre /goal y /loop?

`/goal` trabaja hasta cumplir un objetivo concreto y después se cierra solo. `/loop` repite un prompt cada cierto intervalo y no termina hasta que cerrás la sesión o pasan 7 días. `/goal` es para terminar algo; `/loop` es para vigilar algo.

### ¿/goal sigue corriendo si cierro la terminal?

No. Tanto `/goal` como `/loop` viven en tu sesión activa de Claude Code. Si necesitás que algo corra sin tu máquina prendida, eso son las Routines o `/schedule`, que corren en la nube de Anthropic.

### ¿Por qué /goal usa dos modelos distintos?

Para que el agente no se autoengañe. El modelo que trabaja puede "creer" que terminó cuando no lo hizo. Un segundo modelo —Haiku por defecto— revisa el transcript de forma independiente y solo cierra el goal cuando la condición de finalización está cumplida de verdad.

### ¿Necesito saber programar para usar /goal en tareas de SEO?

No necesitás escribir código, pero sí necesitás pensar en términos verificables: qué resultado querés, cómo se mide, cuándo está "listo". Esa es una habilidad de marketing y de criterio, no de programación.

### ¿Cuánto cuesta correr un /goal largo?

Depende de la cantidad de turnos y tokens que consuma. El sistema te muestra tiempo transcurrido, turnos y consumo mientras corre, así que podés monitorear el costo. Por eso conviene probar goals nuevos con scope chico antes de soltarlos en algo grande.

### ¿Puedo combinar /goal, /loop y Routines?

Sí, y tiene sentido. Usás `/goal` para la auditoría puntual de hoy, `/loop` para monitorear durante esa sesión, y una Routine para el reporte recurrente que sale todas las semanas. Si querés acompañamiento para armar este tipo de flujos en tu negocio, eso es parte de lo que hago en la [consultoría SEO mensual](/consultoria-seo-mensual).
