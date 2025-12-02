# Scripts de Blog

Esta carpeta contiene scripts útiles para gestionar el blog vía API.

## Scripts disponibles

### 1. `create-blog-post.js` (Interactivo)

Script Node.js interactivo que te guía paso a paso para crear un post.

**Uso:**
```bash
node scripts/create-blog-post.js
```

El script te pedirá:
- Título
- Descripción
- Tags (separados por coma)
- Tiempo de lectura
- Contenido (escribe "FIN" cuando termines)
- Credenciales (usuario/password)

**Ventajas:**
- ✅ Interfaz amigable
- ✅ No requiere conocimientos de JSON o curl
- ✅ Perfecto para crear posts ocasionales

---

### 2. `create-post-from-json.sh` (Desde archivo)

Crea un post desde un archivo JSON predefinido.

**Uso:**
```bash
./scripts/create-post-from-json.sh scripts/ejemplo-post.json
```

**Formato del archivo JSON:**
```json
{
  "title": "Título del Post",
  "description": "Descripción corta",
  "content": "## Título\n\nContenido en Markdown...",
  "tags": ["tag1", "tag2"],
  "readTime": "5 minutos"
}
```

**Ventajas:**
- ✅ Perfecto para posts preparados con anticipación
- ✅ Fácil de versionar en Git
- ✅ Permite revisión antes de publicar
- ✅ Ideal para procesar múltiples posts

**Ejemplo incluido:**
- `ejemplo-post.json` - Post completo sobre Organic Growth

---

### 3. `create-post-curl.sh` (Con curl)

Script bash que usa curl directamente.

**Uso:**
```bash
./scripts/create-post-curl.sh "Título del Post" "Descripción" "tag1,tag2,tag3"
```

Luego pega el contenido Markdown y presiona `Ctrl+D` cuando termines.

**Ventajas:**
- ✅ Rápido para posts cortos
- ✅ No requiere archivo JSON
- ✅ Útil para prototipar

---

## Configuración

### Variables de entorno

Los scripts usan la password definida en `.env`:

```bash
ADMIN_PASSWORD=tu_password_aqui
```

Si no está definida, usan `dev_password_123` por defecto.

### Cambiar password temporalmente

```bash
ADMIN_PASSWORD=otra_password ./scripts/create-post-from-json.sh ejemplo.json
```

---

## Ejemplos de uso

### Crear post rápido

```bash
# Opción 1: Interactivo
node scripts/create-blog-post.js

# Opción 2: Con curl (más rápido)
./scripts/create-post-curl.sh \
  "Cómo hacer SEO Local" \
  "Guía completa de SEO Local para negocios" \
  "seo,local,marketing"
# Luego pega el contenido y Ctrl+D
```

### Crear post desde archivo preparado

```bash
# 1. Crea tu post en un archivo JSON
cat > mi-post.json << 'EOF'
{
  "title": "Mi Nuevo Post",
  "description": "Descripción del post",
  "content": "## Introducción\n\nContenido aquí...",
  "tags": ["seo", "marketing"]
}
EOF

# 2. Créalo vía API
./scripts/create-post-from-json.sh mi-post.json
```

### Usar el post de ejemplo

```bash
# El repo incluye un post de ejemplo completo
./scripts/create-post-from-json.sh scripts/ejemplo-post.json
```

---

## Gestión de posts existentes

### Listar todos los posts

```bash
curl -u admin:dev_password_123 http://localhost:4321/api/admin/posts | python3 -m json.tool
```

### Obtener un post específico

```bash
curl -u admin:dev_password_123 \
  http://localhost:4321/api/admin/posts/mi-slug | python3 -m json.tool
```

### Actualizar un post

```bash
curl -u admin:dev_password_123 \
  -X PUT http://localhost:4321/api/admin/posts/mi-slug \
  -H "Content-Type: application/json" \
  -d '{"title": "Título actualizado"}'
```

### Eliminar un post

```bash
curl -u admin:dev_password_123 \
  -X DELETE http://localhost:4321/api/admin/posts/mi-slug
```

---

## Formato del contenido

Los posts usan **Markdown** para el contenido. Ejemplos:

```markdown
## Título de sección

Párrafo normal con **negritas** y *cursivas*.

### Subsección

- Lista de puntos
- Otro punto

### Código

\`\`\`javascript
const ejemplo = "código";
\`\`\`

### Links

[Texto del link](https://ejemplo.com)

### Imágenes

![Alt text](/ruta/imagen.jpg)
```

---

## Tips y mejores prácticas

### Estructura recomendada

```markdown
## Introducción

Hook que capture atención + contexto + preview del contenido

## Sección Principal 1

Contenido con subtítulos (###) para mejor legibilidad

### Subsección 1.1

Detalles específicos

## Sección Principal 2

Más contenido

## Conclusión

Resumen + CTA (call to action)
```

### SEO

- **Título**: 50-60 caracteres, incluye keyword principal
- **Descripción**: 150-160 caracteres, persuasiva y con keyword
- **Tags**: 3-7 tags relevantes
- **Headers**: Usa jerarquía H2 > H3 > H4
- **Contenido**: Mínimo 1000 palabras para SEO óptimo

### Tiempo de lectura

Calcula aproximadamente:
- **200 palabras** = 1 minuto
- **1000 palabras** = 5 minutos
- **2000 palabras** = 10 minutos

---

## Solución de problemas

### Error: "Post already exists"

```json
{
  "success": false,
  "error": "Post with slug \"mi-slug\" already exists"
}
```

**Solución**: El slug ya existe. Cambia el título o especifica un slug diferente en el JSON:

```json
{
  "title": "Mi Post",
  "slug": "mi-post-v2",
  ...
}
```

### Error: "Unauthorized"

```json
{"error": "Invalid credentials"}
```

**Solución**: Verifica que:
1. El servidor esté corriendo (`npm run dev`)
2. La password en `.env` sea correcta
3. Estés usando el usuario correcto (`admin`)

### Error: "Connection refused"

```
curl: (7) Failed to connect to localhost port 4321
```

**Solución**: El servidor no está corriendo. Ejecuta:

```bash
npm run dev
```

---

## Ver documentación completa

Para referencia completa de la API, ver:
- **BLOG_API_REFERENCE.md** - Documentación completa de endpoints
- **API_BLOG_GUIDE.md** - Guía de implementación (si existe)

---

## Contribuir

Si creas un script útil, agrégalo a esta carpeta y documéntalo aquí.
