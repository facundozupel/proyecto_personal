#!/bin/bash

# =============================================================================
# Script: Build and Push Docker Images
# =============================================================================
#
# Descripción:
#   Build de la imagen Docker del frontend (Astro + Blog API) y push a Docker Hub
#
# Uso:
#   ./scripts/build-and-push.sh [version]
#
# Ejemplos:
#   ./scripts/build-and-push.sh          # Usa "latest" como tag
#   ./scripts/build-and-push.sh 1.0.0    # Usa versión específica
#
# Requisitos:
#   - Docker instalado
#   - Docker Hub login realizado (docker login)
#   - Permisos de ejecución (chmod +x scripts/build-and-push.sh)
#
# =============================================================================

set -e  # Exit on error
set -u  # Exit on undefined variable

# -----------------------------------------------------------------------------
# Configuración
# -----------------------------------------------------------------------------

# Registry y usuario de Docker Hub
DOCKER_REGISTRY="facundozupel"

# Versión (tomar del argumento o usar "latest")
VERSION="${1:-latest}"

# Nombre de la imagen
FRONTEND_IMAGE="${DOCKER_REGISTRY}/frontend"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# -----------------------------------------------------------------------------
# Funciones
# -----------------------------------------------------------------------------

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# -----------------------------------------------------------------------------
# Verificaciones Previas
# -----------------------------------------------------------------------------

log_info "Verificando requisitos previos..."

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    log_error "Docker no está instalado. Por favor instalar Docker primero."
    exit 1
fi

# Verificar que el usuario esté logueado en Docker Hub
if ! docker info | grep -q "Username"; then
    log_warning "No estás logueado en Docker Hub."
    log_info "Por favor ejecuta: docker login"
    exit 1
fi

log_success "Requisitos verificados correctamente"

# -----------------------------------------------------------------------------
# Build Frontend (Astro + Blog API)
# -----------------------------------------------------------------------------

log_info "==================================================================="
log_info "Building Frontend Image: ${FRONTEND_IMAGE}:${VERSION}"
log_info "==================================================================="

cd "$(dirname "$0")/.."  # Ir a la raíz del proyecto

docker build \
    -t "${FRONTEND_IMAGE}:${VERSION}" \
    -t "${FRONTEND_IMAGE}:latest" \
    -f Dockerfile \
    .

log_success "Frontend image built successfully"

# -----------------------------------------------------------------------------
# Push a Docker Hub
# -----------------------------------------------------------------------------

log_info "==================================================================="
log_info "Pushing images to Docker Hub..."
log_info "==================================================================="

# Push Frontend
log_info "Pushing ${FRONTEND_IMAGE}:${VERSION}..."
docker push "${FRONTEND_IMAGE}:${VERSION}"

if [ "$VERSION" != "latest" ]; then
    log_info "Pushing ${FRONTEND_IMAGE}:latest..."
    docker push "${FRONTEND_IMAGE}:latest"
fi

log_success "Frontend images pushed successfully"

# -----------------------------------------------------------------------------
# Resumen
# -----------------------------------------------------------------------------

log_info "==================================================================="
log_info "Build and Push completed successfully!"
log_info "==================================================================="
echo ""
log_info "Images created:"
echo "  - ${FRONTEND_IMAGE}:${VERSION}"
echo "  - ${FRONTEND_IMAGE}:latest"
echo ""
log_info "Next steps:"
echo "  1. SSH a tu VPS"
echo "  2. Ejecutar: ./scripts/deploy-vps.sh ${VERSION}"
echo ""
log_success "Done! 🚀"
