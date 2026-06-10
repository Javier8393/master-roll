FROM node:20-slim

WORKDIR /app

RUN npm install -g pnpm

# Copy dependency files first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]
