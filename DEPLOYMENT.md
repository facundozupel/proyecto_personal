# Deployment Guide - Facundo Growth Landing Page

Guía completa para deploy del proyecto en VPS usando Docker Swarm + Traefik.

---

## 📋 Tabla de Contenidos

- [Arquitectura](#arquitectura)
- [Requisitos Previos](#requisitos-previos)
- [Configuración Inicial VPS](#configuración-inicial-vps)
- [Deployment Local → Docker Hub](#deployment-local--docker-hub)
- [Deployment Docker Hub → VPS](#deployment-docker-hub--vps)
- [Monitoreo y Mantenimiento](#monitoreo-y-mantenimiento)
- [Troubleshooting](#troubleshooting)

---

## 🏗️ Arquitectura

```
┌────────────────────────────────────────────────────────┐
│                        Internet                        │
└─────────────────────┬──────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   Traefik (Reverse Proxy)               │
│         - HTTPS (Let's Encrypt)                         │
│         - Load Balancing                                │
│         - Health Checks                                 │
└───────────┬─────────────────────────┬───────────────────┘
            │                         │
            ▼                         ▼
┌───────────────────────┐   ┌──────────────────────────┐
│  Frontend (Astro SSR) │   │  Backend (FastAPI)       │
│  facundogrowth.com    │   │  api.facundogrowth.com   │
│  - 2 replicas         │   │  - 2 replicas            │
│  - Port 4321          │   │  - Port 8001             │
│  - 1GB RAM            │   │  - 512MB RAM             │
└───────────────────────┘   └──────────────────────────┘
```

### Servicios

| Servicio | Dominio | Puerto Interno | Réplicas | Recursos |
|----------|---------|----------------|----------|----------|
| Frontend | facundogrowth.com | 4321 | 2 | 1GB RAM, 1 CPU |
| CMS API | api.facundogrowth.com | 8001 | 2 | 512MB RAM, 0.5 CPU |

---

## ✅ Requisitos Previos

### En tu VPS

1. **Sistema Operativo**: Ubuntu 22.04 LTS (recomendado) o similar
2. **Docker**: v24.0+ instalado
3. **Docker Swarm**: Inicializado
4. **Traefik**: v2.x+ desplegado y corriendo
5. **Red Docker**: `network_public` creada
6. **DNS**: Configurado apuntando a IP de VPS
   - `facundogrowth.com` → IP VPS
   - `api.facundogrowth.com` → IP VPS
7. **Puertos abiertos**:
   - 80 (HTTP)
   - 443 (HTTPS)
   - 2377 (Docker Swarm management)

### En tu máquina local

1. **Docker**: Instalado y corriendo
2. **Docker Hub**: Cuenta creada y login realizado (`docker login`)
3. **Git**: Para clonar el repositorio
4. **SSH**: Acceso configurado a la VPS

---

## 🔧 Configuración Inicial VPS

### 1. Instalar Docker (si no está instalado)

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Reiniciar sesión para aplicar cambios
exit  # y volver a conectar vía SSH
```

### 2. Inicializar Docker Swarm

```bash
# Inicializar Swarm
docker swarm init

# Verificar estado
docker info | grep Swarm
# Output: Swarm: active
```

### 3. Crear Red de Traefik

```bash
# Crear red overlay para servicios
docker network create --driver overlay network_public

# Verificar
docker network ls | grep network_public
```

### 4. Desplegar Traefik

Si aún no tienes Traefik corriendo, aquí una configuración básica:

```bash
# Crear directorio para Traefik
mkdir -p ~/traefik
cd ~/traefik

# Crear docker-compose.yml para Traefik
cat > docker-compose-traefik.yml <<EOF
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    command:
      - --api.dashboard=true
      - --providers.docker=true
      - --providers.docker.swarmMode=true
      - --providers.docker.exposedbydefault=false
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.letsencryptresolver.acme.tlschallenge=true
      - --certificatesresolvers.letsencryptresolver.acme.email=tu_email@ejemplo.com
      - --certificatesresolvers.letsencryptresolver.acme.storage=/letsencrypt/acme.json
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - traefik-certificates:/letsencrypt
    networks:
      - network_public
    deploy:
      placement:
        constraints:
          - node.role == manager
      labels:
        - "traefik.enable=true"

volumes:
  traefik-certificates:

networks:
  network_public:
    external: true
EOF

# Desplegar Traefik
docker stack deploy -c docker-compose-traefik.yml traefik

# Verificar
docker service ls
```

**Importante**: Reemplaza `tu_email@ejemplo.com` con tu email real para Let's Encrypt.

---

## 📦 Deployment Local → Docker Hub

### 1. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.production.example .env.production

# Editar con tus valores
nano .env.production
```

**Variables clave a configurar:**
```bash
ADMIN_PASSWORD=tu_password_super_seguro
ALLOWED_ORIGINS=https://facundogrowth.com,https://www.facundogrowth.com
CMS_API_URL=https://api.facundogrowth.com
```

### 2. Build y Push de Imágenes

```bash
# Dar permisos de ejecución al script (solo primera vez)
chmod +x scripts/build-and-push.sh

# Build y push con versión específica
./scripts/build-and-push.sh 1.0.0

# O usar "latest" (por defecto)
./scripts/build-and-push.sh
```

Este script:
1. ✅ Verifica que Docker esté instalado
2. ✅ Verifica que estés logueado en Docker Hub
3. ✅ Hace build del frontend (Astro)
4. ✅ Hace build del backend (FastAPI)
5. ✅ Hace push de ambas imágenes a Docker Hub
6. ✅ Crea tags de versión + `latest`

### 3. Verificar Imágenes en Docker Hub

Visita:
- https://hub.docker.com/r/facundozupel/frontend
- https://hub.docker.com/r/facundozupel/cms-service

---

## 🚀 Deployment Docker Hub → VPS

### Opción A: Deploy desde tu VPS (Recomendado)

```bash
# 1. SSH a tu VPS
ssh usuario@tu-vps-ip

# 2. Clonar repositorio (si no lo has hecho)
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

# 3. Copiar y configurar .env.production
cp .env.production.example .env.production
nano .env.production

# 4. Dar permisos al script
chmod +x scripts/deploy-vps.sh

# 5. Ejecutar deployment
./scripts/deploy-vps.sh 1.0.0

# O usar latest (por defecto)
./scripts/deploy-vps.sh
```

### Opción B: Deploy remoto desde tu máquina local

```bash
# 1. Copiar archivos necesarios a VPS
scp docker-stack-full.yml usuario@vps:/home/usuario/
scp .env.production usuario@vps:/home/usuario/

# 2. SSH y deploy
ssh usuario@vps
cd /home/usuario
source .env.production
docker stack deploy -c docker-stack-full.yml facundogrowth
```

### Deploy Solo Backend (CMS Service)

Si solo quieres deployar el backend:

```bash
./scripts/deploy-vps.sh latest docker-stack-cms.yml
```

---

## 📊 Monitoreo y Mantenimiento

### Ver Estado de Servicios

```bash
# Listar todos los servicios
docker service ls

# Ver detalles de un servicio específico
docker service ps facundogrowth_frontend
docker service ps facundogrowth_cms-service

# Ver logs en tiempo real
docker service logs -f facundogrowth_frontend
docker service logs -f facundogrowth_cms-service

# Ver últimas 100 líneas
docker service logs --tail 100 facundogrowth_frontend
```

### Escalar Servicios

```bash
# Escalar frontend a 3 réplicas
docker service scale facundogrowth_frontend=3

# Escalar API a 4 réplicas
docker service scale facundogrowth_cms-service=4

# Verificar
docker service ls
```

### Actualizar Servicios

```bash
# Actualizar frontend a nueva versión
docker service update \
  --image facundozupel/frontend:1.1.0 \
  facundogrowth_frontend

# Actualizar API a nueva versión
docker service update \
  --image facundozupel/cms-service:1.1.0 \
  facundogrowth_cms-service

# Rollback si algo sale mal
docker service rollback facundogrowth_frontend
```

### Reiniciar Servicios

```bash
# Force update (reinicia sin cambiar imagen)
docker service update --force facundogrowth_frontend
docker service update --force facundogrowth_cms-service
```

### Health Checks

Los health checks están configurados automáticamente:

- **Frontend**: `GET /` cada 30s
- **Backend**: `GET /health` cada 30s

Ver estado:
```bash
docker service ps facundogrowth_frontend --format "{{.Name}}\t{{.CurrentState}}\t{{.Error}}"
```

---

## 🛑 Remover Stack

```bash
# Remover todo el stack
docker stack rm facundogrowth

# Verificar que se haya removido
docker service ls

# Limpiar volúmenes huérfanos (opcional)
docker volume prune -f

# Limpiar imágenes no usadas (opcional)
docker image prune -a -f
```

---

## 🔍 Troubleshooting

### Problema: Servicios no inician

**Síntomas**: `docker service ls` muestra 0/2 réplicas

**Solución**:
```bash
# Ver logs detallados
docker service ps facundogrowth_frontend --no-trunc

# Ver logs del servicio
docker service logs facundogrowth_frontend

# Verificar configuración
docker service inspect facundogrowth_frontend
```

### Problema: "network not found"

**Solución**:
```bash
# Crear la red manualmente
docker network create --driver overlay network_public

# Re-deploy
./scripts/deploy-vps.sh
```

### Problema: Certificados SSL no se generan

**Posibles causas**:
1. DNS no apunta correctamente a la VPS
2. Puertos 80/443 no están abiertos
3. Email en configuración de Traefik es inválido

**Verificación DNS**:
```bash
# Verificar DNS
dig facundogrowth.com +short
dig api.facundogrowth.com +short
# Ambos deben retornar la IP de tu VPS
```

**Verificar logs de Traefik**:
```bash
docker service logs traefik_traefik | grep -i acme
```

### Problema: "no space left on device"

**Solución**:
```bash
# Limpiar imágenes no usadas
docker image prune -a -f

# Limpiar contenedores detenidos
docker container prune -f

# Limpiar volúmenes no usados
docker volume prune -f

# Limpiar todo (cuidado!)
docker system prune -a -f
```

### Problema: Servicio responde lento

**Diagnóstico**:
```bash
# Ver uso de recursos
docker stats

# Ver réplicas activas
docker service ps facundogrowth_frontend

# Escalar si es necesario
docker service scale facundogrowth_frontend=4
```

### Problema: No puedo conectar a la API desde el frontend

**Verificaciones**:
1. Variable `CMS_API_URL` correcta en `.env.production`
2. CORS configurado correctamente en backend
3. Ambos servicios en la misma red (`network_public`)

**Verificar CORS**:
```bash
# Ver configuración del CMS Service
docker service inspect facundogrowth_cms-service \
  --format '{{.Spec.TaskTemplate.ContainerSpec.Env}}'
```

### Problema: Imagen no se actualiza después de push

**Solución**:
```bash
# Force pull de la nueva imagen
docker service update \
  --image facundozupel/frontend:latest \
  --force \
  facundogrowth_frontend

# O hacer rollout completo
docker service update --force facundogrowth_frontend
```

---

## 🔐 Seguridad

### Mejores Prácticas

1. **Passwords seguros**: Usar passwords fuertes en `ADMIN_PASSWORD`
2. **HTTPS only**: Traefik redirige automáticamente HTTP → HTTPS
3. **Headers de seguridad**: Configurados en docker-stack files
4. **Rate limiting**: Descomentado en producción si es necesario
5. **Usuarios no-root**: Containers corren con usuario no-privilegiado
6. **Secrets management**: Considerar usar Docker Secrets para producción

### Usar Docker Secrets (Avanzado)

```bash
# Crear secret para admin password
echo "mi_password_super_seguro" | docker secret create admin_password -

# Actualizar docker-stack.yml para usar secrets
# (Requiere modificación del stack file)
```

---

## 📈 Optimizaciones de Performance

### 1. Caché de Imágenes

El Dockerfile usa multi-stage builds para optimizar tamaño:
- Frontend: ~200-300MB final
- Backend: ~150-200MB final

### 2. Resource Limits

Ajustar según tu VPS:

```yaml
resources:
  limits:
    cpus: '2.0'      # Incrementar si tienes más CPUs
    memory: 2G       # Incrementar si tienes más RAM
  reservations:
    cpus: '1.0'
    memory: 1G
```

### 3. Replica Count

Para alta disponibilidad:
- Mínimo: 2 réplicas por servicio
- Recomendado: 3-4 réplicas para producción

```bash
docker service scale \
  facundogrowth_frontend=3 \
  facundogrowth_cms-service=3
```

---

## 🔄 CI/CD (Futuro)

Para automatizar deployment, considera:

1. **GitHub Actions**: Build → Push → Deploy automático en cada push
2. **GitLab CI**: Pipeline completo
3. **Webhooks**: Auto-deploy desde Docker Hub

Ejemplo GitHub Actions:
```yaml
# .github/workflows/deploy.yml
name: Deploy to VPS
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and Push
        run: ./scripts/build-and-push.sh ${{ github.sha }}
      - name: Deploy to VPS
        run: ssh user@vps './scripts/deploy-vps.sh ${{ github.sha }}'
```

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa logs: `docker service logs -f <servicio>`
2. Verifica configuración: `docker service inspect <servicio>`
3. Consulta este documento
4. Revisa documentación de Docker Swarm y Traefik

---

**Última actualización**: 2025-11-04
**Versión**: 1.0.0
**Autor**: Facundo Zupel
