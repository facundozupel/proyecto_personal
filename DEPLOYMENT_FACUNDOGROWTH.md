# 🚀 Deployment Guide - facundogrowth.com

**Última actualización**: 2025-11-03
**Dominio**: https://facundogrowth.com
**CMS API**: https://facundogrowth.com

---

## 📋 Resumen de Configuración

### ✅ Archivos Actualizados

Todos los archivos de configuración han sido actualizados con el dominio **facundogrowth.com**:

1. ✅ `docker-stack-cms.yml` - Traefik configurado con facundogrowth.com
2. ✅ `.env.production` - ALLOWED_ORIGINS actualizado
3. ✅ `src/config/api.ts` - Frontend apunta a facundogrowth.com en producción

---

## 🌐 Configuración de DNS

### Requisito CRÍTICO

Antes de hacer el deploy, **DEBES configurar el DNS**:

```
Tipo: A Record
Host: @ (o vacío, depende del proveedor)
Valor: IP_DE_TU_SERVIDOR
TTL: 300 (5 minutos)
```

**Opcional - Subdominio www:**
```
Tipo: CNAME
Host: www
Valor: facundogrowth.com
TTL: 300
```

### Verificar DNS

```bash
# Verificar que el dominio apunta a tu servidor
dig +short facundogrowth.com

# O con nslookup
nslookup facundogrowth.com

# Debe retornar la IP de tu servidor
```

⚠️ **IMPORTANTE**: Espera que el DNS se propague antes de deployar (puede tomar 5-60 minutos).

---

## 🔧 Configuración del Stack

### 1. Variables de Entorno

Edita `.env.production` con valores reales:

```bash
# Generar password seguro
openssl rand -base64 24

# Editar archivo
nano .env.production
```

**Configuración requerida:**

```bash
# Password para endpoints de admin (CAMBIAR OBLIGATORIO)
ADMIN_PASSWORD=tu_password_super_seguro_aqui

# CORS - Ya configurado para facundogrowth.com
ALLOWED_ORIGINS=https://facundogrowth.com,https://www.facundogrowth.com
```

### 2. Docker Stack

El archivo `docker-stack-cms.yml` ya está configurado con:

✅ Dominio: `facundogrowth.com`
✅ SSL automático con Let's Encrypt
✅ Redirect HTTP → HTTPS
✅ 2 réplicas para alta disponibilidad
✅ Security headers habilitados
✅ Health checks configurados

**No requiere modificación**, está listo para deploy.

---

## 🚀 Deployment Step by Step

### Pre-requisitos

```bash
# 1. Verificar que Traefik está corriendo
docker service ls | grep traefik

# 2. Verificar que existe la red network_public
docker network ls | grep network_public

# 3. Verificar que Docker Swarm está activo
docker info | grep Swarm
```

### Paso 1: Build y Push de la Imagen

```bash
# Navegar al directorio del servicio
cd cms-service

# Build de la imagen de producción
docker build -f Dockerfile.production -t facundozupel/cms-service:1.0.0 .

# Login a Docker Hub
docker login

# Push de la imagen
docker push facundozupel/cms-service:1.0.0

# Tag como latest
docker tag facundozupel/cms-service:1.0.0 facundozupel/cms-service:latest
docker push facundozupel/cms-service:latest
```

### Paso 2: Preparar Variables de Entorno en Servidor

```bash
# SSH al servidor
ssh usuario@tuservidor.com

# Crear directorio
mkdir -p ~/cms-deployment && cd ~/cms-deployment

# Copiar archivos desde local
scp docker-stack-cms.yml .env.production usuario@tuservidor.com:~/cms-deployment/

# Editar variables de entorno
nano .env.production

# Exportar variables
export $(cat .env.production | xargs)

# Verificar que se exportaron
echo $ADMIN_PASSWORD
echo $ALLOWED_ORIGINS
```

### Paso 3: Deploy del Stack

```bash
# Deploy
docker stack deploy -c docker-stack-cms.yml cms

# Verificar servicios
docker service ls

# Ver logs en tiempo real
docker service logs -f cms_cms-service

# Esperar que las réplicas estén corriendo (puede tomar 1-2 minutos)
watch docker service ps cms_cms-service
```

### Paso 4: Verificación

