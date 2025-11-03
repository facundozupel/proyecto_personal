#!/bin/bash
# =============================================================================
# Script de Deploy Automatizado - CMS Service
# =============================================================================
#
# Descripción: Script para automatizar el proceso de build, push y deploy
# Uso: ./deploy-cms.sh [version]
# Ejemplo: ./deploy-cms.sh 1.0.0
#
# =============================================================================

set -e  # Exit on error
set -u  # Exit on undefined variable

# -----------------------------------------------------------------------------
# Configuración
# -----------------------------------------------------------------------------

IMAGE_NAME="facundozupel/cms-service"
SERVICE_NAME="cms_cms-service"
STACK_NAME="cms"
DOCKERFILE="cms-service/Dockerfile.production"
STACK_FILE="docker-stack-cms.yml"
BUILD_CONTEXT="./cms-service"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# -----------------------------------------------------------------------------
# Funciones
# -----------------------------------------------------------------------------

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

# -----------------------------------------------------------------------------
# Validaciones
# -----------------------------------------------------------------------------

# Verificar que se pasó versión como argumento
if [ $# -eq 0 ]; then
    print_error "Debe especificar una versión"
    echo "Uso: $0 [version]"
    echo "Ejemplo: $0 1.0.0"
    exit 1
fi

VERSION=$1

# Verificar que estamos en el directorio correcto
if [ ! -f "$STACK_FILE" ]; then
    print_error "No se encuentra $STACK_FILE. ¿Estás en el directorio raíz del proyecto?"
    exit 1
fi

if [ ! -f "$DOCKERFILE" ]; then
    print_error "No se encuentra $DOCKERFILE"
    exit 1
fi

# Verificar que Docker está corriendo
if ! docker info > /dev/null 2>&1; then
    print_error "Docker no está corriendo"
    exit 1
fi

# -----------------------------------------------------------------------------
# Proceso de Deploy
# -----------------------------------------------------------------------------

print_header "🚀 Deploy de CMS Service v${VERSION}"

# 1. Verificar git status
print_info "Verificando estado de Git..."
if [[ -n $(git status -s) ]]; then
    print_warning "Hay cambios sin commitear"
    read -p "¿Deseas continuar? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Deploy cancelado"
        exit 1
    fi
fi
print_success "Git status verificado"

# 2. Build de la imagen
print_header "🔨 Building Docker Image"
print_info "Building ${IMAGE_NAME}:${VERSION}..."

docker build \
    -f "$DOCKERFILE" \
    -t "${IMAGE_NAME}:${VERSION}" \
    -t "${IMAGE_NAME}:latest" \
    "$BUILD_CONTEXT"

print_success "Imagen construida exitosamente"

# 3. Test local de la imagen
print_header "🧪 Testing Image Locally"
print_info "Iniciando container de prueba..."

# Detener container de prueba si existe
docker rm -f cms-test 2>/dev/null || true

# Iniciar container de prueba
docker run -d \
    --name cms-test \
    -p 8001:8001 \
    -e ADMIN_PASSWORD=test123 \
    -e ALLOWED_ORIGINS=http://localhost:4321 \
    "${IMAGE_NAME}:${VERSION}"

# Esperar a que esté listo
print_info "Esperando health check..."
sleep 10

# Verificar health check
if curl -f http://localhost:8001/health > /dev/null 2>&1; then
    print_success "Health check pasó ✓"
else
    print_error "Health check falló"
    docker logs cms-test
    docker rm -f cms-test
    exit 1
fi

# Limpiar container de prueba
docker rm -f cms-test > /dev/null 2>&1
print_success "Test local completado"

# 4. Login a Docker Hub
print_header "🔑 Docker Hub Login"
if ! docker info | grep -q "Username:"; then
    print_info "Iniciando sesión en Docker Hub..."
    docker login
else
    print_success "Ya estás logueado en Docker Hub"
fi

# 5. Push de la imagen
print_header "📤 Pushing Image to Docker Hub"
print_info "Pushing ${IMAGE_NAME}:${VERSION}..."
docker push "${IMAGE_NAME}:${VERSION}"

print_info "Pushing ${IMAGE_NAME}:latest..."
docker push "${IMAGE_NAME}:latest"

print_success "Imagen publicada en Docker Hub"

# 6. Confirmar deploy a producción
print_header "🚨 Deploy a Producción"
print_warning "Estás a punto de deployar a PRODUCCIÓN"
echo "Versión: ${VERSION}"
echo "Imagen: ${IMAGE_NAME}:${VERSION}"
echo ""
read -p "¿Confirmas el deploy? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_error "Deploy cancelado"
    exit 1
fi

# 7. Deploy al servidor (requiere configuración de SSH)
print_info "Conectando al servidor..."

# Verificar si tenemos configurado el servidor remoto
if [ -z "${DEPLOY_HOST:-}" ]; then
    print_warning "Variable DEPLOY_HOST no configurada"
    print_info "Para deploy automático al servidor, configura:"
    echo "export DEPLOY_HOST=usuario@tu-servidor.com"
    echo ""
    print_info "Comandos para ejecutar en el servidor:"
    echo ""
    echo "# En el servidor VPS:"
    echo "cd ~/cms-service"
    echo "export \$(cat .env.production | xargs)"
    echo "docker service update --image ${IMAGE_NAME}:${VERSION} ${SERVICE_NAME}"
    echo ""
    exit 0
fi

# Deploy remoto automático
print_info "Deployando al servidor ${DEPLOY_HOST}..."

ssh "$DEPLOY_HOST" << EOF
    set -e
    cd ~/cms-service
    export \$(cat .env.production | xargs)
    docker service update --image ${IMAGE_NAME}:${VERSION} ${SERVICE_NAME}
    echo "Deploy iniciado. Monitoreando..."
    docker service ps ${SERVICE_NAME}
EOF

print_success "Deploy completado"

# 8. Verificar deploy
print_header "✅ Verificando Deploy"

if [ -n "${DEPLOY_HOST:-}" ]; then
    print_info "Esperando a que el servicio esté listo..."
    sleep 15

    print_info "Verificando health check en producción..."
    if [ -n "${DEPLOY_URL:-}" ]; then
        if curl -f "${DEPLOY_URL}/health" > /dev/null 2>&1; then
            print_success "Servicio en producción está saludable ✓"
        else
            print_error "Health check en producción falló"
            print_info "Verifica los logs con:"
            echo "ssh ${DEPLOY_HOST} 'docker service logs ${SERVICE_NAME}'"
        fi
    else
        print_warning "Variable DEPLOY_URL no configurada"
        print_info "Configura para verificación automática:"
        echo "export DEPLOY_URL=https://cms.facundozupel.com"
    fi
fi

# 9. Crear tag de Git
print_header "🏷️  Git Tag"
read -p "¿Crear tag de Git v${VERSION}? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git tag -a "v${VERSION}" -m "Release v${VERSION}"
    git push origin "v${VERSION}"
    print_success "Tag v${VERSION} creado y pusheado"
fi

# -----------------------------------------------------------------------------
# Finalización
# -----------------------------------------------------------------------------

print_header "🎉 Deploy Completado"
echo "Versión: ${VERSION}"
echo "Imagen: ${IMAGE_NAME}:${VERSION}"
echo ""
print_info "Próximos pasos:"
echo "1. Verificar logs: docker service logs -f ${SERVICE_NAME}"
echo "2. Monitorear métricas: docker service ps ${SERVICE_NAME}"
echo "3. Test manual: curl https://cms.facundozupel.com/health"
echo ""

if [ -z "${DEPLOY_HOST:-}" ]; then
    print_warning "Recuerda ejecutar el update en el servidor manualmente"
fi

print_success "¡Todo listo! 🚀"

# =============================================================================
# Configuración de Variables de Entorno (Opcional)
# =============================================================================
#
# Para deploy automático al servidor, crea un archivo .env.deploy:
#
# export DEPLOY_HOST="usuario@tu-servidor.com"
# export DEPLOY_URL="https://cms.facundozupel.com"
#
# Luego antes de ejecutar el script:
# source .env.deploy
# ./deploy-cms.sh 1.0.0
#
# =============================================================================
