# Rediseño Dark Theme - facundogrowth.com

**Fecha:** 2025-01-29
**Estado:** Aplicado a TODO el sitio

---

## Resumen

Se aplicó un rediseño completo con tema oscuro, animaciones fluidas y efectos de profundidad. El diseño usa CSS puro + JavaScript vanilla, compatible con SSR y GitHub Pages.

---

## Archivos Modificados

### Sistema Base
- `src/styles/global.css` - Tema oscuro, animaciones, clases utilitarias
- `src/layouts/BaseLayout.astro` - Fondo animado (orbes + grid + partículas)
- `src/layouts/BlogPostLayout.astro` - Prosa invertida para artículos

### Componentes
| Archivo | Cambios |
|---------|---------|
| `src/components/layout/Header.tsx` | Glassmorphism, scroll effect, logo gradiente |
| `src/components/layout/Footer.tsx` | Estilo oscuro, iconos en cards |
| `src/components/sections/TrustBar.tsx` | Marquee infinito |
| `src/components/sections/PainPoints.tsx` | Cards con spotlight mouse-tracking |
| `src/components/sections/Services.tsx` | Nuevo layout, iconos SVG |
| `src/components/sections/PillarCard.tsx` | Gradientes, tags en pills |
| `src/components/sections/CaseStudyPreview.tsx` | Métricas con colores |
| `src/components/sections/WhyMe.tsx` | Iconos SVG, numeración sutil |
| `src/components/sections/WorkflowProcess.tsx` | Cards horizontales conectadas |
| `src/components/sections/ProfitabilityCalculator.tsx` | Inputs/slider oscuros |

### Páginas
- `src/pages/index.astro` - Hero con cards 3D flotantes, nuevo CTA

---

## Características del Diseño

### Fondo Animado
- **Orbes**: 3 gradientes que flotan y rotan (`orb-1`, `orb-2`, `orb-3`)
- **Grid**: Patrón de líneas sutiles
- **Partículas**: 25 puntos que suben flotando (generados con JS)

### Animaciones CSS
```css
@keyframes orbFloat      /* Orbes flotantes */
@keyframes particleFloat /* Partículas subiendo */
@keyframes gradientFlow  /* Texto gradiente animado */
@keyframes cardFloat     /* Cards 3D en hero */
@keyframes float         /* Bounce sutil */
@keyframes dotPulse      /* Punto verde pulsante */
```

### Clases Utilitarias
```css
.glass              /* Glassmorphism claro */
.glass-dark         /* Glassmorphism oscuro */
.gradient-text      /* Texto con gradiente animado */
.reveal             /* Scroll reveal (+ .active) */
.card-spotlight     /* Efecto spotlight mouse */
.animate-float      /* Animación flotante */
.animate-pulse-glow /* Pulso en CTAs */
.btn-shine          /* Efecto shine en hover */
```

### Colores Agregados
```css
--color-purple-50 a --color-purple-900  /* Para sección Automation/IA */
```

---

## Backups

Archivos originales guardados en `./backups/`:
```
backups/
├── BaseLayout.backup.astro
├── BlogPostLayout.backup.astro
├── caso-exito-endado-seo.backup.md
├── global.backup.css
└── index.backup.astro
```

### Restaurar diseño anterior
```bash
cp backups/global.backup.css src/styles/global.css
cp backups/BaseLayout.backup.astro src/layouts/BaseLayout.astro
cp backups/BlogPostLayout.backup.astro src/layouts/BlogPostLayout.astro
cp backups/index.backup.astro src/pages/index.astro
# Restaurar componentes manualmente si es necesario
npm run build
```

---

## Páginas Migradas

El nuevo diseño está aplicado a todo el sitio:
- [x] Home (`/`)
- [x] Artículo Endado (`/blog/caso-exito-endado-seo`)
- [x] `/quien-soy`
- [x] `/blog` (listado)
- [x] `/consultor-seo-chile`
- [x] `/seo-tecnico`
- [x] Todos los artículos de blog (via BlogPostLayout)
- [x] Modal de contacto (ContactModal)
- [x] Componentes UI (Card, Button, Section, Heading, BlogCard)

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview del build
npm run preview
```

---

## Notas Técnicas

1. **SSR Compatible**: Todo funciona con generación estática
2. **Sin dependencias**: Solo CSS + vanilla JS
3. **Partículas**: Se generan en `BaseLayout.astro` con script inline
4. **Scroll Reveal**: Usa `IntersectionObserver` en cada componente
5. **Mouse Tracking**: CSS custom properties (`--mouse-x`, `--mouse-y`)
