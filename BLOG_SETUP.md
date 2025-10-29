# Setup del Blog Dinámico

Guía rápida para configurar y usar el blog dinámico con API y autenticación JWT.

---

## Características

✅ **Blog Dinámico** con API backend
✅ **SSR (Server-Side Rendering)** con Astro + Node.js adapter
✅ **Autenticación JWT** con usuario/password
✅ **Almacenamiento JSON** (sin base de datos externa)
✅ **Validación con Zod** en todos los endpoints
✅ **API REST** documentada con ejemplos

---

## Setup Inicial

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno (Opcional)

```bash
cp .env.example .env
```

Editar `.env` y configurar:

```env
JWT_SECRET=tu-secreto-generado-aleatorio
```

Para generar un secreto aleatorio:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Configurar Estructura de Data

```bash
# Copiar archivos de ejemplo
cp data/users.example.json data/users.json
cp data/articles.example.json data/articles.json
```

### 4. Configurar Password del Admin

```bash
node scripts/setup-admin-password.js tu-password-seguro
```

Este script:
- Genera un hash bcrypt del password
- Actualiza `data/users.json` con el hash
- Muestra las credenciales finales

---

## Uso

### Iniciar Servidor de Desarrollo

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:4321`

### Páginas Disponibles

- **Homepage**: `http://localhost:4321/`
- **Blog**: `http://localhost:4321/blog`
- **Artículo**: `http://localhost:4321/blog/[slug]`

### API Endpoints

Ver **API_GUIDE.md** para documentación completa.

**Endpoints principales:**

- `POST /api/auth/login` - Login y obtener JWT token
- `GET /api/articles` - Listar artículos (público)
- `GET /api/articles?published=true` - Solo artículos publicados
- `POST /api/articles` - Crear artículo (requiere JWT)

---

## Crear tu Primer Artículo

### Opción 1: Usando cURL

```bash
# 1. Login y obtener token
TOKEN=$(curl -s -X POST http://localhost:4321/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"tu-password"}' \
  | jq -r '.token')

# 2. Crear artículo
curl -X POST http://localhost:4321/api/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Mi Primer Artículo",
    "slug": "mi-primer-articulo",
    "description": "Este es mi primer artículo usando la API del blog dinámico",
    "content": "<h2>Introducción</h2><p>Contenido del artículo...</p>",
    "author": "Facundo Zupel",
    "tags": ["test", "primeros-pasos"],
    "draft": false
  }'

# 3. Ver el artículo
open http://localhost:4321/blog/mi-primer-articulo
```

### Opción 2: Usando Postman o Insomnia

1. **Login**
   - Method: POST
   - URL: `http://localhost:4321/api/auth/login`
   - Body (JSON):
     ```json
     {
       "username": "admin",
       "password": "tu-password"
     }
     ```
   - Copiar el `token` de la respuesta

2. **Crear Artículo**
   - Method: POST
   - URL: `http://localhost:4321/api/articles`
   - Headers:
     - `Authorization`: `Bearer <token-copiado>`
     - `Content-Type`: `application/json`
   - Body (JSON): Ver ejemplo en API_GUIDE.md

---

## Estructura de Archivos

```
/
├── data/                      # Almacenamiento JSON
│   ├── articles.json          # Artículos del blog
│   ├── users.json             # Usuarios (solo admin por ahora)
│   ├── articles.example.json # Ejemplo de estructura
│   └── users.example.json    # Ejemplo de estructura
│
├── src/
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── login.ts      # Endpoint de login
│   │   │   └── articles.ts       # Endpoints de artículos
│   │   ├── blog/
│   │   │   ├── index.astro       # Listado de artículos
│   │   │   └── [slug].astro      # Artículo individual
│   │
│   ├── schemas/
│   │   ├── article.schema.ts     # Validación de artículos
│   │   └── auth.schema.ts        # Validación de auth
│   │
│   ├── types/
│   │   ├── article.ts            # Tipos de artículos
│   │   └── user.ts               # Tipos de usuarios
│   │
│   └── utils/
│       ├── storage.ts            # Lectura/escritura JSON
│       ├── articles.ts           # Operaciones de artículos
│       ├── users.ts              # Operaciones de usuarios
│       ├── jwt.ts                # Generación/verificación JWT
│       └── auth.ts               # Middleware de auth
│
├── scripts/
│   └── setup-admin-password.js  # Script para config password
│
├── API_GUIDE.md              # Documentación completa de la API
└── BLOG_SETUP.md             # Este archivo
```

---

## Validaciones

### Artículo

- **title**: 3-200 caracteres
- **slug**: 3-200 caracteres, solo minúsculas, números y `-`
- **description**: 10-500 caracteres
- **content**: mínimo 50 caracteres, puede incluir HTML
- **author**: mínimo 2 caracteres
- **tags**: 1-10 tags
- **draft**: boolean (default: false)
- **image**: URL válida (opcional)

---

## Build para Producción

```bash
npm run build
```

El build generará archivos en `dist/` para desplegar en tu VPS.

### Iniciar en Producción

```bash
# Después del build
npm run preview

# O en VPS con Node.js
node dist/server/entry.mjs
```

---

## Troubleshooting

### Error: "User not found" al hacer login

**Causa**: Archivo `data/users.json` no existe o está mal formado.

**Solución**:
```bash
cp data/users.example.json data/users.json
node scripts/setup-admin-password.js nuevo-password
```

### Error: "Unauthorized" al crear artículo

**Causa**: Token JWT inválido o expirado.

**Solución**: Vuelve a hacer login y obtén un nuevo token.

### Error al leer archivos JSON

**Causa**: Archivos `data/articles.json` o `data/users.json` no existen.

**Solución**:
```bash
echo '[]' > data/articles.json
cp data/users.example.json data/users.json
```

---

## Próximos Pasos

1. ✅ Configurar password del admin
2. ✅ Crear primer artículo de prueba
3. ✅ Verificar que se muestra en `/blog`
4. 📋 Configurar JWT_SECRET en `.env`
5. 🚀 Deploy a VPS cuando esté listo

---

## Recursos

- **API Guide**: Ver `API_GUIDE.md` para documentación completa de la API
- **Planning**: Ver `planning.md` para decisiones técnicas y roadmap del proyecto
- **PRD**: Ver `PRD.md` para requirements completos del proyecto

---

**Versión**: 1.0
**Fecha**: 2025-10-28
**Proyecto**: Landing Page Organic Growth - Facundo Zupel
