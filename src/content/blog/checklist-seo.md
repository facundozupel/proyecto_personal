---
title: "Checklist SEO: Lista de Verificación Completa para tu Sitio"
description: "La checklist SEO definitiva con +40 puntos organizados por categoría: técnico, on-page, contenido y off-page. Lista práctica para auditar y optimizar tu sitio web."
author: "Facundo Zupel"
date: 2026-02-13
readTime: "15 minutos"
tags: ["SEO", "Checklist SEO", "Auditoría SEO", "Posicionamiento Web"]
draft: false
category: "todo-sobre-seo"
---

Esta es la checklist SEO que uso en mis auditorías reales. No es una lista teórica sacada de un manual: son los puntos que reviso cada vez que un cliente me pide diagnosticar por qué su sitio no consigue tráfico orgánico.

Después de más de 5 años haciendo [auditorías SEO](/auditoria-seo-chile), encontré que los mismos problemas aparecen una y otra vez. Un robots.txt mal configurado, title tags genéricos, contenido sin intención de búsqueda clara, cero enlaces internos. Son cosas que se detectan rápido y se corrigen más rápido, pero que la mayoría de los sitios nunca revisan de forma sistemática.

Esta lista de verificación tiene +40 puntos organizados en 5 categorías: SEO técnico, on-page, contenido y estrategia, off-page, y medición. Podés usarla como base para tu propia auditoría o como referencia antes de lanzar un sitio nuevo.

Una aclaración: no todos los puntos aplican a todos los sitios. Un blog de 30 páginas tiene prioridades distintas a un ecommerce con miles de productos. Usá esta checklist como mapa, no como mandamiento.

---

## Checklist de SEO técnico

El SEO técnico es lo que garantiza que Google pueda rastrear, indexar y entender tu sitio. Si esta base falla, da igual que tu contenido sea brillante: no va a aparecer en los resultados. En mis auditorías, acá es donde encuentro los problemas más graves y más fáciles de solucionar.

### 1. Verificar que el sitio es accesible para Googlebot

El rastreo e indexación son la base de todo. Si Googlebot no puede acceder a tus páginas, no existen. Revisá que no haya bloqueos accidentales en el servidor, que el sitio responda con códigos 200 para las páginas importantes y que no haya errores de servidor (5xx) recurrentes.

### 2. Revisar el archivo robots.txt

Tu robots.txt le dice a los rastreadores qué pueden y qué no pueden visitar. Un error acá puede bloquear secciones enteras de tu sitio. He visto ecommerce con el 40% de sus productos bloqueados por una regla que alguien agregó durante una migración y nunca quitó.

Verificá que:
- No bloquea URLs importantes
- No bloquea recursos CSS/JS necesarios para el renderizado
- Referencia tu sitemap.xml

### 3. Enviar y validar el sitemap.xml

El sitemap.xml es tu mapa para los buscadores. Asegurate de que:
- Incluye solo URLs canónicas con código 200
- No incluye páginas noindex ni redireccionadas
- Está enviado en Google Search Console
- Se actualiza automáticamente cuando agregás o eliminás páginas

### 4. Comprobar la indexación en Google Search Console

Entrá al informe de "Páginas" en GSC y revisá cuántas URLs están indexadas vs. cuántas están excluidas y por qué. Los motivos de exclusión te dicen exactamente qué corregir. Priorizá las páginas con errores de indexación que deberían estar visibles.

### 5. Verificar que solo existe una versión del sitio

Tu sitio debe ser accesible desde una sola versión de URL. Todas estas deben redirigir a la misma:
- `http://tusitio.com`
- `https://tusitio.com`
- `http://www.tusitio.com`
- `https://www.tusitio.com`

Si hay múltiples versiones accesibles, estás fragmentando la autoridad de dominio.

### 6. Comprobar HTTPS en todo el sitio

Google confirmó que HTTPS es un factor de ranking. Verificá que todas las páginas carguen sobre HTTPS y que no haya contenido mixto (recursos HTTP dentro de páginas HTTPS). Revisá también que el certificado SSL esté vigente.

### 7. Auditar la velocidad y Core Web Vitals

La velocidad importa para el ranking y para la conversión. Revisá tus métricas en PageSpeed Insights y en el informe de Core Web Vitals de Search Console:
- **LCP** (Largest Contentful Paint): debería ser menor a 2.5 segundos
- **INP** (Interaction to Next Paint): debería ser menor a 200ms
- **CLS** (Cumulative Layout Shift): debería ser menor a 0.1

Los problemas más comunes: imágenes sin optimizar, JavaScript que bloquea el renderizado y falta de caché del navegador.

