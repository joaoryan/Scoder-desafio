# Etapa 1: Construção
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código incluindo o .env.prod
COPY . .

# Renomeia o .env.prod para .env.production (Next.js usa este nome por padrão para produção)
RUN mv .env.prod .env.production

# Build da aplicação
RUN npm run build

# Remove as devDependencies para reduzir o tamanho da imagem
RUN npm prune --production

# Etapa 2: Execução
FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos necessários do estágio de construção
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.env.production ./.env.production

# Expondo a porta 3000 (Next.js usa 3000 por padrão, não 3030)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]