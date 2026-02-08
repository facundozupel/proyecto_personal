---
name: geo-landing-generator
description: Genera landing pages de consultor SEO geolocalizadas a partir del template /consultor-seo-chile, adaptando contenido, redaccion y schema markup para cada ciudad de Chile.
---

# Geo Landing Generator

Skill para generar landing pages de servicio "Consultor SEO en [Ciudad]" geolocalizadas, basadas en el template `src/pages/consultor-seo-chile.astro`.

## Triggers

- `/geo-landing [ciudad]`
- "genera la landing para [ciudad]"
- "crea la pagina de consultor seo para [ciudad]"
- "nueva landing geolocalizada para [ciudad]"

## Parametros

| Parametro | Requerido | Descripcion |
|-----------|-----------|-------------|
| `ciudad` | Si | Nombre de la ciudad objetivo (ej: "Chillan", "Arica", "Iquique") |

## Proceso Paso a Paso

### Paso 1: Validar Ciudad y Obtener Metadata

1. Leer el archivo `.claude/skills/geo-landing-generator/cities-data.json`
2. Buscar la ciudad solicitada (busqueda case-insensitive, con y sin tildes)
3. **Si la ciudad EXISTE en el JSON**: usar su metadata completa
4. **Si la ciudad NO existe en el JSON**:
   a. Usar web search para obtener informacion basica (region, poblacion, gentilicio, zonas comerciales)
   b. Generar el contenido con la mejor info disponible
   c. Al finalizar, sugerir al usuario agregar la ciudad al JSON con el formato correcto
5. Verificar que NO exista ya el archivo `src/pages/consultor-seo-{ciudad_slug}.astro` para evitar duplicados

### Paso 2: Leer el Template Base

1. Leer `src/pages/consultor-seo-chile.astro` completo
2. Analizar su estructura:
   - Frontmatter (imports, variables, arrays de datos)
   - Schema markup (JSON-LD)
   - Secciones HTML (hero, servicios, que-es, estrategias, caso-exito, metodologia, experiencia, para-quien, FAQ, CTA)

### Paso 3: Generar Variables de la Ciudad

Construir el siguiente set de variables a partir de la metadata:

| Variable | Fuente | Ejemplo (Chillan) |
|----------|--------|--------------------|
| `ciudad` | cities-data.json o busqueda | Chillan |
| `ciudad_slug` | Generado: lowercase, sin tildes, sin espacios | chillan |
| `region` | cities-data.json | Nuble |
| `gentilicio` | cities-data.json | chillanejo/a |
| `contexto_local` | Reescritura basada en cities-data.json | "Chillan, capital de la region de Nuble..." |
| `poblacion_aprox` | cities-data.json | 180.000 |
| `comunas_cercanas` | cities-data.json | ["Chillan Viejo", "San Carlos", "Bulnes"] |
| `zonas_comerciales` | cities-data.json | ["centro de Chillan", "Avenida Libertad"] |
| `url_path` | Generado | /consultor-seo-chillan |

### Paso 4: Reescribir Contenido (CRITICO)

**NO hacer find-and-replace de "Chile" por "[Ciudad]".** Cada seccion debe reescribirse siguiendo las reglas de `.claude/skills/geo-landing-generator/references/rewriting-rules.md`.

#### 4.1 Frontmatter — Variables y Datos

Reescribir las variables del frontmatter:

- **`title`**: Variacion natural del titulo para la ciudad
  - Template: "Consultor SEO Chile -- Facundo Zupel | Posicionamiento Web"
  - NO hacer: "Consultor SEO Chillan -- Facundo Zupel | Posicionamiento Web"
  - SI hacer: "Consultor SEO en Chillan -- Posiciona tu Negocio en Nuble"
  - Variar entre ciudades: usar patrones como "Posiciona tu Negocio Local", "Crece en Google", "SEO Local en [Region]"

- **`description`**: Meta description unica para la ciudad (150-160 chars)
  - Mencionar ciudad, region y beneficio concreto
  - Incluir un dato diferenciador (experiencia, caso de exito, enfoque)

- **`servicios[]`**: Mantener los mismos servicios pero adaptar las descripciones
  - Agregar menciones a la ciudad/region donde sea natural
  - El servicio "SEO Local" debe enfocarse en la ciudad especifica
  - Los links de servicios se mantienen iguales (apuntan a las paginas de servicio genericas)