### 8. Verificar que el sitio es mobile-friendly

Con la indexación móvil primero de Google, la versión móvil de tu sitio es la que importa. Revisá que:
- El diseño sea responsive
- El texto sea legible sin zoom
- Los botones tengan tamaño suficiente para tocar
- No haya contenido oculto en móvil que sí aparezca en desktop

### 9. Revisar errores de rastreo y códigos de estado

Usá Screaming Frog o una herramienta de crawl para detectar:
- Páginas con error 404 (especialmente las que reciben backlinks)
- Cadenas de redirecciones (301 que apuntan a otro 301)
- Redirecciones temporales (302) que deberían ser permanentes (301)
- Páginas con errores de servidor (5xx)

### 10. Auditar las etiquetas canonical

Las canonicals mal implementadas son un problema silencioso. Verificá que:
- Cada página tiene una etiqueta canonical que apunta a sí misma (o a la versión canónica correcta)
- No hay canonicals apuntando a páginas 404 o redireccionadas
- Las páginas paginadas tienen canonicals correctas

### 11. Implementar datos estructurados (Schema Markup)

Los datos estructurados ayudan a Google a entender el contenido de tu página y habilitan rich snippets en los resultados de búsqueda. Verificá que tenés schema relevante implementado:
- `Article` para blog posts
- `LocalBusiness` o `Service` para páginas de servicio
- `FAQPage` para secciones de preguntas frecuentes
- `BreadcrumbList` para migas de pan
- `Product` para fichas de producto (ecommerce)

Validá la implementación con el Rich Results Test de Google.

---

## Checklist de SEO on-page

La optimización on-page es lo que le comunica a Google de qué trata cada página y por qué debería mostrarla antes que la competencia. Es lo que más control tenés y lo que genera impacto más rápido cuando se corrige.

### 12. Optimizar title tags con la keyword principal

El title tag es la señal on-page más fuerte. Cada página debe tener un título único que:
- Incluya la keyword principal, idealmente al inicio
- Tenga entre 50-60 caracteres
- Sea descriptivo y genere interés
- No sea genérico ("Inicio", "Servicios", "Blog")

El error que más veo: title tags duplicados entre páginas que deberían atacar keywords distintas.

### 13. Escribir meta descriptions que generen clics

La meta description no es un factor de ranking directo, pero sí afecta el CTR (Click-Through Rate). Una buena meta description:
- Tiene entre 150-160 caracteres
- Incluye la keyword principal de forma natural
- Comunica un beneficio claro o responde a la necesidad del usuario
- Incluye un call-to-action implícito

### 14. Usar una estructura de encabezados jerárquica

Cada página debe tener un solo H1 que incluya la keyword principal. Los H2 deben estructurar las secciones principales y los H3 los subtemas. Sin saltos de nivel (de H1 a H3 sin H2).

Esto no es solo SEO: es usabilidad. Una buena jerarquía de headings hace que el contenido sea más escaneable y ayuda a Google a entender la estructura temática de la página.

### 15. Optimizar URLs para que sean descriptivas

Las URLs deben ser cortas, descriptivas y contener la keyword. Evitá:
- Parámetros innecesarios (`?id=1234&category=5`)
- URLs muy largas con preposiciones y stop words
- Números sin contexto

Ejemplo bueno: `/blog/checklist-seo`
Ejemplo malo: `/blog/2026/02/13/la-lista-de-verificacion-seo-completa-para-tu-sitio-web`

### 16. Optimizar imágenes (alt text, compresión, formato)

Cada imagen debe tener:
- **Alt text descriptivo** que incluya la keyword cuando sea natural
- **Compresión adecuada** (formatos WebP o AVIF para web)
- **Dimensiones definidas** (para evitar CLS)
- **Nombre de archivo descriptivo** (`checklist-seo-tecnico.webp` en vez de `IMG_2345.jpg`)

### 17. Implementar enlaces internos contextuales

El internal linking es uno de los factores on-page más subestimados. Cada página importante debe recibir enlaces desde otras páginas relacionadas con anchor text descriptivo.

Reglas básicas:
- Mínimo 2-3 enlaces internos por artículo largo
- El anchor text debe describir el contenido de la página destino
- Priorizá enlaces contextuales (dentro del contenido) sobre los de navegación
- Nunca uses "haz clic aquí" como anchor text

Esto es algo que trabajo en profundidad en cada [estrategia SEO](/estrategia-seo) que diseño: la arquitectura de información y el flujo de autoridad entre páginas.

### 18. Configurar migas de pan (breadcrumbs)