```bash
# 1. Health check
curl https://facundogrowth.com/health

# Debe retornar: {"status":"healthy"}

# 2. Verificar info del servicio
curl https://facundogrowth.com/

# Debe retornar: {"message":"CMS Service - Blog API","version":"1.0.0"}

# 3. Verificar SSL
curl -I https://facundogrowth.com/health | grep "HTTP/2 200"

# 4. Verificar redirect HTTP → HTTPS
curl -I http://facundogrowth.com/health | grep "301"

# 5. Ver documentación Swagger
open https://facundogrowth.com/docs
```

---

## 🧪 Testing de Endpoints

### Endpoints Públicos (sin auth)

```bash
# Health check
curl https://facundogrowth.com/health

# Listar posts (vacío inicialmente)
curl https://facundogrowth.com/api/posts

# Documentación interactiva
open https://facundogrowth.com/docs
```

### Endpoints Admin (con auth)

```bash
# Crear primer post
curl -X POST https://facundogrowth.com/api/admin/posts \
  -u admin:TU_PASSWORD_AQUI \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Primer Post",
    "slug": "mi-primer-post",
    "content": "Este es el contenido de mi primer post desde la API de producción.",
    "excerpt": "Primer post en producción",
    "author": "Facundo Zupel",
    "tags": ["blog", "launch"],
    "published": true
  }'

# Verificar que se creó
curl https://facundogrowth.com/api/posts/mi-primer-post
```

---

## 🔍 Monitoreo Post-Deploy

### Logs en Tiempo Real

```bash
# Ver logs del servicio
docker service logs -f cms_cms-service

# Ver últimas 100 líneas
docker service logs --tail 100 cms_cms-service

# Filtrar errores
docker service logs cms_cms-service 2>&1 | grep -i error
```

### Estado del Servicio

```bash
# Ver estado de réplicas
docker service ps cms_cms-service

# Ver recursos usados
docker stats $(docker ps -q --filter name=cms_cms-service)

# Información detallada del servicio
docker service inspect cms_cms-service --pretty
```

### Health Checks

```bash
# Verificar health continuamente (cada 10s)
watch -n 10 'curl -s https://facundogrowth.com/health | jq'
```

---

## 🔄 Actualización del Servicio

### Deploy de Nueva Versión

```bash
# 1. Build nueva versión
docker build -f Dockerfile.production -t facundozupel/cms-service:1.1.0 .
docker push facundozupel/cms-service:1.1.0

# 2. Actualizar servicio (rolling update automático)
docker service update --image facundozupel/cms-service:1.1.0 cms_cms-service

# 3. Monitorear actualización
watch docker service ps cms_cms-service

# 4. Verificar nueva versión
curl https://facundogrowth.com/
```

### Rollback si algo falla

```bash
# Rollback a versión anterior
docker service rollback cms_cms-service

# Verificar
docker service ps cms_cms-service
```

---

## 📊 Frontend Integration

El archivo `src/config/api.ts` ya está configurado para:

### Desarrollo (localhost)
```typescript
CMS_API_URL: 'http://localhost:8001'
```

### Producción (automático)
```typescript
CMS_API_URL: 'https://facundogrowth.com'
```

### Override Manual (opcional)

Si necesitas apuntar a otra URL temporalmente:

```bash
# En .env.local del frontend
PUBLIC_CMS_API_URL=https://facundogrowth.com
```

---

## 🛠️ Troubleshooting

### Problema: Error 502 Bad Gateway

**Causa**: Servicio no está corriendo o Traefik no puede conectarse

**Solución**:
```bash
# Ver logs del servicio
docker service logs cms_cms-service

# Verificar que réplicas están UP
docker service ps cms_cms-service

# Verificar health check
docker service inspect cms_cms-service | grep -A 5 "HealthCheck"
```

### Problema: Error 503 Service Unavailable

**Causa**: Health check fallando

**Solución**:
```bash
# Ver logs
docker service logs cms_cms-service

# Verificar endpoint /health dentro del container
docker exec $(docker ps -q --filter name=cms_cms-service | head -1) curl localhost:8001/health

# Aumentar start_period si es necesario
docker service update --health-start-period 60s cms_cms-service
```

### Problema: SSL no funciona

**Causa**: DNS no está configurado o Traefik no puede obtener certificado

