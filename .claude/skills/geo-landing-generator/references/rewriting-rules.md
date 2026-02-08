# Reglas de Reescritura para Landings Geolocalizadas

## Principio Fundamental

Cada landing debe leerse como si hubiera sido escrita desde cero para esa ciudad, no como un template con palabras reemplazadas. Un lector de Chillan que lea la landing de Chillan debe sentir que el contenido fue pensado para su realidad local.

---

## 1. Reglas de Variacion del H1

El H1 debe variar entre ciudades. Usar estos patrones de rotacion:

| Patron | Ejemplo |
|--------|---------|
| A: "Consultor SEO en [Ciudad] -- [Beneficio local]" | "Consultor SEO en Chillan -- Posiciona tu Negocio en Nuble" |
| B: "Consultor SEO en [Ciudad]: [Propuesta de valor]" | "Consultor SEO en Arica: Crece en Google desde el Norte de Chile" |
| C: "Consultor SEO en [Ciudad] -- [Diferenciador]" | "Posicionamiento Web en Iquique -- SEO Profesional con Resultados" |
| D: "Consultor SEO [Ciudad] -- [Accion + Resultado]" | "Consultor SEO Santiago -- Mas Trafico Organico para tu Empresa" |

Regla: Ciudades consecutivas NO deben usar el mismo patron. Alternar entre A, B, C y D.

---

## 2. Reglas de Reescritura de Parrafos

### 2.1 Parrafos del Hero

**Parrafo 1 (Presentacion):**
- Mantener la presentacion de Facundo Zupel como consultor SEO
- Cambiar el enfoque geografico: en vez de "empresas y pymes en Chile", escribir "negocios en [Ciudad] y la region de [Region]"
- Variar la propuesta de valor ligeramente entre ciudades

**Parrafo 2 (Enfoque tecnico):**
- Mantener la mencion a SEO tecnico, Python, IA
- Contextualizar con la ciudad: por que es relevante para negocios de [Ciudad]
- Incluir una referencia al sector economico predominante de la ciudad (ej: mineria en Antofagasta, turismo en Valparaiso)

### 2.2 Seccion "Que es un Consultor SEO"

Reescribir con enfoque local:
- Primer parrafo: definicion general (puede ser similar al template)
- Segundo parrafo: por que en [Ciudad] es especialmente importante tener presencia en Google
- Tercer parrafo: diferenciador tecnico de Facundo (mantener)
- Cuarto parrafo: mencion a comunas cercanas o zonas donde atiende

### 2.3 Seccion "Estrategias"

- Las 3 primeras estrategias (SEO Tecnico, Contenido, Automatizacion) se adaptan ligeramente
- La estrategia "SEO Local" se reescribe COMPLETAMENTE para la ciudad:
  - Mencionar Google Business Profile optimizado para [Ciudad]
  - Referenciar zonas comerciales y comunas cercanas
  - Explicar por que el SEO local importa para negocios de esa ciudad

### 2.4 Seccion "Para Quien Es"

Adaptar las 4 cards con ejemplos locales:
- **Pymes**: "Si tienes un negocio en [zona comercial] o atiendes clientes en [Ciudad]..."
- **Ecommerce**: Contextualizar al tipo de comercio local (ej: artesanias en Chillan, zona franca en Iquique)
- **Dependientes de Ads**: Mencionar el costo de competir por clicks en la region
- **En crecimiento**: Referenciar el sector economico fuerte de la ciudad

---

## 3. Reglas de Variacion de CTAs

No repetir los mismos textos de CTA entre ciudades. Pool de variaciones:

| CTA Principal (boton azul) | CTA Secundario (boton outline) |
|---------------------------|-------------------------------|
| Agendar Diagnostico Gratuito | Ver Resultados Reales |
| Solicitar Diagnostico SEO | Ver Caso de Exito |
| Pedir Analisis Gratuito | Conocer mi Metodologia |
| Agendar Llamada Gratuita | Ver Resultados con Clientes |
| Solicitar Evaluacion SEO | Explorar Servicios |

**CTA Final (seccion al fondo):**
- H2: "Necesitas un consultor SEO en [Ciudad]?" o "Quieres posicionar tu negocio en [Ciudad]?"
- Variar entre: "Sin compromiso", "30 minutos", "100% enfocado en tu negocio", "Analisis personalizado"

---

## 4. Reglas de FAQs

