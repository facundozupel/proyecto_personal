# Guía de Deployment - Proyecto Personal

Documentación completa para deployar el proyecto (Frontend + CMS Service) en producción.

---

## 📋 Tabla de Contenidos

1. [Introducción y Opciones](#introducción-y-opciones)
2. [Quick Start - Deploy desde VPS](#quick-start---deploy-desde-vps)
3. [Guía Completa Paso a Paso](#guía-completa-paso-a-paso)
4. [Referencia Rápida de Comandos](#referencia-rápida-de-comandos)
5. [Checklist de Deployment](#checklist-de-deployment)
6. [Troubleshooting](#troubleshooting)
7. [Actualización y Rollback](#actualización-y-rollback)
8. [Mejores Prácticas de Seguridad](#mejores-prácticas-de-seguridad)

---

## 🎯 Introducción y Opciones

### Servicios a Deployar

#### 1. CMS Service (Blog API) - Backend
- **Tecnología**: FastAPI (Python 3.11)
- **Puerto**: 8001
- **Storage**: In-memory (migración a Google Sheets pendiente)

#### 2. Frontend (Astro + React)
- **Tecnología**: Astro 4.x + React 18+
- **Puerto**: 4321 (dev), 3000 (producción con Node.js)
- **SSR**: Soportado

### Opciones de Deployment

#### Opción A: VPS con Docker Swarm + Traefik (Recomendado)
**Ventajas:**
- Control total
- Configuración personalizada
- Sin costos adicionales (si ya tienes VPS)
- Escalable

**Costos:**
- VPS existente: $0 adicional
- VPS nuevo: $5-20/mes (DigitalOcean, Linode, Vultr)

**Esta guía cubre esta opción en detalle.**

#### Opción B: Plataformas Cloud Managed
**CMS Service:**
- Render.com (Free tier o $7/mes)
- Railway.app ($5/mes aprox)
- Fly.io ($3-5/mes)
- DigitalOcean App Platform ($5/mes)

**Frontend:**
- Vercel (Free para hobby)
- Netlify (Free para hobby)
- Cloudflare Pages (Free)

**Costos totales:** $0-12/mes

---

## 🚀 Quick Start - Deploy desde VPS

Para deployment rápido si ya tienes VPS con Docker y Traefik configurados.

### Prerrequisitos
- VPS con Ubuntu 22.04+
- Docker Engine 20.10+ instalado
- Docker Swarm inicializado
- Traefik corriendo
- DNS configurado

### Paso 1: Clonar Repositorio

```bash
# SSH a tu VPS
ssh usuario@tu-vps-ip

# Clonar repo
cd ~
git clone https://github.com/facundozupel/proyecto_personal.git
cd proyecto_personal

# O actualizar si ya existe
git pull origin main
```

### Paso 2: Configurar Variables de Entorno

```bash
# Copiar template
cp .env.production.example .env.production

# Editar con valores reales
nano .env.production
```

**Variables críticas:**
```bash
ADMIN_PASSWORD=tu_password_super_seguro
ALLOWED_ORIGINS=https://tudominio.com,https://www.tudominio.com
```

### Paso 3: Build de Imágenes

```bash
# Build CMS Service
docker build -t facundozupel/cms-service:latest \
  -f cms-service/Dockerfile \
  ./cms-service

# Build Frontend (opcional si usas plataforma cloud)
docker build -t facundozupel/frontend:latest \
  -f Dockerfile \
  .
```

### Paso 4: Deploy del Stack

```bash
# Verificar Docker Swarm
docker swarm init || true

# Crear red si no existe
docker network create --driver overlay --attachable network_public || true

# Deploy
export $(cat .env.production | xargs)
docker stack deploy -c docker-stack-cms.yml cms
```

### Paso 5: Verificar

```bash
# Ver servicios
docker service ls

# Ver logs
docker service logs -f cms_cms-service

# Test endpoints
curl https://cms.tudominio.com/health
```

**Tiempo estimado:** 10-15 minutos

---

## 📖 Guía Completa Paso a Paso

### 1. Pre-requisitos

#### Hardware Requerido
- **Servidor VPS/Cloud**
  - Mínimo: 2GB RAM, 1 vCPU, 20GB disco
  - Recomendado: 4GB RAM, 2 vCPU, 40GB disco
- **Sistema Operativo**: Ubuntu 22.04 LTS o superior

#### Software Requerido
- Docker Engine 20.10+ instalado
- Docker Compose v2+
- Git
- curl
- Acceso SSH con privilegios sudo

#### Requisitos de Red
- Puerto 80 (HTTP) abierto
- Puerto 443 (HTTPS) abierto
- Puerto 22 (SSH) abierto
- Dominio configurado apuntando al servidor

---

### 2. Preparación del Servidor

#### Conectar al servidor

```bash
ssh usuario@tu-servidor.com
```

#### Actualizar el sistema

```bash
sudo apt update && sudo apt upgrade -y
```

#### Instalar Docker

```bash
# Instalar Docker Engine
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Activar cambios
newgrp docker

# Verificar instalación
docker --version
docker compose version
```

#### Instalar herramientas adicionales

```bash
sudo apt install -y curl git jq
```

---

### 3. Configuración de DNS

Agregar en tu proveedor de DNS (Cloudflare, Route53, etc.):

```
Tipo    Nombre    Valor                 TTL
A       cms       <IP_DE_TU_SERVIDOR>   300
```

**Resultado:**
- `cms.tudominio.com` → IP de tu servidor

#### Verificar propagación DNS

```bash
# Esperar 5-10 minutos después de configurar DNS
dig cms.tudominio.com +short
# Debe devolver la IP de tu servidor
```

---

### 4. Inicialización de Docker Swarm

```bash
# Inicializar Swarm
docker swarm init --advertise-addr <IP_PÚBLICA_DEL_SERVIDOR>

# Ejemplo
docker swarm init --advertise-addr 198.51.100.10

# Verificar estado
docker node ls
```

**Output esperado:**
```
ID                           HOSTNAME   STATUS   AVAILABILITY   MANAGER STATUS
xxx... *   servidor   Ready    Active         Leader
```

---

### 5. Despliegue de Traefik

**Si ya tienes Traefik corriendo, salta esta sección.**

#### Verificar que Traefik está corriendo

```bash
docker service ls | grep traefik
```

#### Si NO está corriendo, deployar Traefik

```bash
# Usar tu stack de Traefik existente
docker stack deploy -c traefik-stack.yml traefik
```

#### Verificar red network_public

```bash
docker network ls | grep network_public

# Si NO existe, crearla
docker network create --driver overlay --attachable network_public
```

---

### 6. Build y Push de la Imagen

#### En tu máquina local

```bash
# Ir al directorio del proyecto
cd /path/to/proyecto

# Pull de cambios recientes
git pull origin main
```

#### Build de la imagen del CMS Service

```bash
cd cms-service

# Build con Dockerfile de producción
docker build -f Dockerfile.production \
  -t facundozupel/cms-service:latest \
  -t facundozupel/cms-service:1.0.0 \
  .
```

#### Test local de la imagen

```bash
docker run --rm -p 8001:8001 \
  -e ADMIN_PASSWORD=test123 \
  -e ALLOWED_ORIGINS=http://localhost:4321 \
  facundozupel/cms-service:latest
```

**Verificar en otra terminal:**
```bash
curl http://localhost:8001/health
# Debe devolver: {"status":"healthy"}
```

#### Login en Docker Hub

```bash
docker login
# Ingresar username y password de Docker Hub
```

#### Push de la imagen

```bash
docker push facundozupel/cms-service:latest
docker push facundozupel/cms-service:1.0.0
```

---

### 7. Configuración en el Servidor

#### Crear directorio de proyecto

```bash
ssh usuario@tu-servidor.com
mkdir -p ~/cms-service
cd ~/cms-service
```

#### Copiar archivos al servidor

**Opción A: Desde tu máquina local**
```bash
scp docker-stack-cms.yml usuario@tu-servidor.com:~/cms-service/
scp .env.production usuario@tu-servidor.com:~/cms-service/
```

**Opción B: Clonar repo directamente en el servidor**
```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

#### Configurar variables de entorno

```bash
cd ~/cms-service

# Generar password seguro
ADMIN_PASSWORD=$(openssl rand -base64 24)

# Editar .env.production
nano .env.production
```

**Configurar:**
```bash
ADMIN_PASSWORD=<password_generado>
ALLOWED_ORIGINS=https://tudominio.com,https://www.tudominio.com
```

**Guardar:** Ctrl+O, Enter, Ctrl+X

#### Actualizar dominio en docker-stack-cms.yml

```bash
nano docker-stack-cms.yml
```

**Buscar y reemplazar:**
```yaml
Host(`cms.tudominio.com`)
```

---

### 8. Deploy del Stack

```bash
# Cargar variables de entorno
export $(cat .env.production | xargs)

# Desplegar stack
docker stack deploy -c docker-stack-cms.yml cms

# Verificar que se creó
docker stack ls
```

**Output esperado:**
```
NAME      SERVICES
cms       1
traefik   1
```

#### Verificar servicios

```bash
# Ver servicios del stack
docker stack services cms

# Ver réplicas
docker service ps cms_cms-service
```

**Esperar hasta que aparezca:**
```
NAME                  IMAGE                              DESIRED STATE   CURRENT STATE
cms_cms-service.1     facundozupel/cms-service:latest    Running         Running
cms_cms-service.2     facundozupel/cms-service:latest    Running         Running
```

---

### 9. Verificación y Testing

#### Health check

```bash
# Desde el servidor
curl https://cms.tudominio.com/health
```

**Output esperado:**
```json
{"status":"healthy"}
```

#### Test de endpoints públicos

```bash
# Listar posts (debe devolver array vacío al inicio)
curl https://cms.tudominio.com/api/posts

# Info del servicio
curl https://cms.tudominio.com/
```

#### Test de autenticación (endpoint admin)

```bash
# Crear un post de prueba
curl -X POST https://cms.tudominio.com/api/admin/posts \
  -H "Content-Type: application/json" \
  -u "admin:${ADMIN_PASSWORD}" \
  -d '{
    "title": "Test Post",
    "slug": "test-post",
    "content": "This is a test post",
    "excerpt": "Test excerpt",
    "tags": ["test"],
    "published": true
  }'
```

#### Verificar HTTPS

```bash
# Debe devolver código 200
curl -I https://cms.tudominio.com/health

# Verificar redirect HTTP → HTTPS
curl -I http://cms.tudominio.com/health
# Debe devolver código 301 o 308
```

---

## ⚡ Referencia Rápida de Comandos

### Monitoreo

```bash
# Listar todos los stacks
docker stack ls

# Ver servicios del stack
docker stack services cms

# Ver réplicas del servicio
docker service ps cms_cms-service

# Ver logs en tiempo real
docker service logs -f cms_cms-service

# Últimas 100 líneas
docker service logs --tail 100 cms_cms-service

# CPU y memoria de réplicas
docker stats $(docker ps -q -f name=cms_cms-service)
```

### Actualizaciones

```bash
# Update a nueva versión
docker service update --image facundozupel/cms-service:1.1.0 cms_cms-service

# Re-deploy stack
docker stack deploy -c docker-stack-cms.yml cms

# Forzar recreación
docker service update --force cms_cms-service
```

### Escalado

```bash
# Cambiar número de réplicas
docker service scale cms_cms-service=3

# Ver réplicas actuales
docker service ls | grep cms-service
```

### Limpieza

```bash
# Remover stack completo
docker stack rm cms

# Limpiar imágenes no usadas
docker image prune -a

# Limpiar todo el sistema (cuidado!)
docker system prune -a --volumes
```

### Testing

```bash
# Health check
curl https://cms.tudominio.com/health

# Listar posts
curl https://cms.tudominio.com/api/posts

# Crear post (requiere auth)
curl -X POST https://cms.tudominio.com/api/admin/posts \
  -u "admin:YOUR_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test",
    "slug": "test",
    "content": "Content",
    "excerpt": "Excerpt",
    "tags": ["test"]
  }'
```

---

## ✅ Checklist de Deployment

### Pre-requisitos
- [ ] Servidor VPS provisionado (Ubuntu 22.04+)
- [ ] Docker Engine 20.10+ instalado
- [ ] Docker Swarm inicializado
- [ ] Puertos 22, 80, 443 abiertos
- [ ] DNS configurado y propagado
- [ ] Red `network_public` creada
- [ ] Traefik desplegado y corriendo

### Build
- [ ] Código actualizado en repo
- [ ] Build de imagen ejecutado
- [ ] Test local de imagen exitoso
- [ ] Login en Docker Hub
- [ ] Imagen pusheada a Docker Hub

### Configuración
- [ ] `.env.production` configurado
- [ ] `ADMIN_PASSWORD` seguro generado (24+ caracteres)
- [ ] `ALLOWED_ORIGINS` configurado correctamente
- [ ] `docker-stack-cms.yml` con dominio correcto
- [ ] Variables de entorno cargadas

### Deploy
- [ ] Stack deployado sin errores
- [ ] Réplicas en estado `Running`
- [ ] Health checks pasando

### Verificación
- [ ] Health check HTTP/HTTPS funcionando
- [ ] Certificado SSL válido
- [ ] Redirect HTTP → HTTPS funcionando
- [ ] Endpoints públicos respondiendo
- [ ] Autenticación admin funcionando
- [ ] Logs sin errores críticos

### Seguridad
- [ ] Admin endpoints protegidos
- [ ] CORS configurado correctamente
- [ ] `.env.production` no commiteado
- [ ] Firewall configurado (solo puertos necesarios)
- [ ] Puerto 8001 NO expuesto públicamente

### Post-Deploy
- [ ] Credenciales guardadas en password manager
- [ ] Monitoreo durante primeras 24h
- [ ] CHANGELOG.md actualizado
- [ ] Version tag creado en Git

---

## 🆘 Troubleshooting

### El servicio no inicia

```bash
# Ver logs completos
docker service logs cms_cms-service

# Ver tareas fallidas
docker service ps --no-trunc cms_cms-service

# Inspeccionar configuración
docker service inspect cms_cms-service
```

**Causas comunes:**
- Variables de entorno incorrectas
- Red network_public no existe
- Imagen no disponible en Docker Hub
- Puerto 8001 en conflicto

### Error 502 Bad Gateway

**Causa:** Traefik no puede conectar con el servicio.

**Solución:**
```bash
# Verificar que servicio está running
docker service ps cms_cms-service

# Verificar logs
docker service logs cms_cms-service

# Verificar health check
docker service inspect cms_cms-service | grep -A 10 Healthcheck

# Recrear servicio
docker service update --force cms_cms-service
```

### Error 503 Service Unavailable

**Causa:** Health check fallando.

**Solución:**
```bash
# Verificar health check endpoint
docker exec $(docker ps -q -f name=cms_cms-service | head -1) \
  curl -f http://localhost:8001/health

# Ver logs de health check
docker service logs cms_cms-service | grep health

# Aumentar start period
docker service update \
  --health-start-period 60s \
  cms_cms-service
```

### Certificado SSL no se genera

**Causa:** Let's Encrypt no puede validar dominio.

**Solución:**
```bash
# Verificar logs de Traefik
docker service logs traefik_traefik

# Verificar DNS
dig cms.tudominio.com +short

# Verificar que puerto 80 está abierto
curl -I http://cms.tudominio.com/.well-known/acme-challenge/test
```

### Servicio consume demasiada RAM

```bash
# Reducir límite de memoria
docker service update \
  --limit-memory 256M \
  cms_cms-service

# Reducir workers de uvicorn
# Editar Dockerfile.production y cambiar --workers 2 a --workers 1
```

### Container crash loop

```bash
# Ver logs de crashes
docker service logs --tail 200 cms_cms-service

# Ver tareas fallidas
docker service ps cms_cms-service | grep Failed

# Inspeccionar task fallida
docker inspect <task_id>
```

---

## 🔄 Actualización y Rollback

### Actualizar a nueva versión

#### 1. Build nueva versión (en tu máquina local)

```bash
cd cms-service

# Build con nuevo tag
docker build -f Dockerfile.production \
  -t facundozupel/cms-service:1.1.0 \
  -t facundozupel/cms-service:latest \
  .

# Push
docker push facundozupel/cms-service:1.1.0
docker push facundozupel/cms-service:latest
```

#### 2. Actualizar servicio en el servidor

**Opción A: Update automático**
```bash
docker service update --image facundozupel/cms-service:latest cms_cms-service
```

**Opción B: Re-deploy del stack**
```bash
cd ~/cms-service
docker stack deploy -c docker-stack-cms.yml cms
```

#### 3. Monitorear rolling update

```bash
# Ver progreso
watch docker service ps cms_cms-service

# Ver logs durante update
docker service logs -f cms_cms-service
```

**El rolling update:**
- Inicia 1 nueva replica con la imagen actualizada
- Espera health check (40s + checks)
- Si pasa, detiene 1 replica vieja
- Repite el proceso

**Tiempo estimado:** 2-3 minutos para 2 réplicas

### Rollback

```bash
# Rollback automático a versión anterior
docker service rollback cms_cms-service

# Rollback a imagen específica
docker service update --image facundozupel/cms-service:1.0.0 cms_cms-service

# Ver historial de updates
docker service inspect cms_cms-service --format '{{json .PreviousSpec}}' | jq
```

### Rollback de emergencia

```bash
# Forzar recreación de todas las réplicas
docker service update --force cms_cms-service

# Si no funciona, eliminar y recrear stack
docker service inspect cms_cms-service > backup-service.json
docker stack rm cms
sleep 30
docker stack deploy -c docker-stack-cms.yml cms
```

---

## 🔐 Mejores Prácticas de Seguridad

### 1. Rotar passwords regularmente

```bash
# Generar nuevo password
NEW_PASSWORD=$(openssl rand -base64 24)

# Actualizar .env.production
echo "ADMIN_PASSWORD=$NEW_PASSWORD" > .env.production

# Re-deploy
export $(cat .env.production | xargs)
docker stack deploy -c docker-stack-cms.yml cms
```

### 2. Usar Docker Secrets (recomendado para producción)

```bash
# Crear secret
echo "mi-password-super-seguro" | docker secret create admin_password -

# Listar secrets
docker secret ls
```

**Modificar docker-stack-cms.yml:**
```yaml
services:
  cms-service:
    secrets:
      - admin_password

secrets:
  admin_password:
    external: true
```

**Modificar código para leer del secret:**
```python
# En app/main.py
with open('/run/secrets/admin_password') as f:
    ADMIN_PASSWORD = f.read().strip()
```

### 3. Configurar Firewall

```bash
# Configurar UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Verificar estado
sudo ufw status
```

### 4. Limitar tasas de request (Rate Limiting)

Configurar en Traefik para prevenir abuse:

```yaml
# En traefik labels
- "traefik.http.middlewares.ratelimit.ratelimit.average=100"
- "traefik.http.middlewares.ratelimit.ratelimit.burst=50"
```

### 5. Monitoreo y Alertas

```bash
# Configurar healthchecks.io para alertas
(crontab -l 2>/dev/null; echo "*/5 * * * * curl https://cms.tudominio.com/health && curl https://hc-ping.com/YOUR-UUID") | crontab -
```

---

## 📈 Monitoreo Avanzado (Opcional)

### Ver logs con filtros

```bash
# Buscar errores
docker service logs cms_cms-service | grep -i error

# Logs con timestamps
docker service logs --timestamps cms_cms-service

# Logs desde fecha específica
docker service logs --since 2h cms_cms-service
```

### Métricas del servicio

```bash
# CPU y memoria de cada replica
docker stats $(docker ps -q -f name=cms_cms-service)

# Inspeccionar servicio completo
docker service inspect cms_cms-service --pretty
```

### Integración con Prometheus + Grafana

Para monitoreo avanzado, consultar:
- [Docker Metrics](https://docs.docker.com/config/daemon/prometheus/)
- [Traefik Metrics](https://doc.traefik.io/traefik/observability/metrics/prometheus/)

---

## 🔗 Aliases Útiles

Agregar a tu `.bashrc` o `.zshrc`:

```bash
# CMS Service shortcuts
alias cms-logs='docker service logs -f cms_cms-service'
alias cms-ps='docker service ps cms_cms-service'
alias cms-health='curl https://cms.tudominio.com/health'
alias cms-update='docker service update --force cms_cms-service'
alias cms-scale='docker service scale cms_cms-service='
```

---

## 📚 Referencias

- [Docker Swarm Docs](https://docs.docker.com/engine/swarm/)
- [Traefik v2 Docs](https://doc.traefik.io/traefik/v2.11/)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)
- [Let's Encrypt Docs](https://letsencrypt.org/docs/)

---

## 💰 Estimación de Costos

### Opción VPS (actual):
- **CMS Service**: $0 (corre en tu VPS existente)
- **Frontend en Vercel**: $0 (hobby tier)
- **Total**: $0 adicional

### Opción Cloud Managed:
- **CMS Service en Render**: $0 (free) o $7/mes
- **CMS Service en Railway**: ~$5/mes
- **Frontend en Vercel**: $0 (hobby tier)
- **Total**: $0-7/mes

### Opción VPS nuevo:
- **VPS (DigitalOcean/Linode)**: $5-10/mes
- **Dominio**: ~$12/año
- **Total**: ~$5-11/mes

---

## 🎯 Próximos Pasos Después del Deploy

1. **Poblar contenido inicial:**
   ```bash
   # Crear primeros posts vía API
   curl -X POST https://cms.tudominio.com/api/admin/posts -u admin:password ...
   ```

2. **Actualizar frontend:**
   ```typescript
   // src/config/api.ts
   export const CMS_API_URL = 'https://cms.tudominio.com'
   ```

3. **Configurar monitoreo:**
   - Uptime monitoring (UptimeRobot, Healthchecks.io)
   - Error tracking (Sentry)
   - Analytics (Plausible, Google Analytics)

4. **Mejoras futuras:**
   - Migrar storage a Google Sheets
   - Panel admin web para blog
   - CI/CD con GitHub Actions
   - Backup automatizado

---

**Versión:** 2.0.0
**Última actualización:** 2025-11-20
**Autor:** Claude Code para Facundo Zupel
**Mantenido por:** Facundo Zupel
