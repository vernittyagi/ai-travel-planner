# --- Build / Dependency Stage ---
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# --- Production Runtime Stage ---
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY package*.json ./
# Install production dependencies only
RUN npm ci --only=production

# Copy built artifacts from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

EXPOSE 5000
USER node
CMD ["node", "server.js"]
