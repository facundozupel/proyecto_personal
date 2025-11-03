# 🐋 Docker Deployment - CMS Service

Configuración completa de Docker Stack con Traefik para el CMS Service en producción.

---

## 📦 Archivos Generados

| Archivo | Tamaño | Descripción |
|---------|--------|-------------|
| `docker-stack-cms.yml` | 6.2 KB | Stack de Docker Swarm con configuración de Traefik |
| `cms-service/Dockerfile.production` | 4.6 KB | Dockerfile optimizado con multi-stage build |
| `.env.production` | 1.9 KB | Template de variables de entorno |
| `deploy-cms.sh` | 8.3 KB | Script automatizado de deploy |
| `DEPLOY_DOCKER.md` | 13 KB | Guía completa de deployment (paso a paso) |
| `DOCKER_QUICKREF.md` | 7.4 KB | Referencia rápida de comandos |
| `DOCKER_DEPLOYMENT_SUMMARY.md` | 8.5 KB | Resumen ejecutivo de toda la configuración |
| `API_TESTING.md` | 14 KB | Guía de testing de la API |

**Total**: ~64 KB de documentación y configuración profesional.

---

## 🚀 Quick Start (3 pasos)

### 1. Build y Push (Desde tu máquina local)

```bash
cd cms-service
docker build -f Dockerfile.production -t facundozupel/cms-service:1.0.0 .
docker push facundozupel/cms-service:1.0.0
```

### 2. Configurar Servidor

```bash
# SSH al servidor
ssh usuario@tu-servidor.com

# Copiar archivos
mkdir -p ~/cms-service && cd ~/cms-service
# Copiar docker-stack-cms.yml y .env.production

# Configurar variables de entorno
nano .env.production
# Cambiar ADMIN_PASSWORD y ALLOWED_ORIGINS
```

### 3. Deploy

```bash
# Cargar variables
export $(cat .env.production | xargs)

# Deploy stack
docker stack deploy -c docker-stack-cms.yml cms

# Verificar
curl https://cms.facundozupel.com/health
```

---

## 📚 Documentación

### Para empezar
- **`DOCKER_DEPLOYMENT_SUMMARY.md`** - Comienza aquí para un overview completo
- **`DEPLOY_DOCKER.md`** - Guía paso a paso con troubleshooting

### Durante el desarrollo
- **`DOCKER_QUICKREF.md`** - Comandos frecuentes
- **`API_TESTING.md`** - Testing de endpoints

### Para deploy
- **`deploy-cms.sh`** - Script automatizado

---

## 🎯 Características

### Seguridad ✅
- HTTPS automático con Let's Encrypt
- Usuario no-root en containers
- Headers de seguridad (HSTS, X-Frame-Options)
- Basic Auth en endpoints admin
- CORS configurado

### Alta Disponibilidad ✅
- 2 réplicas con load balancing
- Health checks automáticos
- Rolling updates sin downtime
- Rollback automático en caso de fallo

### Performance ✅
- Multi-stage build (imagen ~150MB)
- 2 workers de uvicorn
- Límites de recursos definidos
- Cache de Docker optimizado

### Operaciones ✅
- Logs centralizados
- Monitoreo con Docker stats
- Deploy automatizado con script
- Rollback en 1 comando

---

## 🔧 Comandos Más Usados

```bash
# Ver logs
docker service logs -f cms_cms-service

# Ver estado
docker service ps cms_cms-service

# Actualizar
docker service update --image facundozupel/cms-service:1.1.0 cms_cms-service

# Rollback
docker service rollback cms_cms-service

# Escalar
docker service scale cms_cms-service=3
```

---

## 📊 Arquitectura

```
Internet (puerto 80/443)
    │
    ▼
Traefik (reverse proxy)
    │
    ├─ SSL/TLS (Let's Encrypt)
    ├─ Headers de seguridad
    ├─ Load balancing
    │
    ▼
CMS Service (2 réplicas)
    │
    ├─ Replica 1: 512MB RAM, 0.5 CPU
    └─ Replica 2: 512MB RAM, 0.5 CPU
```

---

## 🔐 Configuración Necesaria

### 1. DNS
```
Tipo    Nombre    Valor               TTL
A       cms       <IP_SERVIDOR>       300
```

### 2. Servidor
- Docker Swarm inicializado
- Red `network_public` creada
- Traefik corriendo
- Puertos 80 y 443 abiertos

### 3. Variables de Entorno
```bash
ADMIN_PASSWORD=<generado con: openssl rand -base64 24>
ALLOWED_ORIGINS=https://facundozupel.com,https://www.facundozupel.com
```