Las breadcrumbs mejoran la navegación del usuario y ayudan a Google a entender la estructura de tu sitio. Además, pueden aparecer directamente en los resultados de búsqueda si implementás el schema `BreadcrumbList`.

### 19. Revisar contenido duplicado interno

Buscá páginas con contenido sustancialmente idéntico o muy similar dentro de tu propio sitio. Esto confunde a Google porque no sabe cuál priorizar. Causas comunes:
- Variaciones de URL para la misma página (con/sin trailing slash, con parámetros)
- Páginas de categoría y etiqueta que muestran el mismo contenido
- Fichas de producto con descripciones copiadas del fabricante

### 20. Verificar que no haya canibalización de keywords

La canibalización de keywords ocurre cuando múltiples páginas de tu sitio compiten por la misma keyword. En vez de reforzarse, se anulan mutuamente.

Para detectarla: revisá en Google Search Console si una misma query trae clics a múltiples URLs de tu sitio. Si es así, decidí cuál mantener y redirigí o diferenciá la otra.

---

## Checklist de contenido y estrategia

El contenido es lo que responde a la intención de búsqueda del usuario. Podés tener un sitio técnicamente perfecto, pero si el contenido no es relevante, completo y mejor que el de la competencia, no vas a rankear.

### 21. Hacer keyword research antes de crear contenido

Cada página debe nacer de una investigación de keywords. Eso significa:
- Identificar la keyword principal y las secundarias
- Analizar el volumen de búsqueda y la dificultad
- Mapear la keyword a un tipo de contenido (guía, landing, ficha de producto)

Herramientas como Semrush, Ahrefs o el propio Google Search Console te dan estos datos. El keyword research no es opcional: es el punto de partida.

### 22. Alinear cada página con una intención de búsqueda clara

Este es el punto más importante de toda la checklist. Antes de escribir, analizá la SERP para tu keyword objetivo y respondé:
- ¿Qué tipo de contenido muestra Google? (guías, listas, landing pages, videos)
- ¿Qué intención tiene el usuario? (informacional, comercial, transaccional, navegacional)
- ¿Tu contenido responde a esa intención mejor que los primeros resultados?

Si tu contenido no calza con lo que Google ya premia para esa keyword, no va a posicionar. Así de simple.

### 23. Crear contenido completo y profundo

Google premia el contenido que cubre un tema de forma exhaustiva. Eso no significa escribir por escribir: significa cubrir todos los ángulos relevantes que un usuario podría necesitar.

Revisá los primeros 5 resultados para tu keyword y preguntate: ¿qué cubren ellos que yo no? ¿Hay preguntas frecuentes que no estoy respondiendo? ¿Puedo agregar datos, ejemplos o perspectivas que ellos no tienen?

### 24. Incluir E-E-A-T en el contenido

Experience, Expertise, Authoritativeness, Trustworthiness. Google evalúa si el contenido demuestra experiencia real, expertise en el tema, autoridad y confianza.

En la práctica esto significa:
- Mostrar quién escribe el contenido (autor con bio y credenciales)
- Incluir ejemplos de primera mano y datos reales
- Citar fuentes confiables cuando corresponda
- Mantener el contenido actualizado

### 25. Revisar y actualizar contenido existente

El contenido no se publica y se olvida. Los artículos que pierden posiciones necesitan actualización: datos nuevos, secciones adicionales, links internos frescos.

Revisá en Google Search Console qué páginas están perdiendo clics o impresiones en los últimos 6 meses. Esas son las primeras candidatas para una actualización.

### 26. Responder preguntas de "People Also Ask"

Las preguntas que aparecen en el bloque "También preguntan" de Google son una mina de oro para expandir tu contenido. Incluí respuestas directas a esas preguntas dentro de tu artículo.

Para "checklist seo", las PAA incluyen preguntas como "¿Qué es la lista de verificación SEO?" y "¿Qué debe incluir una auditoría SEO?". Si tu contenido las responde de forma clara y concisa, tenés más chances de aparecer en ese bloque.

### 27. Mapear keywords a URLs (una keyword = una página)

Cada keyword principal debe tener una sola página asignada. Este mapeo evita la canibalización de keywords y asegura que la autoridad no se diluya entre múltiples URLs compitiendo entre sí.

Mantené un documento (puede ser una simple hoja de cálculo) con: URL, keyword principal, keywords secundarias, intención y estado.

### 28. Incluir long-tail keywords de forma natural

Más allá de la keyword principal, tu contenido debe incorporar variaciones de cola larga que los usuarios realmente buscan. Estas long-tail keywords suelen tener menos competencia y una intención más específica.

