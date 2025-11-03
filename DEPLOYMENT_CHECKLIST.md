# ✅ Checklist de Deployment - CMS Service

Usa este checklist para asegurar un deployment exitoso a producción.

---

## 📋 Pre-requisitos

### Servidor VPS/Cloud
- [ ] Servidor VPS/Cloud provisionado
- [ ] Sistema operativo: Ubuntu 22.04+ instalado
- [ ] Mínimo 2GB RAM, 1 vCPU, 20GB disco
- [ ] IP pública asignada
- [ ] Acceso SSH configurado

### Software en el Servidor
- [ ] Docker Engine 20.10+ instalado
- [ ] Docker Compose v2+ instalado
- [ ] Docker Swarm inicializado
- [ ] curl instalado
- [ ] git instalado (opcional)

### Red y Firewall
- [ ] Puerto 22 (SSH) abierto
- [ ] Puerto 80 (HTTP) abierto
- [ ] Puerto 443 (HTTPS) abierto
- [ ] Firewall configurado (UFW o similar)

### DNS
- [ ] Dominio registrado
- [ ] Registro A creado: `cms.tudominio.com` → IP del servidor
- [ ] DNS propagado (verificado con `dig cms.tudominio.com`)
- [ ] TTL configurado (recomendado: 300 segundos)

---

## 🐋 Configuración Docker

### Docker Swarm
- [ ] Swarm inicializado: `docker swarm init`
- [ ] Nodo manager activo
- [ ] Verificado con: `docker node ls`

### Redes
- [ ] Red `network_public` creada: `docker network create --driver overlay --attachable network_public`
- [ ] Verificada con: `docker network ls | grep network_public`

### Traefik
- [ ] Traefik stack deployado (o usa tu configuración existente)
- [ ] Traefik corriendo: `docker service ls | grep traefik`
- [ ] Red `network_public` configurada en Traefik
- [ ] Entrypoints `web` y `websecure` configurados
- [ ] Certificate resolver `letsencryptresolver` configurado

---

## 🏗️ Build de la Imagen

### Local (tu máquina)
- [ ] Código del CMS Service actualizado en `cms-service/`
- [ ] `requirements.txt` actualizado
- [ ] Tests locales pasando (si aplica)

### Dockerfile
- [ ] `Dockerfile.production` revisado
- [ ] Multi-stage build configurado
- [ ] Usuario no-root configurado
- [ ] Health check definido

### Build
- [ ] Build ejecutado: `docker build -f cms-service/Dockerfile.production -t facundozupel/cms-service:X.X.X .`
- [ ] Tag `latest` también creado
- [ ] Build exitoso sin errores

### Test Local
- [ ] Container de prueba iniciado:
  ```bash
  docker run --rm -p 8001:8001 \
    -e ADMIN_PASSWORD=test123 \
    -e ALLOWED_ORIGINS=http://localhost:4321 \
    facundozupel/cms-service:X.X.X
  ```
- [ ] Health check pasando: `curl http://localhost:8001/health`
- [ ] Endpoints respondiendo correctamente
- [ ] Container detenido después del test

### Docker Hub
- [ ] Login en Docker Hub: `docker login`
- [ ] Imagen pusheada: `docker push facundozupel/cms-service:X.X.X`
- [ ] Tag `latest` pusheado: `docker push facundozupel/cms-service:latest`
- [ ] Imagen visible en Docker Hub

---

## ⚙️ Configuración del Servidor

### Archivos en el Servidor
- [ ] Directorio creado: `mkdir -p ~/cms-service`
- [ ] `docker-stack-cms.yml` copiado al servidor
- [ ] `.env.production` copiado al servidor

### Variables de Entorno
- [ ] `.env.production` editado en el servidor
- [ ] `ADMIN_PASSWORD` configurado con password seguro
  - [ ] Generado con: `openssl rand -base64 24`
  - [ ] Mínimo 16 caracteres
  - [ ] Guardado en lugar seguro (password manager)
- [ ] `ALLOWED_ORIGINS` configurado con dominios reales
  - [ ] Formato: `https://dominio1.com,https://dominio2.com`
  - [ ] Sin espacios
  - [ ] Sin trailing slashes

### Stack Configuration
- [ ] `docker-stack-cms.yml` revisado
- [ ] Dominio actualizado: `Host(\`cms.tudominio.com\`)`
- [ ] Nombre de imagen correcto: `facundozupel/cms-service:X.X.X`
- [ ] Réplicas configuradas (default: 2)
- [ ] Recursos ajustados si es necesario

