/**
 * Test script para visualizar el schema markup generado
 *
 * Uso:
 *   node scripts/test-schema-markup.js
 *
 * Este script muestra cómo se ve el schema markup que se genera
 * automáticamente para los posts de blog
 */

import { generateBlogPostingSchema, DEFAULT_ORGANIZATION } from '../src/utils/schema.ts';

// Ejemplo de datos de un blog post
const examplePost = {
  headline: '10 Estrategias de Organic Growth para Empresas en 2025',
  description:
    'Descubre las mejores estrategias para hacer crecer tu negocio de forma orgánica sin depender de publicidad pagada',
  author: 'Facundo Zupel',
  datePublished: '2025-12-01',
  dateModified: '2025-12-02',
  url: 'https://facundogrowth.com/blog/10-estrategias-organic-growth-2025',
  slug: '10-estrategias-organic-growth-2025',
  tags: ['organic-growth', 'seo', 'marketing', 'estrategia'],
  image: 'https://facundogrowth.com/images/blog/organic-growth-2025.jpg',
};

console.log('='.repeat(80));
console.log('SCHEMA MARKUP GENERADO AUTOMÁTICAMENTE PARA BLOG POSTS');
console.log('='.repeat(80));
console.log('');
console.log('Datos del post de ejemplo:');
console.log(JSON.stringify(examplePost, null, 2));
console.log('');
console.log('-'.repeat(80));
console.log('SCHEMA MARKUP (JSON-LD):');
console.log('-'.repeat(80));
console.log('');

const schemaMarkup = generateBlogPostingSchema(examplePost, DEFAULT_ORGANIZATION);
console.log(schemaMarkup);

console.log('');
console.log('-'.repeat(80));
console.log('HTML SCRIPT TAG:');
console.log('-'.repeat(80));
console.log('');
console.log(`<script type="application/ld+json">`);
console.log(schemaMarkup);
console.log(`</script>`);

console.log('');
console.log('='.repeat(80));
console.log('VALIDACIÓN');
console.log('='.repeat(80));
console.log('');
console.log('✅ Schema markup generado exitosamente');
console.log('');
console.log('Próximos pasos:');
console.log('1. Verifica que el schema aparece en el HTML del post de blog');
console.log('2. Valida con Google Rich Results Test:');
console.log('   https://search.google.com/test/rich-results');
console.log('3. Valida con Schema.org Validator:');
console.log('   https://validator.schema.org/');
console.log('');
console.log('Propiedades incluidas:');
const schema = JSON.parse(schemaMarkup);
console.log(
  Object.keys(schema)
    .filter((k) => k !== '@context' && k !== '@type')
    .map((k) => `  ✓ ${k}`)
    .join('\n')
);
console.log('');
console.log('='.repeat(80));
