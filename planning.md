# Planning - Landing Page Organic Growth

## Facundo Zupel - Consultor de Organic Growth y Automatizaciones

---

**Última actualización**: 2025-10-24
**Fase actual**: Fase 0 - Setup Inicial
**Progreso general**: 0%

---

## 📋 Índice

1. [Visión General](#visión-general)
2. [Objetivos del Proyecto](#objetivos-del-proyecto)
3. [Fases del Proyecto](#fases-del-proyecto)
4. [Stack Tecnológico](#stack-tecnológico)
5. [Metodología de Trabajo](#metodología-de-trabajo)
6. [Métricas de Éxito](#métricas-de-éxito)
7. [Tracking de Progreso](#tracking-de-progreso)
8. [Decisiones Importantes](#decisiones-importantes)
9. [Riesgos y Dependencias](#riesgos-y-dependencias)

---

## 🎯 Visión General

### Propósito

Crear una landing page profesional que posicione a Facundo Zupel como consultor experto en Organic Growth y Automatizaciones, generando leads cualificados de empresarios y directores que buscan escalar sus negocios de forma eficiente.

### Audiencia Objetivo

- **Primaria**: Empresarios y dueños de negocios (PYMEs y startups)
- **Secundaria**: Directores de Marketing y Growth
- **Perfil ideal**: Buscan ahorrar tiempo/dinero y aumentar ROI sin inversión publicitaria

### Propuesta de Valor Central

"Escala tu negocio sin aumentar tu presupuesto publicitario"

---

## 🎯 Objetivos del Proyecto

### Objetivos de Negocio

- ✅ **[P0] Primario**: Generar 10+ leads cualificados mensuales
- ✅ **[P0] Secundario**: Posicionar a Facundo Zupel como referente en Organic Growth
- ✅ **[P1] Terciario**: Educar al mercado sobre crecimiento orgánico

### Objetivos Técnicos

- ✅ **Performance**: Lighthouse score > 90
- ✅ **SEO**: Posicionamiento en keywords clave
- ✅ **Conversión**: Tasa de conversión > 3%
- ✅ **UX**: Tiempo en página > 2 minutos, rebote < 60%

### Objetivos de Usuario

- Entender qué es Organic Growth en < 30 segundos
- Identificar si el servicio aplica a su negocio
- Contactar fácilmente (1-click para agendar consulta)

---

## 📅 Fases del Proyecto

### **Fase 0: Setup Inicial** ⚡ [EN CURSO]

**Duración estimada**: 2-3 días
**Objetivo**: Configurar proyecto, tooling y estructura base

**Entregables**:

- [x] PRD.md documentado
- [x] claude.md con instrucciones
- [x] planning.md creado
- [x] tasks.md inicial
- [ ] Proyecto Astro + React inicializado
- [ ] Testing setup (Vitest + Playwright)
- [ ] TailwindCSS configurado
- [ ] Estructura de carpetas completa
- [ ] CI/CD básico (linting, tests)

**Criterio de completitud**: Dev server corriendo, tests funcionando, primer commit realizado

---

### **Fase 1: Fundamentos y Layout Base** 🏗️

**Duración estimada**: 1 semana
**Objetivo**: Crear estructura base, layout y componentes fundamentales

**Entregables**:

- [ ] BaseLayout con Header y Footer
- [ ] Navegación funcional (smooth scroll)
- [ ] Sistema de diseño base (colores, tipografía, spacing)
- [ ] Componentes UI reutilizables (Button, Card, Container)
- [ ] Responsive breakpoints configurados
- [ ] Tests unitarios de componentes base

**Criterio de completitud**:

- Layout renderiza correctamente en mobile/tablet/desktop
- Tests de componentes base pasando (coverage > 80%)
- UX validada con Chrome MCP

---

### **Fase 2: Secciones del Landing (Parte 1)** 🎨

**Duración estimada**: 1-1.5 semanas
**Objetivo**: Implementar secciones principales del landing page

**Secciones incluidas**:

1. ✅ Hero Section
   - Headline + subheadline
   - CTA principal
   - Hero image/visual

2. ✅ Sobre Mí (About)
   - Biografía profesional
   - Foto profesional
   - Credenciales

3. ✅ ¿Qué es Organic Growth?
   - Definición clara
   - 6 áreas de aplicación (iconos)
   - Beneficios medibles

4. ✅ Automatizaciones Empresariales
   - Definición
   - Procesos automatizables
   - Calculadora interactiva (opcional MVP)

**Criterio de completitud**:

- 4 secciones renderizando correctamente
- Responsive en todos los breakpoints
- Tests E2E pasando
- Content validado por usuario

---

### **Fase 3: Secciones del Landing (Parte 2)** 🚀

**Duración estimada**: 1 semana
**Objetivo**: Completar secciones restantes y funcionalidades interactivas

**Secciones incluidas**: 5. ✅ Cómo Puedo Ayudarte (Servicios)

- 4 cards de servicios
- CTAs individuales

6. ✅ Ideal Para
   - Checklist interactivo
   - Auto-identificación de usuario

7. ✅ Proceso de Trabajo
   - Timeline visual (4 pasos)
   - Iconografía clara

8. ✅ Resultados / Casos de Éxito
   - Testimonios (placeholder si no disponibles)
   - Métricas destacadas

9. ✅ FAQ
   - 6 preguntas mínimo
   - Accordion interactivo

10. ✅ CTA Final / Contacto
    - Formulario de contacto
    - Validación inline
    - Links a redes sociales

**Criterio de completitud**:

- Landing page completo (todas las secciones)
- Formulario funcional con validación
- Interacciones testeadas (accordion, calculadora, etc.)

---

### **Fase 4: Blog y Content Collections** 📝

**Duración estimada**: 4-5 días
**Objetivo**: Implementar sección de blog con Astro Content Collections

**Entregables**:

- [ ] Content Collections configurado
- [ ] Página /blog (listado de posts)
- [ ] Página /blog/[slug] (post individual)
- [ ] Componentes de blog (BlogCard, BlogPost, BlogList)
- [ ] Sistema de tags/categorías
- [ ] 3 posts de ejemplo (markdown)
- [ ] SEO por post (meta tags, OG images)
- [ ] Navegación blog ↔ landing

**Criterio de completitud**:

- Blog funcional con al menos 3 posts
- Navegación fluida
- SEO optimizado por post
- RSS feed generado (opcional)

---

### **Fase 5: Integraciones y Funcionalidades** 🔌

**Duración estimada**: 3-4 días
**Objetivo**: Integrar servicios externos y funcionalidades avanzadas

**Integraciones**:

- [ ] Calendly (agendamiento de consultas)
- [ ] Formulario → Email/CRM (Resend, Mailchimp, o similar)
- [ ] Google Analytics 4
- [ ] WhatsApp Business link (opcional)
- [ ] Newsletter signup

**Funcionalidades**:

- [ ] Dark mode (opcional)
- [ ] Animaciones con Framer Motion
- [ ] Lazy loading de imágenes
- [ ] Optimización de assets

**Criterio de completitud**:

- Todas las integraciones funcionando en producción
- Analytics capturando eventos correctamente
- Performance no degradado

---

### **Fase 6: SEO y Performance** 🔍

**Duración estimada**: 2-3 días
**Objetivo**: Optimizar SEO on-page y performance

**Tareas SEO**:

- [ ] Meta tags optimizados (title, description, OG)
- [ ] Schema markup (Person, Organization, Service)
- [ ] Sitemap.xml generado
- [ ] Robots.txt configurado
- [ ] Canonical URLs
- [ ] Alt text en todas las imágenes
- [ ] Heading structure (H1-H6) validada

**Tareas Performance**:

- [ ] Lighthouse audit (score > 90 en todas las categorías)
- [ ] Imágenes optimizadas (WebP, sizes, srcset)
- [ ] Code splitting
- [ ] Preload critical assets
- [ ] Minificación y compresión

**Criterio de completitud**:

- Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- Validación HTML sin errores
- Schema markup validado (Google Rich Results Test)

---

### **Fase 7: Testing Final y Deploy** 🚀

**Duración estimada**: 2-3 días
**Objetivo**: Testing exhaustivo, corrección de bugs y deploy a producción

**Testing**:

- [ ] Pruebas en múltiples navegadores (Chrome, Firefox, Safari)
- [ ] Pruebas en múltiples dispositivos (móvil, tablet, desktop)
- [ ] Tests de accesibilidad (teclado, screen readers)
- [ ] Validación de formularios
- [ ] Verificación de links
- [ ] Spell check de todo el contenido

**Deploy**:

- [ ] Configurar hosting (Vercel, Netlify, o similar)
- [ ] Configurar dominio
- [ ] SSL/HTTPS
- [ ] CDN configurado
- [ ] Configurar redirects y error pages
- [ ] Backup de contenido

**Post-Deploy**:

- [ ] Verificar Analytics funcionando
- [ ] Test de formulario en producción
- [ ] Verificar integraciones (Calendly, etc.)
- [ ] Submit a Google Search Console

**Criterio de completitud**:

- Sitio live en producción
- Todas las funcionalidades verificadas en prod
- Dominio configurado correctamente
- Analytics capturando datos

---

### **Fase 8: Optimización Continua** 📈 [ONGOING]

**Duración**: Permanente
**Objetivo**: Iterar basándose en métricas y feedback

**Actividades recurrentes**:

- [ ] A/B testing de CTAs
- [ ] Análisis de métricas semanales
- [ ] Ajustes de copy basados en conversión
- [ ] Nuevos posts de blog (1-2 mensuales)
- [ ] Actualización de casos de éxito
- [ ] Optimización de keywords

---

## 🛠️ Stack Tecnológico

### Core

- **Framework**: Astro 4.x (generación estática + islands)
- **UI Library**: React 18+ (componentes interactivos)
- **Styling**: TailwindCSS 3.x
- **Language**: TypeScript

### Testing

- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: Playwright
- **Visual Testing**: Chrome MCP

### Tooling

- **Package Manager**: npm o pnpm
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **CI/CD**: GitHub Actions (básico)

### Dependencias Clave

```json
{
  "astro": "^4.0.0",
  "react": "^18.0.0",
  "tailwindcss": "^3.0.0",
  "framer-motion": "^11.0.0",
  "react-hook-form": "^7.0.0",
  "zod": "^3.0.0",
  "lucide-react": "latest"
}
```

### Hosting y Servicios

- **Hosting**: Vercel (primera opción) o Netlify
- **Analytics**: Google Analytics 4
- **Formularios**: Resend o Formspree
- **Agendamiento**: Calendly
- **Email**: Mailchimp o ConvertKit (futuro)

---

## ⚙️ Metodología de Trabajo

### Workflow General

```
1. Leer planning.md (inicio de sesión)
2. Revisar tasks.md (antes de cada tarea)
3. Seleccionar próxima tarea [No iniciado]
4. Marcar como [Iniciado]
5. TDD Cycle:
   - Red: Escribir test que falla
   - Green: Implementar código mínimo
   - Refactor: Limpiar y optimizar
6. Marcar como [En testeo]
7. Validar con Chrome MCP (UX visual)
8. Marcar como [Completado y testeado]
9. Actualizar planning.md si es milestone
10. Commit y push
```

### Principios de Desarrollo

#### Test-Driven Development (TDD)

- ✅ **Obligatorio** para cada feature
- Tests unitarios con Vitest
- Tests E2E con Playwright
- Coverage mínimo: 80%

#### UX-First Development

- Validar visualmente con Chrome MCP después de cada implementación
- Mobile-first approach
- Accesibilidad desde el inicio (WCAG 2.1 AA)

#### Documentación Continua

- Actualizar `tasks.md` en tiempo real
- Documentar decisiones importantes en `planning.md`
- Comentarios en código solo cuando sea necesario

---

## 📊 Métricas de Éxito

### Durante Desarrollo

| Métrica                  | Objetivo          | Herramienta     |
| ------------------------ | ----------------- | --------------- |
| Test Coverage            | > 80%             | Vitest          |
| Lighthouse Performance   | > 90              | Chrome DevTools |
| Lighthouse Accessibility | > 90              | Chrome DevTools |
| Build Time               | < 30s             | Astro           |
| Bundle Size              | < 100KB (initial) | Bundlesize      |

### Post-Lanzamiento

#### Corto Plazo (0-3 meses)

- **Visitantes únicos**: 500+ mensuales
- **Tasa de conversión**: > 3%
- **Tiempo en página**: > 2 minutos
- **Tasa de rebote**: < 60%

#### Mediano Plazo (3-6 meses)

- **Leads cualificados**: 10+ mensuales
- **Consultas agendadas**: 5+ mensuales
- **Keywords ranking**: Top 10 en 5+ keywords
- **Backlinks**: 10+ de calidad

#### Largo Plazo (6-12 meses)

- **Autoridad de dominio**: DA > 20
- **Tráfico orgánico**: 80% del tráfico total
- **Tasa de cierre**: > 20% de consultas
- **LTV**: Definir después de 3 clientes

---

## 📈 Tracking de Progreso

### Por Fase

| Fase                 | Estado        | Progreso | Inicio     | Fin Estimado | Fin Real   |
| -------------------- | ------------- | -------- | ---------- | ------------ | ---------- |
| 0. Setup Inicial     | 🟢 Completado | 100%     | 2025-10-24 | 2025-10-27   | 2025-10-24 |
| 1. Fundamentos       | 🟢 Completado | 100%     | 2025-10-24 | 2025-10-31   | 2025-10-24 |
| 2. Secciones Parte 1 | ⚪ Pendiente  | 0%       | -          | -            | -          |
| 3. Secciones Parte 2 | ⚪ Pendiente  | 0%       | -          | -            | -          |
| 4. Blog              | ⚪ Pendiente  | 0%       | -          | -            | -          |
| 5. Integraciones     | ⚪ Pendiente  | 0%       | -          | -            | -          |
| 6. SEO y Performance | ⚪ Pendiente  | 0%       | -          | -            | -          |
| 7. Deploy            | ⚪ Pendiente  | 0%       | -          | -            | -          |
| 8. Optimización      | ⚪ Pendiente  | 0%       | -          | -            | -          |

**Leyenda**:

- 🟢 Completado
- 🟡 En curso
- ⚪ Pendiente
- 🔴 Bloqueado

### Progreso General del Proyecto

**Tareas Totales**: 150+ (estimado)
**Tareas Completadas**: 31/150
**Progreso**: ~21%

**Fecha de Inicio**: 2025-10-24
**Fecha Estimada de Lanzamiento**: 2025-12-15 (7-8 semanas)
**Velocidad**: ⚡ Fase 0 y Fase 1 completadas en 1 día (ritmo excelente)

---

## 📝 Decisiones Importantes

### Decisiones Técnicas

| Fecha      | Decisión                                      | Razón                                            | Impacto                    |
| ---------- | --------------------------------------------- | ------------------------------------------------ | -------------------------- |
| 2025-10-24 | Astro + React (no Next.js)                    | Mejor performance estática, islands architecture | Alto - Estructura completa |
| 2025-10-24 | TailwindCSS (no CSS-in-JS)                    | Velocidad de desarrollo, DX, tamaño bundle       | Medio                      |
| 2025-10-24 | Vitest (no Jest)                              | Mejor integración con Vite, más rápido           | Bajo                       |
| 2025-10-24 | Chrome MCP (no Playwright)                    | Mejor para validación UX/UI visual, screenshots  | Medio - Workflow más simple |
| 2025-10-24 | ESLint flat config + Prettier                 | Mejores prácticas, consistencia de código        | Bajo - Calidad de código   |
| 2025-10-28 | Blog dinámico con API (no Content Collections) | Flexibilidad para crear contenido vía POST API, SSR en VPS | Alto - Cambio arquitectura |
| 2025-10-28 | Almacenamiento JSON Files (no BD externa)     | Simplicidad, sin dependencias externas, fácil backup | Medio - Escalabilidad limitada |
| 2025-10-28 | Autenticación JWT (no API key simple)         | Mayor seguridad, escalable, estándar industria   | Medio - Autenticación robusta |

### Decisiones de Diseño/UX

| Fecha | Decisión                             | Razón                                | Stakeholder |
| ----- | ------------------------------------ | ------------------------------------ | ----------- |
| -     | Single-page layout con blog separado | Mejor UX para landing, SEO para blog | Facundo     |
| -     | Mobile-first approach                | 60%+ tráfico esperado desde móvil    | Facundo     |
| -     | [Pendiente] Paleta de colores        | -                                    | Facundo     |
| -     | [Pendiente] Tipografía principal     | -                                    | Facundo     |

### Decisiones de Contenido

| Fecha | Decisión                                          | Razón                         |
| ----- | ------------------------------------------------- | ----------------------------- |
| -     | [Pendiente] Copy del Hero                         | Requiere revisión de Facundo  |
| -     | [Pendiente] Casos de éxito reales vs placeholders | Disponibilidad de testimonios |
| -     | [Pendiente] Frecuencia de blog posts              | Capacidad de producción       |

---

## ⚠️ Riesgos y Dependencias

### Riesgos Identificados

| Riesgo                                               | Probabilidad | Impacto | Mitigación                                                          | Estado       |
| ---------------------------------------------------- | ------------ | ------- | ------------------------------------------------------------------- | ------------ |
| Contenido (copy, fotos) no disponible a tiempo       | Media        | Alto    | Usar placeholders realistas, continuar desarrollo                   | Monitoreando |
| No hay casos de éxito/testimonios reales             | Alta         | Medio   | Diseñar con placeholders, enfatizar otros diferenciadores           | Aceptado     |
| Integraciones (Calendly, email) fallen en producción | Baja         | Alto    | Tests exhaustivos en staging, fallback manual                       | Mitigado     |
| Performance degradado por animaciones                | Media        | Medio   | Lazy load, reducir motion en preferencias de usuario                | Mitigado     |
| SEO: keywords muy competitivas                       | Alta         | Medio   | Long-tail keywords, contenido de calidad, estrategia de largo plazo | Aceptado     |

### Dependencias Externas

| Dependencia  | Proveedor          | Criticidad | Estado       | Backup                      |
| ------------ | ------------------ | ---------- | ------------ | --------------------------- |
| Hosting      | Vercel/Netlify     | Alta       | ⚪ Pendiente | Ambos son viables           |
| Analytics    | Google Analytics 4 | Media      | ⚪ Pendiente | Plausible (privacy-focused) |
| Formularios  | Resend/Formspree   | Alta       | ⚪ Pendiente | Email directo como fallback |
| Agendamiento | Calendly           | Media      | ⚪ Pendiente | Formulario manual           |
| Dominio      | -                  | Alta       | ⚪ Pendiente | -                           |

### Dependencias Internas (Assets)

| Asset                       | Responsable       | Deadline          | Estado       |
| --------------------------- | ----------------- | ----------------- | ------------ |
| Foto profesional de Facundo | Facundo           | Antes de Fase 2   | ⚪ Pendiente |
| Logo (si aplica)            | Facundo/Diseñador | Antes de Fase 1   | ⚪ Pendiente |
| Copy del Hero               | Facundo           | Antes de Fase 2   | ⚪ Pendiente |
| Copy completo de secciones  | Facundo           | Antes de Fase 2-3 | ⚪ Pendiente |
| Testimonios reales          | Facundo           | Nice-to-have      | ⚪ Pendiente |

---

## 🔄 Changelog del Planning

### 2025-10-24

#### Mañana
- ✅ Creación inicial del planning.md
- ✅ Definición de 8 fases del proyecto
- ✅ Stack tecnológico definido
- ✅ Metodología TDD establecida
- ✅ Métricas de éxito documentadas

#### Tarde (14:00-14:25)
- ✅ **FASE 0 COMPLETADA** - Setup inicial 100%
- ✅ Proyecto Astro + React + TypeScript inicializado
- ✅ TailwindCSS v4 configurado
- ✅ Vitest + React Testing Library configurados (7 tests pasando)
- ✅ ESLint + Prettier configurados e integrados
- ✅ Estructura de carpetas completa creada
- ✅ Dev server funcionando en http://localhost:4321/
- ✅ Validación con Chrome MCP (desktop + mobile)
- ✅ Decisión: Chrome MCP en lugar de Playwright
- ✅ Inicio de FASE 1 - Fundamentos y Layout Base

#### Noche (20:30-20:37)
- ✅ **FASE 1 COMPLETADA** - Fundamentos y Layout Base 100%
- ✅ Path aliases (@/) configurados en tsconfig, astro y vitest (7 tests nuevos)
- ✅ Tests de accesibilidad creados (13 tests WCAG 2.1 AA)
- ✅ Header mejorado con ARIA labels (aria-label, aria-controls, aria-expanded)
- ✅ Guía de estilos completa creada (docs/style-guide.md)
- ✅ Total: 54 tests pasando (100% success rate)
- ✅ Progreso del proyecto: 31/150 tareas (21%)
- ✅ Velocidad: ⚡ Fase 0 y Fase 1 completadas en 1 día

### 2025-10-28

#### Cambio Estratégico - Blog Dinámico
- 🔄 **CAMBIO ARQUITECTÓNICO IMPORTANTE**: Migración de Content Collections a blog dinámico
- ✅ Decisión: Blog con API backend para generación de artículos vía POST
- ✅ Decisión: Almacenamiento en JSON Files (simplicidad, sin dependencias)
- ✅ Decisión: Autenticación JWT con usuario/password (seguridad robusta)
- ✅ Decisión: Habilitar SSR en Astro (output: 'server') para correr en VPS
- 🎯 Objetivo: Permitir crear artículos dinámicamente desde URL backend
- 📋 Stack: Astro SSR + JWT auth + JSON storage + Zod validation

### 2025-10-29

#### Mejoras UX y Contenido
- ✅ **Simplificación de Services360**: Componente rediseñado sin interactividad compleja
  - Eliminado: useState, clicks, hover effects, animaciones, descripciones colapsables
  - Mantenido: Colores originales (primary, accent, success, gold), layout responsive, todo el contenido visible
  - Resultado: Diseño más simple y directo, mejor legibilidad, sin necesidad de interacción
- ✅ **WorkflowProcess implementado**: Nueva sección con tabla profesional del proceso de trabajo
  - 3 fases: Reunión inicial, Auditoría general, Roadmap estratégico
  - Tabla responsive con header azul, filas alternadas, badges numerados, emojis grandes
  - Enfoque en resultados medibles y rentabilidad pronta
  - Validado en desktop (1280px) y mobile (375px) con Chrome MCP
- ✅ Integración completa en index.astro
- ✅ Validaciones visuales exitosas (desktop + mobile)

---

## 🚀 Próximos Pasos Inmediatos

### ✅ Esta Semana (Fase 0) - COMPLETADA

1. ✅ Finalizar tasks.md con todas las tareas detalladas
2. ✅ Inicializar proyecto Astro + React
3. ✅ Configurar TailwindCSS
4. ✅ Setup testing (Vitest + Chrome MCP)
5. ✅ Crear estructura de carpetas
6. ✅ Configurar ESLint + Prettier

### ✅ Fase 1 - COMPLETADA

1. ✅ Definir paleta de colores y tipografía
2. ✅ Implementar BaseLayout.astro
3. ✅ Crear componentes UI base (Button, Card, Container, Section, Heading)
4. ✅ Implementar Header con navegación (desktop + mobile)
5. ✅ Implementar Footer
6. ✅ Tests de componentes base (54 tests pasando)
7. ✅ Path aliases configurados
8. ✅ Tests de accesibilidad (WCAG 2.1 AA)
9. ✅ Guía de estilos completa

### 🎯 Próxima Fase (Fase 2) - Secciones del Landing (Parte 1)

**Bloqueador de Contenido**: Necesitamos contenido antes de continuar con Fase 2:

1. ⚠️ Copy del Hero (headline, subheadline, CTA)
2. ⚠️ Foto profesional de Facundo
3. ⚠️ Biografía profesional
4. ⚠️ Copy de secciones (Organic Growth, Automatizaciones)

**Opciones**:
- **Opción A**: Proveer contenido ahora y continuar con Fase 2
- **Opción B**: Usar placeholders y reemplazar después
- **Opción C**: Trabajar en otra área (ej: setup de blog, optimizaciones)

### ⚠️ Bloqueadores Actuales

- ✅ ~~Content [P0]: Necesitamos definir paleta de colores y tipografía~~ **RESUELTO**
- ⚠️ **Content [P0]**: Copy del Hero, biografía, y secciones principales (para Fase 2)
- ⚠️ **Assets [P1]**: Foto profesional de Facundo pendiente (para Fase 2)

---

## 📞 Contacto y Comunicación

**Stakeholder Principal**: Facundo Zupel
**Desarrollador**: Claude (Agente Orquestador)
**Subagentes**: layout-agent, ux-chrome-inspector

**Frecuencia de Updates**: Diaria (al completar cada fase)
**Método de Comunicación**: Este archivo (planning.md) + tasks.md

---

**Fin del Planning Document**

> **Recordatorio**: Leer este archivo al inicio de cada sesión. Actualizar progreso y decisiones en tiempo real.
