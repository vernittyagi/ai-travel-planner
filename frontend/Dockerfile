# ----  Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Production server stage ----
FROM nginx:1.25-alpine
#copy client side assets into nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html
#copy custom Nginx configuration block if proxying requests
#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD nginx -g "daemon off;"


