# Guía del Panel de Administración

Interfaz gráfica completa para gestionar los posts del blog.

---

## 🎉 ¿Qué se creó?

✅ **Panel de Administración completo** en `/admin`
✅ **Página de Login** con autenticación JWT
✅ **Dashboard** para ver todos los artículos
✅ **Formulario visual** para crear artículos
✅ **Responsive** y fácil de usar

---

## 🚀 Cómo Acceder

### 1. Iniciar el servidor

```bash
npm run dev
```

El servidor estará en: **http://localhost:4321**

### 2. Ir al panel de administración

**URL**: http://localhost:4321/admin/login

### 3. Credenciales de acceso

- **Usuario**: `admin`
- **Contraseña**: `admin123`

---

## 📝 Cómo Crear un Artículo

### Paso 1: Login

1. Ve a http://localhost:4321/admin/login
2. Ingresa usuario: `admin`
3. Ingresa contraseña: `admin123`
4. Click en "Iniciar Sesión"

### Paso 2: Ir al formulario de nuevo artículo

- Serás redirigido automáticamente al dashboard
- Click en el botón azul **"+ Nuevo Artículo"**

### Paso 3: Llenar el formulario

**Campos obligatorios:**

1. **Título** (3-200 caracteres)
   - Ejemplo: "Cómo Implementar Organic Growth en tu Negocio"

2. **Slug (URL)** (se genera automáticamente del título)
   - Solo minúsculas, números y guiones
   - Ejemplo: `como-implementar-organic-growth`
   - ✨ Se genera solo mientras escribes el título

3. **Descripción** (10-500 caracteres)
   - Para SEO y preview en redes sociales
   - Ejemplo: "Descubre las mejores estrategias para hacer crecer tu negocio de forma orgánica sin aumentar tu presupuesto publicitario."

4. **Contenido (HTML)**
   - Puedes usar HTML completo
   - Ejemplo:
     ```html
     <h2>Introducción</h2>
     <p>El organic growth es...</p>

     <h3>Beneficios principales</h3>
     <ul>
       <li>Reduce costos publicitarios</li>
       <li>Aumenta la retención de clientes</li>
       <li>Mejora el ROI</li>
     </ul>

     <h3>Estrategias clave</h3>
     <p>Las estrategias más efectivas son...</p>
     ```

5. **Autor** (pre-llenado con "Facundo Zupel")
   - Puedes cambiarlo si quieres

6. **Tags** (separados por comas)
   - Ejemplo: `organic-growth, marketing, automatización`

**Campos opcionales:**

7. **URL de Imagen**
   - URL completa de la imagen destacada
   - Ejemplo: `https://ejemplo.com/imagen.jpg`

8. **Guardar como borrador**
   - Marca este checkbox si NO quieres publicar aún
   - Desmárcalo para publicar inmediatamente

### Paso 4: Publicar

- Click en **"Publicar Artículo"** (botón azul)
- Espera el mensaje de éxito
- Serás redirigido automáticamente al dashboard

### Paso 5: Verificar

1. Ve al dashboard: http://localhost:4321/admin
2. Verás tu artículo listado
3. Click en **"Ver"** para verlo en el blog público
4. O ve directamente a: http://localhost:4321/blog

---

## 🎨 Características del Panel

### Dashboard (`/admin`)

- **Lista todos los artículos** (más recientes primero)
- Muestra **estado**: Publicado (verde) o Borrador (amarillo)
- Muestra **fecha, autor y tags**
- Botón **"Ver"** para abrir el artículo en el blog
- Botón **"Cerrar sesión"** en el header
- Botón **"+ Nuevo Artículo"** para crear posts

### Formulario de Nuevo Artículo (`/admin/new`)

- ✨ **Generación automática de slug** mientras escribes el título
- **Validación en tiempo real**:
  - Título: 3-200 caracteres
  - Slug: solo minúsculas, números y guiones
  - Descripción: 10-500 caracteres
  - Contenido: mínimo 50 caracteres
  - Tags: al menos 1 tag requerido
- **Mensajes de error claros**
- **Confirmación de éxito** antes de redireccionar
- Botón **"Cancelar"** para volver sin guardar

### Seguridad

- 🔐 Requiere **login** para acceder
- 🔑 Usa **JWT tokens** (válidos por 7 días)
- 🛡️ La API está **protegida** con autenticación
- ⏱️ Si el token expira, debes hacer login nuevamente

---

## 🔧 Gestión de Usuarios

### Cambiar la Contraseña del Admin

```bash
node scripts/setup-admin-password.js nueva-password-segura
```

Esto actualizará el password del usuario admin en `data/users.json`.

---

## 📂 Estructura de Archivos Creados