---

## 🚀 Deployment

### Pre-Deploy Checks
- [ ] Variables cargadas: `export $(cat .env.production | xargs)`
- [ ] Stack file validado: `docker stack config -c docker-stack-cms.yml`
- [ ] Sin errores en la validación

### Deploy
- [ ] Stack deployado: `docker stack deploy -c docker-stack-cms.yml cms`
- [ ] Sin errores en el deploy
- [ ] Stack visible: `docker stack ls`
- [ ] Servicio creado: `docker stack services cms`

### Verificación Inicial
- [ ] Réplicas iniciando: `docker service ps cms_cms-service`
- [ ] Estado: `Running` en todas las réplicas
- [ ] Sin errores en tasks
- [ ] Esperado ~40 segundos para health check inicial

---

## ✅ Verificación Post-Deploy

### Health Checks
- [ ] Health check HTTP: `curl http://cms.tudominio.com/health`
- [ ] Health check HTTPS: `curl https://cms.tudominio.com/health`
- [ ] Response esperado: `{"status":"healthy"}`

### SSL/TLS
- [ ] HTTPS funcionando: `curl -I https://cms.tudominio.com/health`
- [ ] Certificado válido (sin warnings en el browser)
- [ ] Redirect HTTP → HTTPS: `curl -I http://cms.tudominio.com/health`
- [ ] Status code 301 o 308 en redirect

### Headers de Seguridad
- [ ] `Strict-Transport-Security` presente
- [ ] `X-Frame-Options: DENY` presente
- [ ] `X-Content-Type-Options: nosniff` presente
- [ ] `X-XSS-Protection` presente

### Endpoints Públicos
- [ ] `GET /`: `curl https://cms.tudominio.com/`
- [ ] `GET /health`: `curl https://cms.tudominio.com/health`
- [ ] `GET /api/posts`: `curl https://cms.tudominio.com/api/posts`

### Endpoints Admin
- [ ] POST sin auth falla: `curl -X POST https://cms.tudominio.com/api/admin/posts`
  - [ ] Response: 401 Unauthorized
- [ ] POST con auth funciona:
  ```bash
  curl -X POST https://cms.tudominio.com/api/admin/posts \
    -u "admin:$ADMIN_PASSWORD" \
    -H "Content-Type: application/json" \
    -d '{"title":"Test","slug":"test","content":"Test","excerpt":"Test"}'
  ```
  - [ ] Response: 200 OK con post creado

### Logs
- [ ] Logs accesibles: `docker service logs cms_cms-service`
- [ ] Sin errores críticos en logs
- [ ] Logs de requests visible

---

## 📊 Monitoreo

### Métricas
- [ ] CPU usage < 50%: `docker stats`
- [ ] Memory usage < 400MB por replica
- [ ] Health checks pasando cada 30s

### Réplicas
- [ ] 2 réplicas corriendo: `docker service ps cms_cms-service`
- [ ] Ambas en estado `Running`
- [ ] Distribuidas en diferentes nodos (si multi-node)

### Load Balancing
- [ ] Requests distribuidas entre réplicas
- [ ] Test: múltiples requests con `curl` en loop
- [ ] Sin errores 502/503

---

## 🔐 Seguridad

### Autenticación
- [ ] Admin endpoints protegidos con Basic Auth
- [ ] Password seguro configurado
- [ ] No expuesto en logs ni código

### CORS
- [ ] `ALLOWED_ORIGINS` configurado correctamente
- [ ] Test desde frontend funcionando
- [ ] Dominios no autorizados bloqueados

### Secrets
- [ ] `.env.production` no commiteado a Git
- [ ] `.env.production` agregado a `.gitignore`
- [ ] Variables de entorno no expuestas en logs

### Firewall
- [ ] Solo puertos necesarios abiertos (22, 80, 443)
- [ ] Puerto 8001 NO expuesto públicamente
- [ ] SSH con autenticación por llaves (recomendado)

---

## 📝 Documentación

### Credenciales
- [ ] `ADMIN_PASSWORD` guardado en password manager
- [ ] Credenciales SSH guardadas
- [ ] Docker Hub credentials guardadas

### Runbook
- [ ] Comandos de deployment documentados
- [ ] Procedimiento de rollback documentado
- [ ] Contactos de emergencia anotados

