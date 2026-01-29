# Schema Markup (JSON-LD) - Referencia

## Archivos del Sistema

```
src/utils/schema.ts           # Generación de schema
src/layouts/BlogPostLayout.astro  # Inyección en <head>
scripts/test-schema-markup.js     # Test local
```

## Configuración

### Site URL
En `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://facundogrowth.com',
});
```

### Organization Data
En `src/utils/schema.ts`:
```typescript
export const DEFAULT_ORGANIZATION: OrganizationSchemaData = {
  name: 'Facundo Zupel - Consultor de Organic Growth',
  url: 'https://facundogrowth.com',
  logo: 'https://facundogrowth.com/logo.png',
  sameAs: [
    'https://www.linkedin.com/in/facundozupel',
    'https://twitter.com/facundozupel',
  ],
};
```

**Logo**: PNG/JPG/WebP, mínimo 112x112px, aspect ratio 1:1

## Validación

1. **Test local**: `node scripts/test-schema-markup.js`
2. **Google Rich Results**: https://search.google.com/test/rich-results
3. **Schema.org Validator**: https://validator.schema.org/

## Troubleshooting

### Schema no aparece en HTML
- Verificar que `slug` se pasa a `BlogPostLayout`
- Verificar que `BaseLayout.astro` tiene `<slot name="head" />`

### Error "Missing required property 'image'"
Asegurar que los posts tienen imagen destacada (mín 50,000px total)

### Schema válido pero no aparece en Google
Google tarda 2-4 semanas en indexar. Enviar sitemap a Search Console.

## Best Practices

1. Schema debe reflejar contenido visible en la página
2. Fechas en formato ISO 8601 con timezone
3. Mismo nombre de autor en todo el sitio
4. `dateModified` se actualiza automáticamente
5. Validar siempre antes de deploy
