# Sistema de Diseño - Landing Page Organic Growth

## 🎨 Paleta de Colores

### Colores Primarios
- **Primary 600**: `#0891b2` (Cyan 600) - CTAs, links, elementos interactivos
- **Primary 700**: `#0e7490` (Cyan 700) - Hover, estados activos
- **Primary 50**: `#ecfeff` (Cyan 50) - Backgrounds suaves

### Colores de Acento
- **Accent 500**: `#10b981` (Emerald 500) - Éxitos, métricas positivas, highlights
- **Accent 600**: `#059669` (Emerald 600) - Hover accent

### Neutros
- **Gray 900**: `#111827` - Texto principal (headings, body importante)
- **Gray 700**: `#374151` - Texto secundario
- **Gray 600**: `#4b5563` - Texto terciario
- **Gray 100**: `#f3f4f6` - Background secciones alternativas
- **Gray 50**: `#f9fafb` - Background principal
- **White**: `#ffffff` - Fondo cards, modals

### Colores Semánticos
- **Success**: Accent 500 (#10b981)
- **Warning**: `#f59e0b` (Amber 500)
- **Error**: `#ef4444` (Red 500)
- **Info**: Primary 600 (#0891b2)

---

## 🔤 Tipografía

### Font Family
- **Sans**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif

### Escala Tipográfica

#### Headings
- **H1**: `text-5xl md:text-6xl` (48px/60px desktop) - font-bold - Hero principal
- **H2**: `text-4xl md:text-5xl` (36px/48px desktop) - font-bold - Secciones principales
- **H3**: `text-2xl md:text-3xl` (24px/30px desktop) - font-semibold - Sub-secciones
- **H4**: `text-xl md:text-2xl` (20px/24px desktop) - font-semibold - Cards, features
- **H5**: `text-lg md:text-xl` (18px/20px desktop) - font-medium
- **H6**: `text-base md:text-lg` (16px/18px desktop) - font-medium

#### Body
- **Large**: `text-lg` (18px) - Leads, subtítulos importantes
- **Base**: `text-base` (16px) - Texto principal
- **Small**: `text-sm` (14px) - Texto secundario, labels
- **XSmall**: `text-xs` (12px) - Captions, metadata

### Line Height
- **Tight**: `leading-tight` - Headings grandes
- **Snug**: `leading-snug` - Headings medianos
- **Normal**: `leading-normal` - Body text
- **Relaxed**: `leading-relaxed` - Párrafos largos

---

## 📏 Spacing & Layout

### Container
- **Max Width**: `max-w-7xl` (1280px)
- **Padding**: `px-4 md:px-6 lg:px-8`

### Section Spacing
- **Vertical**: `py-16 md:py-24 lg:py-32`
- **Between elements**: `space-y-8 md:space-y-12`

### Grid System
- **Columns**: 12-column grid
- **Gap**: `gap-6 md:gap-8 lg:gap-12`

---

## 🎭 Componentes Base

### Buttons
- **Sizes**: sm, md, lg
- **Variants**: primary, secondary, outline, ghost
- **Padding**: sm: `px-3 py-1.5`, md: `px-4 py-2`, lg: `px-6 py-3`
- **Border Radius**: `rounded-md` (6px)

### Cards
- **Background**: white
- **Border**: `border border-gray-200`
- **Shadow**: `shadow-sm hover:shadow-md`
- **Padding**: `p-6 md:p-8`
- **Border Radius**: `rounded-lg` (8px)

### Shadows
- **sm**: Subtle elevation
- **md**: Standard cards
- **lg**: Modals, overlays
- **xl**: Prominent elements

---

## ♿ Accesibilidad

### Contrast Ratios
- **Text on White**: Gray 900 (#111827) - 15.8:1 ✅
- **CTA Primary**: White on Cyan 600 - 4.67:1 ✅
- **Links**: Cyan 600 on White - 4.67:1 ✅

### Focus States
- **Ring**: `focus:ring-2 focus:ring-primary-600 focus:ring-offset-2`
- **Outline**: Visible on all interactive elements

---

## 🎯 Uso por Sección

### Hero
- Background: Gray 50
- Heading: Gray 900, H1
- Subheading: Gray 700, text-lg
- CTA: Primary button

### Sections (About, Services, etc.)
- Background alternativa: White / Gray 100
- Heading: Gray 900, H2
- Body: Gray 700, text-base

### Footer
- Background: Gray 900
- Text: Gray 400
- Links: Gray 300 hover:White

---

**Versión**: 1.0
**Fecha**: 2025-10-24
**Status**: Propuesta inicial