### Monitoreo
- [ ] Dashboard de Traefik accesible (si aplica)
- [ ] Logs centralizados configurados (opcional)
- [ ] Alertas configuradas (opcional)

---

## 🧪 Testing Completo

### Funcionalidad
- [ ] Crear post funciona
- [ ] Listar posts funciona
- [ ] Obtener post por slug funciona
- [ ] Actualizar post funciona
- [ ] Eliminar post funciona

### Performance
- [ ] Latencia < 200ms (p95)
- [ ] No hay timeouts
- [ ] Concurrent requests manejados correctamente

### Resilience
- [ ] Detener 1 replica → servicio sigue funcionando
- [ ] Health check detecta containers unhealthy
- [ ] Restart policy funciona

---

## 🔄 Rolling Update Test

### Update Simulation
- [ ] Build nueva versión de imagen
- [ ] Push a Docker Hub
- [ ] Update ejecutado: `docker service update --image facundozupel/cms-service:X.X.X cms_cms-service`
- [ ] Rolling update exitoso
- [ ] 1 replica a la vez
- [ ] Sin downtime durante update
- [ ] Todas las réplicas actualizadas

---

## ⏪ Rollback Test

### Rollback Simulation
- [ ] Rollback ejecutado: `docker service rollback cms_cms-service`
- [ ] Rollback exitoso
- [ ] Servicio vuelve a versión anterior
- [ ] Sin downtime durante rollback

---

## 🎯 Integración con Frontend

### Configuración Frontend
- [ ] API URL configurada en frontend
- [ ] CORS permitiendo requests desde frontend
- [ ] Autenticación funcionando desde UI admin (si aplica)

### Testing E2E
- [ ] Frontend puede listar posts
- [ ] Frontend puede mostrar post individual
- [ ] Panel admin puede crear posts (si aplica)
- [ ] Panel admin puede editar posts (si aplica)

---

## 📈 Optimizaciones Opcionales

### Performance
- [ ] CDN configurado (Cloudflare, etc.)
- [ ] Rate limiting configurado en Traefik
- [ ] Caching headers configurados

### Monitoring Avanzado
- [ ] Prometheus + Grafana instalado
- [ ] Métricas custom configuradas
- [ ] Alertas con Slack/Email/PagerDuty

### Backup
- [ ] Backup de datos configurado
- [ ] Test de restore realizado
- [ ] Backup schedule automatizado

### CI/CD
- [ ] GitHub Actions workflow creado
- [ ] Auto-build en push a main
- [ ] Auto-deploy a staging/production

---

## 🚨 Plan de Contingencia

### Contactos
- [ ] Número de teléfono de emergencia anotado
- [ ] Email de soporte configurado
- [ ] Contacto de proveedor de hosting guardado

### Procedimientos
- [ ] Rollback procedure documentado
- [ ] Escalation path definido
- [ ] Backup restore procedure probado

### Testing de Disaster Recovery
- [ ] Simulación de falla de servidor
- [ ] Simulación de falla de DNS
- [ ] Simulación de falla de certificado SSL

---

## ✅ Sign-off Final

### Stakeholders
- [ ] Deploy revisado por tech lead
- [ ] QA realizado
- [ ] Product owner informado
- [ ] Usuario final notificado (si aplica)

### Documentación
- [ ] CHANGELOG.md actualizado
- [ ] Version tag creado en Git
- [ ] Release notes publicadas (si aplica)

### Post-Deployment
- [ ] Monitoreo durante primeras 24h
- [ ] Métricas recolectadas
- [ ] Issues documentados
- [ ] Retrospectiva agendada

---

## 🎉 Deployment Completado

**Fecha de deployment**: _______________

**Versión deployada**: _______________

**Deployed by**: _______________

**Notas adicionales**:
```
_______________________________________________
_______________________________________________
_______________________________________________
```

---

## 📞 Soporte Post-Deployment

Si encuentras problemas:

1. **Revisar logs**: `docker service logs -f cms_cms-service`
2. **Verificar health**: `curl https://cms.tudominio.com/health`
3. **Consultar**: `DEPLOY_DOCKER.md` sección Troubleshooting
4. **Rollback si necesario**: `docker service rollback cms_cms-service`
5. **Contactar soporte**: [tu-email@dominio.com]

---

**Última actualización**: 2025-11-03
**Versión del checklist**: 1.0.0
