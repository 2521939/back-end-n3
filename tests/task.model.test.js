const Task = require('../src/models/task');

describe('Model Task', () => {
  test('é válido quando tem nome e descrição', () => {
    const task = new Task({
      taskName: 'Estudar Jest',
      taskDescription: 'Escrever testes unitários',
    });

    const erro = task.validateSync();

    expect(erro).toBeUndefined();
  });

  test('é inválido quando falta o nome', () => {
    const task = new Task({ taskDescription: 'Sem nome' });

    const erro = task.validateSync();

    expect(erro.errors.taskName).toBeDefined();
  });

  test('é inválido quando falta a descrição', () => {
    const task = new Task({ taskName: 'Sem descrição' });

    const erro = task.validateSync();

    expect(erro.errors.taskDescription).toBeDefined();
  });
});