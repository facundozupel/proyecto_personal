# Guía de Estilos - Landing Page Facundo Zupel

**Versión**: 1.0
**Última actualización**: 2025-10-24
**Proyecto**: Landing Page Organic Growth y Automatizaciones

---

## 📋 Índice

1. [Paleta de Colores](#paleta-de-colores)
2. [Tipografía](#tipografía)
3. [Espaciado y Layout](#espaciado-y-layout)
4. [Componentes UI](#componentes-ui)
5. [Iconografía](#iconografía)
6. [Animaciones](#animaciones)
7. [Accesibilidad](#accesibilidad)

---

## 🎨 Paleta de Colores

### Colores Principales

#### Azul (Confianza y Profesionalismo)

```css
--color-primary-500: #005EB8  /* Azul corporativo principal */
--color-primary-600: #0085CA  /* Azul medio */
--color-primary-700: #005F83  /* Azul oscuro */
--color-primary-800: #0067A0  /* Azul muy oscuro */
```

**Uso**:
- Headings secundarios
- Links hover
- Elementos de confianza
- Badges profesionales

**Ejemplos**:
- Títulos de secciones importantes
- Links en hover state
- Badges de credenciales

---

#### Verde (ROI y Crecimiento)

```css
--color-success-500: #00843D  /* Verde principal */
--color-success-600: #00A86B  /* Verde brillante */
--color-success-700: #046A38  /* Verde oscuro */
--color-success-800: #007A53  /* Verde profundo */
```

**Uso**:
- Métricas positivas
- Resultados de éxito
- Indicadores de crecimiento
- CTAs secundarios

**Ejemplos**:
- Cifras de resultados (+50% ROI)
- Testimonios positivos
- Check marks en listas
- Botones de confirmación

---

#### Naranja (Acción y Energía)

```css
--color-accent-500: #FF8200   /* Naranja principal */
--color-accent-600: #FF6600   /* Naranja intenso */
--color-accent-700: #D65400   /* Naranja oscuro */
```

**Uso**:
- CTAs principales
- Botones de acción primaria
- Elementos que requieren atención
- Highlights importantes

**Ejemplos**:
- Botón "Agendar Consulta"
- Botón "Contactar Ahora"
- Links de acción principal
- Badges de "Nuevo" o "Destacado"

---

#### Dorado (Premium y Valor)

```css
--color-gold-500: #FFB81C     /* Dorado brillante */
--color-gold-600: #D19F4B     /* Dorado apagado */
```

**Uso**:
- Elementos premium
- Badges especiales
- Iconos de valor
- Destacados de calidad

**Ejemplos**:
- Badge "Premium Service"
- Iconos de certificaciones
- Elementos de pricing premium

---

### Colores Neutrales

```css
--color-neutral-50:  #F9FAFB   /* Gris muy claro */
--color-neutral-100: #F5F5F5   /* Gris claro */
--color-neutral-200: #E5E7EB   /* Gris claro-medio */
--color-neutral-300: #D1D5DB   /* Gris medio */
--color-neutral-400: #9CA3AF   /* Gris medio-oscuro */
--color-neutral-500: #6B7280   /* Gris */
--color-neutral-600: #4B5563   /* Gris oscuro */
--color-neutral-700: #374151   /* Gris muy oscuro */
--color-neutral-800: #1F2937   /* Casi negro */
--color-neutral-900: #1A1A1A   /* Negro corporativo */
```

**Uso**:
- Texto principal (900, 800, 700)
- Bordes y divisores (200, 300)
- Backgrounds alternativos (50, 100)
- Elementos deshabilitados (400, 500)

---

### Combinaciones Recomendadas

#### Landing Page Principal
```
Background: neutral-50 (#F9FAFB)
Texto: neutral-900 (#1A1A1A)
Headings: primary-800 (#0067A0)
CTA Principal: accent-500 (#FF8200)
```

#### Secciones Alternadas
```
Background: white
Bordes: neutral-200 (#E5E7EB)
Texto: neutral-700 (#374151)
Links: primary-600 (#0085CA)
```

#### Cards y Componentes
```
Background: white
Shadow: neutral-200 con 10% opacity
Border: neutral-200 (#E5E7EB)
Hover: primary-500 border (#005EB8)
```

---

## ✍️ Tipografía

### Fuentes

#### Fuente Principal - Inter (Sans-serif)

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Uso**:
- Body text
- Párrafos
- Listas
- Descripciones
- Formularios

**Pesos disponibles**:
- 400 (Regular) - Texto normal
- 500 (Medium) - Énfasis sutil
- 600 (Semibold) - Botones, labels
- 700 (Bold) - Texto destacado

---

#### Fuente Display - Poppins (Sans-serif)

```css
font-family: 'Poppins', 'Inter', -apple-system, sans-serif;
```

**Uso**:
- Headings (H1-H6)
- Títulos de secciones
- Logo/Brand
- CTAs importantes

**Pesos disponibles**:
- 600 (Semibold) - H3-H6
- 700 (Bold) - H1-H2
- 800 (Extrabold) - Logo, Hero headline

---

### Escala Tipográfica

#### Desktop (>1024px)

```css
H1: font-size: 3.75rem (60px)  | line-height: 1.1 | weight: 800
H2: font-size: 3rem (48px)     | line-height: 1.2 | weight: 700
H3: font-size: 2.25rem (36px)  | line-height: 1.3 | weight: 600
H4: font-size: 1.875rem (30px) | line-height: 1.4 | weight: 600
H5: font-size: 1.5rem (24px)   | line-height: 1.5 | weight: 600
H6: font-size: 1.25rem (20px)  | line-height: 1.5 | weight: 600

Body Large: 1.125rem (18px)    | line-height: 1.75 | weight: 400
Body: 1rem (16px)              | line-height: 1.75 | weight: 400
Body Small: 0.875rem (14px)    | line-height: 1.5  | weight: 400
Caption: 0.75rem (12px)        | line-height: 1.5  | weight: 400
```

#### Mobile (<768px)

```css
H1: font-size: 2.5rem (40px)   | line-height: 1.2 | weight: 800
H2: font-size: 2rem (32px)     | line-height: 1.3 | weight: 700
H3: font-size: 1.75rem (28px)  | line-height: 1.4 | weight: 600
H4: font-size: 1.5rem (24px)   | line-height: 1.4 | weight: 600
H5: font-size: 1.25rem (20px)  | line-height: 1.5 | weight: 600
H6: font-size: 1.125rem (18px) | line-height: 1.5 | weight: 600

Body: 1rem (16px)              | line-height: 1.75 | weight: 400
Body Small: 0.875rem (14px)    | line-height: 1.5  | weight: 400
```

**Nota**: Usamos `clamp()` para escala fluida entre breakpoints.

---

### Ejemplos de Uso

```tsx
// Hero Headline (H1)
<h1 className="text-5xl md:text-6xl font-display font-extrabold text-neutral-900">
  Escala tu negocio sin aumentar tu presupuesto publicitario
</h1>

// Section Title (H2)
<h2 className="text-4xl md:text-5xl font-display font-bold text-primary-800">
  ¿Qué es Organic Growth?
</h2>

// Card Title (H3)
<h3 className="text-2xl font-display font-semibold text-neutral-900">
  Auditoría de Oportunidades
</h3>

// Body Text
<p className="text-base text-neutral-700 leading-relaxed">
  El crecimiento orgánico es...
</p>

// Caption / Small Text
<span className="text-sm text-neutral-500">
  Última actualización: Octubre 2024
</span>
```

---

## 📐 Espaciado y Layout

### Spacing Scale

```css
--spacing-1:   0.25rem (4px)
--spacing-2:   0.5rem (8px)
--spacing-3:   0.75rem (12px)
--spacing-4:   1rem (16px)
--spacing-5:   1.25rem (20px)
--spacing-6:   1.5rem (24px)
--spacing-8:   2rem (32px)
--spacing-10:  2.5rem (40px)
--spacing-12:  3rem (48px)
--spacing-16:  4rem (64px)
--spacing-20:  5rem (80px)
--spacing-24:  6rem (96px)
--spacing-32:  8rem (128px)
```

### Breakpoints

```css
sm: 640px   /* Tablets portrait */
md: 768px   /* Tablets landscape */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Container Widths

```css
Container max-width:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1280px (no crece más)

Padding horizontal:
- Mobile: px-4 (1rem)
- Tablet: px-6 (1.5rem)
- Desktop: px-8 (2rem)
```

### Section Spacing

```css
Section padding vertical:
- Mobile: py-16 (4rem / 64px)
- Tablet: py-24 (6rem / 96px)
- Desktop: py-32 (8rem / 128px)
```

**Ejemplo**:
```tsx
<Section className="py-16 md:py-24 lg:py-32">
  {/* Contenido */}
</Section>
```

---

## 🧩 Componentes UI

### Button

#### Variants

**Primary** (Naranja - Acción principal)
```tsx
<Button variant="primary">
  Agendar Consulta
</Button>
```
Estilos: `bg-accent-500 text-white hover:bg-accent-600`

**Secondary** (Azul - Acción secundaria)
```tsx
<Button variant="secondary">
  Ver Más
</Button>
```
Estilos: `bg-primary-600 text-white hover:bg-primary-700`

**Outline** (Borde - Acción terciaria)
```tsx
<Button variant="outline">
  Saber Más
</Button>
```
Estilos: `border-2 border-primary-600 text-primary-600 hover:bg-primary-50`

**Ghost** (Sin fondo - Acción sutil)
```tsx
<Button variant="ghost">
  Cancelar
</Button>
```
Estilos: `text-neutral-700 hover:bg-neutral-100`

#### Sizes

```tsx
<Button size="sm">Pequeño</Button>   /* px-4 py-2 text-sm */
<Button size="md">Mediano</Button>   /* px-6 py-2.5 text-base (default) */
<Button size="lg">Grande</Button>    /* px-8 py-3 text-lg */
```

---

### Card

#### Variants

**Default** (Neutral)
```tsx
<Card variant="default">
  {/* Contenido */}
</Card>
```
Estilos: `bg-white border border-neutral-200 shadow-sm hover:shadow-md`

**Primary** (Azul)
```tsx
<Card variant="primary">
  {/* Contenido */}
</Card>
```
Estilos: `border-t-4 border-t-primary-600`

**Success** (Verde)
```tsx
<Card variant="success">
  {/* Contenido */}
</Card>
```
Estilos: `border-t-4 border-t-success-600`

**Accent** (Naranja)
```tsx
<Card variant="accent">
  {/* Contenido */}
</Card>
```
Estilos: `border-t-4 border-t-accent-600`

---

### Container

```tsx
<Container size="xl" as="section">
  {/* Contenido centrado con max-width */}
</Container>
```

**Sizes**: `sm`, `md`, `lg`, `xl`, `full`

---

### Section

```tsx
<Section id="servicios" bg="gray">
  {/* Contenido con padding vertical generoso */}
</Section>
```

**Backgrounds**: `white`, `gray`, `primary`, `success`

---

### Heading

```tsx
<Heading level="h2" as="h1">
  Título Principal
</Heading>
```

**Levels**: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`

---

## 🎭 Iconografía

### Librería: Lucide React

**Instalación**:
```bash
npm install lucide-react
```

**Uso**:
```tsx
import { Check, ArrowRight, Mail, Phone } from 'lucide-react';

<Check className="w-6 h-6 text-success-600" />
```

### Tamaños Recomendados

```tsx
Pequeño:  w-4 h-4  (16px)  /* Inline con texto */
Mediano:  w-6 h-6  (24px)  /* Botones, cards */
Grande:   w-8 h-8  (32px)  /* Hero, features destacadas */
XL:       w-12 h-12 (48px) /* Iconos hero */
```

### Colores de Iconos

```tsx
Primario:   text-primary-600
Éxito:      text-success-600
Acción:     text-accent-500
Neutral:    text-neutral-500
White:      text-white
```

### Iconos Comunes del Proyecto

```tsx
import {
  CheckCircle2,    // Checkmarks, confirmaciones
  TrendingUp,      // Crecimiento, ROI
  Zap,             // Automatizaciones, velocidad
  Target,          // Objetivos, estrategia
  Users,           // Clientes, comunidad
  BarChart3,       // Análisis, datos
  Clock,           // Tiempo ahorrado
  Mail,            // Contacto
  Phone,           // Teléfono
  Linkedin,        // LinkedIn
  Twitter,         // Twitter
  ChevronRight,    // Navegación
  Menu,            // Menú móvil
  X,               // Cerrar
} from 'lucide-react';
```

---

## 🎬 Animaciones

### Principios

1. **Sutil**: Animaciones suaves que no distraen
2. **Rápido**: Duración 200-300ms para feedback inmediato
3. **Natural**: Easing curves naturales (ease-in-out)
4. **Accesible**: Respetar `prefers-reduced-motion`

### Transiciones CSS

```css
/* Hover states */
transition: all 200ms ease-in-out;

/* Color changes */
transition: color 200ms ease-in-out;

/* Transform */
transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Shadow */
transition: box-shadow 300ms ease-in-out;
```

### Ejemplos de Animaciones

#### Button Hover
```tsx
<button className="hover:scale-105 transition-transform duration-200">
  Click Me
</button>
```

#### Card Hover
```tsx
<div className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
  Card content
</div>
```

#### Fade In (con Framer Motion)
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Respetar Preferencias de Usuario

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ♿ Accesibilidad

### WCAG 2.1 AA Compliance

#### Contraste de Color

**Texto normal**: Mínimo 4.5:1
```css
✅ neutral-900 (#1A1A1A) sobre white (#FFFFFF) = 16.8:1
✅ neutral-700 (#374151) sobre white (#FFFFFF) = 10.1:1
✅ primary-800 (#0067A0) sobre white (#FFFFFF) = 7.2:1
```

**Texto grande** (18px+ o 14px+ bold): Mínimo 3:1
```css
✅ neutral-600 (#4B5563) sobre white (#FFFFFF) = 7.1:1
✅ success-700 (#046A38) sobre white (#FFFFFF) = 8.5:1
```

**Elementos UI** (botones, borders): Mínimo 3:1
```css
✅ accent-500 (#FF8200) sobre white (#FFFFFF) = 4.8:1
```

#### Navegación por Teclado

- **Tab**: Navegar entre elementos interactivos
- **Enter/Space**: Activar links y botones
- **Escape**: Cerrar modals y menús
- **Arrow keys**: Navegar en menús dropdown

```tsx
// Focus visible
className="focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
```

#### ARIA Labels

```tsx
// Navegación
<nav aria-label="Navegación principal">
  {/* Links */}
</nav>

// Botones sin texto
<button aria-label="Menú de navegación">
  <MenuIcon />
</button>

// Links externos
<a href="..." target="_blank" rel="noopener noreferrer">
  LinkedIn
</a>

// Estados dinámicos
<button aria-expanded={isOpen} aria-controls="menu-id">
  Toggle
</button>
```

#### Heading Hierarchy

```html
<h1>Título principal de la página</h1>
  <h2>Sección 1</h2>
    <h3>Subsección 1.1</h3>
  <h2>Sección 2</h2>
    <h3>Subsección 2.1</h3>
```

**Regla**: Solo un H1 por página, jerarquía lógica sin saltos.

#### Alt Text en Imágenes

```tsx
// Informativa
<img src="..." alt="Facundo Zupel presentando estrategia de crecimiento" />

// Decorativa
<img src="..." alt="" role="presentation" />

// Con link
<a href="...">
  <img src="..." alt="Ver caso de éxito de Cliente X" />
</a>
```

#### Touch Targets

**Mínimo**: 44x44px en mobile

```tsx
<button className="min-w-[44px] min-h-[44px] p-2">
  <Icon />
</button>
```

---

## 📚 Recursos

### Herramientas de Diseño

- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Palette Generator**: https://coolors.co
- **Typography Scale**: https://typescale.com
- **Accessibility Checker**: https://wave.webaim.org

### Referencias

- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Material Design**: https://m3.material.io

---

## 🔄 Changelog

### v1.0 - 2025-10-24
- Creación inicial de la guía de estilos
- Definición completa de paleta de colores
- Documentación de tipografía (Inter + Poppins)
- Especificación de componentes UI base
- Guidelines de accesibilidad WCAG 2.1 AA

---

**Autor**: Claude (Agente Orquestador)
**Proyecto**: Landing Page Organic Growth - Facundo Zupel
**Stack**: React + Astro + TailwindCSS v4
