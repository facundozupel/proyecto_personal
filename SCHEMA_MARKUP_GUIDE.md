# Guía de Schema Markup (JSON-LD) para SEO

## 📖 Introducción

Este proyecto implementa **schema markup automático** para todos los posts de blog usando **JSON-LD** (el formato recomendado por Google).

### ¿Qué es Schema Markup?

Schema markup es código estructurado que ayuda a los motores de búsqueda a entender mejor tu contenido. Permite que Google muestre "Rich Results" (resultados enriquecidos) en las búsquedas, lo que puede aumentar tu CTR (Click-Through Rate) entre 20-50%.

### ¿Por qué JSON-LD?

- **Recomendado por Google** como el formato preferido
- **Fácil de implementar** - se inserta en un `<script>` tag
- **No interfiere con HTML** - es código separado
- **Fácil de mantener** - un solo bloque de datos

---

## 🎯 Schema Implementado

### BlogPosting Schema (Automático)

Cada post de blog genera automáticamente un schema `BlogPosting` con todas las propiedades recomendadas por Google:

**Propiedades incluidas:**
- ✅ `headline` - Título del post
- ✅ `description` - Descripción/resumen
- ✅ `author` - Autor (Person schema)
- ✅ `datePublished` - Fecha de publicación (ISO 8601)
- ✅ `dateModified` - Fecha de modificación (ISO 8601)
- ✅ `url` - URL canónica del post
- ✅ `mainEntityOfPage` - WebPage schema
- ✅ `image` - Imagen destacada (si existe)
- ✅ `publisher` - Organization schema con logo
- ✅ `keywords` - Tags del post

### Organization Schema (Publisher)

Cada post incluye información del publisher (Facundo Zupel):

```json
{
  "@type": "Organization",
  "name": "Facundo Zupel - Consultor de Organic Growth",
  "url": "https://facundogrowth.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://facundogrowth.com/logo.png"
  },
  "sameAs": [
    "https://www.linkedin.com/in/facundozupel",
    "https://twitter.com/facundozupel"
  ]
}
```

---

## 🚀 Cómo Funciona (Automático)

### 1. Cada post de blog genera schema automáticamente

No necesitas hacer nada especial. Cuando creas un post de blog (via API o manualmente), el schema se genera automáticamente.

### 2. Ubicación del código

El schema se inyecta en el `<head>` de cada página de blog post:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  ...
}
</script>
```

### 3. Archivos involucrados

```
src/
├── utils/
│   └── schema.ts              # ⚙️ Utilidades de generación de schema
├── layouts/
│   └── BlogPostLayout.astro   # 📄 Layout que inyecta el schema
└── pages/
    └── blog/
        └── [slug].astro       # 📝 Página individual de post
```

---

## 🛠️ Configuración

### 1. Site URL (Requerido)

El site URL se configura en `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://facundogrowth.com', // 👈 Actualizar con tu dominio real
  // ...
});
```

**⚠️ Importante**: Actualiza esto antes del deploy con tu dominio real de producción.

### 2. Organization Data (Opcional)

Puedes personalizar la información de Organization en `src/utils/schema.ts`:

```typescript
export const DEFAULT_ORGANIZATION: OrganizationSchemaData = {
  name: 'Facundo Zupel - Consultor de Organic Growth',
  url: 'https://facundogrowth.com', // 👈 Tu dominio
  logo: 'https://facundogrowth.com/logo.png', // 👈 URL de tu logo
  sameAs: [
    'https://www.linkedin.com/in/facundozupel', // 👈 Tu LinkedIn
    'https://twitter.com/facundozupel', // 👈 Tu Twitter/X
  ],
};
```

**Logo requirements (Google):**
- Imagen cuadrada o con aspect ratio 1:1
- Mínimo 112x112px
- Formato: PNG, JPG, o WebP
- Fondo transparente o blanco recomendado

---

## 🧪 Testing y Validación

### 1. Ver el schema generado (sin deploy)

Ejecuta el script de test:

```bash
node scripts/test-schema-markup.js
```

Esto mostrará:
- Ejemplo de datos de post
- Schema markup generado
- Lista de propiedades incluidas

### 2. Validar con Google Rich Results Test

**Opción A: URL en vivo (después de deploy)**
1. Ve a: https://search.google.com/test/rich-results
2. Ingresa la URL de un post: `https://tudominio.com/blog/mi-post`
3. Click en "Test URL"
4. Verifica que no haya errores

**Opción B: Código HTML (antes de deploy)**
1. Abre un post en el navegador: `http://localhost:4321/blog/mi-post`
2. View Source (Ctrl+U o Cmd+Option+U)
3. Copia todo el HTML
4. Ve a: https://search.google.com/test/rich-results
5. Click en "Code" tab
6. Pega el HTML
7. Click en "Test CODE"

### 3. Validar con Schema.org Validator

1. Ve a: https://validator.schema.org/
2. Pega la URL o el código HTML
3. Verifica que no haya warnings o errores

### 4. Validar en navegador (Inspect)

1. Abre un post en Chrome: `http://localhost:4321/blog/mi-post`
2. Abre DevTools (F12)
3. Ve a la tab "Elements"
4. En el `<head>`, busca `<script type="application/ld+json">`
5. Verifica que el JSON sea válido y contenga todas las propiedades

---

## 📋 Checklist Pre-Deploy

Antes de hacer deploy a producción, asegúrate de:

- [ ] **Site URL actualizada** en `astro.config.mjs` con dominio real
- [ ] **Organization data** actualizada en `src/utils/schema.ts`:
  - [ ] Nombre correcto
  - [ ] URL del dominio real
  - [ ] Logo URL válida y accesible
  - [ ] URLs de redes sociales reales
