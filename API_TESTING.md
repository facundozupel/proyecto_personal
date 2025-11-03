# API Testing - CMS Service

Ejemplos de requests para testing del CMS Service en producción.

---

## 📋 Endpoints Disponibles

### Públicos (sin autenticación)

- `GET /` - Info del servicio
- `GET /health` - Health check
- `GET /api/posts` - Listar posts publicados
- `GET /api/posts/{slug}` - Obtener post por slug

### Administración (requieren autenticación)

- `POST /api/admin/posts` - Crear nuevo post
- `PUT /api/admin/posts/{id}` - Actualizar post
- `DELETE /api/admin/posts/{id}` - Eliminar post

---

## 🔧 Setup

### Variables de entorno

```bash
# Desarrollo
export API_URL="http://localhost:8001"
export ADMIN_PASSWORD="test123"

# Producción
export API_URL="https://cms.facundozupel.com"
export ADMIN_PASSWORD="tu-password-aquí"
```

---

## ✅ Health Check

### Verificar que el servicio está corriendo

```bash
curl $API_URL/health
```

**Output esperado:**
```json
{"status":"healthy"}
```

### Info del servicio

```bash
curl $API_URL/
```

**Output esperado:**
```json
{
  "message": "CMS Service - Blog API",
  "version": "1.0.0"
}
```

---

## 📝 Posts - Operaciones Públicas

### Listar todos los posts publicados

```bash
curl -X GET "$API_URL/api/posts"
```

**Output esperado:**
```json
[
  {
    "id": 1,
    "title": "Mi primer post",
    "slug": "mi-primer-post",
    "content": "Contenido completo...",
    "excerpt": "Resumen del post",
    "author": "Facundo Zupel",
    "tags": ["seo", "organic-growth"],
    "published": true,
    "created_at": "2025-11-03T10:00:00",
    "updated_at": "2025-11-03T10:00:00"
  }
]
```

### Listar todos los posts (incluye no publicados)

```bash
curl -X GET "$API_URL/api/posts?published_only=false"
```

### Obtener un post específico por slug

```bash
curl -X GET "$API_URL/api/posts/mi-primer-post"
```

**Output esperado:**
```json
{
  "id": 1,
  "title": "Mi primer post",
  "slug": "mi-primer-post",
  "content": "Contenido completo del post...",
  "excerpt": "Resumen breve",
  "author": "Facundo Zupel",
  "tags": ["seo", "organic-growth"],
  "published": true,
  "created_at": "2025-11-03T10:00:00",
  "updated_at": "2025-11-03T10:00:00"
}
```

### Post no encontrado

```bash
curl -X GET "$API_URL/api/posts/no-existe"
```

**Output esperado:**
```json
{
  "detail": "Post not found"
}
```

---

## 🔐 Posts - Operaciones Admin (requieren autenticación)

### Crear un nuevo post

```bash
curl -X POST "$API_URL/api/admin/posts" \
  -u "admin:$ADMIN_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cómo mejorar tu SEO local en 2025",
    "slug": "como-mejorar-seo-local-2025",
    "content": "## Introducción\n\nEl SEO local es fundamental...\n\n## Estrategias\n\n1. Google My Business\n2. Citations\n3. Reviews",
    "excerpt": "Descubre las mejores estrategias de SEO local para este año",
    "author": "Facundo Zupel",
    "tags": ["seo-local", "google-my-business", "2025"],
    "published": true
  }'
```

**Output esperado:**
```json
{
  "id": 1,
  "title": "Cómo mejorar tu SEO local en 2025",
  "slug": "como-mejorar-seo-local-2025",
  "content": "## Introducción...",
  "excerpt": "Descubre las mejores estrategias...",
  "author": "Facundo Zupel",
  "tags": ["seo-local", "google-my-business", "2025"],
  "published": true,
  "created_at": "2025-11-03T12:34:56.789012",
  "updated_at": "2025-11-03T12:34:56.789012"
}
```

### Crear un post como draft (no publicado)

```bash
curl -X POST "$API_URL/api/admin/posts" \
  -u "admin:$ADMIN_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Borrador: Automatizaciones con Make",
    "slug": "automatizaciones-make",
    "content": "Contenido en construcción...",
    "excerpt": "Próximamente",
    "tags": ["automatización", "make"],
    "published": false
  }'
```

### Crear post con slug duplicado (error)

```bash
curl -X POST "$API_URL/api/admin/posts" \
  -u "admin:$ADMIN_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Otro título",
    "slug": "como-mejorar-seo-local-2025",
    "content": "Contenido...",
    "excerpt": "Resumen"
  }'
```

**Output esperado:**
```json
{
  "detail": "Slug already exists"
}
```

### Actualizar un post existente

