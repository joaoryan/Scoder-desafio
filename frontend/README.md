# Zapify | Web

> 🇧🇷 Read in Portuguese: [README.pt-BR.md](./README.pt-BR.md)

Frontend for **Zapify**, a real-time chat platform designed for testing and evolving modern web development practices.

This repository contains the web interface developed with **Next.js** and styled with **Tailwind CSS**, aiming for responsiveness, simplicity, and real-time interaction via WebSockets.

---

## 📚 Table of Contents

- [📄 Description](#-description)
- [🛠 Technologies](#-technologies)
- [📁 Project Structure](#-project-structure)
- [▶️ Getting Started](#-getting-started)
- [📌 Documentation & Project Board](#-documentation--project-board)
- [🧠 Author & Contact](#-author--contact)

---

## 📄 Description

Zapify Web is the user interface for the Zapify platform. It handles user login/signup, real-time chat, WebSocket integration, and user experience improvements like message notifications and typing indicators.

The current focus is on building a solid MVP with clean architecture and scalable code, allowing new features to be added easily.

---

## 🛠 Technologies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/) (schema validation)
- [Socket.IO Client](https://socket.io/)

---

## 📁 Project Structure

```bash
zapify-web/
├── src/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── styles/
│   ├── types/
│   └── utils/
├── public/
├── .env.local
├── tailwind.config.js
├── tsconfig.json
└── package.json
```


## ▶️ Getting Started

1- Clone the repository:

```bash
git clone https://github.com/leonardopolicarpo/zapify-web
```

2- Install dependencies:

```bash
npm install
```

3- Run the development server:

```bash
npm run dev
```

4- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## 📌 Documentation & Project Board

📋 [Kanban Project Board (Zapify Backend)](https://github.com/users/leonardopolicarpo/projects/3)

## 🧠 Author & Contact

Developed by [Leonardo Policarpo](https://github.com/leonardopolicarpo)
🔗 LinkedIn: [Leonardo Policarpo](https://www.linkedin.com/in/leonardodumont/)