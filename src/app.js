require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando com MongoDB e Mongoose! :D' });
});

/* ---------- Cria conexão com o banco ---------- */

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Não foi possivel conectar ao MongoDB Atlas', err));

/* ---------- Sobe o servidor de aplicação ---------- */

app.listen(port, () => {
  console.log(`Servidor está rodando na porta: ${port}`);
});