```bash
curl -X PUT "$API_URL/api/admin/posts/1" \
  -u "admin:$ADMIN_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cómo mejorar tu SEO local en 2025 [ACTUALIZADO]",
    "content": "## Introducción\n\nEl SEO local es fundamental...\n\n## Nuevas estrategias 2025\n\n1. Google My Business 2.0\n2. Citations con AI\n3. Reviews automation",
    "tags": ["seo-local", "google-my-business", "2025", "actualizado"]
  }'
```

**Output esperado:**
```json
{
  "id": 1,
  "title": "Cómo mejorar tu SEO local en 2025 [ACTUALIZADO]",
  "slug": "como-mejorar-seo-local-2025",
  "content": "## Introducción...\n\n## Nuevas estrategias 2025...",
  "excerpt": "Descubre las mejores estrategias...",
  "author": "Facundo Zupel",
  "tags": ["seo-local", "google-my-business", "2025", "actualizado"],
  "published": true,
  "created_at": "2025-11-03T12:34:56.789012",
  "updated_at": "2025-11-03T13:45:00.123456"
}
```

### Publicar un draft (cambiar published a true)

```bash
curl -X PUT "$API_URL/api/admin/posts/2" \
  -u "admin:$ADMIN_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "published": true
  }'
```

### Actualizar solo algunos campos

```bash
# Solo actualizar tags
curl -X PUT "$API_URL/api/admin/posts/1" \
  -u "admin:$ADMIN_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "tags": ["seo-local", "2025", "trending"]
  }'
```

### Eliminar un post

```bash
curl -X DELETE "$API_URL/api/admin/posts/1" \
  -u "admin:$ADMIN_PASSWORD"
```

**Output esperado:**
```json
{
  "message": "Post deleted successfully"
}
```

### Eliminar post que no existe (error)

```bash
curl -X DELETE "$API_URL/api/admin/posts/999" \
  -u "admin:$ADMIN_PASSWORD"
```

**Output esperado:**
```json
{
  "detail": "Post not found"
}
```

---

## 🔐 Autenticación

### Sin autenticación (error)

```bash
curl -X POST "$API_URL/api/admin/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test",
    "slug": "test",
    "content": "Test",
    "excerpt": "Test"
  }'
```

**Output esperado:**
```json
{
  "detail": "Not authenticated"
}
```

### Con password incorrecto (error)

```bash
curl -X POST "$API_URL/api/admin/posts" \
  -u "admin:password-incorrecto" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test",
    "slug": "test",
    "content": "Test",
    "excerpt": "Test"
  }'
```

**Output esperado:**
```json
{
  "detail": "Incorrect password"
}
```

---

## 🧪 Testing Scripts

### Script bash completo de testing

```bash
#!/bin/bash
# test-api.sh

# Configuración
API_URL="https://cms.facundozupel.com"
ADMIN_PASSWORD="tu-password"

echo "🧪 Testing CMS Service API"
echo "======================================"

# Test 1: Health check
echo -e "\n✅ Test 1: Health Check"
curl -s "$API_URL/health" | jq

# Test 2: Listar posts (vacío al inicio)
echo -e "\n📝 Test 2: Listar posts"
curl -s "$API_URL/api/posts" | jq

# Test 3: Crear post
echo -e "\n➕ Test 3: Crear nuevo post"
curl -s -X POST "$API_URL/api/admin/posts" \
  -u "admin:$ADMIN_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "slug": "test-post",
    "content": "This is a test post content",
    "excerpt": "Test excerpt",
    "tags": ["test"],
    "published": true
  }' | jq

# Test 4: Obtener post por slug
echo -e "\n🔍 Test 4: Obtener post por slug"
curl -s "$API_URL/api/posts/test-post" | jq

# Test 5: Actualizar post
echo -e "\n✏️  Test 5: Actualizar post"
curl -s -X PUT "$API_URL/api/admin/posts/1" \
  -u "admin:$ADMIN_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post [UPDATED]"
  }' | jq

# Test 6: Listar posts (debe aparecer 1)
echo -e "\n📋 Test 6: Listar posts (después de crear)"
curl -s "$API_URL/api/posts" | jq

# Test 7: Eliminar post
echo -e "\n🗑️  Test 7: Eliminar post"
curl -s -X DELETE "$API_URL/api/admin/posts/1" \
  -u "admin:$ADMIN_PASSWORD" | jq

# Test 8: Listar posts (debe estar vacío)
echo -e "\n📭 Test 8: Listar posts (después de eliminar)"
curl -s "$API_URL/api/posts" | jq

echo -e "\n======================================"
echo "✅ Tests completados"
```

### Hacer el script ejecutable

```bash
chmod +x test-api.sh
./test-api.sh
```

---

## 🐍 Testing con Python

### Usando requests