No las fuerces. Si tu contenido es completo y cubre bien el tema, las long-tail van a aparecer naturalmente en tu texto.

---

## Checklist de SEO off-page

El SEO off-page se centra en las señales externas que le dicen a Google que tu sitio es confiable y autoritativo. El factor principal es el perfil de enlaces: quién enlaza a tu sitio, con qué anchor text y desde qué tipo de sitios.

### 29. Analizar tu perfil de enlaces actual

Antes de salir a conseguir backlinks, necesitás saber dónde estás parado. Usá Ahrefs, Semrush o Google Search Console para revisar:
- Cuántos dominios únicos te enlazan
- Cuál es la calidad de esos dominios (autoridad de dominio, relevancia temática)
- Qué anchor text están usando
- Qué páginas de tu sitio reciben más backlinks

### 30. Identificar y desautorizar enlaces tóxicos

Si tenés backlinks desde sitios de spam, directorios de baja calidad o granjas de enlaces, pueden estar perjudicando tu posicionamiento. Revisá tu perfil y usá el Disavow Tool de Google solo si identificás un patrón claro de enlaces manipulativos.

Ojo: no desautorices cualquier enlace que parezca raro. Google es bastante bueno ignorando spam. Solo actuá si hay evidencia clara de un problema (caída de tráfico post-penalización, acción manual en Search Console).

### 31. Analizar los backlinks de la competencia

Revisá de dónde reciben enlaces tus competidores directos. Eso te da ideas de:
- Sitios que podrían enlazarte a vos también
- Tipos de contenido que atraen backlinks en tu industria
- Oportunidades de link building que no estás aprovechando

### 32. Crear contenido que naturalmente atraiga enlaces

La mejor estrategia de link building es crear contenido tan bueno que otros quieran citarlo. Esto incluye:
- Datos originales e investigaciones propias
- Guías completas que se conviertan en referencia del tema
- Herramientas gratuitas o recursos descargables
- Infografías con datos relevantes

### 33. Recuperar enlaces rotos

Si tenés páginas que fueron eliminadas o cambiaron de URL pero tenían backlinks apuntando a ellas, estás perdiendo autoridad. Detectá esas URLs con errores 404 que reciben backlinks y redirigílas con un 301 a la página más relevante.

### 34. Convertir menciones de marca en enlaces

Buscá menciones de tu marca o tu nombre en la web que no incluyan un enlace. Contactá al autor y pedile amablemente que agregue el link. Es una de las tácticas de link building más efectivas y menos utilizadas.

### 35. Diversificar las fuentes de enlaces

Un perfil de enlaces saludable tiene variedad: blogs del sector, medios de comunicación, directorios relevantes, sitios de educación, asociaciones profesionales. Si el 90% de tus backlinks vienen del mismo tipo de fuente, el perfil se ve poco natural.

---

## Checklist de medición y análisis

De nada sirve optimizar si no medís los resultados. El SEO sin datos es adivinanza. Acá van los puntos que reviso para asegurar que el rendimiento orgánico se esté midiendo correctamente.

### 36. Configurar Google Search Console correctamente

GSC es la herramienta número uno para SEO. Verificá que:
- Todas las propiedades de tu sitio estén verificadas
- El sitemap esté enviado y sin errores
- Estés revisando el informe de rendimiento regularmente (clics, impresiones, CTR, posición media)
- Las notificaciones estén activas para detectar problemas de indexación

### 37. Configurar Google Analytics (GA4) con eventos relevantes

GA4 te muestra qué pasa después de que el usuario llega a tu sitio desde orgánico. Asegurate de tener configurados:
- Eventos de conversión (formularios, llamadas, compras)
- Segmento de tráfico orgánico
- Informes de landing pages orgánicas
- Attribution model adecuado a tu negocio

Sin datos de conversión, no podés calcular el retorno real de tu inversión en SEO.

### 38. Monitorear posiciones para keywords objetivo

No basta con mirar el tráfico total. Necesitás trackear las posiciones de tus keywords objetivo para saber si tu estrategia está funcionando. Herramientas como Semrush, Ahrefs o incluso Google Search Console te permiten seguir la evolución.

Lo importante: no te obsesiones con rankings diarios. Mirá tendencias semanales y mensuales. Las fluctuaciones de un día para otro son normales.

### 39. Revisar el CTR por página en Search Console

Si una página tiene muchas impresiones pero pocos clics, el problema probablemente está en el title tag o la meta description. Un CTR bajo es una señal de que tu snippet no es atractivo para el usuario.

