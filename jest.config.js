module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.js', '!src/server.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

/*
O que cada parte faz:

testEnvironment: 'node': o código roda em Node, não em navegador.
collectCoverageFrom: diz quais arquivos entram no relatório. Sem isso, um arquivo que nenhum teste importa nem apareceria nele.
coverageReporters: ['text', 'html']: text mostra a tabela no terminal e html gera o relatório que o enunciado exige, em coverage/lcov-report/index.html.
coverageThreshold: é o requisito dos 80%. Se qualquer indicador ficar abaixo, o Jest falha o comando. Isso prova a regra na prática.

*/
