const express = require('express');
const cadastro = require('./cadastro/app');
const login = require('./login/app');
const conta = require('./conta/app');

const app = express();
const port = 3000;

app.use('/cadastro', cadastro);
app.use('/login', login);
app.use('/conta', conta);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});