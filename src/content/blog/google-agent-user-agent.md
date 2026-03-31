---
title: "Google-Agent: El Nuevo User Agent de Google que Cambia las Reglas del Crawling"
description: "Qué es Google-Agent, cómo se diferencia de Googlebot, qué implica para tu sitio web y cómo prepararte para el crawling impulsado por agentes de IA."
author: "Facundo Zupel"
date: 2026-03-31
readTime: "12 minutos"
tags: ["SEO", "SEO Técnico", "Google", "IA", "Agentes IA", "Crawling"]
category: "todo-sobre-seo"
draft: false
---

El 20 de marzo de 2026, Google lanzó un nuevo user agent: Google-Agent. No tiene nada que ver con Googlebot. Es un agente de IA que navega la web, completa formularios y ejecuta acciones a pedido del usuario. Viene de Project Mariner, el experimento de Google con agentes web autónomos.

Si trabajás en [SEO técnico](/seo-tecnico) o gestionás infraestructura web, esto te afecta. Y si no lo tenés en el radar, es probable que ya estés recibiendo hits de Google-Agent sin darte cuenta.

---

## Qué es Google-Agent

Google-Agent es un user agent que identifica solicitudes HTTP hechas por agentes de IA corriendo en infraestructura de Google. Según la [documentación oficial](https://developers.google.com/crawling/docs/crawlers-fetchers/google-agent):

> "The Google-Agent user agent is used by agents hosted on Google infrastructure to navigate the web and perform actions upon user request."

El caso de uso más concreto hoy: Project Mariner, el agente experimental de Google que navega sitios, lee contenido y completa tareas en nombre del usuario.

La diferencia con Googlebot es simple: Googlebot rastrea de forma autónoma y continua, sin que nadie lo pida. Google-Agent actúa solo cuando un usuario humano le da una instrucción. Es un fetcher disparado por personas, no un crawler automático.

---

## User agent strings (desktop y mobile)

Para identificar Google-Agent en tus logs, estas son las cadenas:

Desktop:

```
Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Google-Agent; +https://developers.google.com/crawling/docs/crawlers-fetchers/google-agent) Chrome/W.X.Y.Z Safari/537.36
```

Mobile:

```
Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Google-Agent; +https://developers.google.com/crawling/docs/crawlers-fetchers/google-agent)
```

Los reverse DNS siguen el patrón `google-proxy-***-***-***-***.google.com`. Google publicó los rangos de IP en el archivo `user-triggered-agents.json`.

---

## Cómo se diferencia de Googlebot

| Aspecto | Googlebot | Google-Agent |
|---------|-----------|-------------|
| Trigger | Autónomo, rastrea continuamente | Activado por un usuario humano |
| Propósito | Indexar contenido para Search | Ejecutar tareas por el usuario |
| Tipo de acción | Lee contenido | Lee + actúa (formularios, clics, workflows) |
| robots.txt | Lo respeta | Generalmente lo ignora |
| Volumen actual | Masivo y constante | Bajo, en rollout gradual |
| Producto asociado | Google Search | Project Mariner y futuros agentes |

El dato que más me llamó la atención: Google-Agent ignora robots.txt. Desde la perspectiva de Google, es un fetcher disparado por un humano, parecido a cuando alguien usa Google Translate para ver una página. No lo tratan como crawler autónomo, así que las reglas de exclusión no aplican.

Eso tiene implicancias directas si tu [estrategia técnica](/seo-tecnico) depende de robots.txt para controlar acceso.

---

## Qué puede hacer Google-Agent en tu sitio

Según la documentación y lo que se viene reportando:

- Navegar y leer páginas como lo haría un usuario
- Completar formularios (campos de texto, selectores, envíos)
- Ejecutar flujos de varios pasos entre páginas
- Interactuar con botones, menús, accordions

O sea: no es un bot que extrae data. Es un agente que opera dentro de tu sitio como un usuario más, pero procesando instrucciones en lenguaje natural. Esa es la diferencia que importa.

---

## Qué significa esto para SEO

Esto es lo que me importa como [consultor SEO](/consultor-seo-chile).

### Tus formularios van a recibir submissions de agentes

Si tenés formularios de contacto, cotizadores, o cualquier input que capture datos, Google-Agent puede interactuar con ellos. Esto implica tres cosas concretas: necesitás validación server-side (no alcanza con validar solo en frontend), necesitás repensar los captchas (porque pueden bloquear agentes legítimos de Google), y necesitás logging que te permita separar submissions humanas de las de agentes.

### La UX se vuelve operacional

Google-Agent experimenta tu sitio como un usuario. Si tu navegación es confusa, tus formularios no funcionan o tu sitio tiene callejones sin salida, el agente falla. Y cuando falla, el humano que lo mandó tiene una mala experiencia. Con tu sitio.

Los sitios con flujos claros, CTAs que hacen lo que dicen y formularios que funcionan son los que van a salir mejor parados. No porque Google te premie, sino porque los [agentes de IA](/blog/agentes-ia-guia) van a poder cumplir lo que el usuario les pidió.

### El tráfico de agentes es tráfico real (con matices)

Cada visita de Google-Agent tiene un humano detrás. No es tráfico bot. Es tráfico asistido por IA. Va a aparecer en tus analytics y necesitás poder distinguirlo para no contaminar métricas de conversión.

En [Google Analytics 4](/blog/google-analytics-4-seo) y [Search Console](/blog/google-search-console-guia) todavía no hay un segmento nativo para esto. Hoy la forma de identificarlo es filtrar por user agent string en los logs de servidor.

### robots.txt ya no controla todo

Si dependés de robots.txt para bloquear secciones a los bots de Google, Google-Agent va a poder acceder igual. Googlebot sigue respetando robots.txt, pero los agentes no.

Para controlar acceso a Google-Agent necesitás autenticación real para áreas privadas, access control server-side, y monitorear los rangos de IP que Google publica en `user-triggered-agents.json`.

---

## Cómo preparar tu sitio

Lo que vengo haciendo desde el anuncio con sitios de clientes:

### Monitoreo

- [ ] Agregar filtro en tu WAF/CDN para identificar tráfico Google-Agent sin bloquearlo
- [ ] Verificar que los rangos de IP de `user-triggered-agents.json` no estén bloqueados por firewalls
- [ ] Crear un segmento en logs de servidor para trackear volumen y comportamiento
- [ ] Tener una baseline de métricas antes de que el volumen suba

### Formularios

- [ ] Revisar que funcionen sin JavaScript crítico bloqueado
- [ ] Implementar validación server-side completa
- [ ] Asegurar labels semánticos correctos (`<label for="">`)
- [ ] Testear el flujo completo de submission en modo headless

### Infraestructura

- [ ] Revisar rate limiting para no throttlear IPs de Google Agent
- [ ] Verificar que tu CDN entregue contenido correcto a estos user agents
- [ ] Confirmar que server-side rendering funcione para estos requests

---

## web-bot-auth: el protocolo de autenticación que viene

Un detalle que casi nadie está cubriendo: Google está experimentando con el protocolo web-bot-auth, usando la identidad `https://agent.bot.goog`.

La idea es establecer un estándar para que los agentes de IA se autentiquen de forma verificable cuando interactúan con sitios web. Hoy la verificación es por reverse DNS e IP ranges, que funciona pero es primitivo. Con web-bot-auth habría un mecanismo criptográfico estándar.

Para los que trabajamos en [automatización SEO](/blog/automatizacion-seo-python), esto también abre la puerta a que nuestros propios agentes se identifiquen de forma estandarizada ante los sitios que visitamos. Me parece el aspecto más interesante a largo plazo de todo este anuncio.

---

## Agentes IA como nuevo canal de tráfico

Google-Agent no es algo aislado. OpenAI tiene Operator, Anthropic tiene Claude con [MCP servers](/blog/mcp-servers-seo) y [tool use](/blog/agentes-ia-seo), Microsoft metió Copilot Actions en Edge. Todos están construyendo agentes que navegan la web en nombre del usuario.

La web está pasando de "el usuario busca y hace clic" a "el usuario instruye y el agente ejecuta". Para SEO, esto cambia la ecuación: ya no alcanza con rankear. Tu sitio tiene que ser operable por agentes.

¿Qué necesita un sitio para funcionar bien con agentes? HTML bien formado con headers jerárquicos y datos estructurados. Flujos que se puedan navegar programáticamente. Formularios que funcionen tanto para humanos como para bots. Y contenido que no dependa de JavaScript para renderizar.

Si pensás que esto suena a "hacer bien el [SEO técnico](/seo-tecnico) de siempre", tenés razón. La diferencia es que ahora hay consecuencias inmediatas cuando no lo hacés: el agente falla, el usuario se frustra, y tu sitio pierde una oportunidad que ni siquiera sabías que existía.

---

## Lo que yo estoy haciendo con esto

Desde que salió el anuncio empecé a revisar los logs de servidores de mis clientes de [consultoría](/consultor-seo-chile). El volumen todavía es mínimo, pero aparece. Estoy usando ese tiempo para armar las bases: filtros en WAF, segmentos en logs, y sobre todo asegurarme de que los formularios y flujos principales funcionan en modo headless.

No me preocupa que Google-Agent "rompa" algo. Me preocupa que los sitios que no están preparados se pierdan un canal de tráfico que en 12 meses va a ser relevante. El SEO técnico sólido no es un lujo, es infraestructura. Y los agentes de IA lo están dejando en evidencia.

---

## FAQ

### ¿Google-Agent afecta mi ranking en Google Search?

No. Google-Agent no tiene nada que ver con indexación ni ranking. Es un fetcher que ejecuta tareas para usuarios. Dicho esto, si tu sitio no funciona bien con agentes, te estás perdiendo tráfico que va a crecer.

### ¿Puedo bloquear Google-Agent con robots.txt?

Podés agregar `User-agent: Google-Agent` en tu robots.txt, pero Google dice explícitamente que los user-triggered fetchers "generalmente ignoran robots.txt rules". La lógica es que responden a acciones de usuarios humanos, no a crawling automático.

### ¿Google-Agent va a enviar formularios en mi sitio?

Sí. Si tenés formularios de contacto o lead capture, necesitás validación server-side y una forma de distinguir submissions de agentes vs. humanas.

### ¿Cómo verifico si el tráfico es realmente de Google-Agent?

Reverse DNS de la IP de origen. Tiene que coincidir con `google-proxy-***-***-***-***.google.com`. También podés cruzar contra los rangos publicados en `user-triggered-agents.json`.

### ¿Esto reemplaza a Googlebot?

No. Son sistemas separados. Googlebot sigue indexando. Google-Agent ejecuta tareas para agentes de IA. Van a coexistir.
