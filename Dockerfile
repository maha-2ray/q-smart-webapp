FROM node:24.14.0-alpine3.23 AS deps
WORKDIR /app
COPY package*.json ./
# npm install (not npm ci) — npm ci silently skips platform-specific optional binaries
# on musl/Alpine (e.g. @rollup/rollup-linux-arm64-musl). npm/cli#4828.
RUN npm install --ignore-scripts && npm cache clean --force

FROM node:24.14.0-alpine3.23 AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000 24678
CMD ["npx", "vite", "--port", "3000", "--host", "0.0.0.0"]

FROM node:24.14.0-alpine3.23 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# VITE_ vars are compiled into the JS bundle at build time, not injected at runtime.
ARG VITE_API_BASE_URL=https://api.dev.qsmart.com/v1
ARG VITE_API_TIMEOUT=30000
ARG VITE_APP_NAME=QSMART WebApp
ARG VITE_APP_VERSION=0.6.9
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_API_TIMEOUT=$VITE_API_TIMEOUT \
    VITE_APP_NAME=$VITE_APP_NAME \
    VITE_APP_VERSION=$VITE_APP_VERSION

RUN API_ORIGIN=$(echo "$VITE_API_BASE_URL" | sed -E 's|(https?://[^/]+).*|\1|') && \
    sed -i "s|connect-src 'self'|connect-src 'self' ${API_ORIGIN}|" docker/security-headers.conf

RUN npm run build && find ./dist -name "*.map" -type f -delete

FROM nginx:1.28.2-alpine3.23 AS runtime

RUN addgroup -g 1001 -S app && adduser -S app -u 1001 && \
    sed -i 's|/run/nginx.pid|/tmp/nginx.pid|' /etc/nginx/nginx.conf

COPY --from=build --chown=app:app /app/dist /usr/share/nginx/html
COPY --from=build --chown=app:app /app/docker/security-headers.conf /etc/nginx/security-headers.conf
COPY --chown=app:app docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

USER app

HEALTHCHECK --interval=10s --timeout=5s --retries=5 --start-period=10s \
    CMD wget --spider -q http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
