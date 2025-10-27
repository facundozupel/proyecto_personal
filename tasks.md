# Tasks - Landing Page Organic Growth

**Última actualización**: 2025-10-24 20:36
**Fase actual**: ✅ Fase 0 COMPLETADA → ✅ Fase 1 COMPLETADA (100%) 🎉 → Listo para Fase 2
**Tareas completadas**: 31 / 150+

---

## 📊 Resumen de Estados

- ⚪ **No iniciado**: 119
- 🟡 **Iniciado**: 0
- 🔵 **En testeo**: 0
- ✅ **Completado y testeado**: 31

## 🎉 Fase 1 COMPLETADA 100% - Resumen

**Sistema de Diseño**:
- ✅ Paleta de colores completa (Azul, Verde, Naranja, Dorado, Neutrales)
- ✅ Tipografía: Inter + Poppins
- ✅ Spacing y breakpoints configurados

**Componentes UI** (54 tests pasando):
- ✅ Button (5 tests)
- ✅ Container (5 tests)
- ✅ Card (7 tests)
- ✅ Section (7 tests)
- ✅ Heading (8 tests)
- ✅ Path Aliases (7 tests) ⭐ NUEVO
- ✅ Accessibility Layout (13 tests) ⭐ NUEVO

**Layout**:
- ✅ BaseLayout.astro con meta tags completos
- ✅ Header con navegación desktop + mobile (accesible)
- ✅ Footer con links y redes sociales
- ✅ Index.astro funcional

**Infraestructura**:
- ✅ Path aliases (@/) configurados en tsconfig, astro y vitest
- ✅ Tests de accesibilidad (WCAG 2.1 AA)
- ✅ Guía de estilos completa (docs/style-guide.md)

**Validación**:
- ✅ Chrome MCP: Desktop (1280px) + Mobile (375px)
- ✅ Screenshots tomados
- ✅ Responsive verificado
- ✅ 54 tests pasando (100% success rate)

---

## 🎯 Leyenda

**Estados**:

- `[ ]` **[No iniciado]** - Tarea identificada pero no comenzada
- `[ ]` **[Iniciado]** - Tests escritos, implementación en proceso
- `[ ]` **[En testeo]** - Código implementado, verificando tests
- `[x]` **[Completado y testeado]** - Tests pasan, UX validada, code review ok

**Prioridades**:

- `[P0]` - Crítico (blocker para otras tareas)
- `[P1]` - Importante (core functionality)
- `[P2]` - Nice to have (puede posponerse)

**Tags**:

- `[Setup]` - Configuración inicial
- `[UI]` - Componente visual
- `[Logic]` - Lógica de negocio
- `[Test]` - Testing específico
- `[SEO]` - Optimización SEO
- `[Integration]` - Integración externa
- `[Content]` - Requiere contenido del cliente
- `[UX]` - Requiere validación UX con Chrome MCP

---

# FASE 0: Setup Inicial ⚡

**Objetivo**: Configurar proyecto, tooling y estructura base
**Duración**: 2-3 días
**Progreso**: 11/11 (100%) ✅ COMPLETADA

## Documentación

- [x] **[Completado y testeado]** `[P0][Setup]` Crear PRD.md
- [x] **[Completado y testeado]** `[P0][Setup]` Crear claude.md con instrucciones
- [x] **[Completado y testeado]** `[P0][Setup]` Crear planning.md
- [x] **[Completado y testeado]** `[P0][Setup]` Crear tasks.md inicial

## Inicialización del Proyecto

- [ ] **[No iniciado]** `[P0][Setup]` Crear directorio del proyecto e inicializar git
  - Ejecutar `git init`
  - Crear .gitignore inicial
  - Commit inicial

