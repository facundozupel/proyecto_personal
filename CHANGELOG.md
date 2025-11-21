# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [Unreleased]

---

## [0.4.0] - 2025-11-21

### 🏗️ Blog & CMS - Migración a Arquitectura Simplificada

#### Añadido
- **Blog API (Astro API Routes)**
  - Endpoints REST integrados en el proyecto Astro:
    - `POST /api/admin/posts` - Crear nuevo post
    - `GET /api/admin/posts` - Listar todos los posts
    - `GET /api/admin/posts/{slug}` - Obtener post específico
    - `PUT /api/admin/posts/{slug}` - Actualizar post existente
    - `DELETE /api/admin/posts/{slug}` - Eliminar post
  - Autenticación HTTP Basic Auth (usuario: admin, password: ADMIN_PASSWORD)
  - Storage en filesystem: `src/content/blog/*.md`
  - Validación con Zod para todos los endpoints
  - Generación automática de slugs a partir del título
  - Persistencia real: sobrevive restarts, versionado con Git

- **Panel de Administración Web**
  - Dashboard en `/admin` con estadísticas:
    - Total de posts
    - Posts publicados
    - Borradores
  - Tabla de posts con acciones: Ver, Editar, Eliminar
  - Formulario de creación en `/admin/posts/new`
  - Formulario de edición en `/admin/posts/[slug]/edit`
  - Confirmación doble para eliminación de posts

- **Editor Markdown Personalizado**
  - `MarkdownEditor.tsx`: Editor custom sin dependencias externas
  - 13 botones de toolbar:
    - Headings: H1, H2, H3
    - Formato: Negrita, Cursiva
    - Listas: Bullets, Numeradas
    - Otros: Citas, Código inline, Bloques de código, Links, Imágenes, Línea horizontal
  - Tabs: Editar / Preview
  - Live preview con renderizado Markdown → HTML
  - Gestión de posición del cursor para mejor UX

- **Componente PostForm Reutilizable**
  - Formulario para crear y editar posts
  - Validación inline (título, descripción, contenido requeridos)
  - Contador de caracteres para descripción (SEO: óptimo 160 chars)
  - Input de tags con separación por comas
  - Checkbox de borrador (draft)
  - Valores por defecto: autor "Facundo Zupel"

- **AdminLayout**
  - Layout consistente para todas las páginas de admin
  - Header sticky con navegación
  - Links: Posts, Nuevo Post
  - Diseño responsive con TailwindCSS

#### Modificado
- **BlogCard.tsx**
  - Soporte dual para campos `date` (Content Collections) y `publishedAt` (Article)
  - Fix: RangeError al renderizar fechas
  - Compatibilidad con ambas fuentes de datos

- **blog/[slug].astro**
  - Cambio de SSG a SSR pattern
  - Eliminado `getStaticPaths` (incompatible con SSR mode)
  - Carga dinámica con `getEntry` de Astro Content Collections
  - Redirección a 404 si post no existe o está en draft

#### Eliminado
- **CMS Service (FastAPI)**
  - Eliminado microservicio independiente `cms-service/`
  - Eliminados archivos:
    - `cms-service/app/main.py`
    - `cms-service/requirements.txt`
    - `cms-service/Dockerfile`
    - `cms-service/Dockerfile.production`
    - `cms-service/README.md`
  - Eliminado script `deploy-cms.sh`
  - Eliminado `docker-stack-cms.yml`

- **Documentación Obsoleta**
  - `API_TESTING.md` (reemplazado por API_BLOG_GUIDE.md)
  - `CRO_IMPROVEMENTS.md` (migrado a CLAUDE.md)
  - `DEPLOYMENT.md`, `DEPLOYMENT_CHECKLIST.md`, `DEPLOYMENT_FACUNDOGROWTH.md`
  - `DEPLOY_DOCKER.md`, `DEPLOY_PLAN.md`
  - `DOCKER_DEPLOYMENT_SUMMARY.md`, `DOCKER_QUICKREF.md`
  - `QUICKSTART-VPS.md`, `README.docker.md`
  - `inspiracion.md` (contenido integrado en planning.md)

