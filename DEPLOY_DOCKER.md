# Guía de Despliegue - CMS Service con Docker Swarm + Traefik

## 📋 Tabla de Contenidos

- [Pre-requisitos](#pre-requisitos)
- [Preparación del Servidor](#preparación-del-servidor)
- [Configuración de DNS](#configuración-de-dns)
- [Inicialización de Docker Swarm](#inicialización-de-docker-swarm)
- [Despliegue de Traefik](#despliegue-de-traefik)
- [Build y Push de la Imagen](#build-y-push-de-la-imagen)
- [Despliegue del CMS Service](#despliegue-del-cms-service)
- [Verificación y Testing](#verificación-y-testing)
- [Monitoreo y Logs](#monitoreo-y-logs)
- [Actualización del Servicio](#actualización-del-servicio)
- [Troubleshooting](#troubleshooting)
- [Rollback](#rollback)

---

## 🎯 Pre-requisitos

### Hardware Requerido

- **Servidor VPS/Cloud**
  - Mínimo: 2GB RAM, 1 vCPU, 20GB disco
  - Recomendado: 4GB RAM, 2 vCPU, 40GB disco
- **Sistema Operativo**: Ubuntu 22.04 LTS o superior (recomendado)

### Software Requerido

- Docker Engine 20.10+ instalado
- Docker Compose v2+
- Git
- curl
- Acceso SSH con privilegios sudo

### Requisitos de Red

- Puerto 80 (HTTP) abierto
- Puerto 443 (HTTPS) abierto
- Puerto 22 (SSH) abierto
- Dominio configurado apuntando al servidor

---

## 🔧 Preparación del Servidor

### 1. Conectar al servidor vía SSH

```bash
ssh usuario@tu-servidor.com
```

### 2. Actualizar el sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 3. Instalar Docker (si no está instalado)

```bash
# Instalar Docker Engine
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Activar cambios (o hacer logout/login)
newgrp docker

# Verificar instalación
docker --version
docker compose version
```

### 4. Instalar herramientas adicionales

```bash
sudo apt install -y curl git jq
```

---

## 🌐 Configuración de DNS

### Configurar registros DNS

Agregar en tu proveedor de DNS (Cloudflare, Route53, etc.):

```
Tipo    Nombre    Valor                 TTL
A       cms       <IP_DE_TU_SERVIDOR>   300
```

**Resultado final:**
- `cms.facundozupel.com` → IP de tu servidor

### Verificar propagación DNS

```bash
# Esperar 5-10 minutos después de configurar DNS
dig cms.facundozupel.com +short
# Debe devolver la IP de tu servidor
```

---

## 🐋 Inicialización de Docker Swarm

### 1. Inicializar Swarm

```bash
docker swarm init --advertise-addr <IP_PÚBLICA_DEL_SERVIDOR>
```

**Ejemplo:**
```bash
docker swarm init --advertise-addr 198.51.100.10
```

### 2. Verificar estado del Swarm

```bash
docker node ls
```

**Output esperado:**
```
ID                           HOSTNAME   STATUS   AVAILABILITY   MANAGER STATUS
xxx... *   servidor   Ready    Active         Leader
```

---

## 🔀 Despliegue de Traefik

**NOTA:** Si ya tienes Traefik corriendo (como muestras en tu configuración), **salta esta sección**.

### Verificar que Traefik está corriendo

```bash
docker service ls | grep traefik
```

**Si NO aparece**, desplegar Traefik:

```bash
# Usar tu stack de Traefik existente
docker stack deploy -c traefik-stack.yml traefik
```

### Verificar red network_public

```bash
docker network ls | grep network_public
```

**Si NO existe**, crearla:

```bash
docker network create --driver overlay --attachable network_public
```

---

## 🏗️ Build y Push de la Imagen

### 1. Clonar repositorio (en tu máquina local)

```bash
cd /path/to/proyectos
git pull origin main
```

### 2. Build de la imagen

```bash
cd cms-service

# Build con Dockerfile de producción
docker build -f Dockerfile.production -t facundozupel/cms-service:latest .

# También tag con versión específica
docker build -f Dockerfile.production \
  -t facundozupel/cms-service:latest \
  -t facundozupel/cms-service:1.0.0 \
  .
```

### 3. Test local de la imagen

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

### 4. Login en Docker Hub

```bash
docker login
# Ingresar username y password de Docker Hub
```

### 5. Push de la imagen

```bash
docker push facundozupel/cms-service:latest
docker push facundozupel/cms-service:1.0.0
```

---

## 🚀 Despliegue del CMS Service

### 1. Conectar al servidor VPS

```bash
ssh usuario@tu-servidor.com
```

### 2. Crear directorio de proyecto

```bash
mkdir -p ~/cms-service
cd ~/cms-service
```

### 3. Copiar archivos necesarios al servidor

**Desde tu máquina local:**

```bash
# Copiar stack file
scp docker-stack-cms.yml usuario@tu-servidor.com:~/cms-service/

# Copiar .env template
scp .env.production usuario@tu-servidor.com:~/cms-service/
```

**O clonar el repo directamente en el servidor:**

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 4. Configurar variables de entorno

```bash
cd ~/cms-service

# Editar .env.production con valores reales
nano .env.production
```

**Configurar:**

```bash
# Generar password seguro
ADMIN_PASSWORD=$(openssl rand -base64 24)

# Configurar origins
ALLOWED_ORIGINS=https://facundozupel.com,https://www.facundozupel.com
```

**Guardar (Ctrl+O) y salir (Ctrl+X).**

### 5. Actualizar dominio en docker-stack-cms.yml

```bash
nano docker-stack-cms.yml
```

**Buscar y reemplazar:**
```yaml
Host(`cms.facundozupel.com`)
```

**Por tu dominio real.**

### 6. Deploy del stack

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
NAME   SERVICES
cms    1
traefik 1
```

### 7. Verificar servicios

```bash
# Ver servicios del stack
docker stack services cms

# Ver réplicas
docker service ps cms_cms-service
```

**Esperar hasta que aparezca:**
```
NAME                    IMAGE                              NODE      DESIRED STATE   CURRENT STATE
cms_cms-service.1       facundozupel/cms-service:latest    servidor  Running         Running
cms_cms-service.2       facundozupel/cms-service:latest    servidor  Running         Running
```

---

## ✅ Verificación y Testing

### 1. Health check

```bash
# Desde el servidor
curl https://cms.facundozupel.com/health
```

**Output esperado:**
```json
{"status":"healthy"}
```

### 2. Test de endpoints públicos

```bash
# Listar posts (debe devolver array vacío al inicio)
curl https://cms.facundozupel.com/api/posts

# Info del servicio
curl https://cms.facundozupel.com/
```

### 3. Test de autenticación (endpoint admin)

```bash
# Crear un post de prueba
curl -X POST https://cms.facundozupel.com/api/admin/posts \
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

**Output esperado:**
```json
{
  "id": 1,
  "title": "Test Post",
  "slug": "test-post",
  ...
}
```

### 4. Verificar HTTPS

```bash
# Debe devolver código 200
curl -I https://cms.facundozupel.com/health
```

### 5. Verificar redirect HTTP → HTTPS

```bash
# Debe devolver código 301 o 308 (redirect)
curl -I http://cms.facundozupel.com/health
```

---

## 📊 Monitoreo y Logs

### Ver logs del servicio

```bash
# Logs en tiempo real
docker service logs -f cms_cms-service

# Últimas 100 líneas
docker service logs --tail 100 cms_cms-service

# Logs con timestamps
docker service logs --timestamps cms_cms-service
```

### Ver estado de réplicas

```bash
docker service ps cms_cms-service
```

### Ver métricas del servicio

```bash
# CPU y memoria de cada replica
docker stats $(docker ps -q -f name=cms_cms-service)
```

### Inspeccionar servicio

```bash
docker service inspect cms_cms-service --pretty
```

---

## 🔄 Actualización del Servicio

### 1. Build nueva versión de la imagen

**En tu máquina local:**

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

### 2. Actualizar servicio en el servidor

**Opción A: Update automático (usa la imagen :latest)**

```bash
# Docker Swarm detecta nueva imagen y actualiza
docker service update --image facundozupel/cms-service:latest cms_cms-service
```

**Opción B: Re-deploy del stack**

```bash
cd ~/cms-service
docker stack deploy -c docker-stack-cms.yml cms
```

### 3. Monitorear rolling update

```bash
# Ver progreso del update
watch docker service ps cms_cms-service

# Ver logs durante update
docker service logs -f cms_cms-service
```

**El rolling update:**
- Inicia 1 nueva replica con la imagen actualizada
- Espera health check (40s + checks)
- Si pasa health check, detiene 1 replica vieja
- Repite el proceso con la siguiente replica

**Tiempo estimado:** 2-3 minutos para 2 réplicas.

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
dig cms.facundozupel.com +short

# Verificar que puerto 80 está abierto
curl -I http://cms.facundozupel.com/.well-known/acme-challenge/test
```

### Servicio consume demasiada RAM

**Solución:**

```bash
# Reducir límite de memoria
docker service update \
  --limit-memory 256M \
  cms_cms-service

# Reducir workers de uvicorn
# Editar Dockerfile.production y cambiar --workers 2 a --workers 1
```

---

## ⏪ Rollback

### Rollback a versión anterior

```bash
# Rollback automático
docker service rollback cms_cms-service

# Rollback a imagen específica
docker service update --image facundozupel/cms-service:1.0.0 cms_cms-service
```

### Ver historial de updates

```bash
docker service inspect cms_cms-service --format '{{json .PreviousSpec}}' | jq
```

---

## 📝 Comandos Útiles

### Gestión del Stack

```bash
# Listar stacks
docker stack ls

# Ver servicios de un stack
docker stack services cms

# Ver tareas de un stack
docker stack ps cms

# Eliminar stack completo
docker stack rm cms
```

### Gestión de Servicios

```bash
# Escalar servicio (cambiar número de réplicas)
docker service scale cms_cms-service=3

# Ver configuración completa
docker service inspect cms_cms-service

# Forzar recreación de réplicas
docker service update --force cms_cms-service
```

### Limpieza

```bash
# Limpiar imágenes no usadas
docker image prune -a

# Limpiar containers detenidos
docker container prune

# Limpiar todo (cuidado!)
docker system prune -a --volumes
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

# Modificar docker-stack-cms.yml
```

**Agregar en el servicio:**
```yaml
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

### 3. Firewall

```bash
# Configurar UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 📈 Monitoreo Avanzado (Opcional)

### Integrar con Prometheus + Grafana

```bash
# Agregar exporters al stack
# Ver: https://docs.docker.com/config/daemon/prometheus/
```

### Alertas con Healthchecks.io

```bash
# Crear cron job que haga ping cada 5 minutos
(crontab -l 2>/dev/null; echo "*/5 * * * * curl https://cms.facundozupel.com/health && curl https://hc-ping.com/YOUR-UUID") | crontab -
```

---

## 📚 Referencias

- [Docker Swarm Docs](https://docs.docker.com/engine/swarm/)
- [Traefik v2 Docs](https://doc.traefik.io/traefik/v2.11/)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)

---

**Versión:** 1.0.0
**Última actualización:** 2025-11-03
**Autor:** Claude Code para Facundo Zupel
