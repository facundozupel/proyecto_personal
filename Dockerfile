# =============================================================================
# Multi-stage Dockerfile for Astro Frontend (SSR mode)
# =============================================================================
#
# Stage 1: Build
# Stage 2: Production runtime
#
# Optimizations:
# - Multi-stage build para reducir tamaño final
# - Node.js LTS (Alpine) para imagen liviana
# - Caché de dependencias optimizado
# - Usuario no-root para seguridad
# - Health check integrado
#
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Build
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build Astro for production (SSR mode)
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 2: Production Runtime
# -----------------------------------------------------------------------------
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S astro -u 1001

# Change ownership to non-root user
RUN chown -R astro:nodejs /app

# Switch to non-root user
USER astro

# Expose port
EXPOSE 4321

# Environment variables (can be overridden at runtime)
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:4321/ || exit 1

# Start the application
CMD ["node", "./dist/server/entry.mjs"]
