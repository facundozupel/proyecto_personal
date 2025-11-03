# CMS Service - Blog API

Microservicio FastAPI para gestión programática del blog.

## Características

- ✅ CRUD completo de posts
- ✅ Autenticación básica para endpoints de admin
- ✅ API REST con FastAPI
- ✅ CORS configurado
- ✅ Documentación automática (Swagger)

## Endpoints

### Públicos (sin autenticación)

- `GET /` - Info del servicio
- `GET /health` - Health check
- `GET /api/posts` - Listar posts publicados
- `GET /api/posts/{slug}` - Obtener post por slug

### Admin (requiere autenticación)

- `POST /api/admin/posts` - Crear post
- `PUT /api/admin/posts/{id}` - Actualizar post
- `DELETE /api/admin/posts/{id}` - Eliminar post

## Uso Local

### Instalación

```bash
cd cms-service
pip install -r requirements.txt
```

### Ejecutar

```bash
# Desarrollo
uvicorn app.main:app --reload --port 8001

# Con variable de entorno para password
ADMIN_PASSWORD=tu_password uvicorn app.main:app --reload --port 8001
```

### Con Docker

```bash
docker build -t cms-service .
docker run -p 8001:8001 -e ADMIN_PASSWORD=tu_password cms-service
```

## Documentación API

Una vez corriendo, visita:
- Swagger UI: http://localhost:8001/docs
- ReDoc: http://localhost:8001/redoc

## Variables de Entorno

- `ADMIN_PASSWORD` - Password para endpoints de admin (default: "changeme")
- `ALLOWED_ORIGINS` - URLs permitidas para CORS, separadas por coma (default: "http://localhost:4321")

## Roadmap

- [ ] Migrar storage a Google Sheets
- [ ] Agregar búsqueda full-text
- [ ] Soporte para imágenes
- [ ] Versionado de posts
- [ ] Scheduled publishing
