# Docker Stack - Referencia Rápida de Comandos

## 🚀 Deploy Inicial

```bash
# 1. Build y push imagen
cd cms-service
docker build -f Dockerfile.production -t facundozupel/cms-service:1.0.0 .
docker push facundozupel/cms-service:1.0.0

# 2. En el servidor: Deploy stack
export $(cat .env.production | xargs)
docker stack deploy -c docker-stack-cms.yml cms

# 3. Verificar
docker service ps cms_cms-service
curl https://cms.facundozupel.com/health
```

---

## 📊 Monitoreo

### Ver estado de servicios

```bash
# Listar todos los stacks
docker stack ls

# Ver servicios del stack cms
docker stack services cms

# Ver réplicas del servicio
docker service ps cms_cms-service

# Ver logs en tiempo real
docker service logs -f cms_cms-service

# Últimas 100 líneas
docker service logs --tail 100 cms_cms-service
```

### Métricas y recursos

```bash
# CPU y memoria de réplicas
docker stats $(docker ps -q -f name=cms_cms-service)

# Inspeccionar servicio
docker service inspect cms_cms-service --pretty

# Ver configuración completa
docker service inspect cms_cms-service
```

---

## 🔄 Actualizaciones

### Update a nueva versión

```bash
# Opción 1: Update directo
docker service update --image facundozupel/cms-service:1.1.0 cms_cms-service

# Opción 2: Re-deploy stack
docker stack deploy -c docker-stack-cms.yml cms

# Monitorear rolling update
watch docker service ps cms_cms-service
```

### Forzar recreación

```bash
# Recrear todas las réplicas
docker service update --force cms_cms-service
```

---

## ⏪ Rollback

```bash
# Rollback automático a versión anterior
docker service rollback cms_cms-service

# Rollback a versión específica
docker service update --image facundozupel/cms-service:1.0.0 cms_cms-service
```

---

## 📈 Escalado

```bash
# Cambiar número de réplicas
docker service scale cms_cms-service=3

# Ver réplicas actuales
docker service ls | grep cms-service
```

---

## 🧹 Limpieza

```bash
# Remover stack completo
docker stack rm cms

# Limpiar imágenes no usadas
docker image prune -a

# Limpiar todo el sistema (cuidado!)
docker system prune -a --volumes
```

---

## 🔍 Debugging

### Ver logs de error

```bash
# Buscar errores en logs
docker service logs cms_cms-service | grep -i error

# Ver tareas fallidas
docker service ps --no-trunc cms_cms-service

# Ver health check status
docker service inspect cms_cms-service | grep -A 10 Health
```

### Ejecutar comandos dentro del container

```bash
# Listar containers activos
docker ps -f name=cms_cms-service

# Shell en el container
docker exec -it <container_id> /bin/bash

# Curl desde dentro del container
docker exec <container_id> curl http://localhost:8001/health
```

### Ver configuración de Traefik

```bash
# Ver labels del servicio
docker service inspect cms_cms-service --format '{{json .Spec.Labels}}' | jq

# Ver logs de Traefik
docker service logs traefik_traefik | grep cms
```

---

## 🌐 Testing

### Test de endpoints

```bash
# Health check
curl https://cms.facundozupel.com/health

# Info del servicio
curl https://cms.facundozupel.com/

# Listar posts
curl https://cms.facundozupel.com/api/posts

# Crear post (requiere auth)
curl -X POST https://cms.facundozupel.com/api/admin/posts \
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

### Test de SSL

```bash
# Verificar certificado
openssl s_client -connect cms.facundozupel.com:443 -servername cms.facundozupel.com

# Verificar headers de seguridad
curl -I https://cms.facundozupel.com/health

# Test de redirect HTTP → HTTPS
curl -I http://cms.facundozupel.com/health
```

---

## 🔧 Configuración

### Variables de entorno

```bash
# Ver variables actuales
docker service inspect cms_cms-service --format '{{json .Spec.TaskTemplate.ContainerSpec.Env}}' | jq

