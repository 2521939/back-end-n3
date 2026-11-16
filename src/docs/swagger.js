const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'API de Tarefas',
    version: '1.0.0',
    description: 'API REST para gerenciar tarefas, usando Express e MongoDB (Mongoose).',
  },
  servers: [{ url: '/', description: 'Servidor atual' }],
  tags: [
    { name: 'Status', description: 'Verificação da API' },
    { name: 'Tarefas', description: 'CRUD de tarefas' },
  ],
  paths: {
    '/': {
      get: {
        tags: ['Status'],
        summary: 'Verifica se a API está funcionando',
        responses: {
          200: {
            description: 'API funcionando',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'API funcionando com MongoDB e Mongoose! :D' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/tasks': {
      post: {
        tags: ['Tarefas'],
        summary: 'Cria uma nova tarefa',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/TaskInput' } },
          },
        },
        responses: {
          201: {
            description: 'Tarefa criada',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } },
          },
          400: {
            description: 'Solicitação inválida (por exemplo, campo obrigatório ausente). Retorna o objeto de erro do Mongoose.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErroValidacao' } } },
          },
        },
      },
      get: {
        tags: ['Tarefas'],
        summary: 'Lista todas as tarefas',
        responses: {
          200: {
            description: 'Lista de tarefas',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Task' } },
              },
            },
          },
          500: { description: 'Erro interno do servidor' },
        },
      },
    },
    '/tasks/{id}': {
      get: {
        tags: ['Tarefas'],
        summary: 'Busca uma tarefa pelo ID',
        parameters: [{ $ref: '#/components/parameters/TaskId' }],
        responses: {
          200: {
            description: 'Tarefa encontrada',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } },
          },
          404: {
            description: 'Tarefa não encontrada',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErroMensagem' } } },
          },
          500: {
            description: 'Erro interno do servidor (inclui ID em formato inválido)',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErroServidor' } } },
          },
        },
      },
      put: {
        tags: ['Tarefas'],
        summary: 'Atualiza uma tarefa pelo ID',
        parameters: [{ $ref: '#/components/parameters/TaskId' }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/TaskUpdate' } },
          },
        },
        responses: {
          200: {
            description: 'Tarefa atualizada',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } },
          },
          400: {
            description: 'Solicitação inválida (dados ou ID inválidos). Retorna o objeto de erro do Mongoose.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErroValidacao' } } },
          },
          404: { description: 'Tarefa não encontrada (corpo vazio)' },
        },
      },
      delete: {
        tags: ['Tarefas'],
        summary: 'Remove uma tarefa pelo ID',
        parameters: [{ $ref: '#/components/parameters/TaskId' }],
        responses: {
          200: {
            description: 'Tarefa removida (retorna a tarefa excluída)',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } },
          },
          404: { description: 'Tarefa não encontrada (corpo vazio)' },
          500: { description: 'Erro interno do servidor (inclui ID em formato inválido)' },
        },
      },
    },
  },
  components: {
    parameters: {
      TaskId: {
        name: 'id',
        in: 'path',
        required: true,
        description: 'ID da tarefa (ObjectId do MongoDB)',
        schema: { type: 'string', example: '64b7f0c2a1b2c3d4e5f60718' },
      },
    },
    schemas: {
      Task: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64b7f0c2a1b2c3d4e5f60718' },
          taskName: { type: 'string', example: 'Estudar Jest' },
          taskDescription: { type: 'string', example: 'Escrever testes unitários' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          __v: { type: 'integer', example: 0 },
        },
      },
      TaskInput: {
        type: 'object',
        required: ['taskName', 'taskDescription'],
        properties: {
          taskName: { type: 'string', example: 'Estudar Jest' },
          taskDescription: { type: 'string', example: 'Escrever testes unitários' },
        },
      },
      TaskUpdate: {
        type: 'object',
        properties: {
          taskName: { type: 'string', example: 'Estudar Swagger' },
          taskDescription: { type: 'string', example: 'Documentar a API' },
        },
      },
      ErroMensagem: {
        type: 'object',
        properties: { message: { type: 'string', example: 'Tarefa não encontrada' } },
      },
      ErroServidor: {
        type: 'object',
        properties: { error: { type: 'string', example: 'Mensagem do erro' } },
      },
      ErroValidacao: {
        type: 'object',
        description: 'Objeto de erro do Mongoose, repassado como está pela rota',
      },
    },
  },
};

module.exports = swaggerSpec;