```python
#!/usr/bin/env python3
"""test_api.py - Test CMS Service API"""

import requests
import json

API_URL = "https://cms.facundozupel.com"
ADMIN_PASSWORD = "tu-password"
AUTH = ("admin", ADMIN_PASSWORD)

def test_health():
    """Test health check"""
    print("✅ Test: Health Check")
    r = requests.get(f"{API_URL}/health")
    print(f"Status: {r.status_code}")
    print(f"Response: {r.json()}\n")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"

def test_create_post():
    """Test create post"""
    print("➕ Test: Create Post")
    data = {
        "title": "Test Post from Python",
        "slug": "test-post-python",
        "content": "Content from Python script",
        "excerpt": "Python test",
        "tags": ["python", "test"],
        "published": True
    }
    r = requests.post(
        f"{API_URL}/api/admin/posts",
        auth=AUTH,
        json=data
    )
    print(f"Status: {r.status_code}")
    print(f"Response: {json.dumps(r.json(), indent=2)}\n")
    assert r.status_code == 200
    return r.json()["id"]

def test_get_posts():
    """Test get posts"""
    print("📋 Test: Get Posts")
    r = requests.get(f"{API_URL}/api/posts")
    print(f"Status: {r.status_code}")
    print(f"Found {len(r.json())} posts\n")
    assert r.status_code == 200

def test_get_post_by_slug(slug):
    """Test get post by slug"""
    print(f"🔍 Test: Get Post by slug '{slug}'")
    r = requests.get(f"{API_URL}/api/posts/{slug}")
    print(f"Status: {r.status_code}")
    print(f"Response: {json.dumps(r.json(), indent=2)}\n")
    assert r.status_code == 200

def test_update_post(post_id):
    """Test update post"""
    print(f"✏️  Test: Update Post {post_id}")
    data = {"title": "Test Post UPDATED"}
    r = requests.put(
        f"{API_URL}/api/admin/posts/{post_id}",
        auth=AUTH,
        json=data
    )
    print(f"Status: {r.status_code}")
    print(f"Response: {json.dumps(r.json(), indent=2)}\n")
    assert r.status_code == 200

def test_delete_post(post_id):
    """Test delete post"""
    print(f"🗑️  Test: Delete Post {post_id}")
    r = requests.delete(
        f"{API_URL}/api/admin/posts/{post_id}",
        auth=AUTH
    )
    print(f"Status: {r.status_code}")
    print(f"Response: {r.json()}\n")
    assert r.status_code == 200

if __name__ == "__main__":
    print("🐍 Testing CMS Service API with Python")
    print("=" * 50 + "\n")

    try:
        test_health()
        post_id = test_create_post()
        test_get_posts()
        test_get_post_by_slug("test-post-python")
        test_update_post(post_id)
        test_delete_post(post_id)

        print("=" * 50)
        print("✅ All tests passed!")

    except AssertionError as e:
        print(f"❌ Test failed: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")
```

### Ejecutar

```bash
pip install requests
python test_api.py
```

---

## 🧰 Testing con Postman

### Importar colección

Crear archivo `cms-api.postman_collection.json`:

```json
{
  "info": {
    "name": "CMS Service API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "base_url",
      "value": "https://cms.facundozupel.com"
    },
    {
      "key": "admin_password",
      "value": "tu-password-aqui"
    }
  ],
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/health"
      }
    },
    {
      "name": "Get Posts",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/api/posts"
      }
    },
    {
      "name": "Create Post",
      "request": {
        "method": "POST",
        "auth": {
          "type": "basic",
          "basic": [
            {"key": "username", "value": "admin"},
            {"key": "password", "value": "{{admin_password}}"}
          ]
        },
        "header": [
          {"key": "Content-Type", "value": "application/json"}
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Test Post\",\n  \"slug\": \"test-post\",\n  \"content\": \"Content\",\n  \"excerpt\": \"Excerpt\",\n  \"tags\": [\"test\"],\n  \"published\": true\n}"
        },
        "url": "{{base_url}}/api/admin/posts"
      }
    }
  ]
}
```

Importar en Postman: **File → Import → Select file**

---

## 📊 Testing de Performance

### Apache Bench (ab)

```bash
# Install
sudo apt install apache2-utils  # Ubuntu
brew install ab                  # macOS

# Test 100 requests, 10 concurrent
ab -n 100 -c 10 https://cms.facundozupel.com/health

# Test con autenticación
ab -n 100 -c 10 -A admin:password https://cms.facundozupel.com/api/posts
```

### wrk (más avanzado)

```bash
# Install
brew install wrk  # macOS

# Test durante 30 segundos, 10 threads, 100 connections
wrk -t10 -c100 -d30s https://cms.facundozupel.com/health

# Test de POST
wrk -t10 -c100 -d30s \
  -s post.lua \
  https://cms.facundozupel.com/api/posts
```

---

## 🔍 Monitoring

### Healthcheck continuo

```bash
# Check cada 30 segundos
watch -n 30 curl -s https://cms.facundozupel.com/health
```

### Crear cron job para alertas

```bash
# Agregar a crontab
*/5 * * * * curl -f https://cms.facundozupel.com/health || echo "API DOWN" | mail -s "CMS API Alert" tu@email.com
```

---

**Última actualización**: 2025-11-03
