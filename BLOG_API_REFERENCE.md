# Blog API - Referencia Rápida

## Configuración

**Usuario**: `admin`
**Password**: Definida en `.env` como `ADMIN_PASSWORD`
**Base URL**: `http://localhost:4321/api/admin/posts` (dev)
**Autenticación**: HTTP Basic Auth

## Endpoints

### 1. Listar todos los posts

```bash
curl -u admin:dev_password_123 http://localhost:4321/api/admin/posts
```

Respuesta:
```json
{
  "success": true,
  "count": 2,
  "posts": [
    {
      "title": "Mi Post",
      "description": "Descripción",
      "author": "Facundo Zupel",
      "date": "2025-12-01",
      "readTime": "5 minutos",
      "tags": ["seo", "marketing"],
      "draft": false,
      "slug": "mi-post"
    }
  ]
}
```

### 2. Obtener un post específico

```bash
curl -u admin:dev_password_123 \
  http://localhost:4321/api/admin/posts/mi-slug
```

Respuesta incluye el contenido completo en `post.content`.

### 3. Crear un nuevo post

```bash
curl -u admin:dev_password_123 \
  -X POST http://localhost:4321/api/admin/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título del Post",
    "description": "Descripción corta para SEO",
    "content": "## Introducción\n\nContenido en Markdown...",
    "tags": ["seo", "marketing"],
    "readTime": "5 minutos"
  }'
```

**Campos requeridos**:
- `title` (string)
- `description` (string)
- `content` (string, en Markdown)

**Campos opcionales**:
- `slug` (string) - Se genera automáticamente desde el título si no se provee
- `author` (string) - Default: "Facundo Zupel"
- `date` (string YYYY-MM-DD) - Default: fecha actual
- `readTime` (string) - Ej: "5 minutos"
- `image` (string) - URL de imagen destacada
- `tags` (array de strings) - Default: []
- `draft` (boolean) - Default: false

### 4. Actualizar un post existente

```bash
curl -u admin:dev_password_123 \
  -X PUT http://localhost:4321/api/admin/posts/mi-slug \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título Actualizado",
    "tags": ["nuevo-tag"]
  }'
```

Todos los campos son opcionales. Solo envía los que quieres actualizar.

### 5. Eliminar un post

```bash
curl -u admin:dev_password_123 \
  -X DELETE http://localhost:4321/api/admin/posts/mi-slug
```

## Scripts de ayuda

### Script interactivo (Node.js)

```bash
node scripts/create-blog-post.js
```

El script te pedirá:
1. Título
2. Descripción
3. Tags
4. Tiempo de lectura
5. Contenido (escribe "FIN" cuando termines)
6. Credenciales

### Script con curl (Bash)

```bash
./scripts/create-post-curl.sh "Título" "Descripción" "tag1,tag2,tag3"
```

Luego pega el contenido Markdown y presiona Ctrl+D.

## Ejemplos completos

### Crear un post sobre SEO Local

```bash
curl -u admin:dev_password_123 \
  -X POST http://localhost:4321/api/admin/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cómo dominar el SEO Local en 2025",
    "description": "Estrategias probadas para posicionar tu negocio local en Google Maps y búsquedas locales",
    "content": "## Introducción\n\nEl SEO Local es fundamental para negocios físicos...\n\n## Estrategia 1: Google Business Profile\n\nOptimiza tu perfil de Google My Business...\n\n## Estrategia 2: Reseñas\n\nLas reseñas son críticas...\n\n## Conclusión\n\nImplementa estas estrategias para dominar tu mercado local.",
    "tags": ["seo", "seo-local", "google-maps", "marketing"],
    "readTime": "8 minutos"
  }'
```

### Actualizar solo los tags de un post

```bash
curl -u admin:dev_password_123 \
  -X PUT http://localhost:4321/api/admin/posts/como-dominar-el-seo-local-en-2025 \
  -H "Content-Type: application/json" \
  -d '{
    "tags": ["seo", "seo-local", "google-maps", "marketing", "actualizado-2025"]
  }'
```

### Cambiar un post a borrador

```bash
curl -u admin:dev_password_123 \
  -X PUT http://localhost:4321/api/admin/posts/mi-slug \
  -H "Content-Type: application/json" \
  -d '{"draft": true}'
```

## Formato de Markdown recomendado

```markdown
## Introducción

Párrafo introductorio que engancha al lector.

## Sección Principal 1

Contenido con **negritas** y *cursivas*.

### Subsección

- Lista de puntos
- Otro punto
- Más puntos

## Sección Principal 2

Más contenido aquí.

### Código de ejemplo

\`\`\`javascript
const ejemplo = "código";
\`\`\`

## Conclusión

Resumen y CTA.
```

## Errores comunes

### 401 Unauthorized

```json
{"error": "Invalid credentials"}
```

**Solución**: Verifica el password en `.env` y que estés usando el usuario correcto (`admin`).

### 409 Conflict

```json
{
  "success": false,
  "error": "Post with slug \"mi-slug\" already exists"
}
```

**Solución**: El post ya existe. Usa PUT para actualizar o cambia el título/slug.

### 400 Bad Request

```json
{
  "success": false,
  "error": "Missing required fields: title, description, content"
}
```

**Solución**: Asegúrate de incluir todos los campos requeridos en el JSON.

## Testing rápido

Para verificar que todo funciona:

```bash
# 1. Listar posts
curl -u admin:dev_password_123 http://localhost:4321/api/admin/posts

# 2. Crear post de prueba
curl -u admin:dev_password_123 -X POST http://localhost:4321/api/admin/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test post","content":"# Test\nContenido"}'

# 3. Verificar creación
curl -u admin:dev_password_123 http://localhost:4321/api/admin/posts/test

# 4. Actualizar
curl -u admin:dev_password_123 -X PUT http://localhost:4321/api/admin/posts/test \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Actualizado"}'

# 5. Eliminar
curl -u admin:dev_password_123 -X DELETE http://localhost:4321/api/admin/posts/test
```

## Notas de producción

1. **Cambiar password**: Actualiza `ADMIN_PASSWORD` en `.env.production`
2. **HTTPS**: En producción, usa `https://` en lugar de `http://`
3. **Base URL**: Cambia `localhost:4321` por tu dominio
4. **Backup**: Los archivos `.md` están en `src/content/blog/` - haz commit regular a Git

## Storage

Los posts se almacenan como archivos `.md` en:
```
src/content/blog/{slug}.md
```

Formato del archivo:
```markdown
---
title: "Título del Post"
description: "Descripción"
author: "Facundo Zupel"
date: 2025-12-01
readTime: "5 minutos"
tags: ["tag1","tag2"]
draft: false
---

Contenido en Markdown aquí...
```

Los archivos persisten entre restarts y se versionan con Git.
