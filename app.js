const express = require("express");
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Configuração do middleware do express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/", require("caminho"));

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

module.exports = app;