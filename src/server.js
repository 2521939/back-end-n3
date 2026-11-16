require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3000;

/* ---------- Cria conexão com o banco ---------- */

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Não foi possivel conectar ao MongoDB Atlas', err));

/* ---------- Sobe o servidor de aplicação ---------- */

app.listen(port, () => {
  console.log(`Servidor está rodando na porta: ${port}`);
});