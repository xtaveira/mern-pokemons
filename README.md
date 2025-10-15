# MERN Pokémons

Aplicação full-stack para gerenciamento de Pokémons e seus tipos, construída com MongoDB, Express, React e Node.js.

---

## 🌐 Deploy

- **Frontend:** [https://mern-pokemons-frontend.vercel.app/](https://mern-pokemons-frontend.vercel.app/)
- **Backend API:** [https://mern-pokemons-api.vercel.app/](https://mern-pokemons-api.vercel.app/)
- **Vídeo Demonstração:** [https://youtu.be/ZpqcCLZKra4](https://youtu.be/ZpqcCLZKra4)

---

## 🚀 Como Rodar Localmente

### 1️⃣ Backend (Express API)

```bash
# Entrar no diretório do backend
cd backend

# Subir o container do MongoDB com Docker Compose
docker compose up -d

# Criar arquivo .env com base no .env.example
cp .env.example .env
# Edite o arquivo .env de acordo com suas preferências:
# MONGO_URI=mongodb://localhost:27017/mern-pokemons
# PORT=5000

# Instalar dependências
npm install

# Executar o servidor em modo desenvolvimento
npm run dev
```

O backend estará rodando em `http://localhost:5000`

---

### 2️⃣ Frontend (React + Vite)

```bash
# Em outro terminal, entrar no diretório do frontend
cd frontend

# Criar arquivo .env com base no .env.example
cp .env.example .env
# Edite o arquivo .env de acordo com o backend:
# VITE_API_URL=http://localhost:5000/api

# Instalar dependências
npm install

# Executar o app em modo desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

---

## 📚 Documentação

- **Backend:** Veja [backend/README.md](./backend/README.md) para documentação completa das rotas da API
- **Frontend:** Veja [frontend/README.md](./frontend/README.md) para detalhes das funcionalidades e tecnologias

---

## 🛠️ Tecnologias

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- TypeScript
- Docker

**Frontend:**
- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui
- Sonner (toast notifications)

---

## ✨ Funcionalidades

- ✅ CRUD completo de Pokémons e Tipos
- ✅ Busca e filtros server-side
- ✅ Validações e tratamento de erros
- ✅ Interface responsiva
- ✅ Notificações de feedback
- ✅ Confirmações de exclusão
- ✅ Proteção contra exclusão de tipos em uso