- **`faqs[]`**: Reescribir preguntas y respuestas con enfoque local
  - Cambiar "Chile" por la ciudad donde corresponda
  - Agregar preguntas especificas de la ciudad (ej: "Por que necesito SEO en Chillan?")
  - Incluir al menos 1 FAQ nueva especifica de la ciudad/region
  - Mantener 5-6 FAQs total

#### 4.2 Schema Markup (JSON-LD)

Adaptar el schema existente:

- **Person**: Mantener igual (Facundo Zupel)
- **Service**:
  - `name`: "Consultoria SEO en [Ciudad]"
  - `description`: Meta description de la ciudad
  - `areaServed`: Cambiar de Country "Chile" a City "[Ciudad]" con `containedInPlace` Region "[Region]"
- **BreadcrumbList**: Actualizar con la nueva ruta
  - Inicio > Consultor SEO Chile > Consultor SEO [Ciudad]
  - Agregar un nivel extra de breadcrumb que vuelva al hub /consultor-seo-chile
- **FAQPage**: Actualizar con las FAQs reescritas

**Agregar** schema LocalBusiness si la ciudad tiene zonas comerciales definidas:
```json
{
  "@type": "ProfessionalService",
  "name": "Facundo Zupel - Consultor SEO en [Ciudad]",
  "areaServed": {
    "@type": "City",
    "name": "[Ciudad]",
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "[Region]"
    }
  },
  "provider": { "@id": "https://facundogrowth.com/#person" }
}
```

#### 4.3 Secciones HTML — Reglas de Reescritura por Seccion

**Hero (header)**:
- Reescribir H1 con variacion natural que incluya ciudad
- Adaptar subtitulo contextual (label superior) a "Consultoria SEO en [Ciudad]"
- Reescribir los 2 parrafos introductorios:
  - Parrafo 1: Mantener presentacion de Facundo pero contextualizar para la ciudad
  - Parrafo 2: Mencionar contexto local, por que SEO importa en esa ciudad/region
- CTAs: Variar texto ligeramente ("Agendar Diagnostico Gratuito" puede ser "Solicitar Diagnostico SEO", "Pedir Analisis Gratuito", etc.)
- Mantener la fecha de actualizacion actual

**Servicios de Consultoria SEO**:
- H2: "Servicios de consultoria SEO en [Ciudad]"
- Subtitulo: Adaptar mencionando contexto local
- Cards de servicios: Se renderizan desde el array `servicios` del frontmatter (ya adaptado en paso 4.1)

**Que es un Consultor SEO**:
- Reescribir con enfoque local: por que un negocio en [Ciudad] necesita consultor SEO
- Mantener enlaces internos a /agencia-seo-chile, /estrategia-seo, /blog/que-es-seo
- Mencionar el contexto digital de la ciudad/region
- Incluir mencion natural a comunas cercanas o zonas comerciales

**Estrategias de Posicionamiento Web**:
- H2: Adaptar mencionando la ciudad
- Mantener las 4 estrategias (SEO Tecnico, Contenido, SEO Local, Automatizacion)
- Reescribir la estrategia de "SEO Local" con enfoque especifico en la ciudad
- Mantener todos los enlaces internos existentes

**Caso de Exito**:
- Mantener INTACTO (es el mismo caso real de Endado)
- No inventar datos ni metricas locales
- Se puede agregar un parrafo contextualizando: "Estos resultados demuestran lo que una estrategia SEO profesional puede lograr tambien para negocios en [Ciudad]"

**Metodologia**:
- Mantener los 4 pasos iguales (son genericos y aplican a cualquier ciudad)
- Se puede adaptar ligeramente el subtitulo introductorio

**Experiencia**:
- Mantener la seccion de experiencia profesional INTACTA
- Adaptar la frase de cierre para incluir la ciudad como zona de cobertura

**Para quien es**:
- Reescribir las 4 cards con enfoque local:
  - Pymes: mencionar tipo de negocios tipicos de la ciudad
  - Ecommerce: adaptar al contexto comercial local
  - Empresas dependientes de Ads: contextualizar
  - Empresas en crecimiento: mencionar sector economico de la region
- Mantener enlaces internos

**FAQ**:
- Usar las FAQs reescritas del frontmatter (paso 4.1)
- Estructura HTML identica

