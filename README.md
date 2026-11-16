# API de Tarefas

API REST para criar, listar, atualizar e remover tarefas. Feita com Node.js, Express e MongoDB (Mongoose).

## Tecnologias

- Node.js e Express
- MongoDB Atlas e Mongoose
- Jest e Supertest (testes)
- ESLint (análise de código)
- Swagger (documentação)

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto:

```env
MONGODB_URI=sua_string_de_conexao_do_mongodb
PORT=3000
```

3. Inicie o servidor:

```bash
npm start
```

A API fica em `http://localhost:3000`.

## Endpoints

| Método | Rota         | O que faz                | Sucesso |
| ------ | ------------ | ------------------------ | ------- |
| GET    | `/`          | Verifica se a API está no ar | 200 |
| POST   | `/tasks`     | Cria uma tarefa          | 201     |
| GET    | `/tasks`     | Lista todas as tarefas   | 200     |
| GET    | `/tasks/:id` | Busca uma tarefa pelo ID | 200     |
| PUT    | `/tasks/:id` | Atualiza uma tarefa      | 200     |
| DELETE | `/tasks/:id` | Remove uma tarefa        | 200     |

Exemplo de corpo para criar uma tarefa:

```json
{
  "taskName": "Estudar Jest",
  "taskDescription": "Escrever testes unitários"
}
```

## Documentação (Swagger)

Com o servidor rodando, acesse:

```
http://localhost:3000/api-docs
```

Lá dá para ver todos os endpoints e testá-los pelo botão "Try it out".

## Testes

```bash
npm test                # roda os testes
npm run test:coverage   # roda os testes e gera o relatório de cobertura
```

O relatório HTML fica em `coverage/index.html`. A cobertura mínima exigida é de 80%.

## Swagger

```bash
start .\coverage\index.html
```

Em um outro terminal, abra a pasta do projeto e use o comando acima.

## Análise de código (ESLint)

```bash
npm run lint       # mostra os problemas
npm run lint:fix   # corrige o que for possível
```

## Estrutura do projeto

```
back-end-n3/
├── src/
│   ├── docs/swagger.js   # especificação do Swagger
│   ├── models/task.js    # model da tarefa
│   ├── routes/task.js    # rotas de /tasks
│   ├── app.js            # configura o Express
│   └── server.js         # conecta no banco e sobe o servidor
├── tests/                # testes do Jest
├── eslint.config.js
├── jest.config.js
└── package.json
```