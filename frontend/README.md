# Frontend Pokémon - MERN Stack

Interface web para gerenciamento de Pokémons e Tipos, construída com React, TypeScript e Vite.

---

## 🎯 Funcionalidades

### 🔥 Pokémons
- ✅ **Listagem** com tabela responsiva
- ✅ **Busca por nome ou código** (com debounce de 500ms - processada no backend)
- ✅ **Filtro por tipo** (principal ou secundário - processado no backend)
- ✅ **Criar** novo pokémon com Sheet lateral
- ✅ **Editar** pokémon existente
- ✅ **Excluir** com confirmação (AlertDialog)
- ✅ **Validação**: Impede códigos duplicados (tratado pelo backend)

### 📦 Tipos
- ✅ **Listagem** com tabela responsiva
- ✅ **Busca por nome ou código** (client-side)
- ✅ **Criar** novo tipo com Sheet lateral
- ✅ **Editar** tipo existente
- ✅ **Excluir** com confirmação (AlertDialog)
- ✅ **Validação**: Impede códigos duplicados (tratado pelo backend)
- ✅ **Proteção**: Não permite excluir tipos em uso por pokémons (tratado pelo backend)

### 🎨 Interface
- ✅ **Navbar** com alternância entre Pokémons e Tipos
- ✅ **Design responsivo** (mobile-first)
- ✅ **Notificações toast** para feedback (Sonner)
- ✅ **Formulários modais** (shadcn/ui Sheet)
- ✅ **Confirmação de exclusão** (shadcn/ui AlertDialog)
- ✅ **Componentes estilizados** com Tailwind CSS

---

## 🛠️ Tecnologias

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS 4** - Estilização
- **shadcn/ui** - Componentes (Sheet, AlertDialog, Select, etc)
- **Sonner** - Toast notifications
- **Lucide React** - Ícones

---

## 📂 Estrutura

```
src/
├── components/        # Componentes React
│   ├── Navbar.tsx
│   ├── PokemonTable.tsx
│   ├── TypeTable.tsx
│   ├── PokemonForm.tsx
│   ├── TypeForm.tsx
│   ├── DeleteConfirmDialog.tsx
│   └── ui/           # Componentes shadcn/ui
├── hooks/            # Custom hooks
│   ├── usePokemons.ts
│   ├── useTypes.ts
│   └── useDebounce.ts
├── services/         # Comunicação com API
│   ├── api.ts
│   ├── pokemonService.ts
│   └── typeService.ts
├── types/            # Definições TypeScript
└── App.tsx          # Componente principal
```

---

## 🚀 Executar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

---

## 🔗 Integração com Backend

A aplicação consome a API REST em `http://localhost:5000/api`

**Processamento no Backend:**
- 🔍 Busca e filtros de pokémons (nome, tipo)
- ✅ Validação de códigos duplicados
- 🛡️ Proteção contra exclusão de tipos em uso
- 📊 Ordenação por código

Configure a URL da API em `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## ✨ Destaques Técnicos

- **Debounce na busca**: Reduz requisições desnecessárias (500ms)
- **Filtros server-side**: Performance otimizada
- **Error handling**: Tratamento de erros com mensagens específicas
- **TypeScript strict**: Segurança de tipos completa
- **Componentização**: Código modular e reutilizável
- **Responsive design**: Mobile, tablet e desktop