#### Arquitectura
- **Simplificación**: De microservicios a monolito modular
  - Antes: Frontend (Astro) + CMS Service (FastAPI) + Lead Service (FastAPI)
  - Ahora: Frontend (Astro) con API Routes integradas
- **Beneficios**:
  - Menos complejidad de deployment
  - Menor latencia (sin llamadas HTTP entre servicios)
  - Deployment unificado en Vercel/Netlify
  - Storage en Git (versionado automático)
  - Sin necesidad de base de datos externa

#### Documentación
- **API_BLOG_GUIDE.md**: Documentación completa de la Blog API
  - Todos los endpoints con ejemplos cURL
  - Formato de requests y responses
  - Guía de autenticación
  - Estructura de archivos `.md` generados

### 🎯 UX & Conversión

#### Modificado
- **Contact Modal**
  - Eliminada mención de tiempo de respuesta "24 horas"
  - Nuevo mensaje: "Te responderé pronto por email"
  - Mensaje de éxito más neutral: "Gracias por tu interés"
  - Recordatorio para revisar email (incluso spam)

- **Webhook Integration**
  - Cambiado endpoint a: `https://hooksnochon.facundo.click/webhook/contacto-perso`
  - Eliminada integración con Lead Service local (ya no se usa)
  - Simplificada lógica de envío: solo webhook externo

- **Calculadora de Rentabilidad**
  - Eliminado selector de "Canal de tráfico"
  - Agregado párrafo explicativo sobre el propósito del ejercicio
  - Simplificada interfaz: solo 2 métricas necesarias (tráfico y ganancia)
  - Mensaje más claro: "visión genérica e hipotética" del impacto

---

## [0.3.0] - 2025-11-03

### 🎯 CRO & Conversión

#### Añadido
- **Sistema de Contact Modal Multi-Step**
  - Paso 1: Selección de interés (6 opciones con emojis: SEO Local, Automatización, Email Marketing, SEO Técnico, Contenido RRSS, No estoy seguro)
  - Paso 2: Captura de datos (nombre, email, empresa, mensaje)
  - Paso 3: Confirmación de éxito
  - Progressive disclosure pattern para reducir fricción
  - Animaciones suaves con CSS keyframes

- **Sticky Contact Button**
  - Botón flotante que aparece después de 300px de scroll
  - Indicador visual pulsante para llamar la atención
  - Gradiente accent (naranja) para máximo contraste
  - Fixed position con z-index 50

- **Contact Trigger System**
  - Componente invisible que escucha eventos globales
  - Atributo `data-open-contact` para conectar cualquier elemento
  - Event delegation pattern para performance

- **Conexión de Todos los CTAs**
  - Header "Agendar Consulta" (desktop + mobile)
  - Hero "Agendar Consulta Gratuita"
  - Sección final "Contactar Ahora"
  - Todos abren el mismo modal con consistencia UX

#### Modificado
- Convertidos `<a>` tags a `<button>` en CTAs para mejor semántica y accesibilidad
- Agregado `cursor-pointer` a todos los botones de contacto
- Mejorado hover states con `hover:scale-105` y shadows

