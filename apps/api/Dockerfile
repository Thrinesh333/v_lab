FROM node:22-alpine AS builder

WORKDIR /app

# Copy root and package files
COPY package.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN npm install

# Copy source code
COPY tsconfig.base.json ./
COPY packages/shared/ ./packages/shared/
COPY apps/api/ ./apps/api/

# Build shared package and api
RUN npm --workspace=packages/shared run build
RUN npm --workspace=apps/api run prisma:generate
RUN npm --workspace=apps/api run build

EXPOSE 5000

CMD ["npm", "--workspace=apps/api", "run", "start"]
