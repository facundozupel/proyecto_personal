# 🏗️ Arquitectura Actual del Proyecto

**Última actualización**: 2025-11-03 (Commit: aba9d98)

---

## 📊 Visión General

### Microservicios / APIs Activos

```
┌─────────────────────────────────────────────┐
│                                             │
│         👤 USUARIO                          │
│                                             │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│                                             │
│    🌐 FRONTEND (Astro + React)              │
│    Puerto: 4321 (dev) | 443 (prod)          │
│    Ubicación: /src/                         │
│                                             │
│    - Landing page completa                  │
│    - Blog dinámico                          │
│    - Modal de contacto multi-step           │
│    - Calculadora de rentabilidad            │
│                                             │
└────────────┬────────────┬───────────────────┘
             │            │
             │            │
    ┌────────┘            └────────┐
    │                              │
    ▼                              ▼
┌──────────────────┐    ┌──────────────────────┐
│                  │    │                      │
│  📝 CMS SERVICE  │    │  📮 WEBHOOK EXTERNO  │
│  (FastAPI)       │    │  (Leads)             │
│  Puerto: 8001    │    │                      │
│                  │    │  hooksnochon         │
│  - CRUD Posts    │    │  .facundo.click      │
│  - Auth básica   │    │                      │
│  - Swagger UI    │    │  → Google Sheets     │
│                  │    │                      │
└────────┬─────────┘    └──────────────────────┘
         │
         ▼
┌──────────────────┐
│  💾 IN-MEMORY    │
│  STORAGE         │
│                  │
│  (Migrar a       │
│  Google Sheets)  │
└──────────────────┘
```

---

## 🎯 Servicios Activos

### 1. **Frontend - Astro + React**

**Ubicación**: `/src/`
**Puerto**: 4321 (desarrollo)
**Función**: Interfaz de usuario completa

#### Componentes principales:

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx                    → Navegación principal
│   │   ├── Footer.tsx                    → Pie de página
│   │   └── Navigation.tsx                → Menú navegación
│   │
│   ├── sections/
│   │   ├── Hero.tsx                      → Sección hero
│   │   ├── About.tsx                     → Sobre mí
│   │   ├── Services.tsx                  → Servicios
│   │   ├── Services360.tsx               → Servicios 360
│   │   ├── WorkflowProcess.tsx           → Proceso de trabajo
│   │   ├── ProfitabilityCalculator.tsx   → Calculadora
│   │   └── Contact.tsx                   → Contacto
│   │
│   ├── ui/
│   │   ├── Button.tsx                    → Botón genérico
│   │   ├── Container.tsx                 → Container wrapper
│   │   ├── Section.tsx                   → Section wrapper
│   │   ├── Heading.tsx                   → Headings
│   │   ├── Card.tsx                      → Tarjetas
│   │   │
│   │   └── 🎯 Sistema de Contacto CRO:
│   │       ├── StickyContactButton.tsx   → Botón flotante
│   │       ├── ContactModal.tsx          → Modal multi-step
│   │       ├── ContactTrigger.tsx        → Event delegation
│   │       └── StickyContact.tsx         → Wrapper principal
│   │
│   └── blog/
│       ├── BlogCard.tsx                  → Card de post
│       ├── BlogList.tsx                  → Lista de posts
│       └── BlogPost.tsx                  → Vista de post
│
├── pages/
│   ├── index.astro                       → Homepage
│   ├── blog/
│   │   ├── index.astro                   → Lista blog
│   │   └── [slug].astro                  → Post individual
│   └── admin/
│       └── blog.astro                    → Admin (futuro)
│
├── config/
│   └── api.ts                            → Endpoints centralizados
│
├── content/
│   └── blog/
│       └── *.md                          → Posts markdown (legacy)
│
├── layouts/
│   ├── BaseLayout.astro                  → Layout base
│   └── BlogPostLayout.astro              → Layout posts
│
└── styles/
    └── global.css                        → Estilos globales
```

**Características**:
- ✅ SSR con Astro
- ✅ Componentes React para interactividad
- ✅ TailwindCSS v4
- ✅ Responsive mobile-first
- ✅ Animaciones CSS

---

### 2. **CMS Service - FastAPI** ⭐

**Ubicación**: `/cms-service/`
**Puerto**: 8001
**Función**: API REST para gestión programática del blog
**Stack**: Python 3.11 + FastAPI

#### Estructura:

```
cms-service/
├── app/
│   └── main.py                  → FastAPI app completa
│                                  - Endpoints
│                                  - Schemas (Pydantic)
│                                  - Auth (HTTP Basic)
│                                  - CORS
│                                  - In-memory storage
│
├── requirements.txt             → Dependencias Python
├── Dockerfile                   → Docker build
└── README.md                    → Documentación
```

#### Endpoints:

**Públicos (sin autenticación):**
```
GET  /                           → Info del servicio
GET  /health                     → Health check
GET  /docs                       → Swagger UI interactiva
GET  /api/posts                  → Lista de posts publicados
GET  /api/posts/{slug}           → Post por slug
```

**Admin (requiere HTTP Basic Auth):**
```
POST   /api/admin/posts          → Crear post
PUT    /api/admin/posts/{id}     → Actualizar post
DELETE /api/admin/posts/{id}     → Eliminar post
```

#### Schemas (Pydantic):

```python
PostCreate:
  - title: str
  - slug: str
  - content: str
  - excerpt: str
  - author: str (default: "Facundo Zupel")
  - tags: List[str]
  - published: bool