#### Backend
- **Integración Dual de APIs**
  - Envío simultáneo a Lead Service local (http://localhost:8002/api/leads)
  - Envío a webhook externo (https://nochon.facundo.click/webhook-test/contacto-perso)
  - Error tolerance: continúa si uno de los dos falla
  - Formato de datos adaptado para cada endpoint

---

## [0.2.0] - 2025-11-02

### 🏗️ Arquitectura de Microservicios

#### Añadido
- **Lead Service (FastAPI)**
  - Endpoint POST `/api/leads` para captura de leads
  - Modelo de datos: name, email, company, message, interest, status
  - Base de datos SQLite para almacenamiento local
  - CORS configurado para desarrollo
  - Puerto: 8002

- **CMS Service (FastAPI)**
  - Endpoint GET `/api/posts` para listado de posts
  - Endpoint GET `/api/posts/{slug}` para post individual
  - Endpoint POST `/api/admin/posts` para creación de posts
  - Autenticación básica con password
  - Base de datos SQLite para blog posts
  - Puerto: 8001

- **Docker Compose Setup**
  - `docker-compose.yml` con servicios frontend, lead-service, cms-service
  - Networks configuradas para comunicación entre servicios
  - Volumes para persistencia de datos
  - Health checks configurados

- **Documentación**
  - `MICROSERVICES_SUMMARY.md`: Arquitectura y decisiones técnicas
  - `MIGRATION_GUIDE.md`: Guía de migración de monolito a microservicios
  - `README.microservices.md`: Instrucciones de uso
  - `start-dev.sh`: Script para levantar todos los servicios

#### Modificado
- Separación de responsabilidades: Frontend (Astro), Leads (FastAPI), CMS (FastAPI)
- Configuración de API endpoints centralizada en `src/config/api.ts`
- Environment variables para URLs de microservicios

---

## [0.1.0] - 2025-10-24

### 🎨 Landing Page Inicial

#### Añadido
- **Homepage Completa**
  - Hero section con imagen profesional
  - Sección "Sobre Mí" (placeholder)
  - Services section con 3 servicios principales
  - Services 360 with AI (nueva sección interactiva)
  - Workflow Process section
  - Profitability Calculator (calculadora interactiva)
  - Sección de contacto final

- **Sistema de Blog**
  - Listado de posts con paginación
  - Vista individual de post con layout BlogPostLayout
  - Astro Content Collections para gestión de contenido
  - Markdown rendering con estilos tipográficos

- **Componentes Reutilizables**
  - `Header.tsx`: Navegación sticky con menú mobile
  - `Footer.tsx`: Footer con links y copyright
  - `Container.tsx`: Wrapper para ancho máximo
  - `Section.tsx`: Sección con backgrounds configurables
  - `Heading.tsx`: Headings con estilos consistentes
  - `Button.tsx`: Botón reutilizable

- **Estilos y Diseño**
  - TailwindCSS v4 configurado
  - Color palette:
    - Primary: Azul petrolero (stone-800)
    - Accent: Naranja (orange-500)
    - Neutral: Grises
  - Responsive design mobile-first
  - Animaciones y transiciones suaves

- **Calculadora de Rentabilidad**
  - Cálculo de ROI basado en inputs del usuario
  - Visualización de resultados en tiempo real
  - Gráfico visual de rentabilidad
  - CTA integrado debajo de la calculadora

#### Configuración
- Astro 4.x con React integration
- TypeScript configurado
- ESLint + Prettier
- Path aliases (`@/`) para imports limpios

---

## [0.0.1] - 2025-10-20

### Inicial
- Inicialización del proyecto con `npm create astro@latest`
- Configuración básica de React + Astro
- Estructura de carpetas definida según `CLAUDE.md`
- Documentación del proyecto:
  - `CLAUDE.md`: Instrucciones para Claude (workflow TDD, agentes, MCP)
  - `PRD.md`: Product Requirements Document
  - `planning.md`: Roadmap y fases del proyecto
  - `tasks.md`: Task tracker con estados

---

## Formato del Changelog

### Tipos de Cambios
- **Añadido** (Added): Nuevas features
- **Modificado** (Changed): Cambios en funcionalidad existente
- **Deprecado** (Deprecated): Features que se eliminarán pronto
- **Eliminado** (Removed): Features eliminadas
- **Arreglado** (Fixed): Bug fixes
- **Seguridad** (Security): Parches de seguridad

### Secciones por Versión
- 🎯 CRO & Conversión
- 🏗️ Arquitectura
- 🎨 UI/UX
- 🚀 Performance
- 🔒 Seguridad
- 📚 Documentación
- 🐛 Bug Fixes

---

**Proyecto**: Landing Page Organic Growth - Facundo Zupel
**Stack**: Astro 4.x + React 18+ + TailwindCSS v4 + FastAPI
**Arquitectura**: Microservicios (Frontend + Lead Service + CMS Service)
