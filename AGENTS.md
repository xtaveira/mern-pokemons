# mern-pokemons: instruções do executor

Aplicação full-stack (MERN) para gerenciar Pokémons e seus tipos. Repo `xtaveira/mern-pokemons` (**público**), branch `main`, dormente (último commit em 10/2025). Frontend e API publicados na Vercel (veja o `README.md`). Repo público: nada de caminho pessoal, cliente, dado ou segredo em commit, issue ou PR.

## Stack
- `backend/`: Node + Express + TypeScript, Mongoose/MongoDB (`docker-compose.yml` sobe o Mongo local).
- `frontend/`: Vite + React + TypeScript, shadcn/ui.

## Rodar
```bash
cd backend && docker compose up -d && cp .env.example .env && npm install && npm run dev
cd frontend && cp .env.example .env && npm install && npm run dev
```
`npm run seed` (backend) popula o banco. Só rode se pedido.

## Verificar
- Preferido: `cd frontend && npm run lint && npm run build` (de `package.json`). Não executado nesta sessão: sem `node_modules` na nitro.
- Backend: `cd backend && npm run build` (`tsc`). Não há testes automatizados.

## Estrutura
- `backend/src/` (`config/`, `controllers/`, `models/`, `routes/`, `scripts/seed.ts`, `index.ts`).
- `frontend/src/`, `frontend/public/`.

## Convenções observadas
- Commits `feat:`/`chore:` em português; READMEs por pasta (`backend/`, `frontend/`).

## Não mexer / cuidado
- Há deploys na Vercel ligados ao repo: push na `main` pode publicar; só com ok do mantenedor.
- Não versione `.env`; só os `.env.example` (variáveis `MONGO_URI`, `PORT`, `VITE_API_URL`).

## Segredos (só nomes)
`MONGO_URI`, `PORT`, `VITE_API_URL`. Valores fora do Git (arquivo `.env` local ou cofre do mantenedor). Nunca imprimir.

## Ao terminar
1. Rode a verificação preferida e cole a saída real no relatório.
2. `git status`; adicione só os seus arquivos; um commit em português.
3. Push só quando o pedido incluir; deploy só com ok do mantenedor.
4. Relatório: feito, verificação, SHA, pendências. Tarefas: ver `TAREFAS.md` se existir.
