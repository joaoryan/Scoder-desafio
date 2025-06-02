# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .


COPY .env.prod .env

# Gera os arquivos Prisma e compila o TypeScript
RUN npx prisma generate
RUN npm run build

# Etapa 2: Imagem final para execução
FROM node:18-alpine

WORKDIR /app

# Copia somente os arquivos necessários do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .env
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

# Expõe a porta definida
EXPOSE 3333

# Inicia o app
CMD ["npm", "run", "start"]