```
/
├── src/
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── index.astro        # Dashboard
│   │   │   ├── login.astro        # Página de login
│   │   │   └── new.astro          # Formulario de nuevo artículo
│   │
│   └── utils/
│       └── client-auth.ts         # Utilidades de autenticación del cliente
│
├── data/
│   ├── articles.json              # Tus artículos se guardan aquí
│   └── users.json                 # Usuario admin
│
└── ADMIN_PANEL_GUIDE.md          # Esta guía
```

---

## 📋 Ejemplos de Uso

### Ejemplo 1: Artículo Simple

**Título**: "5 Tips para Aumentar tu Tráfico Orgánico"

**Slug**: `5-tips-para-aumentar-trafico-organico` (se genera solo)

**Descripción**: "Aprende 5 estrategias probadas para duplicar tu tráfico web sin pagar por publicidad."

**Contenido**:
```html
<h2>Introducción</h2>
<p>El tráfico orgánico es esencial para cualquier negocio online...</p>

<h3>1. Optimiza tu SEO On-Page</h3>
<p>El SEO on-page incluye...</p>

<h3>2. Crea Contenido de Calidad</h3>
<p>El contenido de calidad atrae...</p>

<!-- ... más secciones ... -->

<h2>Conclusión</h2>
<p>Implementando estos 5 tips podrás...</p>
```

**Tags**: `seo, organic-growth, marketing-digital`

### Ejemplo 2: Artículo con Imágenes

**Título**: "Caso de Éxito: Cómo Aumentamos las Conversiones en 300%"

**Contenido**:
```html
<h2>El Desafío</h2>
<p>Nuestro cliente tenía un problema de conversión...</p>

<img src="https://ejemplo.com/grafico-antes.jpg" alt="Conversiones antes de la optimización" />

<h2>La Solución</h2>
<p>Implementamos las siguientes estrategias...</p>

<img src="https://ejemplo.com/grafico-despues.jpg" alt="Conversiones después de la optimización" />

<h2>Los Resultados</h2>
<ul>
  <li>+300% en conversiones</li>
  <li>-40% en costo de adquisición</li>
  <li>+150% en ROI</li>
</ul>
```

---

## ⚠️ Importante

### Borradores vs Publicados

- ✅ **Publicado** (draft = false): Aparece en el blog público
- 📝 **Borrador** (draft = true): Solo visible en el admin, NO aparece en el blog

### Seguridad para Deploy

Cuando despliegues a producción:

1. **Cambia la contraseña del admin**:
   ```bash
   node scripts/setup-admin-password.js password-super-seguro-largo
   ```

2. **Configura JWT_SECRET** en `.env`:
   ```bash
   JWT_SECRET=genera-un-secreto-aleatorio-largo-aqui
   ```

3. Considera agregar:
   - Rate limiting en el login
   - CAPTCHA después de 3 intentos fallidos
   - IP whitelist si solo tú accederás

---

## 🐛 Troubleshooting

### No puedo hacer login

**Síntoma**: "Invalid credentials" o "User not found"

**Solución**:
```bash
node scripts/setup-admin-password.js admin123
```

### El token expiró

**Síntoma**: Te redirige al login automáticamente

**Solución**: Simplemente vuelve a hacer login. Los tokens duran 7 días.

### No aparece mi artículo en el blog

**Causa**: Lo guardaste como borrador

**Solución**: Los borradores (draft = true) no aparecen en el blog público. Solo son visibles en el admin.

---

## 🎯 Próximos Pasos (Opcionales)

Si quieres mejorar el panel, podrías agregar:

1. ✏️ **Editar artículos existentes** (`/admin/edit/[slug]`)
2. 🗑️ **Eliminar artículos** (con confirmación)
3. 📊 **Vista previa** antes de publicar
4. 🖼️ **Subir imágenes** directamente al servidor
5. 📝 **Editor WYSIWYG** (TinyMCE, Quill, etc.)
6. 📈 **Estadísticas** de visualizaciones por artículo

---

## 📞 URLs Importantes

- **Login**: http://localhost:4321/admin/login
- **Dashboard**: http://localhost:4321/admin
- **Nuevo Artículo**: http://localhost:4321/admin/new
- **Blog Público**: http://localhost:4321/blog
- **API Login**: http://localhost:4321/api/auth/login
- **API Artículos**: http://localhost:4321/api/articles

---

**¡Ya tienes todo listo para empezar a crear contenido para tu blog!** 🚀

Para crear tu primer artículo real, simplemente:
1. Ve a http://localhost:4321/admin/login
2. Login con `admin` / `admin123`
3. Click en "Nuevo Artículo"
4. Escribe y publica

**¡Disfruta tu nuevo panel de administración!** ✨