**CTA Final**:
- H2: "Necesitas un consultor SEO en [Ciudad]?"
- Reescribir parrafo con mencion a la ciudad
- Variar texto del boton CTA respecto a otras ciudades

### Paso 5: Generar Internal Links Correctos

Toda landing generada DEBE incluir enlaces internos a:
1. `/consultor-seo-chile` (Hub Principal) — minimo 1 link
2. Al menos 2 paginas Core adicionales (servicios)
3. Al menos 1 articulo del blog (Author Section)

El breadcrumb debe enlazar de vuelta a `/consultor-seo-chile`.

**IMPORTANTE**: El `<nav>` del breadcrumb debe usar `class="pt-24"` (NO `pt-8`) para no quedar detras del header fijo. Referencia: `/consultor-seo-regiones.astro`.

Anchor text descriptivo y variado, nunca "haga clic aqui" o "leer mas".

### Paso 6: Escribir el Archivo .astro

1. Crear el archivo en `src/pages/consultor-seo-{ciudad_slug}.astro`
2. El archivo debe ser un componente Astro completo y funcional:
   - Mismos imports que el template (BaseLayout, Header, Footer, Container, StickyContact)
   - Frontmatter con variables y arrays de datos reescritos
   - HTML con todas las secciones adaptadas
   - Schema JSON-LD adaptado
3. Verificar que el HTML generado mantiene:
   - Todas las clases CSS del template original
   - La misma estructura de componentes
   - Los mismos patrones de interactividad (data-open-contact, client:load)

### Paso 7: Build del Proyecto

1. Ejecutar `npm run build` desde la raiz del proyecto para generar la pagina estatica
2. Verificar que no haya errores de build
3. Si hay errores, corregir el archivo .astro generado y re-buildear

### Paso 8: Reporte de Generacion

Mostrar al usuario:

```
LANDING GENERADA: Consultor SEO en [Ciudad]

Archivo: src/pages/consultor-seo-{slug}.astro
URL: /consultor-seo-{slug}

Meta Title: [title generado]
Meta Description: [description generada]

Secciones reescritas:
- Hero: [resumen de cambios]
- Servicios: [cambios en descripciones]
- Que es consultor SEO: [enfoque local aplicado]
- Estrategias: [adaptacion SEO Local]
- FAQ: [N preguntas adaptadas, M nuevas]
- CTA: [variacion aplicada]

Schema Markup:
- Service: areaServed -> City [Ciudad], Region [Region]
- BreadcrumbList: 3 niveles (Inicio > Consultor SEO Chile > [Ciudad])
- FAQPage: [N] preguntas
- ProfessionalService: [si/no]

Internal Links incluidos:
- /consultor-seo-chile (Hub)
- [lista de otros links Core]
- [lista de links Author]

Ciudad en cities-data.json: [Si/No - si No, sugerir agregar]
```

## Output

- Archivo `.astro` production-ready en `src/pages/consultor-seo-{slug}.astro`
- Build exitoso del proyecto Astro
- Reporte de cambios vs template

## Reglas Importantes

1. **Incremental**: Genera solo la ciudad solicitada. No regenera landings anteriores.
2. **Sin duplicados**: Verifica que el archivo no exista antes de crear.
3. **Calidad de copy**: La redaccion debe sonar como landing profesional, no como template con palabras reemplazadas.
4. **Respetar tono**: Seguir la voz de marca definida en CONTEXTO-PROYECTO.md (profesional, directo, basado en datos, orientado a resultados).
5. **No inventar datos**: No fabricar estadisticas locales. Usar datos reales de cities-data.json o investigacion web.
6. **Estructura identica**: El layout HTML y clases CSS deben ser identicos al template.
7. **Topical borders**: Estas landings estan DENTRO del scope (Cluster 3: SEO por Ubicacion Geografica).
8. **Internal linking**: Cumplir con las reglas de la seccion 9 de CONTEXTO-PROYECTO.md.

## Archivos de Referencia

| Archivo | Proposito |
|---------|-----------|
| `src/pages/consultor-seo-chile.astro` | Template base (fuente de verdad para estructura) |
| `.claude/skills/geo-landing-generator/cities-data.json` | Metadata de ciudades |
| `.claude/skills/geo-landing-generator/references/rewriting-rules.md` | Reglas de reescritura y variacion |
| `CONTEXTO-PROYECTO.md` | Estrategia SEO, topical borders, internal linking |
