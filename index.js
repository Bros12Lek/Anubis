const express = require('express');
const router = express.Router();
const path = require('path');

const cadastro = require('./cadastro/app');
const login = require('./login/app');


const conta = require('./conta/app');
const conta_cartao = require('./conta/pages/cartao/app');
const conta_endereco = require('./conta/pages/endereco/app'); //Colocar novos endereços

const app = express();
const port = 3000;

app.use('/cadastro', cadastro);
app.use('/login', login);

app.use('/conta', conta);
app.use('/conta/cartao', conta_cartao);
app.use('/conta/endereco', conta_endereco);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});