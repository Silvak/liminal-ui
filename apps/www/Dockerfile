# ===========================================
# Dockerfile para apps/www (Next.js Docs)
# Optimizado para monorepo con npm workspaces
# ===========================================

# Etapa 1: Dependencias
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copiar archivos de configuración del monorepo
COPY package.json package-lock.json ./
COPY apps/www/package.json ./apps/www/

# Instalar dependencias del monorepo
RUN npm ci

# ===========================================
# Etapa 2: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias instaladas
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/www/node_modules ./apps/www/node_modules

# Copiar código fuente necesario
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY apps/www ./apps/www

# Build de la app www
WORKDIR /app/apps/www
RUN npm run build

# ===========================================
# Etapa 3: Runner (Producción)
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos públicos (si existen)
COPY --from=builder /app/apps/www/public* ./public/

# Configurar permisos para el directorio de cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiar el build standalone (incluye server.js y dependencias mínimas)
COPY --from=builder --chown=nextjs:nodejs /app/apps/www/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/www/.next/static ./apps/www/.next/static

# Cambiar a usuario no-root
USER nextjs

# Puerto expuesto
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Iniciar servidor Next.js standalone
CMD ["node", "apps/www/server.js"]
