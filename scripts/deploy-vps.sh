#!/bin/bash

# =============================================================================
# Script: Deploy to VPS (Docker Swarm)
# =============================================================================
#
# Descripción:
#   Deploy del frontend (Astro + Blog API integrado) a VPS usando Docker Swarm
#
# Uso:
#   ./scripts/deploy-vps.sh [version]
#
# Ejemplos:
#   ./scripts/deploy-vps.sh                # Usa latest
#   ./scripts/deploy-vps.sh 1.0.0          # Usa versión específica
#
# Requisitos:
#   - Docker Swarm inicializado en la VPS
#   - Traefik desplegado y corriendo
#   - Red "network_public" creada
#   - Archivo .env.production con variables configuradas
#   - SSH access a la VPS (si se ejecuta remotamente)
#
# =============================================================================

set -e  # Exit on error
set -u  # Exit on undefined variable

# -----------------------------------------------------------------------------
# Configuración
# -----------------------------------------------------------------------------

# Versión (tomar del argumento o usar "latest")
VERSION="${1:-latest}"

# Stack file
STACK_FILE="docker-stack-full.yml"

# Nombre del stack
STACK_NAME="facundogrowth"

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
    log_error "Docker no está instalado."
    exit 1
fi

# Verificar que Docker Swarm esté activo
if ! docker info | grep -q "Swarm: active"; then
    log_error "Docker Swarm no está activo. Ejecuta: docker swarm init"
    exit 1
fi

# Verificar que el stack file exista
if [ ! -f "$STACK_FILE" ]; then
    log_error "Stack file no encontrado: $STACK_FILE"
    exit 1
fi

# Verificar que .env.production exista
if [ ! -f ".env.production" ]; then
    log_warning ".env.production no encontrado."
    log_info "Creando desde .env.production.example..."

    if [ -f ".env.production.example" ]; then
        cp .env.production.example .env.production
        log_warning "Por favor edita .env.production con tus valores reales"
        log_warning "Presiona Enter cuando esté listo..."
        read
    else
        log_error ".env.production.example tampoco existe"
        exit 1
    fi
fi

log_success "Requisitos verificados correctamente"

# -----------------------------------------------------------------------------
# Cargar Variables de Entorno
# -----------------------------------------------------------------------------

log_info "Cargando variables de entorno desde .env.production..."

# Exportar variables (sin comentarios ni líneas vacías)
set -a
source <(grep -v '^#' .env.production | grep -v '^$')
set +a

log_success "Variables de entorno cargadas"

# -----------------------------------------------------------------------------
# Verificar Red de Traefik
# -----------------------------------------------------------------------------

log_info "Verificando red de Traefik (network_public)..."

if ! docker network ls | grep -q "network_public"; then
    log_warning "Red 'network_public' no existe. Creándola..."
    docker network create --driver overlay network_public
    log_success "Red 'network_public' creada"
else
    log_success "Red 'network_public' existe"
fi

# -----------------------------------------------------------------------------
# Pull Latest Images (Opcional)
# -----------------------------------------------------------------------------

log_info "==================================================================="
log_info "Pulling latest images from Docker Hub..."
log_info "==================================================================="

docker pull "facundozupel/frontend:${VERSION}" || log_warning "No se pudo hacer pull de frontend:${VERSION}"

# -----------------------------------------------------------------------------
# Deploy Stack
# -----------------------------------------------------------------------------

log_info "==================================================================="
log_info "Deploying stack: ${STACK_NAME}"
log_info "Stack file: ${STACK_FILE}"
log_info "Version: ${VERSION}"
log_info "==================================================================="

docker stack deploy \
    --compose-file "$STACK_FILE" \
    --with-registry-auth \
    "$STACK_NAME"

log_success "Stack deployed successfully"

# -----------------------------------------------------------------------------
# Monitoreo Post-Deploy
# -----------------------------------------------------------------------------

log_info "==================================================================="
log_info "Verificando servicios..."
log_info "==================================================================="

sleep 5  # Esperar un poco para que los servicios se inicien

docker stack services "$STACK_NAME"

echo ""
log_info "==================================================================="
log_info "Deployment Summary"
log_info "==================================================================="
echo ""
log_info "Stack: ${STACK_NAME}"
log_info "Version: ${VERSION}"
echo ""
log_info "URLs:"
echo "  - Frontend: https://facundogrowth.com"
echo "  - Blog API: https://facundogrowth.com/api/admin/posts"
echo ""
log_info "Comandos útiles:"
echo "  - Ver servicios: docker service ls"
echo "  - Ver logs: docker service logs -f ${STACK_NAME}_frontend"
echo "  - Escalar: docker service scale ${STACK_NAME}_frontend=3"
echo "  - Actualizar imagen: docker service update --image facundozupel/frontend:1.1.0 ${STACK_NAME}_frontend"
echo "  - Remover stack: docker stack rm ${STACK_NAME}"
echo ""
log_success "Deployment completed! 🚀"
echo ""
log_warning "Nota: Los servicios pueden tardar 1-2 minutos en estar completamente operativos."
log_info "Monitorea el estado con: watch docker service ls"
