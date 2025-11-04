# Quick Start - Deployment desde VPS

Guía rápida para deployar el proyecto directamente desde tu VPS clonando desde GitHub.

---

## 🚀 Pasos Rápidos

### 1. Conectar a tu VPS

```bash
ssh usuario@tu-vps-ip
```

### 2. Clonar el Repositorio

```bash
# Clonar repo
cd ~
git clone https://github.com/facundozupel/proyecto_personal.git
cd proyecto_personal

# O si ya lo tienes clonado, actualizar
cd ~/proyecto_personal
git pull origin main
```

### 3. Configurar Variables de Entorno

```bash
# Copiar template
cp .env.production.example .env.production

# Editar con tus valores reales
nano .env.production
```

**Variables importantes a configurar:**
```bash
ADMIN_PASSWORD=tu_password_super_seguro_aqui
ALLOWED_ORIGINS=https://facundogrowth.com,https://www.facundogrowth.com
CMS_API_URL=https://api.facundogrowth.com
```

Guardar: `Ctrl + O`, `Enter`, `Ctrl + X`

### 4. Build de Imágenes en la VPS

```bash
# Build Frontend
docker build -t facundozupel/frontend:latest -f Dockerfile .

# Build Backend
docker build -t facundozupel/cms-service:latest -f cms-service/Dockerfile ./cms-service
```

**Tiempo estimado**: 5-10 minutos dependiendo de tu VPS

### 5. Verificar que Docker Swarm esté Inicializado

```bash
# Verificar estado
docker info | grep Swarm

# Si dice "Swarm: inactive", inicializar:
docker swarm init

# Crear red si no existe
docker network create --driver overlay network_public || true
```

### 6. Deploy del Stack

```bash
# Dar permisos al script
chmod +x scripts/deploy-vps.sh

# Deploy completo (frontend + backend)
./scripts/deploy-vps.sh latest

# O solo backend si lo prefieres
# ./scripts/deploy-vps.sh latest docker-stack-cms.yml
```

### 7. Verificar Deployment

```bash
# Ver servicios
docker service ls

# Debe mostrar algo como:
# NAME                       MODE         REPLICAS   IMAGE
# facundogrowth_frontend     replicated   2/2        facundozupel/frontend:latest
# facundogrowth_cms-service  replicated   2/2        facundozupel/cms-service:latest

# Ver logs en tiempo real
docker service logs -f facundogrowth_frontend
docker service logs -f facundogrowth_cms-service
```

### 8. Verificar en el Navegador

Espera 1-2 minutos y luego visita:

- **Frontend**: https://facundogrowth.com
- **API**: https://api.facundogrowth.com
- **API Docs**: https://api.facundogrowth.com/docs

---

## 🔄 Actualizar después de cambios

```bash
# 1. SSH a VPS
ssh usuario@tu-vps-ip

# 2. Ir al directorio del proyecto
cd ~/proyecto_personal

# 3. Pull de cambios
git pull origin main

# 4. Rebuild imágenes
docker build -t facundozupel/frontend:latest -f Dockerfile .
docker build -t facundozupel/cms-service:latest -f cms-service/Dockerfile ./cms-service

# 5. Actualizar servicios
docker service update --image facundozupel/frontend:latest --force facundogrowth_frontend
docker service update --image facundozupel/cms-service:latest --force facundogrowth_cms-service

# 6. Ver progreso
watch docker service ls
```

---

## 📊 Comandos Útiles

```bash
# Ver estado de servicios
docker service ls

# Ver réplicas en detalle
docker service ps facundogrowth_frontend
docker service ps facundogrowth_cms-service

# Ver logs
docker service logs -f facundogrowth_frontend
docker service logs -f facundogrowth_cms-service

# Escalar servicios
docker service scale facundogrowth_frontend=3
docker service scale facundogrowth_cms-service=3

# Reiniciar servicio
docker service update --force facundogrowth_frontend

# Remover stack completo
docker stack rm facundogrowth
```

---

## ⚠️ Prerequisitos en la VPS

Antes de empezar, asegúrate de tener:

### 1. Docker Instalado

```bash
# Verificar
docker --version

# Si no está instalado:
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Cerrar sesión y volver a conectar
```

### 2. Traefik Corriendo

```bash
# Verificar
docker service ls | grep traefik

# Si no está, necesitas desplegarlo primero
# Ver DEPLOYMENT.md sección "Configuración Inicial VPS"
```

### 3. DNS Configurado

Verifica que estos dominios apunten a tu VPS:

```bash
# Verificar DNS
dig facundogrowth.com +short
dig api.facundogrowth.com +short

# Ambos deben retornar la IP de tu VPS
```

### 4. Puertos Abiertos

- Puerto 80 (HTTP)
- Puerto 443 (HTTPS)
- Puerto 2377 (Docker Swarm)

```bash
# Verificar firewall
sudo ufw status

# Si es necesario, abrir puertos:
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 2377/tcp
```

---

## 🐛 Troubleshooting Rápido

### Servicios no inician (0/2 réplicas)

```bash
# Ver por qué fallan
docker service ps facundogrowth_frontend --no-trunc

# Ver logs detallados
docker service logs facundogrowth_frontend
```

### Error: "network not found"

```bash
# Crear la red
docker network create --driver overlay network_public

# Re-deploy
./scripts/deploy-vps.sh
```

### Certificados SSL no se generan

```bash
# Verificar DNS primero
dig facundogrowth.com +short
dig api.facundogrowth.com +short

# Ver logs de Traefik
docker service logs traefik_traefik | grep -i acme

# Asegúrate que el email en Traefik es válido
```

### Build falla por falta de espacio

```bash
# Limpiar imágenes viejas
docker system prune -a -f

# Verificar espacio
df -h
```

---

## 📝 Checklist Pre-Deployment

- [ ] Docker instalado en VPS
- [ ] Docker Swarm inicializado (`docker swarm init`)
- [ ] Traefik desplegado y corriendo
- [ ] Red `network_public` creada
- [ ] DNS configurado (facundogrowth.com → IP VPS)
- [ ] DNS configurado (api.facundogrowth.com → IP VPS)
- [ ] Puertos 80, 443 abiertos
- [ ] Repositorio clonado en VPS
- [ ] `.env.production` configurado con valores reales

---

## ⏱️ Tiempo Estimado

| Paso | Tiempo |
|------|--------|
| Clonar repo | 1 min |
| Configurar .env | 2 min |
| Build imágenes | 5-10 min |
| Deploy stack | 2 min |
| Servicios operativos | 1-2 min |
| **TOTAL** | **~15 minutos** |

---

## 🎯 Siguiente Paso

Una vez deployado, puedes:

1. **Crear posts de blog** vía API:
   ```bash
   curl -X POST https://api.facundogrowth.com/api/admin/posts \
     -u admin:tu_password \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Mi Primer Post",
       "slug": "mi-primer-post",
       "content": "Contenido del post...",
       "excerpt": "Resumen",
       "tags": ["growth", "seo"]
     }'
   ```

2. **Monitorear con logs**:
   ```bash
   docker service logs -f facundogrowth_frontend
   ```

3. **Escalar si es necesario**:
   ```bash
   docker service scale facundogrowth_frontend=4
   ```

---

**Para más detalles, consulta**: `DEPLOYMENT.md`

**Última actualización**: 2025-11-04
