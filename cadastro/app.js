const { error } = require('console');
const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const connection = require('../database/usuario_database');
//const imagens = path.join('../imagens');

app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '../imagens'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/cadastro.html'));
});

// Configuração para permitir o uso de req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post('/enviar', async (req,res) => {
    let email = req.body.email;
    let senha = req.body.senha;
    const hashedPassword = await bcrypt.hash(senha, 10);

    function capitalizeWords(str) {
        return str.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase());
    }

    let nome = capitalizeWords(req.body.nome); 
    let sobrenome = capitalizeWords(req.body.sobrenome);
    let data_nascimento = req.body.data_nascimento;
    let celular = req.body.celular;
    let cpf = req.body.cpf;

    if(!email || !senha || !nome || !sobrenome || !data_nascimento || !celular || !cpf){
        res.status(400).send("Preencha todos os campos!");
        return;
    }

    const query = 'INSERT INTO usuario(email, senha, nome, sobrenome, data_de_nascimento, celular, cpf) VALUES(?, ?, ?, ?, ?, ?, ?)';
    const values = [email, hashedPassword, nome, sobrenome, data_nascimento, celular, cpf];

    connection.query(query,values, (error, results) => {
        if (error) {
            console.error("Erro ao salvar os dados:", error);
            res.status(500).send("Erro ao salvar os dados!");
        } else {
            res.redirect('http://localhost:3000/login');
        }
    });
});

module.exports = app;