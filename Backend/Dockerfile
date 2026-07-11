# Stage 1: Build the TS code
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency configs first to leverage Docker layer caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Generate Prisma client and compile the code
RUN npx prisma generate
RUN npm run build

# Stage 2: Final lightweight runner image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install ONLY production dependencies (no typescript/tsup)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled code and custom generated Prisma client from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated/prisma ./src/generated/prisma

EXPOSE 3000

# Start the server (CMD runs at runtime)
CMD ["node", "dist/server.js"]