**Solución**:
```bash
# Verificar DNS
dig +short facundogrowth.com

# Ver logs de Traefik
docker service logs traefik | grep -i "facundogrowth"

# Verificar que Let's Encrypt resolver está configurado en Traefik
docker service inspect traefik | grep -i "letsencrypt"
```

### Problema: CORS errors en frontend

**Causa**: ALLOWED_ORIGINS no está configurado correctamente

**Solución**:
```bash
# Verificar variable de entorno
docker service inspect cms_cms-service | grep ALLOWED_ORIGINS

# Actualizar si es necesario
docker service update \
  --env-add ALLOWED_ORIGINS=https://facundogrowth.com,https://www.facundogrowth.com \
  cms_cms-service
```

---

## 🔒 Seguridad Post-Deploy

### Checklist de Seguridad

- [ ] Password de admin cambiado del default
- [ ] SSL/HTTPS funcionando correctamente
- [ ] HTTP redirige a HTTPS
- [ ] Security headers activos (verificar en browser dev tools)
- [ ] CORS configurado solo para tus dominios
- [ ] Firewall del servidor configurado (solo puertos 22, 80, 443)
- [ ] SSH con key-based auth (no passwords)
- [ ] Docker socket no expuesto públicamente
- [ ] Backups configurados (si hay persistencia)

### Verificar Security Headers

```bash
curl -I https://facundogrowth.com/health | grep -E "Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options"
```

Deberías ver:
```
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-frame-options: DENY
x-content-type-options: nosniff
```

---

## 📈 Métricas y Performance

### Verificar Performance

```bash
# Test de carga básico con ab (Apache Bench)
ab -n 1000 -c 10 https://facundogrowth.com/health

# Test de carga con wrk
wrk -t2 -c10 -d30s https://facundogrowth.com/health
```

### Escalar si es necesario

```bash
# Aumentar a 3 réplicas
docker service scale cms_cms-service=3

# Verificar distribución
docker service ps cms_cms-service
```

---

## 🎯 Checklist Final

Antes de dar por completado el deployment:

### Infraestructura
- [ ] DNS configurado y propagado
- [ ] Traefik corriendo
- [ ] Red network_public existe
- [ ] Docker Swarm activo

### Deploy
- [ ] Imagen buildeada y pusheada
- [ ] Stack deployado (2 réplicas UP)
- [ ] Variables de entorno configuradas
- [ ] Health checks pasando

### Testing
- [ ] `/health` retorna 200
- [ ] `/` retorna info del servicio
- [ ] `/docs` muestra Swagger UI
- [ ] SSL funcionando (HTTPS)
- [ ] HTTP redirige a HTTPS
- [ ] CORS permite tu dominio

### Seguridad
- [ ] Password de admin cambiado
- [ ] Security headers activos
- [ ] Firewall configurado
- [ ] Logs monitoreados

### Integración
- [ ] Frontend apunta a https://facundogrowth.com
- [ ] Primer post creado exitosamente
- [ ] Frontend puede consumir API

---

## 📞 Próximos Pasos

1. **Monitoring**: Configurar alertas (Prometheus + Grafana)
2. **Backup**: Setup de backup si migras de in-memory a DB
3. **CI/CD**: GitHub Actions para auto-deploy
4. **CDN**: Considerar Cloudflare para cacheo
5. **Analytics**: Integrar logs con servicio de analytics

---

## 📚 Documentación de Referencia

- **Guía completa**: `DEPLOY_DOCKER.md`
- **Comandos rápidos**: `DOCKER_QUICKREF.md`
- **Testing**: `API_TESTING.md`
- **Checklist**: `DEPLOYMENT_CHECKLIST.md`

---

**¡Deployment listo! 🎉**

Tu CMS Service ahora está corriendo en producción en:
- **API**: https://facundogrowth.com
- **Docs**: https://facundogrowth.com/docs
- **Health**: https://facundogrowth.com/health

**Configuración**:
- ✅ 2 réplicas activas
- ✅ SSL automático
- ✅ Alta disponibilidad
- ✅ Security headers
- ✅ Health checks
- ✅ Rolling updates

---

**Última actualización**: 2025-11-03
**Versión del stack**: 1.0.0
**Dominio**: facundogrowth.com