- [ ] **Logo subido** al servidor y accesible públicamente
- [ ] **Schema validado** con Google Rich Results Test
- [ ] **Schema validado** con Schema.org Validator
- [ ] **Sin errores críticos** en las validaciones

---

## 🎨 Personalización Avanzada

### Agregar más propiedades al schema

Edita `src/utils/schema.ts` - función `generateBlogPostingSchema()`:

```typescript
export function generateBlogPostingSchema(data, organization) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',

    // ... propiedades existentes ...

    // ➕ Agrega nuevas propiedades aquí
    wordCount: data.wordCount, // Ejemplo
    inLanguage: 'es-ES', // Idioma
    // etc.
  };

  return JSON.stringify(schema, null, 2);
}
```

### Agregar múltiples autores

Si un post tiene múltiples autores, pasa un array:

```typescript
const schemaMarkup = generateBlogPostSchemaTag({
  // ...
  author: [
    { name: 'Facundo Zupel', url: 'https://facundogrowth.com/about' },
    { name: 'Colaborador', url: 'https://example.com/colaborador' }
  ],
  // ...
});
```

### Agregar breadcrumbs

Usa la función `generateBreadcrumbSchema()` en `src/utils/schema.ts`:

```typescript
import { generateBreadcrumbSchema } from '@/utils/schema';

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Inicio', url: 'https://facundogrowth.com' },
  { name: 'Blog', url: 'https://facundogrowth.com/blog' },
  { name: 'Mi Post', url: 'https://facundogrowth.com/blog/mi-post' }
]);
```

---

## 🔍 Troubleshooting

### El schema no aparece en el HTML

**Solución 1**: Verifica que pasaste el `slug` a `BlogPostLayout`:

```astro
<BlogPostLayout
  title={post.data.title}
  slug={slug!}  {/* 👈 Asegúrate de incluir esto */}
  ...
>
```

**Solución 2**: Verifica que `BaseLayout.astro` tiene el slot "head":

```astro
<head>
  <!-- ... meta tags ... -->
  <slot name="head" />  {/* 👈 Debe estar presente */}
</head>
```

### Google Rich Results Test muestra errores

**Error común**: "Missing required property 'image'"

**Solución**: Asegúrate de que tus posts tienen una imagen destacada:

```typescript
{
  "title": "Mi Post",
  "image": "/images/blog/mi-post.jpg", // 👈 Agregar imagen
  ...
}
```

**Requisitos de imagen para Google:**
- Mínimo 50,000 pixels (ancho × alto)
- Aspect ratios recomendados: 16x9, 4x3, 1x1
- Formatos: JPG, PNG, WebP, GIF

### Schema válido pero no aparece en Google

**Razón**: Google puede tardar semanas en indexar y mostrar rich results.

**Qué hacer:**
1. Envía tu sitemap a Google Search Console
2. Solicita indexación manual de posts importantes
3. Espera pacientemente (puede tomar 2-4 semanas)
4. Asegúrate de que tu contenido sea de alta calidad (Google es selectivo)

---

## 📊 Beneficios Esperados

### Mejora en SERPs (Search Results)

Con schema markup implementado correctamente, tus posts pueden mostrar:

- **Título destacado** (hasta 110 caracteres)
- **Descripción** (hasta 160 caracteres)
- **Fecha de publicación**
- **Autor** con foto (si vinculas con Google Knowledge Graph)
- **Imagen destacada** en algunos casos
- **Breadcrumbs** en la URL

### Impacto en CTR

Estudios muestran que rich results pueden aumentar el CTR entre **20-50%** comparado con resultados normales.

### Impacto en AI Search

En 2025, los agentes de IA (ChatGPT, Perplexity, Google SGE) usan schema markup para:
- Entender mejor tu contenido
- Citarte con mayor precisión
- Incluirte en respuestas generadas

**Implementar schema markup te posiciona mejor para el futuro del SEO basado en IA.**

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [Google Article Schema](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Schema.org BlogPosting](https://schema.org/BlogPosting)
- [JSON-LD Specification](https://json-ld.org/)

### Herramientas de Validación

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Search Console](https://search.google.com/search-console)

### Generadores de Schema

- [Schema Markup Generator](https://technicalseo.com/tools/schema-markup-generator/)
- [Hall Analysis Schema Generator](https://www.hallanalysis.com/json-ld-generator/)

---

## 🎓 Best Practices

1. **Contenido = Markup**: El schema debe reflejar contenido visible en la página. No agregues información que no está presente.

2. **Fechas precisas**: Usa fechas ISO 8601 con timezone (`2025-12-01T00:00:00Z`)

3. **Imágenes de calidad**: Usa imágenes originales, de alta resolución, relevantes al contenido

4. **Author consistency**: Usa el mismo nombre de autor en todo el sitio para mejor reconocimiento

5. **Mantén actualizado**: Si actualizas un post, actualiza `dateModified` automáticamente

6. **No abuses**: No agregues schema que no aplica. Mejor tener menos schema correcto que mucho schema incorrecto.

7. **Valida siempre**: Antes de deploy, valida con las herramientas de Google

---

## ✅ Conclusión

Tu blog ahora tiene **schema markup automático de nivel profesional** que:

✅ Cumple con todas las recomendaciones de Google 2025
✅ Incluye todas las propiedades recomendadas
✅ Se genera automáticamente para cada post
✅ Está listo para rich results y AI search
✅ Es fácil de personalizar y mantener

**Próximos pasos:**
1. Actualiza el site URL y organization data
2. Valida con Google Rich Results Test
3. Deploy a producción
4. Monitorea en Google Search Console
5. Espera los rich results (2-4 semanas)

---

**Versión**: 1.0
**Fecha**: 2025-12-01
**Basado en**: Google Article Schema Best Practices 2025
