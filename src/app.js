const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const taskRoutes = require('./routes/task');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando com MongoDB e Mongoose! :D' });
});

module.exports = app;