# SuriStore

**SuriStore** é uma plataforma web desenvolvida para gerenciamento de produtos e simulação de vendas, com foco em usabilidade, análise de dados e operações em tempo real.

- 🌐 Acesse o sistema: [http://56.124.68.168:3000](http://56.124.68.168:3000)  
- 📚 Documentação da API (Swagger): [http://56.124.68.168:3333/docs](http://56.124.68.168:3333/docs)

---

## 📌 Funcionalidades Principais

### 📦 Gerenciamento de Produtos

Funcionalidade voltada à administração de inventário e análise de desempenho:

- Cadastro, edição e exclusão de produtos;
- Visualização de gráficos analíticos e indicadores estratégicos;
- Acompanhamento de estoque e métricas de vendas em tempo real.

### 🛍️ Simulação de Vendas

Interface simplificada para controle de vendas:

- Seleção de produtos e definição de quantidades;
- Atualização automática do estoque após cada simulação;
- Feedback visual instantâneo sobre as operações realizadas.

---

# 🖥️ Frontend

Interface desenvolvida com **Next.js**, **TypeScript** e **Tailwind CSS**, com integração em tempo real via **WebSockets**.

## 🧰 Tecnologias

- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Socket.IO Client](https://socket.io/)

## 📁 Estrutura de Pastas

```bash
frontend/
├── src/
│   ├── app/           # Páginas e rotas
│   ├── components/    # Componentes reutilizáveis
│   ├── img/           # Imagens estáticas
│   ├── lib/           # Configurações e integrações
│   ├── models/        # Tipos e modelos de dados
│   ├── services/      # Serviços e chamadas de API
│   ├── styles/        # Estilizações globais
│   ├── types/         # Tipagens customizadas
│   └── utils/         # Funções utilitárias
├── .env
├── .env.prod
├── .dockerignore
├── Dockerfile
├── tsconfig.json
└── package.json

# ▶️ Execução Local (Frontend)

```bash
# 1. Clone o repositório
git clone https://github.com/joaoryan/Scoder-desafio.git

# 2. Acesse a pasta do frontend
cd frontend

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev

# 5. Acesse o sistema
http://localhost:3000
```

---

# 🧪 Backend

Aplicação backend desenvolvida em **Node.js** com **TypeScript**, estruturada em camadas e integrada com:

- Prisma ORM: acessa e manipula o banco de dados de forma fácil e tipada.
- Redis: armazena dados em memória para cache ou comunicação rápida.
- WebSockets: permite comunicação em tempo real entre servidor e cliente.
- Zod: valida os dados enviados para a API antes de processá-los.
- Swagger: gera documentação interativa da API para facilitar testes.
- Jest: executa testes automatizados para garantir que tudo funcione corretamente.

📚 **Documentação Swagger**: [http://56.124.68.168:3333/docs](http://56.124.68.168:3333/docs)

---

## ⚙️ Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Socket.IO](https://socket.io/)
- [Zod](https://zod.dev/)
- [Redis](https://redis.io/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)
---

## 📁 Estrutura de Pastas

```bash
backend/
├── src/
│   ├── data/          # Repositórios e acesso a dados
│   ├── domain/        # Entidades e interfaces de domínio
│   ├── infra/         # Conexões externas (DB, Redis)
│   ├── main/          # Arquivo principal da aplicação e rotas
│   ├── presentation/  # Controllers
│   └── utils/         # Helpers e funções auxiliares
├── prisma/            # Migrações e schema do banco de dados
├── .env
├── .env.prod
├── .dockerignore
├── Dockerfile
├── tsconfig.json
└── package.json
```

---

# ▶️ Execução Local (Backend)

```bash
# 1. Clone o repositório
git clone https://github.com/joaoryan/Scoder-desafio.git

# 2. Acesse a pasta do backend
cd backend

# 3. Instale as dependências
npm install

# 4. Inicie o servidor
npm run dev

# 5. A API estará disponível em:
http://localhost:5050
```

---

## ✅ Executar Testes Automatizados

```bash
npm run test
```

---

## 👨‍💻 Autor

**João Ryan dos Santos**  

- 💼 [LinkedIn](https://www.linkedin.com/in/joaoryan)  
- 🧑‍💻 [GitHub](https://github.com/joaoryan)