### FAQs Base (adaptar del template):
1. "Que hace un consultor SEO?" -> Mantener similar, agregar mencion a [Ciudad]
2. "Cuanto tarda en verse resultados?" -> Mantener, contextualizar con mercado local si aplica
3. "Diferencia entre consultor y agencia?" -> Mantener estructura, agregar por que un consultor directo conviene en [Ciudad]
4. "Trabajas con pymes?" -> Adaptar con ejemplos de pymes tipicas de [Ciudad]
5. "Cuanto cuesta?" -> Mantener, agregar link a articulo de precios

### FAQ Nueva Especifica por Ciudad (agregar 1):
Patron: "Por que necesito SEO en [Ciudad]?" o "Hay consultores SEO en [Ciudad]?"

Respuesta: Explicar el contexto digital de la ciudad, la competencia local, y por que posicionarse en Google es clave para negocios de esa region.

---

## 5. Reglas de Meta Tags

### Title Tag
- Maximo 60 caracteres
- Incluir: "Consultor SEO" + ciudad + diferenciador
- Patron: "Consultor SEO en [Ciudad] -- [Diferenciador] | Facundo Zupel"
- Si es muy largo, eliminar "| Facundo Zupel"

### Meta Description
- 150-160 caracteres
- Incluir: servicio + ciudad + region + beneficio + caso de exito o dato
- Patron: "Consultor SEO en [Ciudad] ([Region]). Estrategia data-driven, [diferenciador]. [Dato de autoridad]."

---

## 6. Reglas de Contexto Local

### Como Generar Contexto Local Creible

Para cada ciudad, el contenido debe incluir:

1. **Referencia geografica**: Region, ubicacion relativa ("norte de Chile", "sur de Chile", "zona central")
2. **Contexto economico**: Sector predominante (mineria, turismo, agricultura, etc.)
3. **Referencia a zonas**: Al menos 1 mencion a zona comercial o comuna cercana
4. **Dato de mercado**: Por que el SEO es relevante para negocios de esa ciudad (competencia digital, turismo online, comercio electronico local, etc.)

### Que NO Hacer

- No inventar estadisticas locales (ej: "el 70% de las pymes de Chillan no tienen web")
- No hacer afirmaciones absolutas sobre el mercado local sin datos
- No mencionar negocios especificos reales sin verificar
- No usar lenguaje que suene a chatbot ("en esta hermosa ciudad")
- No repetir la misma estructura de frases entre ciudades

---

## 7. Reglas de Schema Markup

### Service Schema
```
areaServed:
  - @type: City, name: [Ciudad]
  - Agregar containedInPlace con @type: AdministrativeArea, name: [Region]
```

### BreadcrumbList
```
Inicio (/) > Consultor SEO Chile (/consultor-seo-chile) > Consultor SEO [Ciudad] (/consultor-seo-{slug})
```
Siempre 3 niveles. El segundo nivel enlaza al Hub principal.

### ProfessionalService (nuevo, agregar si hay zonas_comerciales)
```
@type: ProfessionalService
name: "Facundo Zupel - Consultor SEO en [Ciudad]"
areaServed: City + Region
provider: @id del Person existente
```

---

## 8. Checklist de Calidad Pre-Publicacion

Antes de dar por terminada una landing, verificar:

- [ ] H1 usa un patron diferente a las ultimas 2 ciudades generadas
- [ ] Meta title tiene menos de 60 caracteres
- [ ] Meta description tiene 150-160 caracteres
- [ ] Al menos 2 menciones a la region (no solo la ciudad)
- [ ] Al menos 1 mencion a zona comercial o comuna cercana
- [ ] Al menos 1 parrafo con contexto economico local
- [ ] CTA principal tiene texto diferente a las ultimas 2 ciudades
- [ ] FAQ incluye al menos 1 pregunta especifica de la ciudad
- [ ] Internal links: minimo 1 al Hub (/consultor-seo-chile) + 2 a Core + 1 a Author
- [ ] Schema Service tiene areaServed con City y Region
- [ ] BreadcrumbList tiene 3 niveles
- [ ] Seccion "Caso de Exito" se mantiene intacta (datos reales de Endado)
- [ ] No hay find-and-replace evidente (frases que suenen a template)
- [ ] Breadcrumb `<nav>` usa `class="pt-24"` (NO `pt-8`) para header fijo
- [ ] El archivo .astro compila sin errores