---

## 🆘 Troubleshooting Rápido

| Síntoma | Comando | Solución |
|---------|---------|----------|
| Error 502 | `docker service logs cms_cms-service` | Servicio no está running |
| Error 503 | `docker service ps cms_cms-service` | Health check fallando |
| No actualiza | `docker service update --force cms_cms-service` | Forzar recreación |
| SSL no funciona | `docker service logs traefik_traefik` | Verificar DNS |

**Ver más**: `DEPLOY_DOCKER.md` sección Troubleshooting

---

## 📈 Próximos Pasos

1. **Deploy inicial**: Seguir `DEPLOY_DOCKER.md`
2. **Test de API**: Usar scripts en `API_TESTING.md`
3. **Monitoreo**: Configurar alertas y métricas
4. **Backup**: Implementar backup de datos (cuando migres a DB)
5. **CI/CD**: Automatizar con GitHub Actions

---

## 🔗 Integración con Tu Configuración de Traefik

Esta configuración está diseñada para trabajar con tu setup existente de Traefik:

```yaml
# Tu Traefik ya tiene:
- providers.docker.swarmMode=true
- entrypoints web (puerto 80)
- entrypoints websecure (puerto 443)
- certificatesresolvers letsencryptresolver
- network_public

# El CMS Service usa:
- Misma red: network_public
- Mismo certresolver: letsencryptresolver
- Mismos entrypoints: web, websecure
- Middlewares de seguridad adicionales
```

**Todo está listo para funcionar sin modificar tu Traefik existente.**

---

## 🎓 Aprendizaje

Esta configuración implementa **best practices** de:

- **Docker**: Multi-stage builds, usuario no-root, health checks
- **Swarm**: Placement constraints, rolling updates, resource limits
- **Traefik**: Load balancing, SSL automático, security headers
- **DevOps**: Logs centralizados, monitoring, rollback strategy
- **Seguridad**: HTTPS, HSTS, autenticación, CORS

---

## 💡 Tips

### Deploy automatizado
```bash
# Configurar una vez
export DEPLOY_HOST="usuario@servidor.com"
export DEPLOY_URL="https://cms.facundozupel.com"

# Deploy en 1 comando
./deploy-cms.sh 1.0.0
```

### Aliases útiles
```bash
# Agregar a ~/.bashrc o ~/.zshrc
alias cms-logs='docker service logs -f cms_cms-service'
alias cms-ps='docker service ps cms_cms-service'
alias cms-health='curl https://cms.facundozupel.com/health'
```

### Monitoreo simple
```bash
# Health check cada 30 segundos
watch -n 30 curl -s https://cms.facundozupel.com/health
```

---

## 📞 Soporte

**Para problemas**:
1. Revisar logs: `docker service logs cms_cms-service`
2. Consultar troubleshooting en `DEPLOY_DOCKER.md`
3. Verificar checklist en `DOCKER_DEPLOYMENT_SUMMARY.md`

**Para features nuevos**:
- Revisar sección "Próximos Pasos" en `DOCKER_DEPLOYMENT_SUMMARY.md`
- Consultar documentación oficial de Docker Swarm y Traefik

---

## 📝 Checklist Pre-Producción

- [ ] DNS configurado y propagado
- [ ] `.env.production` con valores seguros
- [ ] Password generado con `openssl rand -base64 24`
- [ ] Docker Swarm inicializado
- [ ] Red `network_public` creada
- [ ] Traefik corriendo
- [ ] Imagen buildeada y pusheada a Docker Hub
- [ ] Firewall configurado (22, 80, 443)
- [ ] Backup configurado (futuro)
- [ ] Monitoring configurado (opcional)

---

## 🎉 ¿Todo listo?

```bash
# Test rápido de todo
./deploy-cms.sh 1.0.0

# Si todo funciona, verás:
# ✅ Imagen construida
# ✅ Tests locales pasando
# ✅ Push a Docker Hub exitoso
# ✅ Deploy completado
# ✅ Health check en producción OK
```

---

**Versión**: 1.0.0
**Fecha**: 2025-11-03
**Autor**: Claude Code
**Proyecto**: Landing Page Organic Growth - Facundo Zupel

---

## 🔗 Enlaces

- Proyecto principal: `README.md`
- Documentación microservicios: `README.microservices.md`
- Arquitectura: `MICROSERVICES_SUMMARY.md`
- Changelog: `CHANGELOG.md`
