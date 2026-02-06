# Sistema de Diseno - facundogrowth.com

## Paleta de Colores

### Base
- **Background**: `#000000` (Pure black)
- **Accent**: `#0070F3` (Blue - inspired by Next.js/Vercel)
- **Accent Hover**: `#005AC8`
- **Accent Light**: `#3291FF` (hover text highlights)

### Text Hierarchy (opacity-based on white)
- **Primary**: `text-white` (100% - headings, emphasis)
- **Secondary**: `text-white/70` (70% - body text, descriptions)
- **Tertiary**: `text-white/50` (50% - supporting text)
- **Quaternary**: `text-white/30` (30% - meta info, labels)

### Borders & Surfaces
- **Border Standard**: `border-white/[0.08]`
- **Border Hover**: `border-white/[0.15]`
- **Surface**: `bg-white/[0.03]` (cards, modals)
- **Surface Hover**: `bg-white/[0.06]` (icon containers, interactive)
- **Input Background**: `bg-white/[0.04]`
- **Input Border**: `border-white/[0.1]`

### Semantic (minimal use)
- **Success indicator**: `bg-green-500` / `text-green-400`
- **Error**: `bg-red-500/10` / `text-red-400`
- **Info accent**: `bg-[#0070F3]/10` / `text-[#0070F3]`

---

## Tipografia

### Font Family
- **Sans**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, sans-serif
- **No display font** - Inter for everything

### Headings (fluid sizing with clamp)
- **H1**: `clamp(2.25rem, 5vw, 3.75rem)` - font-bold, letter-spacing: -0.03em
- **H2**: `clamp(1.75rem, 3.5vw, 2.5rem)` - font-bold, letter-spacing: -0.02em
- **H3**: `clamp(1.25rem, 2vw, 1.75rem)` - font-semibold, letter-spacing: -0.01em

### Body
- **Large**: `text-xl` (20px) - Leads, intros
- **Base**: `text-[15px]` or `text-base` (15-16px) - Content
- **Small**: `text-sm` (14px) - Labels, meta

---

## Spacing & Layout

### Container
- **Max Width**: `max-w-[1440px]`
- **Padding**: `px-6 md:px-10 lg:px-16`

### Section Spacing
- **Vertical**: `py-[120px] md:py-[160px]`
- **Hero top**: `pt-32`

### Grid
- **Gap**: `gap-6` standard

---

## Componentes

### .card (CSS class)
```css
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 12px;
/* hover: translate -1px, border lightens */
```

### .glass-nav (CSS class)
```css
background: rgba(0, 0, 0, 0.8);
backdrop-filter: blur(12px);
border-bottom: 1px solid rgba(255, 255, 255, 0.06);
```

### Buttons
- **Primary**: `bg-[#0070F3] text-white rounded-lg hover:bg-[#005AC8]`
- **Secondary**: `border border-white/[0.2] text-white rounded-lg hover:bg-white/[0.05]`
- **Ghost**: `text-white/50 hover:text-white`
- **Padding**: `px-8 py-3.5` (standard), `px-6 py-3` (compact)

### Border Radius
- **Buttons**: `rounded-lg` (8px)
- **Cards**: `rounded-xl` (12px) via `.card` class
- **Inputs**: `rounded-lg` (8px)
- **Tags/Badges**: `rounded-md` (6px)

### Icons
- **Stroke Width**: 1.5 (not 2)
- **Size**: `w-5 h-5` standard, `w-4 h-4` small

---

## Efectos

### Transitions
- **Duration**: `duration-200` standard, `duration-150` for simple hovers
- **Card hover**: `hover:-translate-y-0.5`
- **No bouncing, no pulsing, no gradients, no shine effects**

### Background
- Single subtle radial gradient glow at top of page:
  `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,112,243,0.12), transparent)`
- No animated orbs, particles, or grid overlay

---

**Version**: 2.0
**Fecha**: 2026-02-05
**Status**: Produccion - Inspirado en Next.js/Vercel design system
