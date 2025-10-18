# Build stage
FROM node:24-alpine AS builder
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci --silent

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# No SSL certs needed when serving on port 80 only

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Create logs directory
RUN mkdir -p /var/log/nginx

# Expose only port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]