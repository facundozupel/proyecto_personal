# Blog API - Guía de Uso

API REST para gestionar posts de blog que persisten en archivos `.md` dentro de `src/content/blog/`.

## 🔐 Autenticación

Todos los endpoints requieren **HTTP Basic Authentication**:

- **Usuario**: `admin`
- **Password**: Variable de entorno `ADMIN_PASSWORD`

```bash
# En desarrollo (definido en .env)
ADMIN_PASSWORD=dev_password_123

# En producción (definir en .env.production o variables de entorno del servidor)
ADMIN_PASSWORD=tu_password_super_seguro
```

## 📡 Endpoints Disponibles

### Base URL

- **Desarrollo**: `http://localhost:4321/api/admin/posts`
- **Producción**: `https://facundogrowth.com/api/admin/posts`

---

## 1. Listar Todos los Posts

**GET** `/api/admin/posts`

Lista todos los posts del blog ordenados por fecha (más recientes primero).

### Request

```bash
curl -X GET http://localhost:4321/api/admin/posts \
  -u admin:dev_password_123
```

### Response (200 OK)

```json
{
  "success": true,
  "count": 2,
  "posts": [
    {
      "title": "Mi Segundo Post",
      "description": "Descripción del segundo post",
      "author": "Facundo Zupel",
      "date": "2025-11-20",
      "readTime": "5 minutos",
      "tags": ["seo", "marketing"],
      "draft": false,
      "slug": "mi-segundo-post"
    },
    {
      "title": "Mi Primer Post",
      "description": "Descripción del primer post",
      "author": "Facundo Zupel",
      "date": "2025-11-19",
      "readTime": "3 minutos",
      "tags": ["tutorial"],
      "draft": false,
      "slug": "mi-primer-post"
    }
  ]
}
```

---

## 2. Crear Nuevo Post

**POST** `/api/admin/posts`

Crea un nuevo post y genera un archivo `.md` en `src/content/blog/`.

### Campos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `title` | string | ✅ Sí | Título del post |
| `description` | string | ✅ Sí | Descripción corta |
| `content` | string | ✅ Sí | Contenido completo (Markdown) |
| `slug` | string | ❌ No | URL slug (se genera auto del título) |
| `author` | string | ❌ No | Autor (default: "Facundo Zupel") |
| `date` | string | ❌ No | Fecha YYYY-MM-DD (default: hoy) |
| `readTime` | string | ❌ No | Tiempo de lectura estimado |
| `image` | string | ❌ No | URL de imagen destacada |
| `tags` | string[] | ❌ No | Tags/categorías |
| `draft` | boolean | ❌ No | Es borrador (default: false) |

### Request

```bash
curl -X POST http://localhost:4321/api/admin/posts \
  -u admin:dev_password_123 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cómo optimizar tu SEO local en 2025",
    "description": "Guía completa para mejorar tu posicionamiento local en Google",
    "content": "## Introducción\n\nEl SEO local es fundamental para negocios físicos...\n\n## Estrategias clave\n\n1. Google Business Profile\n2. Citations locales\n3. Reviews y reseñas\n\n## Conclusión\n\nImplementa estas estrategias...",
    "author": "Facundo Zupel",
    "readTime": "8 minutos",
    "tags": ["seo", "local", "google-business"],
    "draft": false
  }'
```

### Response (201 Created)

```json
{
  "success": true,
  "message": "Post created successfully",
  "post": {
    "title": "Cómo optimizar tu SEO local en 2025",
    "description": "Guía completa para mejorar tu posicionamiento local en Google",
    "author": "Facundo Zupel",
    "date": "2025-11-20",
    "readTime": "8 minutos",
    "tags": ["seo", "local", "google-business"],
    "draft": false,
    "slug": "como-optimizar-tu-seo-local-en-2025"
  }
}
```

**Headers:**
- `Location: /api/admin/posts/como-optimizar-tu-seo-local-en-2025`

### Errores Comunes

**400 Bad Request** - Campos faltantes
```json
{
  "success": false,
  "error": "Missing required fields: title, description, content"
}
```

**409 Conflict** - Slug ya existe
```json
{
  "success": false,
  "error": "Post with slug \"como-optimizar-tu-seo-local-en-2025\" already exists"
}
```

---

## 3. Obtener Post Específico

**GET** `/api/admin/posts/{slug}`

Obtiene un post específico incluyendo su contenido completo.

### Request

```bash
curl -X GET http://localhost:4321/api/admin/posts/como-optimizar-tu-seo-local-en-2025 \
  -u admin:dev_password_123
```

### Response (200 OK)

```json
{
  "success": true,
  "post": {
    "title": "Cómo optimizar tu SEO local en 2025",
    "description": "Guía completa para mejorar tu posicionamiento local en Google",
    "author": "Facundo Zupel",
    "date": "2025-11-20",
    "readTime": "8 minutos",
    "tags": ["seo", "local", "google-business"],
    "draft": false,
    "slug": "como-optimizar-tu-seo-local-en-2025",
    "content": "## Introducción\n\nEl SEO local es fundamental..."
  }
}
```

### Errores

**404 Not Found**
```json
{
  "success": false,
  "error": "Post with slug \"post-inexistente\" not found"
}
```

---

## 4. Actualizar Post

**PUT** `/api/admin/posts/{slug}`

Actualiza un post existente. Todos los campos son opcionales.

### Request

