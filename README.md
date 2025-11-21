# Landing Page Organic Growth - Facundo Zupel

Landing page profesional con blog para servicios de consultoría en Organic Growth, SEO y Automatizaciones.

## 🎯 Descripción

Sitio web moderno construido con Astro y React que ofrece:
- Presentación de servicios de consultoría
- Blog técnico gestionado vía CMS API
- Calculadora interactiva de rentabilidad
- Sistema de captura de leads con modal multi-step
- Optimización SEO completa
- Performance y UX excepcional

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Astro 4.x (SSG/SSR)
- **UI Library**: React 18+
- **Estilos**: TailwindCSS v4
- **Testing**: Vitest + React Testing Library
- **E2E**: Playwright

### Backend
- **Blog API**: Astro API Routes (Node.js)
- **Storage**: Archivos `.md` en filesystem (persisten en Git)
- **Auth**: HTTP Basic Auth

### Deployment
- **Frontend + Blog API**: Docker Swarm + Traefik en VPS
- **Lead Storage**: Google Sheets vía webhook externo

## 📁 Estructura del Proyecto

```
/
├── src/                                    # Frontend (Astro + React)
│   ├── components/
│   │   ├── layout/                         # Header, Footer, Navigation
│   │   ├── sections/                       # Hero, About, Services, etc.
│   │   ├── ui/                             # Componentes reutilizables
│   │   └── blog/                           # Componentes del blog
│   ├── pages/
│   │   ├── index.astro                     # Landing page principal
│   │   ├── blog/                           # Rutas del blog
│   │   └── api/admin/posts/                # API REST para blog
│   ├── content/
│   │   └── blog/                           # Posts en Markdown (persisten aquí)
│   ├── layouts/                            # Layouts de Astro
│   ├── utils/
│   │   ├── auth.ts                         # Autenticación HTTP Basic
│   │   └── blog.ts                         # CRUD de archivos .md
│   └── styles/
│       └── global.css                      # Estilos globales
│
├── tests/                                  # Tests
│   ├── unit/                               # Unit tests
│   └── e2e/                                # E2E tests
│
├── PRD.md                                  # Product Requirements Document
├── CLAUDE.md                               # Instrucciones del proyecto
├── CHANGELOG.md                            # Historial de cambios
├── planning.md                             # Roadmap y fases
├── tasks.md                                # Task tracker
├── ARQUITECTURA_ACTUAL.md                  # Documentación de arquitectura
├── DEPLOYMENT.md                           # Guía de deployment
├── API_BLOG_GUIDE.md                       # Guía de uso de Blog API
└── README.md                               # Este archivo
```

## 🚀 Comandos

### Frontend (Desarrollo)

```bash
# Instalar dependencias
npm install

# Dev server (http://localhost:4321)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Tests
npm run test              # Unit tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
npm run test:e2e          # E2E tests

# Linting
npm run lint              # ESLint
npm run format            # Prettier
```

## 📡 Blog API (Gestión de Posts)

API REST integrada en Astro para crear/editar/eliminar posts de blog.

### Endpoints Disponibles

**GET** `/api/admin/posts` - Listar todos los posts
**POST** `/api/admin/posts` - Crear nuevo post
**GET** `/api/admin/posts/{slug}` - Obtener post específico
**PUT** `/api/admin/posts/{slug}` - Actualizar post
**DELETE** `/api/admin/posts/{slug}` - Eliminar post

**Todos los endpoints requieren autenticación HTTP Basic Auth.**

### Ejemplo de Uso

```bash
# Crear un nuevo post
curl -X POST http://localhost:4321/api/admin/posts \
  -u admin:dev_password_123 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Nuevo Post",
    "description": "Descripción del post",
    "content": "## Introducción\n\nContenido del post...",
    "tags": ["seo", "marketing"],
    "readTime": "5 minutos"
  }'
```

**Ver documentación completa**: [API_BLOG_GUIDE.md](./API_BLOG_GUIDE.md)

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────┐
│  Usuario crea post vía API              │
│  POST /api/admin/posts                  │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  API escribe archivo .md                │
│  src/content/blog/slug.md               │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  Astro Content Collections lee .md      │
│  Post disponible en /blog/slug          │
└─────────────────────────────────────────┘

Leads del formulario:
Usuario → Modal Contacto → Webhook Externo → Google Sheets
```

## 🌐 Variables de Entorno

```bash
# .env (desarrollo)
ADMIN_PASSWORD=dev_password_123

# .env.production (producción)
ADMIN_PASSWORD=tu_password_super_seguro
```

Ver `.env.example` para todas las variables disponibles.

## 📦 Deployment

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones completas de deployment.

### Quick Start

```bash
# 1. Build imagen del frontend (incluye Blog API)
docker build -t facundozupel/frontend:latest -f Dockerfile .

# 2. Deploy con Docker Swarm
export $(cat .env.production | xargs)
docker stack deploy -c docker-stack-full.yml facundogrowth

# 3. Verificar
curl https://facundogrowth.com
curl https://facundogrowth.com/api/admin/posts -u admin:$ADMIN_PASSWORD
```

## 🎨 Características

### UX/UI
- Diseño responsive mobile-first
- Animaciones suaves con CSS
- Microinteracciones cuidadas
- Accesibilidad WCAG 2.1 AA
- Performance optimizada (Lighthouse > 90)

### SEO
- Meta tags optimizados
- Schema markup (Person, Organization, Service)
- Sitemap automático
- URLs semánticas
- Imágenes optimizadas (WebP, lazy loading)

### CRO (Conversion Rate Optimization)
- Sticky contact button
- Modal multi-step para reducir fricción
- Calculadora de rentabilidad interactiva
- CTAs estratégicamente ubicados

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📚 Documentación

- **[PRD.md](./PRD.md)** - Product Requirements Document
- **[CLAUDE.md](./CLAUDE.md)** - Instrucciones completas del proyecto
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía de deployment
- **[ARQUITECTURA_ACTUAL.md](./ARQUITECTURA_ACTUAL.md)** - Documentación de arquitectura
- **[planning.md](./planning.md)** - Roadmap y fases del proyecto
- **[tasks.md](./tasks.md)** - Task tracker

## 🔮 Roadmap

### Completado ✅
- Landing page completa
- Sistema de blog con Blog API (Astro API Routes)
- **Panel admin web para blog** (`/admin`)
- **Editor Markdown personalizado** (13 botones de toolbar)
- Lead capture vía webhook
- Modal de contacto multi-step
- Calculadora de rentabilidad
- Responsive design
- Deployment con Docker

### En Progreso 🚧
- Crear 2-3 posts de ejemplo
- Optimización SEO avanzada
- Testing E2E completo

### Pendiente 📋
- Social proof elements
- Newsletter subscription
- Case studies section
- CI/CD con GitHub Actions
- Analytics integration (GA4)

## 🤝 Contribuir

Este es un proyecto personal, pero si encuentras algún bug o tienes sugerencias:

1. Abre un issue
2. Describe el problema o sugerencia
3. Si es posible, adjunta screenshots

## 📄 Licencia

Copyright © 2025 Facundo Zupel. Todos los derechos reservados.

## 📞 Contacto

- **Web**: [facundozupel.com](https://facundozupel.com)
- **Email**: contacto@facundozupel.com
- **LinkedIn**: [linkedin.com/in/facundozupel](https://linkedin.com/in/facundozupel)

---

**Versión**: 0.4.0
**Última actualización**: 2025-11-21
**Construido con**: Astro + React + TailwindCSS
