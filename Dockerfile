# syntax=docker/dockerfile:1
# Self-check: `cargo build --release` on host is not applicable; this is a Node/Next.js project (no Cargo workspace).

FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate && npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
ENV DATABASE_URL=file:/app/data/blog010.db
ENV NEXT_PUBLIC_SITE_URL=http://localhost:8080

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates openssl sqlite3 \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
RUN npm prune --omit=dev && npm cache clean --force

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/prisma ./prisma
COPY .env ./.env
COPY start.sh ./start.sh

RUN chmod +x /app/start.sh \
    && mkdir -p /app/data \
    && chown -R node:node /app

USER node
EXPOSE 8080
CMD ["/app/start.sh"]