```bash
curl -X PUT http://localhost:4321/api/admin/posts/como-optimizar-tu-seo-local-en-2025 \
  -u admin:dev_password_123 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cómo optimizar tu SEO local en 2025 [ACTUALIZADO]",
    "tags": ["seo", "local", "google-business", "2025"],
    "draft": false
  }'
```

### Response (200 OK)

```json
{
  "success": true,
  "message": "Post updated successfully",
  "post": {
    "title": "Cómo optimizar tu SEO local en 2025 [ACTUALIZADO]",
    "description": "Guía completa para mejorar tu posicionamiento local en Google",
    "author": "Facundo Zupel",
    "date": "2025-11-20",
    "readTime": "8 minutos",
    "tags": ["seo", "local", "google-business", "2025"],
    "draft": false,
    "slug": "como-optimizar-tu-seo-local-en-2025"
  }
}
```

### Actualizar Solo Contenido

```bash
curl -X PUT http://localhost:4321/api/admin/posts/como-optimizar-tu-seo-local-en-2025 \
  -u admin:dev_password_123 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "## Introducción ACTUALIZADA\n\nEl SEO local ha cambiado..."
  }'
```

---

## 5. Eliminar Post

**DELETE** `/api/admin/posts/{slug}`

Elimina un post permanentemente (borra el archivo `.md`).

### Request

```bash
curl -X DELETE http://localhost:4321/api/admin/posts/como-optimizar-tu-seo-local-en-2025 \
  -u admin:dev_password_123
```

### Response (200 OK)

```json
{
  "success": true,
  "message": "Post \"como-optimizar-tu-seo-local-en-2025\" deleted successfully"
}
```

---

## 🔒 Seguridad

### Autenticación Failed (401)

Si no proporcionas credenciales o son incorrectas:

```json
{
  "error": "Invalid credentials"
}
```

**Headers:**
```
WWW-Authenticate: Basic realm="Admin API"
```

### Recomendaciones

1. **NUNCA** commitear el `.env` con passwords reales a Git
2. En producción, usar password fuerte (24+ caracteres)
3. Rotar password regularmente
4. Considerar usar HTTPS en producción (Traefik ya lo hace)

---

## 📝 Formato Markdown

El contenido se guarda en archivos `.md` con frontmatter YAML:

```markdown
---
title: "Cómo optimizar tu SEO local en 2025"
description: "Guía completa para mejorar tu posicionamiento local en Google"
author: "Facundo Zupel"
date: 2025-11-20
readTime: "8 minutos"
tags: ["seo", "local", "google-business"]
draft: false
---

## Introducción

El SEO local es fundamental para negocios físicos...

## Estrategias clave

1. Google Business Profile
2. Citations locales
3. Reviews y reseñas

## Conclusión

Implementa estas estrategias...
```

---

## 🚀 Workflow Recomendado

### 1. Desarrollo Local

```bash
# 1. Crear post
curl -X POST http://localhost:4321/api/admin/posts \
  -u admin:dev_password_123 \
  -H "Content-Type: application/json" \
  -d @nuevo-post.json

# 2. Ver el post en el navegador
open http://localhost:4321/blog/slug-del-post

# 3. Editar si es necesario
curl -X PUT http://localhost:4321/api/admin/posts/slug-del-post \
  -u admin:dev_password_123 \
  -H "Content-Type: application/json" \
  -d '{"content":"Nuevo contenido..."}'

# 4. Commit a Git
git add src/content/blog/slug-del-post.md
git commit -m "feat: Add blog post about ..."
git push
```

### 2. Producción

```bash
# Usar el dominio de producción
curl -X POST https://facundogrowth.com/api/admin/posts \
  -u admin:$ADMIN_PASSWORD \
  -H "Content-Type: application/json" \
  -d @nuevo-post.json
```

---

## 🧪 Testing

### Script de Prueba Completo

```bash
#!/bin/bash

BASE_URL="http://localhost:4321/api/admin/posts"
AUTH="admin:dev_password_123"

echo "=== 1. Crear post ===" curl -X POST $BASE_URL \
  -u $AUTH \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Post de Prueba",
    "description": "Descripción de prueba",
    "content": "Contenido de prueba",
    "tags": ["test"]
  }'

echo -e "\n\n=== 2. Listar posts ==="
curl -X GET $BASE_URL -u $AUTH

echo -e "\n\n=== 3. Obtener post específico ==="
curl -X GET $BASE_URL/post-de-prueba -u $AUTH

echo -e "\n\n=== 4. Actualizar post ==="
curl -X PUT $BASE_URL/post-de-prueba \
  -u $AUTH \
  -H "Content-Type: application/json" \
  -d '{"title":"Post de Prueba ACTUALIZADO"}'

echo -e "\n\n=== 5. Eliminar post ==="
curl -X DELETE $BASE_URL/post-de-prueba -u $AUTH
```

---

## ⚠️ Limitaciones Actuales

1. **No hay paginación** en GET /api/admin/posts
2. **No hay búsqueda/filtrado** por tags o fecha
3. **No hay validación de Markdown** en el contenido
4. **No hay preview** antes de publicar
5. **No hay versionado** de posts

### Mejoras Futuras

- [ ] Paginación en lista de posts
- [ ] Filtros por tag, autor, fecha
- [ ] Endpoint de preview/draft
- [ ] Validación de Markdown
- [ ] Upload de imágenes
- [ ] Panel admin web (UI)
- [ ] Historial de cambios (Git integration)

---

**Última actualización**: 2025-11-20
**Versión**: 1.0.0
