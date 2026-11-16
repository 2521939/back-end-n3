const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');

jest.mock('../src/models/task', () => {
  const MockTask = jest.fn();
  MockTask.find = jest.fn();
  MockTask.findById = jest.fn();
  MockTask.findByIdAndUpdate = jest.fn();
  MockTask.findByIdAndDelete = jest.fn();
  return MockTask;
});

const mockSave = jest.fn();
const id = '64b7f0c2a1b2c3d4e5f60718';
const tarefa = {
  _id: id,
  taskName: 'Estudar Jest',
  taskDescription: 'Escrever testes unitários',
};

beforeEach(() => {
  jest.resetAllMocks();
  Task.mockImplementation(function (dados) {
    Object.assign(this, dados);
    this.save = mockSave;
  });
});

describe('GET /', () => {
  test('retorna 200 com a mensagem da API', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/API funcionando/);
  });
});

describe('POST /tasks', () => {
  test('cria a tarefa e retorna 201', async () => {
    mockSave.mockResolvedValue();

    const res = await request(app).post('/tasks').send(tarefa);

    expect(res.status).toBe(201);
    expect(res.body.taskName).toBe(tarefa.taskName);
    expect(mockSave).toHaveBeenCalledTimes(1);
  });

  test('retorna 400 quando o save falha', async () => {
    mockSave.mockRejectedValue(new Error('dados inválidos'));

    const res = await request(app).post('/tasks').send({});

    expect(res.status).toBe(400);
  });
});

describe('GET /tasks', () => {
  test('lista as tarefas com 200', async () => {
    Task.find.mockResolvedValue([tarefa]);

    const res = await request(app).get('/tasks');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  test('retorna 500 quando o banco falha', async () => {
    Task.find.mockRejectedValue(new Error('falha no banco'));

    const res = await request(app).get('/tasks');

    expect(res.status).toBe(500);
  });
});

describe('GET /tasks/:id', () => {
  test('retorna a tarefa com 200', async () => {
    Task.findById.mockResolvedValue(tarefa);

    const res = await request(app).get(`/tasks/${id}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('retorna 404 quando não encontra', async () => {
    Task.findById.mockResolvedValue(null);

    const res = await request(app).get(`/tasks/${id}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Tarefa não encontrada');
  });

  test('retorna 500 quando o banco falha', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    Task.findById.mockRejectedValue(new Error('falha no banco'));

    const res = await request(app).get(`/tasks/${id}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('falha no banco');
    spy.mockRestore();
  });
});

describe('PUT /tasks/:id', () => {
  test('atualiza a tarefa e retorna 200', async () => {
    Task.findByIdAndUpdate.mockResolvedValue({ ...tarefa, taskName: 'Novo nome' });

    const res = await request(app).put(`/tasks/${id}`).send({ taskName: 'Novo nome' });

    expect(res.status).toBe(200);
    expect(res.body.taskName).toBe('Novo nome');
  });

  test('retorna 404 quando a tarefa não existe', async () => {
    Task.findByIdAndUpdate.mockResolvedValue(null);

    const res = await request(app).put(`/tasks/${id}`).send({ taskName: 'X' });

    expect(res.status).toBe(404);
  });

  test('retorna 400 quando a atualização falha', async () => {
    Task.findByIdAndUpdate.mockRejectedValue(new Error('inválido'));

    const res = await request(app).put(`/tasks/${id}`).send({ taskName: '' });

    expect(res.status).toBe(400);
  });
});

describe('DELETE /tasks/:id', () => {
  test('remove a tarefa e retorna 200', async () => {
    Task.findByIdAndDelete.mockResolvedValue(tarefa);

    const res = await request(app).delete(`/tasks/${id}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('retorna 404 quando a tarefa não existe', async () => {
    Task.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete(`/tasks/${id}`);

    expect(res.status).toBe(404);
  });

  test('retorna 500 quando o banco falha', async () => {
    Task.findByIdAndDelete.mockRejectedValue(new Error('falha no banco'));

    const res = await request(app).delete(`/tasks/${id}`);

    expect(res.status).toBe(500);
  });
});