Revisá las páginas con más impresiones y menor CTR. Muchas veces, reescribir el title y la meta description genera un salto de clics sin necesidad de cambiar nada más.

### 40. Auditar páginas con alto potencial no aprovechado

Buscá en Google Search Console páginas que:
- Tienen muchas impresiones pero posición media entre 8-20
- Reciben clics pero podrían recibir más con mejor posición
- Ranquean para keywords que no estás atacando intencionalmente

Estas son las "frutas al alcance de la mano": con optimización mínima podés generar saltos significativos de tráfico orgánico.

### 41. Medir el impacto en métricas de negocio

El rendimiento orgánico no se mide solo en clics. Lo que importa al final del día es el impacto en el negocio: leads generados, ventas, llamadas, formularios completados.

Conectá GA4 con tus objetivos de negocio y revisá mensualmente cuánto tráfico orgánico se convierte en resultados reales. En mis proyectos de [consultoría SEO](/consultor-seo-chile) siempre digo lo mismo: el SEO que no mueve la aguja del negocio es un hobby, no una estrategia.

### 42. Configurar alertas para caídas de tráfico

Configurá alertas en Google Search Console y GA4 para recibir notificaciones cuando haya caídas significativas. Cuanto antes detectés un problema (una desindexación masiva, un error de servidor, una penalización), antes lo podés corregir.

---

## Cómo usar esta checklist en la práctica

No intentes hacer todo de golpe. Mi recomendación:

**Si estás lanzando un sitio nuevo:**
Empezá por los puntos técnicos (1-11), después on-page (12-20) y dejá off-page y medición para cuando tengas contenido publicado.

**Si estás auditando un sitio existente:**
Priorizá los puntos que generan más impacto con menos esfuerzo. En general, arreglar problemas de rastreo e indexación y optimizar title tags son los quick wins más efectivos.

**Si estás haciendo SEO continuamente:**
Usá esta checklist como revisión trimestral. Cada 3 meses, recorré todos los puntos y verificá que no se hayan generado problemas nuevos. Los sitios cambian, se agregan páginas, se modifican plantillas, y muchas veces los errores aparecen sin que nadie se dé cuenta.

La clave no es la herramienta ni la checklist en sí: es la sistematicidad. Los sitios que mantienen un proceso regular de auditoría son los que sostienen y mejoran su posicionamiento orgánico en el tiempo.

---

## Preguntas frecuentes sobre la checklist SEO

### ¿Qué es la lista de verificación SEO?

Una checklist SEO es un listado organizado de todos los puntos que se deben revisar para asegurar que un sitio web está correctamente optimizado para los motores de búsqueda. Cubre áreas como el [SEO técnico](/seo-tecnico), la optimización on-page, el contenido, los enlaces y la medición de resultados. Es una herramienta práctica que usan consultores y equipos in-house para no saltarse nada en una auditoría.

### ¿Qué debe incluir una auditoría SEO?

Una [auditoría SEO profesional](/auditoria-seo-chile) debe cubrir como mínimo: rastreo e indexación, velocidad y Core Web Vitals, análisis on-page (titles, metas, headings), calidad y relevancia del contenido, arquitectura de información y enlaces internos, perfil de enlaces externos, y medición con Google Search Console y GA4. Cada área tiene múltiples puntos de revisión que esta checklist detalla.

### ¿Con qué frecuencia debería revisar esta checklist?

Recomiendo una auditoría completa cada trimestre, con revisiones parciales mensuales de los puntos más críticos (indexación, Core Web Vitals, rankings de keywords objetivo). Si tu sitio tiene actualizaciones frecuentes de contenido o está en un nicho competitivo, la frecuencia debería ser mayor.

### ¿Necesito herramientas de pago para seguir esta checklist?

No necesariamente. Google Search Console, Google Analytics y PageSpeed Insights son gratuitas y cubren la mayoría de los puntos. Para auditorías más profundas, herramientas como Screaming Frog (versión gratuita hasta 500 URLs), Ahrefs Webmaster Tools y Semrush ofrecen funcionalidades avanzadas. La inversión en herramientas se justifica cuando el sitio tiene un tamaño o complejidad que lo requiere.

---

Si llegaste hasta acá, ya tenés el mapa completo. Ahora falta ejecutar.

Si preferís que alguien con experiencia revise tu sitio y te arme un plan de acción priorizado, [podemos agendar un diagnóstico SEO](/contacto). Analizo tu situación actual, identifico los puntos críticos de esta checklist que tu sitio no cumple y te doy un plan concreto para mejorar tu posicionamiento orgánico.