PostUpdate:
  - title: str | None
  - content: str | None
  - excerpt: str | None
  - tags: List[str] | None
  - published: bool | None

Post (Response):
  - id: int
  - title: str
  - slug: str
  - content: str
  - excerpt: str
  - author: str
  - tags: List[str]
  - published: bool
  - created_at: str (ISO 8601)
  - updated_at: str (ISO 8601)
```

**Storage actual**: In-memory (lista Python)
**Roadmap**: Migrar a Google Sheets

---

### 3. **Webhook Externo - Captura de Leads**

**URL**: `https://hooksnochon.facundo.click/webhook/contacto-perso`
**Método**: POST
**Destino**: Google Sheets
**Función**: Capturar leads del formulario de contacto

#### Datos enviados:

```javascript
{
  nombre: string,
  email: string,
  empresa: string,
  mensaje: string,
  interes: string,      // "seo-local" | "automation" | etc.
  fecha: string,        // ISO 8601
  origen: string        // "landing-perso"
}
```

**Características**:
- ✅ Sin base de datos local
- ✅ Almacenamiento directo en Google Sheets
- ✅ Manejado externamente (sin mantenimiento)

---

## 🔄 Flujos de Datos

### Flujo 1: Blog (Lectura)

```
Usuario solicita blog
        ↓
    Frontend (Astro)
        ↓
    GET /api/posts
        ↓
    CMS Service (FastAPI)
        ↓
    In-Memory Storage
        ↓
    Retorna JSON de posts
        ↓
    Frontend renderiza
```

### Flujo 2: Blog (Escritura - Admin)

```
Admin quiere crear post
        ↓
    Cliente HTTP (curl/Postman/Panel futuro)
        ↓
    POST /api/admin/posts
    + HTTP Basic Auth
        ↓
    CMS Service valida auth
        ↓
    Guarda en In-Memory Storage
        ↓
    Retorna post creado
```

### Flujo 3: Captura de Leads

```
Usuario completa formulario
        ↓
    Frontend (ContactModal)
        ↓
    POST a webhook externo
        ↓
    hooksnochon.facundo.click
        ↓
    Google Sheets
        ↓
    Confirmación al usuario
```

---

## 📦 Dependencias Clave

### Frontend (package.json)

```json
{
  "astro": "^4.x",
  "react": "^18.x",
  "tailwindcss": "^4.x",
  "@astrojs/react": "^3.x",
  "vitest": "^1.x",
  "@testing-library/react": "^14.x"
}
```

### Backend (requirements.txt)

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
python-multipart==0.0.6
```

---

## 🔐 Autenticación

### CMS Service

**Tipo**: HTTP Basic Authentication
**Username**: Cualquiera (ignorado)
**Password**: Variable de entorno `ADMIN_PASSWORD`

**Ejemplo de uso**:
```bash
curl -u admin:mi_password https://cms-api.com/api/admin/posts
```

---

## 🌍 Variables de Entorno

### Frontend (.env)

```bash
# No requiere variables críticas actualmente
PUBLIC_SITE_URL=https://tudominio.com
```

### CMS Service (.env)

```bash
# Obligatorias
ADMIN_PASSWORD=tu_password_seguro_aqui

# Recomendadas
ALLOWED_ORIGINS=https://tudominio.com,https://www.tudominio.com
```

---

## 📊 Estado de Deploys

| Servicio | Estado | Plataforma | URL |
|----------|--------|------------|-----|
| Frontend | ⚠️ Por confirmar | ? | ? |
| CMS Service | ⏳ Pendiente | A definir | - |
| Webhook Leads | ✅ Funcionando | Externo | hooksnochon.facundo.click |

---

## 🚀 Próximos Pasos

### Inmediatos:
1. ✅ Deploy de CMS Service
2. ⏳ Actualizar frontend con URL del CMS en producción
3. ⏳ Poblar posts iniciales

### Corto plazo:
- Migrar storage de CMS a Google Sheets
- Crear panel admin web para blog
- Testing E2E

### Mediano plazo:
- Búsqueda full-text en blog
- Soporte para imágenes en posts
- Versionado de posts
- Analytics integration

---

## 📝 Resumen

### Total de Microservicios/APIs: **2**

1. **Frontend (Astro + React)** - Puerto 4321
   - Landing page completa
   - Blog dinámico
   - Sistema de contacto avanzado

2. **CMS Service (FastAPI)** - Puerto 8001
   - API REST para blog
   - CRUD completo
   - Documentación Swagger

### Servicios Externos: **1**

1. **Webhook de Leads** - hooksnochon.facundo.click
   - Captura formularios
   - Almacena en Google Sheets

---

**Total de componentes a deployar**: **2** (Frontend + CMS Service)

**Infraestructura eliminada**:
- ❌ Lead Service (reemplazado por webhook)
- ❌ Bases de datos locales (SQLite/PostgreSQL)
- ❌ Docker Compose multi-servicio
- ❌ Gestión de migraciones de DB

**Resultado**: Arquitectura simplificada, más fácil de deployar y mantener.
