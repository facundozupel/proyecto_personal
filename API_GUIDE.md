# API Guide - Blog Dinámico

Guía completa para usar la API del blog dinámico con autenticación JWT.

---

## Endpoints Disponibles

### 1. Autenticación

#### POST `/api/auth/login`

Autenticar usuario y obtener token JWT.

**Request:**

```bash
curl -X POST http://localhost:4321/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "tu-password-seguro"
  }'
```

**Response Exitoso (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "7d",
  "user": {
    "id": "1",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

**Errores:**

- **400**: Validación falló (username o password inválidos)
- **401**: Credenciales incorrectas
- **500**: Error interno del servidor

---

### 2. Artículos

#### GET `/api/articles`

Obtener todos los artículos (público - no requiere autenticación).

**Query Parameters:**

- `published=true` - Solo retornar artículos publicados (draft: false)

**Request:**

```bash
# Todos los artículos
curl http://localhost:4321/api/articles

# Solo artículos publicados
curl http://localhost:4321/api/articles?published=true
```

**Response (200):**

```json
{
  "articles": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "¿Qué es el Organic Growth?",
      "slug": "que-es-organic-growth",
      "description": "Descubre cómo hacer crecer tu negocio sin publicidad paga",
      "content": "<h2>Introducción</h2><p>El organic growth...</p>",
      "author": "Facundo Zupel",
      "tags": ["seo", "marketing", "growth"],
      "publishedAt": "2025-10-28T15:30:00.000Z",
      "draft": false,
      "image": "https://example.com/image.jpg"
    }
  ]
}
```

---

#### POST `/api/articles`

Crear un nuevo artículo (protegido - requiere JWT).

**Headers Requeridos:**

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Request Body:**

```json
{
  "title": "Mi Nuevo Artículo",
  "slug": "mi-nuevo-articulo",
  "description": "Descripción breve del artículo (mínimo 10 caracteres)",
  "content": "<h2>Contenido</h2><p>El contenido del artículo en HTML...</p>",
  "author": "Facundo Zupel",
  "tags": ["tag1", "tag2", "tag3"],
  "draft": false,
  "image": "https://example.com/cover-image.jpg"
}
```

**Ejemplo cURL:**

```bash
curl -X POST http://localhost:4321/api/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "¿Qué es el Organic Growth?",
    "slug": "que-es-organic-growth",
    "description": "Descubre cómo hacer crecer tu negocio sin publicidad paga mediante estrategias de crecimiento orgánico",
    "content": "<h2>Introducción</h2><p>El organic growth es...</p>",
    "author": "Facundo Zupel",
    "tags": ["seo", "marketing", "growth"],
    "draft": false,
    "image": "https://example.com/og-growth.jpg"
  }'
```

**Response Exitoso (201):**

```json
{
  "message": "Article created successfully",
  "article": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "¿Qué es el Organic Growth?",
    "slug": "que-es-organic-growth",
    "description": "Descubre cómo hacer crecer tu negocio...",
    "content": "<h2>Introducción</h2><p>El organic growth es...</p>",
    "author": "Facundo Zupel",
    "tags": ["seo", "marketing", "growth"],
    "publishedAt": "2025-10-28T15:30:00.000Z",
    "draft": false,
    "image": "https://example.com/og-growth.jpg"
  }
}
```

**Errores:**

- **400**: Validación falló (campos requeridos faltantes o formato incorrecto)
- **401**: No autenticado (token JWT faltante o inválido)
- **409**: Artículo con este slug ya existe
- **500**: Error interno del servidor

---

## Validaciones de Campos

### Artículo

| Campo         | Tipo     | Requerido | Validaciones                                                 |
| ------------- | -------- | --------- | ------------------------------------------------------------ |
| `title`       | string   | Sí        | Min: 3 caracteres, Max: 200 caracteres                       |
| `slug`        | string   | Sí        | Min: 3 caracteres, Max: 200, solo minúsculas, números y `-` |
| `description` | string   | Sí        | Min: 10 caracteres, Max: 500 caracteres                      |
| `content`     | string   | Sí        | Min: 50 caracteres, puede incluir HTML                       |
| `author`      | string   | Sí        | Min: 2 caracteres                                            |
| `tags`        | string[] | Sí        | Min: 1 tag, Max: 10 tags                                     |
| `draft`       | boolean  | No        | Default: `false`                                             |
| `image`       | string   | No        | Debe ser URL válida                                          |

### Ejemplos de Errores de Validación

**Request con validación fallida:**

```json
{
  "title": "AB",
  "slug": "Invalid SLUG!",
  "description": "Corto",
  "content": "Muy corto",
  "author": "",
  "tags": []
}
```

**Response (400):**

```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": ["title"],
      "message": "Title must be at least 3 characters"
    },
    {
      "path": ["slug"],
      "message": "Slug must contain only lowercase letters, numbers and hyphens"
    },
    {
      "path": ["description"],
      "message": "Description must be at least 10 characters"
    },
    {
      "path": ["content"],
      "message": "Content must be at least 50 characters"
    },
    {
      "path": ["tags"],
      "message": "At least one tag required"
    }
  ]
}
```

---

## Workflow Completo

### 1. Obtener Token JWT

```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:4321/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"tu-password"}' \
  | jq -r '.token')

echo "Token: $TOKEN"
```

### 2. Crear Artículo

```bash
curl -X POST http://localhost:4321/api/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d @article.json
```

**Archivo `article.json`:**

```json
{
  "title": "5 Estrategias de Organic Growth que Funcionan",
  "slug": "5-estrategias-organic-growth",
  "description": "Aprende las 5 estrategias más efectivas para hacer crecer tu negocio de forma orgánica sin depender de publicidad paga",
  "content": "<h2>1. SEO y Contenido de Calidad</h2><p>El SEO sigue siendo una de las mejores formas...</p><h2>2. Email Marketing Personalizado</h2><p>Construye una lista de suscriptores...</p>",
  "author": "Facundo Zupel",
  "tags": ["growth", "seo", "email-marketing", "estrategia"],
  "draft": false,
  "image": "https://images.unsplash.com/photo-growth"
}
```

### 3. Listar Artículos Publicados

```bash
curl http://localhost:4321/api/articles?published=true | jq
```

### 4. Ver Artículo en el Blog

```
http://localhost:4321/blog/5-estrategias-organic-growth
```

---

## Seguridad

### JWT Secret

**IMPORTANTE**: En producción, configura una variable de entorno segura:

```bash
# .env
JWT_SECRET=tu-super-secreto-aleatorio-largo-y-seguro-cambiar-en-produccion
```

En el código (`src/utils/jwt.ts`), el secret se carga desde:

```typescript
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
```

### Configurar Usuario Admin

El primer usuario está en `data/users.json`. Para crear el hash del password:

```javascript
// Script temporal para hashear password
const bcrypt = require('bcryptjs')

const password = 'tu-password-seguro'
const hash = bcrypt.hashSync(password, 10)
console.log(hash)
// Copiar este hash a data/users.json en el campo passwordHash
```

O usar Node.js:

```bash
node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync('tu-password', 10))"
```

---

## Respuestas de Error Comunes

### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Valid JWT token required"
}
```

**Causa**: Token JWT no proporcionado o inválido.
**Solución**: Incluye header `Authorization: Bearer <token>` válido.

### 409 Conflict

```json
{
  "error": "Article with this slug already exists"
}
```

**Causa**: Ya existe un artículo con el mismo slug.
**Solución**: Cambia el slug a uno único.

---

## Testing en Producción

### Cambiar Base URL

```bash
# Desarrollo
BASE_URL=http://localhost:4321

# Producción
BASE_URL=https://tu-dominio.com

curl $BASE_URL/api/articles?published=true
```

---

## Ejemplo Completo con JavaScript (Frontend)

```javascript
// Login y obtener token
async function login(username, password) {
  const response = await fetch('http://localhost:4321/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  const data = await response.json()
  return data.token
}

// Crear artículo
async function createArticle(token, article) {
  const response = await fetch('http://localhost:4321/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create article')
  }

  return await response.json()
}

// Uso
;(async () => {
  try {
    const token = await login('admin', 'tu-password')
    console.log('Logged in successfully')

    const article = {
      title: 'Mi Artículo',
      slug: 'mi-articulo',
      description: 'Descripción del artículo',
      content: '<p>Contenido HTML del artículo...</p>',
      author: 'Facundo Zupel',
      tags: ['tag1', 'tag2'],
      draft: false,
    }

    const result = await createArticle(token, article)
    console.log('Article created:', result.article)
  } catch (error) {
    console.error('Error:', error.message)
  }
})()
```

---

## Próximos Pasos

1. **Configurar password seguro** en `data/users.json`
2. **Configurar JWT_SECRET** en variables de entorno
3. **Crear primer artículo** usando la API
4. **Verificar en el blog** que el artículo se muestra correctamente

---

**Versión**: 1.0
**Fecha**: 2025-10-28
**Proyecto**: Landing Page Organic Growth - Facundo Zupel
