# API Pokémon - Documentação de Rotas

API REST para gerenciamento de Pokémons e seus tipos.

**Base URL:** `http://localhost:5000/api`

---

## 📦 Tipos

### `GET /types`
Lista todos os tipos cadastrados (ordenados por código).

**Resposta:** `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "codigo": 1,
    "nome": "Água"
  }
]
```

---

### `POST /types`
Cria um novo tipo.

**Body:**
```json
{
  "codigo": 1,
  "nome": "Água"
}
```

**Respostas:**
- `201 Created` - Tipo criado
- `400 Bad Request` - Campos obrigatórios faltando
- `409 Conflict` - Código já existe

---

### `PUT /types/:id`
Atualiza o nome de um tipo existente.

**Parâmetros:** `id` (MongoDB ObjectId)

**Body:**
```json
{
  "nome": "Água"
}
```

**Respostas:**
- `200 OK` - Tipo atualizado
- `404 Not Found` - Tipo não encontrado

---

### `DELETE /types/:id`
Remove um tipo (apenas se não estiver em uso).

**Parâmetros:** `id` (MongoDB ObjectId)

**Respostas:**
- `204 No Content` - Tipo excluído
- `400 Bad Request` - Tipo está em uso por pokémons
- `404 Not Found` - Tipo não encontrado

---

## 🔥 Pokémons

### `GET /pokemons`
Lista pokémons com filtros opcionais.

**Query Params:**
- `nome` (opcional) - Busca por nome (case-insensitive)
- `tipo` (opcional) - Filtra por tipo principal OU secundário (ObjectId)

**Exemplos:**
- `/pokemons` - Todos os pokémons
- `/pokemons?nome=pika` - Busca por nome contendo "pika"
- `/pokemons?tipo=507f1f77bcf86cd799439011` - Filtra por tipo

**Resposta:** `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "codigo": 25,
    "nome": "Pikachu",
    "tipo": {
      "nome": "Elétrico",
      "codigo": 13
    },
    "tipoSecundario": null
  }
]
```

---

### `GET /pokemons/:id`
Busca um pokémon específico por ID.

**Parâmetros:** `id` (MongoDB ObjectId)

**Respostas:**
- `200 OK` - Pokémon encontrado
- `400 Bad Request` - ID inválido
- `404 Not Found` - Pokémon não encontrado

---

### `POST /pokemons`
Cria um novo pokémon.

**Body:**
```json
{
  "codigo": 25,
  "nome": "Pikachu",
  "tipo": "507f1f77bcf86cd799439011",
  "tipoSecundario": null
}
```

**Campos:**
- `codigo` **(obrigatório)** - Número único do pokémon
- `nome` **(obrigatório)** - Nome do pokémon
- `tipo` **(obrigatório)** - ObjectId do tipo principal
- `tipoSecundario` (opcional) - ObjectId do tipo secundário

**Respostas:**
- `201 Created` - Pokémon criado
- `400 Bad Request` - Campos obrigatórios faltando
- `409 Conflict` - Código já existe

---

### `PUT /pokemons/:id`
Atualiza um pokémon existente.

**Parâmetros:** `id` (MongoDB ObjectId)

**Body:** (campos opcionais)
```json
{
  "nome": "Raichu",
  "tipo": "507f1f77bcf86cd799439011",
  "tipoSecundario": null
}
```

**Respostas:**
- `200 OK` - Pokémon atualizado
- `404 Not Found` - Pokémon não encontrado

---

### `DELETE /pokemons/:id`
Remove um pokémon.

**Parâmetros:** `id` (MongoDB ObjectId)

**Respostas:**
- `204 No Content` - Pokémon excluído
- `404 Not Found` - Pokémon não encontrado

---

## 🚀 Executar

```bash
# Desenvolvimento
npm run dev

# Popular banco de dados
npm run seed
```

---

## 🔧 Variáveis de Ambiente

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pokemons
```