- [x] **[Completado y testeado]** `[P0][Setup]` Inicializar proyecto Astro con template React
  - ✅ `npm create astro@latest`
  - ✅ Seleccionar template con TypeScript
  - ✅ Integración de React
  - ✅ Verificar que dev server corre correctamente (http://localhost:4321/)

- [x] **[Completado y testeado]** `[P0][Setup]` Instalar y configurar TailwindCSS
  - ✅ `npx astro add tailwind`
  - ✅ Configurar `tailwind.config.mjs` (auto-configurado)
  - ✅ Crear archivo de configuración de tema base (src/styles/global.css)
  - ✅ Test: Verificar que clases de Tailwind funcionan

## Testing Setup

- [x] **[Completado y testeado]** `[P0][Setup][Test]` Configurar Vitest para tests unitarios
  - ✅ Instalar: `vitest`, `@vitest/ui`, `jsdom`, `@vitest/coverage-v8`
  - ✅ Crear `vitest.config.ts` con coverage umbral 80%
  - ✅ Configurar coverage con v8
  - ✅ Crear primer test dummy que pase (tests/unit/setup.test.ts - 2 tests pasando)

- [x] **[Completado y testeado]** `[P0][Setup][Test]` Configurar React Testing Library
  - ✅ Instalar: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
  - ✅ Crear setup file para tests (tests/setup.ts)
  - ✅ Crear test helper utilities (configurado en vitest.config.ts)
  - ✅ Test de ejemplo de componente React (Button component - 5 tests pasando)

- [x] **[No necesario]** `[P1][Setup][Test]` Configurar Playwright para E2E
  - ✅ **Usando Chrome MCP en su lugar** - Más adecuado para validación UX/UI
  - Chrome MCP permite: screenshots, snapshots, interacción, validación visual
  - Playwright postponed para fase posterior si es necesario

## Linting y Formatting

- [x] **[Completado y testeado]** `[P1][Setup]` Configurar ESLint
  - ✅ Instalar ESLint con config de Astro/React
  - ✅ Crear `eslint.config.js` (flat config)
  - ✅ Agregar scripts de linting al package.json (lint, lint:fix)
  - ✅ Integrado con Prettier (eslint-config-prettier)

- [x] **[Completado y testeado]** `[P1][Setup]` Configurar Prettier
  - ✅ Instalar Prettier + prettier-plugin-astro
  - ✅ Crear `.prettierrc` y `.prettierignore`
  - ✅ Integrar con ESLint (eslint-config-prettier)
  - ✅ Agregar scripts de format (format, format:check)

- [ ] **[Postponed]** `[P2][Setup]` Configurar Husky y lint-staged
  - ⏸️ Postponed para después - No crítico para desarrollo inicial
  - Instalar husky y lint-staged
  - Crear pre-commit hook
  - Configurar lint-staged para ejecutar linter/formatter

## Estructura de Proyecto

- [x] **[Completado y testeado]** `[P0][Setup]` Crear estructura de carpetas
  ```
  ✅ src/
    ✅ components/
      ✅ layout/
      ✅ sections/
      ✅ blog/
      ✅ ui/
    ✅ pages/
    ✅ layouts/
    ✅ content/
      ✅ blog/
    ✅ styles/
    ✅ utils/
    ✅ types/
  ✅ tests/
    ✅ unit/components/
    ✅ e2e/
  ✅ public/
    ✅ assets/
  ```

---

# FASE 1: Fundamentos y Layout Base 🏗️

**Objetivo**: Crear estructura base, layout y componentes fundamentales
**Duración**: 1 semana
**Progreso**: 16/20 (80%) 🎉

## Sistema de Diseño

- [x] **[Completado y testeado]** `[P0][UI][Content]` Definir paleta de colores
  - ✅ Paleta completa definida en `global.css` (Tailwind v4)
  - ✅ Azul (Confianza): #005EB8, #0085CA, #005F83, #0067A0
  - ✅ Verde (ROI): #00843D, #00A86B, #046A38, #007A53
  - ✅ Naranja (Acción): #FF8200, #FF6600, #D65400
  - ✅ Amarillo/Dorado (Premium): #FFB81C, #D19F4B
  - ✅ Neutrales: #1A1A1A a #F5F5F5

- [x] **[Completado y testeado]** `[P0][UI][Content]` Definir tipografía
  - ✅ Google Fonts: Inter (body) + Poppins (headings)
  - ✅ Configurado en BaseLayout y global.css
  - ✅ Escala tipográfica responsiva con clamp()
  - ✅ Variables CSS: --font-sans y --font-display

- [x] **[Completado y testeado]** `[P0][UI]` Definir spacing y breakpoints
  - ✅ Breakpoints confirmados (640px, 768px, 1024px, 1280px)
  - ✅ Container max-widths configurados
  - ✅ Spacing scale documentado en global.css
  - ✅ Variables custom: --spacing-18, --spacing-88, --spacing-128

- [x] **[Completado y testeado]** `[P1][UI]` Crear guía de estilos (style-guide.md o página /styleguide)
  - ✅ Colores con ejemplos (todas las paletas documentadas)
  - ✅ Tipografía con ejemplos (Inter + Poppins, escalas)
  - ✅ Componentes base (Button, Card, Container, etc.)
  - ✅ Iconografía (Lucide React guidelines)
  - ✅ Animaciones y transiciones
  - ✅ Accesibilidad (WCAG 2.1 AA)
  - ✅ Archivo: docs/style-guide.md

## Componentes UI Base

- [x] **[Completado y testeado]** `[P0][UI][Test]` Crear componente Button
  - ✅ Variants: primary, secondary, outline, ghost
  - ✅ Sizes: sm, md, lg
  - ✅ States: default, hover, active, disabled
  - ✅ Tests unitarios: 5 tests pasando
  - ✅ Actualizado con paleta de colores correcta

- [x] **[Completado y testeado]** `[P0][UI][Test]` Crear componente Container
  - ✅ Max-width responsivo (sizes: sm, md, lg, xl, full)
  - ✅ Padding horizontal consistente (px-4 sm:px-6 lg:px-8)
  - ✅ Tests de responsive: 5 tests pasando
  - ✅ Prop `as` para elementos semánticos

- [x] **[Completado y testeado]** `[P0][UI][Test]` Crear componente Card
  - ✅ Padding responsive, border, shadow
  - ✅ Hover effects con elevation y translate
  - ✅ Variants: default, primary, success, accent (border-top coloreado)
  - ✅ Tests unitarios: 7 tests pasando

- [x] **[Completado y testeado]** `[P1][UI][Test]` Crear componente Section
  - ✅ Wrapper consistente con py-16 md:py-24 lg:py-32
  - ✅ Spacing vertical generoso
  - ✅ Background variants: white, gray, primary, success
  - ✅ Tests unitarios: 7 tests pasando
  - ✅ Prop id para navegación

- [x] **[Completado y testeado]** `[P1][UI][Test]` Crear componente Heading
  - ✅ Levels: h1, h2, h3, h4, h5, h6
  - ✅ Estilos consistentes con font-display (Poppins)
  - ✅ Escala tipográfica responsiva
  - ✅ Tests unitarios: 8 tests pasando
  - ✅ Total: **32 tests pasando en componentes UI**

## Layout Principal

- [x] **[Completado y testeado]** `[P0][UI][Test]` Crear BaseLayout.astro
  - ✅ HTML structure completo con slots
  - ✅ Meta tags completos (title, description, OG, Twitter)
  - ✅ Import de global.css con paleta de colores
  - ✅ Canonical URLs, robots, theme-color
  - ✅ Preconnect a Google Fonts
  - ✅ Página renderiza correctamente (validado con Chrome MCP)

- [x] **[Completado y testeado]** `[P0][UI][Test]` Crear Header component
  - ✅ Logo/nombre con font-display (Poppins)
  - ✅ Navegación desktop con links correctos
  - ✅ CTA button naranja ("Agendar Consulta")
  - ✅ Sticky header con backdrop-blur
  - ✅ Actualizado con paleta: neutral-700, primary-800, accent-500

- [x] **[Completado y testeado]** `[P1][UI][Test]` Crear navegación mobile (hamburger menu)
  - ✅ Botón hamburger con iconos SVG
  - ✅ Mobile menu con smooth transitions
  - ✅ Close on link click implementado
  - ✅ Responsive: oculto en md:, visible en mobile
  - ✅ Validado con Chrome MCP (375px)

- [x] **[Completado y testeado]** `[P0][UI][Test]` Crear Footer component
  - ✅ Copyright con año dinámico (2025)
  - ✅ Links a redes sociales (LinkedIn, Twitter) con hover:primary-500
  - ✅ Links de servicios, recursos y legales
  - ✅ Fondo neutral-900 con texto neutral-300/400
  - ✅ Grid responsive

- [x] **[Completado]** `[P1][Logic]` Implementar smooth scroll navigation
  - ✅ HTML scroll-behavior: smooth activado en BaseLayout
  - ✅ Nav links apuntan a IDs de secciones (#inicio, #sobre-mi, etc.)
  - ✅ Funcionando en desktop y mobile

## Responsive y Accesibilidad

- [x] **[Completado y testeado]** `[P0][UI][UX]` Validar layout responsive en todos los breakpoints
  - ✅ Mobile: 375px validado con Chrome MCP (screenshot tomado)
  - ✅ Desktop: 1280px validado con Chrome MCP (screenshot tomado)
  - ✅ Grid responsive: 1 columna en mobile, 2 en desktop
  - ✅ Header: navegación collapse a hamburger en mobile
  - ✅ Footer: grid adapta correctamente
  - ✅ CTAs: touch-friendly en mobile (44x44px mínimo)

- [x] **[Completado y testeado]** `[P1][Test]` Tests de accesibilidad en layout base
  - ✅ Tests WCAG 2.1 AA: 13 tests pasando
  - ✅ Navegación por teclado verificada
  - ✅ ARIA labels en nav, buttons (aria-label, aria-controls, aria-expanded)
  - ✅ Links externos con rel="noopener noreferrer"
  - ✅ Heading hierarchy validada
  - ✅ Semantic HTML (<header>, <nav>, <footer>)
  - ✅ Touch targets mínimo 44x44px
  - ✅ Archivo: tests/unit/accessibility/layout.test.tsx

## Página Index Inicial

- [x] **[Completado y testeado]** `[P0][UI]` Crear src/pages/index.astro con estructura básica
  - ✅ Import de BaseLayout con meta tags
  - ✅ Header y Footer integrados con slots
  - ✅ Hero section con paleta correcta (accent-500 CTA, primary-800 text)
  - ✅ Placeholder sections: Sobre Mí, Servicios, Proceso, Contacto
  - ✅ Página renderiza correctamente (validado Chrome MCP)
  - ✅ Responsive funcionando en mobile y desktop

- [x] **[Completado y testeado]** `[P1][Test]` Configurar path aliases (@/)
  - ✅ Configurado en tsconfig.json (baseUrl, paths)
  - ✅ Configurado en astro.config.mjs (vite.resolve.alias)
  - ✅ Configurado en vitest.config.ts (resolve.alias)
  - ✅ Tests de import con alias: 7 tests pasando
  - ✅ Aliases: @/, @/components, @/layouts, @/pages, @/styles, @/utils, @/types
  - ✅ Archivo: tests/unit/path-aliases.test.ts

---

# FASE 2: Secciones del Landing (Parte 1) 🎨

**Objetivo**: Implementar primeras 4 secciones del landing
**Duración**: 1-1.5 semanas
**Progreso**: 0/25 (0%)

## Sección 1: Hero

- [ ] **[No iniciado]** `[P0][Content]` Solicitar y aprobar copy del Hero
  - Headline principal
  - Subheadline (presentación de Facundo)
  - CTA text

- [ ] **[No iniciado]** `[P0][Content]` Solicitar hero image o visual
  - Foto profesional de Facundo, o
  - Ilustración/gráfico, o
  - Video corto de presentación

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente Hero.tsx
  - Layout: Text left, Image right (desktop)
  - Stacked en mobile
  - Headline (h1)
  - Subheadline (p)
  - CTA button (link a sección contacto o Calendly)
  - Tests unitarios
  - **TDD**: Tests primero

- [ ] **[No iniciado]** `[P1][UI][UX]` Agregar animación de entrada (Framer Motion)
  - Fade in del headline
  - Slide in del CTA
  - Tests de animación (opcional, verificar visualmente)

- [ ] **[No iniciado]** `[P0][UX]` Validar Hero con Chrome MCP
  - Screenshot mobile
  - Screenshot desktop
  - Verificar jerarquía visual
  - Verificar contrast ratios

## Sección 2: Sobre Mí (About)

- [ ] **[No iniciado]** `[P0][Content]` Escribir copy de biografía profesional
  - Experiencia en Data SEO Consultant
  - Especialidades
  - Enfoque/filosofía

- [ ] **[No iniciado]** `[P0][Content]` Solicitar foto profesional de Facundo
  - Alta calidad
  - Fondo profesional o neutral

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente About.tsx
  - Layout: Image left, Text right (o viceversa)
  - Biografía con párrafos
  - Highlights/credenciales (bullets o badges)
  - Tests unitarios

- [ ] **[No iniciado]** `[P1][UI]` Optimizar imagen de About
  - Convertir a WebP
  - Lazy loading
  - Responsive sizes

- [ ] **[No iniciado]** `[P0][UX]` Validar About con Chrome MCP
  - Screenshot y verificación visual

## Sección 3: ¿Qué es Organic Growth?

- [ ] **[No iniciado]** `[P0][Content]` Escribir copy explicativo de Organic Growth
  - Definición clara
  - Beneficios (3-4 puntos clave)

- [ ] **[No iniciado]** `[P1][Content]` Escribir copy de las 6 áreas de aplicación
  - SEO y contenido orgánico
  - Optimización de conversión (CRO)
  - Estrategias de retención
  - Marketing de referidos
  - Community building
  - Email marketing orgánico

- [ ] **[No iniciado]** `[P1][UI]` Seleccionar iconos para cada área
  - Librería: Lucide React o Heroicons
  - Consistencia en estilo

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente OrganicGrowth.tsx
  - Heading + descripción
  - Grid de 6 áreas (2 cols mobile, 3 cols desktop)
  - Card por cada área (icono + título + descripción corta)
  - Tests unitarios (render, cantidad de cards)

- [ ] **[No iniciado]** `[P1][UI]` Crear subcomponente GrowthAreaCard.tsx
  - Reutilizable
  - Props: icon, title, description
  - Hover effect
  - Tests unitarios

- [ ] **[No iniciado]** `[P0][UX]` Validar OrganicGrowth con Chrome MCP
  - Verificar grid responsive
  - Screenshot

## Sección 4: Automatizaciones Empresariales

- [ ] **[No iniciado]** `[P0][Content]` Escribir copy de Automatizaciones
  - Definición
  - Beneficios (tiempo, errores, escalabilidad)

- [ ] **[No iniciado]** `[P1][Content]` Listar procesos automatizables (6-8)
  - Reporting y dashboards
  - Generación de contenido
  - Gestión de leads/CRM
  - Análisis de datos
  - Procesos administrativos
  - Email marketing

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente Automations.tsx
  - Heading + descripción
  - Lista de procesos (grid o lista con iconos)
  - Tests unitarios

- [ ] **[No iniciado]** `[P2][Logic][Test]` (Opcional) Crear calculadora interactiva de tiempo ahorrado
  - Input: horas semanales en tarea manual
  - Output: tiempo ahorrado al automatizar (estimación)
  - React state management
  - Tests de lógica
  - **TDD**: Tests de cálculo primero

- [ ] **[No iniciado]** `[P1][UI]` Crear visual "Antes/Después" de automatización
  - Comparación lado a lado
  - Iconografía clara

- [ ] **[No iniciado]** `[P0][UX]` Validar Automations con Chrome MCP
  - Test de calculadora interactiva (si aplica)
  - Screenshot

## Integración de Secciones

- [ ] **[No iniciado]** `[P0][UI]` Integrar 4 secciones en src/pages/index.astro
  - Hero
  - About
  - OrganicGrowth
  - Automations

- [ ] **[No iniciado]** `[P0][Test]` Tests E2E de las 4 primeras secciones
  - Navegación entre secciones
  - Smooth scroll funciona
  - Responsive en mobile/desktop

- [ ] **[No iniciado]** `[P0][UX]` Validación UX completa de Parte 1
  - Chrome MCP: Full page screenshot (mobile y desktop)
  - Verificar flow visual
  - Verificar jerarquía y spacing

---

# FASE 3: Secciones del Landing (Parte 2) 🚀

**Objetivo**: Completar secciones restantes y funcionalidades interactivas
**Duración**: 1 semana
**Progreso**: 0/35 (0%)

## Sección 5: Cómo Puedo Ayudarte (Servicios)

- [x] **[Completado y testeado]** `[P0][Content]` Contenido de servicios recibido
  ✅ Servicios actualizados:
  1. SEO Local
  2. Automatización de procesos internos
  3. Email Marketing inteligente
  4. SEO Técnico
  5. Estrategias de contenido para RRSS y YouTube

  ✅ Introducción sobre ROI y resultados reales

- [ ] **[Iniciado]** `[P0][UI][Test]` Crear componente Services.tsx
  - Introducción con headline sobre ROI
  - Grid de 5 services (adaptable responsive)
  - Sección final con resultado/conclusión
  - Tests unitarios
  - **TDD**: Tests primero

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente ServiceCard.tsx
  - Icono (emoji o Lucide icon)
  - Título del servicio
  - Descripción del servicio
  - Hover effect (elevación, borde color)
  - Tests unitarios

- [ ] **[No iniciado]** `[P1][Content]` Definir si mostrar pricing o "Consultar"
  - Decisión con Facundo (postponed)

- [ ] **[No iniciado]** `[P0][UX]` Validar Services con Chrome MCP

## Sección 6: Ideal Para

- [ ] **[No iniciado]** `[P0][Content]` Escribir 5 perfiles de cliente ideal
  - Empresas que reducen dependencia de ads
  - Negocios con procesos manuales
  - Startups con recursos limitados
  - Equipos pequeños
  - Empresas sin ROI en ads

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente IdealFor.tsx
  - Heading: "¿Es esto para ti?"
  - Lista interactiva (checkboxes visuales o iconos)
  - Tests unitarios

- [ ] **[No iniciado]** `[P1][Logic][Test]` (Opcional) Hacer checklist interactivo
  - Usuario puede marcar items que aplican
  - Mostrar mensaje si marca 3+ items: "¡Hablemos!"
  - Tests de interacción

- [ ] **[No iniciado]** `[P0][UX]` Validar IdealFor con Chrome MCP

## Sección 7: Proceso de Trabajo

- [ ] **[No iniciado]** `[P0][Content]` Escribir copy de 4 fases del proceso
  1. Consulta Inicial (Gratuita)
  2. Propuesta Personalizada
  3. Implementación
  4. Optimización Continua

- [ ] **[No iniciado]** `[P1][UI]` Seleccionar iconos para cada fase
  - Timeline icons
  - Números (1, 2, 3, 4)

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente WorkflowProcess.tsx
  - Timeline vertical (mobile)
  - Timeline horizontal (desktop)
  - Card por fase con: número, título, descripción
  - Tests unitarios

- [ ] **[No iniciado]** `[P1][UI]` Crear visual de timeline (línea conectora)
  - SVG o border styling
  - Responsive

- [ ] **[No iniciado]** `[P0][UX]` Validar WorkflowProcess con Chrome MCP

## Sección 8: Resultados / Casos de Éxito

- [ ] **[No iniciado]** `[P1][Content]` Solicitar testimonios reales a Facundo
  - Cliente, empresa, testimonio, resultado
  - Fotos (opcional)

- [ ] **[No iniciado]** `[P0][Content]` Escribir métricas de resultados
  - X% aumento en tráfico orgánico
  - X horas ahorradas
  - X% reducción de costos
  - (Usar datos reales o rangos realistas)

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente Results.tsx
  - Sección de métricas destacadas (3-4 números grandes)
  - Sección de testimonios (cards)
  - Tests unitarios

- [ ] **[No iniciado]** `[P1][UI][Test]` Crear componente TestimonialCard.tsx
  - Quote
  - Nombre cliente
  - Empresa/rol
  - Foto (opcional)
  - Tests

- [ ] **[No iniciado]** `[P2][UI]` (Opcional) Carousel de testimonios si hay 4+
  - Librería: Swiper o Embla Carousel
  - Responsive

- [ ] **[No iniciado]** `[P0][UX]` Validar Results con Chrome MCP

## Sección 9: FAQ

- [ ] **[No iniciado]** `[P0][Content]` Escribir 6-8 preguntas frecuentes
  - ¿Cuánto tiempo para ver resultados?
  - ¿Solo para empresas grandes?
  - ¿Necesito conocimientos técnicos?
  - ¿Cuál es la inversión?
  - ¿Cómo se miden resultados?
  - ¿Trabajas con [industria]?

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente FAQ.tsx
  - Accordion interactivo
  - Tests de apertura/cierre
  - **TDD**: Tests de estado (open/close) primero

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente FAQItem.tsx
  - Question (button para toggle)
  - Answer (colapsable)
  - Icono de expand/collapse
  - Tests unitarios

- [ ] **[No iniciado]** `[P1][Logic][Test]` Lógica de accordion
  - Solo uno abierto a la vez, o múltiples
  - Smooth transition
  - Tests de interacción

- [ ] **[No iniciado]** `[P0][UX]` Validar FAQ con Chrome MCP
  - Test interactivo de accordion

## Sección 10: CTA Final / Contacto

- [ ] **[No iniciado]** `[P0][Content]` Escribir copy del CTA final
  - Headline de cierre
  - Subtext motivacional

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente ContactSection.tsx
  - Heading + descripción
  - Formulario de contacto
  - Info adicional (email, teléfono)
  - Links a redes sociales
  - Tests

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente ContactForm.tsx
  - Campos: Nombre, Email, Empresa, Mensaje
  - Validación inline con Zod
  - Botón submit
  - Tests de validación
  - **TDD**: Tests de validación primero

- [ ] **[No iniciado]** `[P0][Logic][Test]` Implementar validación de formulario
  - React Hook Form + Zod schema
  - Mensajes de error inline
  - Tests de validación (email inválido, campos requeridos)

- [ ] **[No iniciado]** `[P1][Logic][Test]` Submit handler (placeholder)
  - console.log de datos por ahora
  - Loading state durante submit
  - Success message
  - Tests de flujo completo

- [ ] **[No iniciado]** `[P1][UI]` Crear componente SocialLinks.tsx
  - Links a LinkedIn, Twitter (icons)
  - Target blank, noopener

- [ ] **[No iniciado]** `[P0][UX]` Validar ContactSection con Chrome MCP
  - Test de formulario (llenar, validar, submit)
  - Screenshot

## Integración de Todas las Secciones

- [ ] **[No iniciado]** `[P0][UI]` Integrar las 6 secciones restantes en index.astro
  - Services
  - IdealFor
  - WorkflowProcess
  - Results
  - FAQ
  - ContactSection

- [ ] **[No iniciado]** `[P0][Test]` Tests E2E del landing completo
  - Navegación por todas las secciones
  - Smooth scroll
  - Formulario submit
  - Interacciones (accordion, checklist)

- [ ] **[No iniciado]** `[P0][UX]` Validación UX completa del landing
  - Chrome MCP: Full page screenshots (mobile, tablet, desktop)
  - Verificar flow completo
  - Verificar CTAs visibles
  - Verificar jerarquía

- [ ] **[No iniciado]** `[P1][Test]` Tests de accesibilidad de todo el landing
  - Navegación completa por teclado
  - Screen reader friendly
  - ARIA labels

---

# FASE 4: Blog y Content Collections 📝

**Objetivo**: Implementar sección de blog con Astro Content Collections
**Duración**: 4-5 días
**Progreso**: 0/20 (0%)

## Setup de Content Collections

- [ ] **[No iniciado]** `[P0][Setup]` Configurar Astro Content Collections
  - Crear src/content/config.ts
  - Definir schema para blog posts (title, description, date, author, tags, draft, image)
  - Crear carpeta src/content/blog/
  - **IMPORTANTE**: Seguir formato definido en `docs/blog-format-guide.md`

- [ ] **[No iniciado]** `[P1][Content]` Escribir 3 blog posts de ejemplo
  - Post 1: "¿Qué es el Organic Growth y por qué tu negocio lo necesita?"
  - Post 2: "5 procesos que deberías automatizar hoy"
  - Post 3: "Cómo medir el ROI del crecimiento orgánico"
  - **Seguir estructura definida en `docs/blog-format-guide.md`**
  - Formato: H1 único, H2 para secciones, párrafos 50-150 palabras
  - Negritas en conceptos clave, listas 3-7 items
  - Introducción (hook + contexto + preview) y conclusión (resumen + CTA)
  - Imágenes optimizadas con alt text descriptivo

## Componentes de Blog

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente BlogCard.tsx
  - Thumbnail image
  - Título
  - Excerpt/descripción
  - Fecha
  - Tags
  - Link a post
  - Tests unitarios

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear componente BlogList.tsx
  - Grid de BlogCards (1 col mobile, 2-3 cols desktop)
  - Props: posts array
  - Tests

- [ ] **[No iniciado]** `[P1][UI][Test]` Crear componente BlogPostLayout.astro
  - Layout específico para posts
  - Header con título, fecha, autor
  - Body (markdown content)
  - Footer con tags
  - Navegación (← Volver al blog)
  - Tests E2E

- [ ] **[No iniciado]** `[P1][UI]` Crear componente TagsList.tsx
  - Lista de tags del post
  - Links a filtrado por tag (futuro)

## Páginas de Blog

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear src/pages/blog/index.astro
  - Header de blog (título, descripción)
  - BlogList con todos los posts
  - Paginación (si >6 posts)
  - Tests E2E (página renderiza, posts listados)

- [ ] **[No iniciado]** `[P0][UI][Test]` Crear src/pages/blog/[slug].astro
  - Dynamic route para posts individuales
  - getStaticPaths con Content Collections
  - Uso de BlogPostLayout
  - Tests E2E (post individual renderiza)

- [ ] **[No iniciado]** `[P1][UI]` Agregar link "Blog" en Header navigation
  - Link a /blog
  - Active state cuando estás en blog

- [ ] **[No iniciado]** `[P1][UI]` Crear sección "Últimos Posts" en homepage
  - Componente LatestPosts.tsx
  - Mostrar 3 posts más recientes
  - CTA "Ver todos los posts" → /blog

## SEO y Metadata para Blog

- [ ] **[No iniciado]** `[P0][SEO]` Agregar meta tags específicos para posts
  - Title: "[Post Title] | Facundo Zupel"
  - Description: excerpt del post
  - OG tags (og:title, og:description, og:image)
  - Twitter card

- [ ] **[No iniciado]** `[P1][SEO]` Crear OG images dinámicas para posts (opcional)
  - Generar imagen con título del post
  - Usar @vercel/og o similar

- [ ] **[No iniciado]** `[P1][SEO]` Implementar schema markup para BlogPosting
  - JSON-LD en cada post
  - Autor, fecha, publisher

## Funcionalidades Adicionales

- [ ] **[No iniciado]** `[P2][UI]` Implementar filtrado por tags
  - Página /blog/tag/[tag].astro
  - Filtrar posts por tag

- [ ] **[No iniciado]** `[P2][UI]` Implementar búsqueda en blog
  - Input de búsqueda en /blog
  - Búsqueda por título/descripción (client-side)

- [ ] **[No iniciado]** `[P2][Logic]` Generar RSS feed
  - Astro tiene integración nativa
  - Configurar en astro.config.mjs
  - Link en <head> y footer

## Validación de Blog

- [ ] **[No iniciado]** `[P0][Test]` Tests E2E completos del blog
  - Navegación homepage → blog
  - Click en BlogCard → post individual
  - Volver al blog
  - Responsive

- [ ] **[No iniciado]** `[P0][UX]` Validar blog con Chrome MCP
  - Screenshot de /blog (mobile, desktop)
  - Screenshot de post individual
  - Verificar legibilidad del contenido

- [ ] **[No iniciado]** `[P1][Test]` Tests de accesibilidad del blog
  - Navegación por teclado
  - Heading hierarchy en posts

---

# FASE 5: Integraciones y Funcionalidades 🔌

**Objetivo**: Integrar servicios externos y funcionalidades avanzadas
**Duración**: 3-4 días
**Progreso**: 0/18 (0%)

## Integración de Calendly

- [ ] **[No iniciado]** `[P0][Integration]` Crear cuenta en Calendly
  - Configurar evento "Consulta Inicial"
  - Obtener link de agendamiento

- [ ] **[No iniciado]** `[P0][Integration]` Integrar Calendly en CTAs principales
  - Hero CTA → Calendly popup o redirect
  - Services CTAs → Calendly
  - Contact section → Botón "Agendar Consulta"

- [ ] **[No iniciado]** `[P1][Integration]` Implementar Calendly inline widget
  - Componente CalendlyWidget.tsx
  - Opción: inline embed en página /agendar (opcional)

- [ ] **[No iniciado]** `[P1][Test]` Tests de integración Calendly
  - Verificar popup abre
  - Test E2E en staging

## Integración de Formulario → Email/CRM

- [ ] **[No iniciado]** `[P0][Integration]` Seleccionar servicio para formularios
  - Opciones: Resend, Formspree, Netlify Forms, Web3Forms
  - Decisión según hosting

- [ ] **[No iniciado]** `[P0][Integration][Logic]` Crear API endpoint para formulario
  - src/pages/api/contact.ts (si server mode) o
  - Integración directa con servicio
  - Validación server-side con Zod

- [ ] **[No iniciado]** `[P0][Logic][Test]` Conectar ContactForm con API endpoint
  - Submit POST request
  - Manejo de errores (toast o mensaje inline)
  - Success message
  - Tests de integración

- [ ] **[No iniciado]** `[P1][Integration]` Configurar notificaciones de formulario
  - Email a Facundo cuando llega un lead
  - Auto-respuesta al usuario (opcional)

- [ ] **[No iniciado]** `[P1][Test]` Test completo de formulario en staging
  - Submit real
  - Verificar email recibido

## Google Analytics 4

- [ ] **[No iniciado]** `[P0][Integration]` Crear cuenta Google Analytics 4
  - Property para el sitio
  - Obtener Measurement ID

- [ ] **[No iniciado]** `[P0][Integration]` Integrar GA4 en BaseLayout
  - Script tag en <head>
  - Astro integration o manual

- [ ] **[No iniciado]** `[P1][Integration]` Configurar eventos personalizados
  - CTA clicks
  - Form submissions
  - Calendly opens
  - Blog post views

- [ ] **[No iniciado]** `[P1][Integration]` Configurar conversiones en GA4
  - Lead form submission = conversión
  - Calendly appointment = conversión

## Newsletter Signup (Opcional)

- [ ] **[No iniciado]** `[P2][Integration]` Seleccionar servicio de email marketing
  - Mailchimp, ConvertKit, Buttondown, etc.

- [ ] **[No iniciado]** `[P2][UI][Integration]` Crear componente NewsletterSignup.tsx
  - Input email
  - CTA "Suscribirse"
  - Integración con API del servicio

- [ ] **[No iniciado]** `[P2][UI]` Agregar NewsletterSignup en footer y/o blog

## Optimizaciones de Assets

- [ ] **[No iniciado]** `[P1][Logic]` Implementar lazy loading de imágenes
  - Astro <Image /> component
  - loading="lazy" attribute

- [ ] **[No iniciado]** `[P1][Logic]` Optimizar imágenes a WebP
  - Astro Image optimization automática
  - Configurar en astro.config.mjs

- [ ] **[No iniciado]** `[P1][Logic]` Implementar responsive images (srcset, sizes)
  - Diferentes tamaños para mobile/desktop

---

# FASE 6: SEO y Performance 🔍

**Objetivo**: Optimizar SEO on-page y performance
**Duración**: 2-3 días
**Progreso**: 0/22 (0%)

## SEO On-Page

- [ ] **[No iniciado]** `[P0][SEO]` Optimizar meta tags de homepage
  - Title: "Facundo Zupel | Consultor de Organic Growth y Automatizaciones"
  - Description: 155 caracteres, incluir keywords
  - OG tags completos (og:title, og:description, og:image, og:url)
  - Twitter card

- [ ] **[No iniciado]** `[P0][SEO]` Crear OG image para homepage
  - Diseño: nombre + tagline
  - 1200x630px
  - Guardar en public/og-image.jpg

- [ ] **[No iniciado]** `[P0][SEO]` Implementar Schema Markup - Person
  - JSON-LD para Facundo Zupel
  - Incluir: name, jobTitle, url, sameAs (LinkedIn, etc.)

- [ ] **[No iniciado]** `[P0][SEO]` Implementar Schema Markup - Organization
  - JSON-LD para Data SEO Consultant (si aplica)

- [ ] **[No iniciado]** `[P1][SEO]` Implementar Schema Markup - Service
  - JSON-LD para cada servicio ofrecido

- [ ] **[No iniciado]** `[P0][SEO]` Generar sitemap.xml
  - Astro sitemap integration
  - Incluir homepage, blog, posts

- [ ] **[No iniciado]** `[P0][SEO]` Crear robots.txt
  - Allow all
  - Sitemap: URL del sitemap.xml

- [ ] **[No iniciado]** `[P0][SEO]` Configurar canonical URLs
  - En BaseLayout
  - En blog posts

- [ ] **[No iniciado]** `[P1][SEO]` Validar heading structure (H1-H6)
  - Solo un H1 por página
  - Jerarquía lógica
  - Incluir keywords naturalmente

- [ ] **[No iniciado]** `[P1][SEO]` Agregar alt text a todas las imágenes
  - Descriptivo y conciso
  - Incluir keywords cuando sea natural

- [ ] **[No iniciado]** `[P1][SEO]` Optimizar URLs
  - Limpias y descriptivas
  - Slugs en español (o inglés, según decisión)

- [ ] **[No iniciado]** `[P1][SEO]` Agregar internal linking
  - Links entre secciones del landing
  - Links de homepage → blog
  - Links entre posts (relacionados)

## Performance Optimization

- [ ] **[No iniciado]** `[P0][Logic]` Ejecutar Lighthouse audit inicial
  - Mobile y Desktop
  - Documentar scores baseline

- [ ] **[No iniciado]** `[P0][Logic]` Optimizar Core Web Vitals
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

- [ ] **[No iniciado]** `[P1][Logic]` Implementar preload para assets críticos
  - Fonts
  - Hero image

- [ ] **[No iniciado]** `[P1][Logic]` Implementar code splitting
  - Componentes pesados (Framer Motion, etc.)

- [ ] **[No iniciado]** `[P1][Logic]` Minificar y comprimir assets
  - CSS, JS minificados (Astro lo hace por defecto)
  - Gzip/Brotli compression (configurar en hosting)

- [ ] **[No iniciado]** `[P0][Logic]` Ejecutar Lighthouse audit final
  - Objetivo: Score > 90 en todas las categorías
  - Mobile: Performance, Accessibility, Best Practices, SEO
  - Desktop: Performance, Accessibility, Best Practices, SEO

- [ ] **[No iniciado]** `[P1][Test]` Validar HTML sin errores
  - W3C HTML validator
  - Corregir warnings/errores

- [ ] **[No iniciado]** `[P1][SEO]` Validar Schema Markup
  - Google Rich Results Test
  - Schema Markup Validator

- [ ] **[No iniciado]** `[P0][UX]` Validación final de performance con Chrome MCP
  - Performance trace
  - Analizar Core Web Vitals

---

# FASE 7: Testing Final y Deploy 🚀

**Objetivo**: Testing exhaustivo, corrección de bugs y deploy a producción
**Duración**: 2-3 días
**Progreso**: 0/25 (0%)

## Testing Cross-Browser

- [ ] **[No iniciado]** `[P0][Test]` Testing en Chrome (latest)
  - Desktop
  - Mobile (DevTools)

- [ ] **[No iniciado]** `[P0][Test]` Testing en Firefox (latest)
  - Desktop
  - Mobile

- [ ] **[No iniciado]** `[P0][Test]` Testing en Safari (latest)
  - Desktop (macOS)
  - Mobile (iOS)

- [ ] **[No iniciado]** `[P1][Test]` Testing en Edge (latest)
  - Desktop

## Testing en Dispositivos Reales

- [ ] **[No iniciado]** `[P0][Test][UX]` Testing en iPhone (iOS Safari)
  - Navegación
  - Formularios
  - CTAs
  - Screenshots con Chrome MCP (si es posible acceder)

- [ ] **[No iniciado]** `[P0][Test][UX]` Testing en Android (Chrome)
  - Navegación
  - Formularios
  - CTAs

- [ ] **[No iniciado]** `[P1][Test]` Testing en tablet (iPad o Android)
  - Layout en breakpoint tablet

## Accesibilidad

- [ ] **[No iniciado]** `[P0][Test]` Navegación completa por teclado
  - Tab a través de todos los elementos interactivos
  - Enter para activar links/buttons
  - Escape para cerrar modals/menus
  - Focus visible en todos los elementos

- [ ] **[No iniciado]** `[P1][Test]` Testing con screen reader
  - VoiceOver (macOS/iOS) o NVDA (Windows)
  - Verificar ARIA labels
  - Verificar heading structure

- [ ] **[No iniciado]** `[P1][Test]` Verificar contrast ratios
  - Todas las combinaciones de texto/fondo > 4.5:1
  - Usar herramienta como WebAIM Contrast Checker

## Validación de Funcionalidades

- [ ] **[No iniciado]** `[P0][Test]` Verificar todos los links (no 404s)
  - Internal links
  - External links (target="\_blank", rel="noopener")

- [ ] **[No iniciado]** `[P0][Test]` Verificar formulario ContactForm
  - Validación de campos
  - Submit exitoso
  - Mensajes de error/success

- [ ] **[No iniciado]** `[P0][Test]` Verificar integración Calendly
  - CTAs abren Calendly correctamente
  - Agendamiento funciona (test real)

- [ ] **[No iniciado]** `[P0][Test]` Verificar navegación smooth scroll
  - Clicks en nav links
  - Scroll suave a sección correcta
  - Active link highlighting

## Content Review

- [ ] **[No iniciado]** `[P0][Content]` Spell check de todo el contenido
  - Revisar typos
  - Gramática
  - Consistencia de tono

- [ ] **[No iniciado]** `[P1][Content]` Revisar que todo el placeholder content está reemplazado
  - Lorem ipsum
  - Fotos placeholder
  - Links dummy

## Deploy

- [ ] **[No iniciado]** `[P0][Setup]` Seleccionar y configurar hosting
  - Opción recomendada: Vercel
  - Conectar repo de GitHub

- [ ] **[No iniciado]** `[P0][Setup]` Configurar dominio
  - Comprar dominio (si no tiene)
  - Configurar DNS
  - Conectar dominio a hosting

- [ ] **[No iniciado]** `[P0][Setup]` Configurar SSL/HTTPS
  - Automático en Vercel/Netlify
  - Verificar certificado válido

- [ ] **[No iniciado]** `[P1][Setup]` Configurar CDN
  - Automático en Vercel/Netlify

- [ ] **[No iniciado]** `[P1][Setup]` Configurar redirects y error pages
  - 404 page custom
  - Redirects si hay URLs antiguas

- [ ] **[No iniciado]** `[P0][Setup]` Deploy a producción
  - Build de producción
  - Deploy
  - Verificar que el sitio está live

## Post-Deploy Verification

- [ ] **[No iniciado]** `[P0][Test]` Verificar sitio en producción
  - Homepage carga correctamente
  - Todas las secciones visibles
  - Blog funciona

- [ ] **[No iniciado]** `[P0][Test]` Test de formulario en producción
  - Submit real
  - Verificar email recibido

- [ ] **[No iniciado]** `[P0][Test]` Verificar Analytics funcionando
  - Pageviews registrados en GA4
  - Eventos personalizados

- [ ] **[No iniciado]** `[P0][Test]` Verificar Calendly en producción
  - Popup abre
  - Agendamiento funciona

- [ ] **[No iniciado]** `[P0][SEO]` Submit sitio a Google Search Console
  - Agregar propiedad
  - Verificar ownership
  - Submit sitemap.xml

---

# FASE 8: Optimización Continua 📈

**Objetivo**: Iterar basándose en métricas y feedback
**Duración**: Permanente (ongoing)
**Progreso**: 0/10 (0%)

## Semana 1 Post-Lanzamiento

- [ ] **[No iniciado]** `[P1][Analytics]` Configurar dashboards de métricas
  - GA4 dashboard
  - Google Search Console
  - Hosting analytics (Vercel/Netlify)

- [ ] **[No iniciado]** `[P1][Analytics]` Primera revisión de métricas
  - Visitantes únicos
  - Tasa de rebote
  - Time on page
  - Conversiones (formularios, Calendly)

## Optimización Continua

- [ ] **[No iniciado]** `[P2][Test]` A/B testing de CTAs
  - Diferentes textos de CTA
  - Diferentes colores
  - Diferentes posiciones
  - Herramienta: Google Optimize o similar

- [ ] **[No iniciado]** `[P2][Content]` Análisis de keywords y ajuste de copy
  - Revisar keywords que traen tráfico
  - Optimizar copy según search intent

- [ ] **[No iniciado]** `[P2][Content]` Crear nuevos posts de blog
  - Frecuencia: 1-2 mensuales
  - Basados en keywords research
  - Basados en preguntas de clientes

- [ ] **[No iniciado]** `[P2][Content]` Actualizar casos de éxito
  - Agregar nuevos testimonios
  - Actualizar métricas de resultados

- [ ] **[No iniciado]** `[P2][SEO]` Link building
  - Guest posts
  - Colaboraciones
  - Directorios de calidad

- [ ] **[No iniciado]** `[P2][Analytics]` Implementar heatmaps (opcional)
  - Hotjar, Microsoft Clarity, etc.
  - Analizar comportamiento de usuarios

- [ ] **[No iniciado]** `[P2][Analytics]` User testing
  - 5 usuarios reales navegando el sitio
  - Identificar puntos de fricción

- [ ] **[No iniciado]** `[P2][UI]` Iteraciones de diseño basadas en feedback
  - Ajustes de layout
  - Nuevas secciones si es necesario

- [ ] **[No iniciado]** `[P2][Feature]` Nuevas funcionalidades según necesidad
  - Calculadora ROI más avanzada
  - Case studies detallados
  - Webinars/workshops

---

# 🐛 BUGS / ISSUES

_(Sección para documentar bugs encontrados durante el desarrollo)_

_Formato:_

- [ ] **[Bug]** `[P0/P1/P2]` Descripción del bug
  - Pasos para reproducir
  - Comportamiento esperado vs actual
  - Ambiente (mobile/desktop, navegador)

---

# ✅ DONE LOG

_(Mover tareas completadas aquí periódicamente para mantener tasks.md limpio)_

## 2025-10-24

### Documentación (Mañana)

- [x] **[Completado y testeado]** Crear PRD.md
- [x] **[Completado y testeado]** Crear claude.md
- [x] **[Completado y testeado]** Crear planning.md
- [x] **[Completado y testeado]** Crear tasks.md

### Setup Inicial (Tarde - 14:00-14:25) ✅ FASE 0 COMPLETADA

- [x] **[Completado y testeado]** Inicializar proyecto Astro + React + TypeScript
- [x] **[Completado y testeado]** Instalar y configurar TailwindCSS v4
- [x] **[Completado y testeado]** Configurar Vitest para tests unitarios (coverage 80%)
- [x] **[Completado y testeado]** Configurar React Testing Library
- [x] **[Completado y testeado]** Crear estructura de carpetas completa (src/, tests/)
- [x] **[Completado y testeado]** Crear componente Button.tsx con tests (5 tests pasando)
- [x] **[Completado y testeado]** Dev server funcionando en http://localhost:4321/
- [x] **[Completado y testeado]** Validación con Chrome MCP (desktop + mobile screenshots)
- [x] **[Completado y testeado]** Configurar ESLint con Astro/React/A11y plugins
- [x] **[Completado y testeado]** Configurar Prettier + integración con ESLint
- [x] **[Decisión]** Chrome MCP en lugar de Playwright para E2E/validación UX

---

**Fin del Tasks Document**

> **Recordatorio**: Este archivo debe ser actualizado en tiempo real a medida que trabajas en las tareas. Cambiar estados de tareas es tan importante como completarlas.
