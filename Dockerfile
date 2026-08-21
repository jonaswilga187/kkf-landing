# Build-Stage: Vite-Produktionsbuild
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Wird beim Build ins Bundle eingebettet (kein Laufzeit-Secret) – in Coolify
# als "Build Variable" setzen, siehe README.
ARG VITE_ADMIN_PIN
ENV VITE_ADMIN_PIN=$VITE_ADMIN_PIN

RUN npm run build

# Serve-Stage: statisches dist/ über Nginx mit SPA-Fallback
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