# Update variable de entorno
docker service update \
  --env-add ALLOWED_ORIGINS="https://nuevo-dominio.com" \
  cms_cms-service
```

### Recursos

```bash
# Actualizar límites de memoria
docker service update \
  --limit-memory 512M \
  --reserve-memory 256M \
  cms_cms-service

# Actualizar límites de CPU
docker service update \
  --limit-cpu 0.5 \
  --reserve-cpu 0.25 \
  cms_cms-service
```

### Health check

```bash
# Actualizar health check interval
docker service update \
  --health-interval 60s \
  --health-timeout 10s \
  cms_cms-service
```

---

## 🔐 Seguridad

### Rotar password

```bash
# Generar nuevo password
NEW_PASSWORD=$(openssl rand -base64 24)

# Actualizar en .env.production
echo "ADMIN_PASSWORD=${NEW_PASSWORD}" >> .env.production

# Re-deploy
export $(cat .env.production | xargs)
docker service update --env-add ADMIN_PASSWORD="${NEW_PASSWORD}" cms_cms-service
```

### Ver secrets (si se usan)

```bash
# Listar secrets
docker secret ls

# Inspeccionar secret
docker secret inspect admin_password
```

---

## 📝 Troubleshooting Común

### Error 502 Bad Gateway

```bash
# Verificar que servicio está running
docker service ps cms_cms-service

# Ver logs
docker service logs cms_cms-service

# Verificar health check
docker exec $(docker ps -q -f name=cms_cms-service | head -1) curl http://localhost:8001/health

# Recrear servicio
docker service update --force cms_cms-service
```

### Error 503 Service Unavailable

```bash
# Ver estado de health checks
docker service inspect cms_cms-service | grep -A 20 Healthcheck

# Ver logs de health check
docker service logs cms_cms-service | grep health

# Aumentar start period
docker service update --health-start-period 60s cms_cms-service
```

### Servicio no actualiza

```bash
# Forzar pull de nueva imagen
docker service update --force --with-registry-auth cms_cms-service

# Verificar que imagen existe en Docker Hub
docker pull facundozupel/cms-service:latest
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

## 🚨 Emergencias

### Servicio caído - Restart rápido

```bash
# Forzar recreación de todas las réplicas
docker service update --force cms_cms-service
```

### Rollback de emergencia

```bash
# Rollback automático
docker service rollback cms_cms-service

# Verificar
docker service ps cms_cms-service
```

### Eliminar y recrear stack

```bash
# Backup de configuración
docker service inspect cms_cms-service > backup-service.json

# Eliminar stack
docker stack rm cms

# Esperar limpieza (30 segundos)
sleep 30

# Re-deploy
docker stack deploy -c docker-stack-cms.yml cms
```

---

## 📦 Deploy Automatizado

### Usando el script

```bash
# Deploy nueva versión
./deploy-cms.sh 1.1.0

# Con configuración de servidor remoto
export DEPLOY_HOST="usuario@servidor.com"
export DEPLOY_URL="https://cms.facundozupel.com"
./deploy-cms.sh 1.1.0
```

---

## 🔗 Enlaces Útiles

- **Logs en tiempo real**: `docker service logs -f cms_cms-service`
- **Estado del servicio**: `watch docker service ps cms_cms-service`
- **Métricas**: `docker stats $(docker ps -q -f name=cms_cms-service)`
- **Health check**: `curl https://cms.facundozupel.com/health`

---

**Tip Pro**: Crea aliases en tu `.bashrc` o `.zshrc`:

```bash
alias cms-logs='docker service logs -f cms_cms-service'
alias cms-ps='docker service ps cms_cms-service'
alias cms-health='curl https://cms.facundozupel.com/health'
alias cms-update='docker service update --force cms_cms-service'
```

---

**Última actualización**: 2025-11-03
