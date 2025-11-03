# Plan de Deploy - Proyecto Personal

## ✅ Completado

- ✅ Código pusheado a GitHub (commit: aba9d98)
- ✅ CMS Service creado y documentado
- ✅ Documentación actualizada con arquitectura correcta
- ✅ Infraestructura de base de datos eliminada

---

## 🚀 Deploys Necesarios

### 1. CMS Service (Blog API) - BACKEND

**Prioridad**: Alta
**Tecnología**: FastAPI (Python 3.11)
**Puerto**: 8001

#### Archivos a deployar:
```
cms-service/
├── app/
│   └── main.py          # FastAPI app completa
├── requirements.txt     # Dependencias Python
├── Dockerfile          # Containerización
└── README.md           # Documentación
```

#### Variables de entorno necesarias:
```bash
ADMIN_PASSWORD=tu_password_seguro_aqui
ALLOWED_ORIGINS=https://tudominio.com,https://www.tudominio.com
```

#### Opciones de deploy:

**Opción A: VPS (Recomendado si ya tienes)**
- Deploy con Docker
- Usar Nginx como reverse proxy
- SSL con Certbot/Let's Encrypt
- Costo: Ya incluido en tu VPS

**Opción B: Plataformas Cloud (Más rápido)**
- Render.com (Free tier disponible)
- Railway.app (Pay-as-you-go)
- Fly.io (Bueno para FastAPI)
- DigitalOcean App Platform ($5/mes)

#### Pasos básicos (cualquier plataforma):

1. **Conectar repo de GitHub**
2. **Configurar variables de entorno**
   - `ADMIN_PASSWORD`
   - `ALLOWED_ORIGINS`
3. **Especificar puerto 8001**
4. **Deploy automático**

#### Endpoints disponibles después del deploy:

```
https://tu-cms-api.com/              → Info del servicio
https://tu-cms-api.com/health        → Health check
https://tu-cms-api.com/docs          → Swagger UI
https://tu-cms-api.com/api/posts     → Lista de posts (público)
https://tu-cms-api.com/api/posts/{slug} → Post por slug (público)

# Con autenticación:
https://tu-cms-api.com/api/admin/posts → CRUD de posts
```

---

### 2. Frontend (Astro + React) - Ya deployado o en proceso

**Nota**: El frontend ya debería estar funcionando. Si aún no, opciones:
- Vercel (Recomendado para Astro)
- Netlify
- Cloudflare Pages

**Importante**: Después de deployar el CMS Service, actualizar la URL en:
```typescript
// src/config/api.ts
export const CMS_API_URL = 'https://tu-cms-api.com'
```

---

## 🔄 Flujo de Datos Actual

```
Usuario → Frontend (Astro) → CMS Service API → In-Memory Storage
                           ↓
                    Webhook Externo → Google Sheets
```

---

## 📋 Roadmap de Mejoras (Post-Deploy)

### Corto plazo:
1. ✅ Deploy de CMS Service
2. [ ] Actualizar frontend con URL del CMS
3. [ ] Testear endpoints en producción
4. [ ] Poblar posts iniciales vía API

### Mediano plazo:
1. [ ] Migrar storage de CMS a Google Sheets
2. [ ] Crear panel admin web para el blog
3. [ ] Agregar búsqueda full-text
4. [ ] Soporte para imágenes en posts

### Largo plazo:
1. [ ] Versionado de posts
2. [ ] Scheduled publishing
3. [ ] Analytics integration
4. [ ] SEO automático

---

## 🛠️ Testing del Deploy

Una vez deployado, testear con:

```bash
# Health check
curl https://tu-cms-api.com/health

# Listar posts (sin posts aún, debería retornar [])
curl https://tu-cms-api.com/api/posts

# Crear primer post
curl -X POST https://tu-cms-api.com/api/admin/posts \
  -u admin:tu_password \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi primer post",
    "slug": "mi-primer-post",
    "content": "Este es el contenido de mi primer post desde la API",
    "excerpt": "Resumen del post",
    "tags": ["tech", "blog"]
  }'

# Verificar que se creó
curl https://tu-cms-api.com/api/posts/mi-primer-post
```

---

## 💰 Estimación de Costos

### Opción VPS (tu actual):
- **CMS Service**: $0 (corre en tu VPS existente)
- **Total**: $0

### Opción Cloud:
- **CMS Service en Render.com**: $0 (free tier) o $7/mes (hobby)
- **CMS Service en Railway**: ~$5/mes (pay-as-you-go)
- **CMS Service en Fly.io**: ~$3-5/mes
- **Frontend en Vercel**: $0 (hobby tier)
- **Total**: $0-7/mes

---

## 🆘 ¿Necesitas ayuda con algún deploy específico?

Puedo ayudarte con:

1. **Configuración de Nginx** (si usas VPS)
2. **Docker Compose** para VPS
3. **Configuración específica de Render/Railway/Fly**
4. **SSL/HTTPS setup**
5. **CI/CD con GitHub Actions**

---

**Última actualización**: 2025-11-03
**Commit actual**: aba9d98
