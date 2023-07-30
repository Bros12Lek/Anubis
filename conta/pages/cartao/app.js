const express = require('express');
const app = express();
const path = require('path');
const connection = require('../../../database/usuario_database');
const imagens = path.join('../../../../imagens');
const styles = path.join('../../../../styles');

app.use(express.static(__dirname + imagens));
app.use(express.static(__dirname + styles));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/cartao.html')
});

/*
// Configuração para permitir o uso de req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
*/

app.post('/enviar', (req, res) => {
    let num_cartao = req.body.numcar;
    let bandeira = req.body.bandeira;
    let nome_cartao = req.body.nomecartao;
    let cpf = req.body.cpf;
    let vencimento = req.body.vencimento;
    let codigo_seguranca = req.body.codseguranca;

    if(!num_cartao || !bandeira || !nome_cartao || !cpf || !vencimento|| !codigo_seguranca){
        res.status(400).send("Preencha todos os campos!");
        return;
    }

    const query = 'INSERT INTO cartao (id_usuario, numero, bandeira, nome_cartao, cpf, vencimento, codigo_seguranca) VALUES (?, ?, ?, ?, ?, ?, ?);';
    const values = [5, num_cartao, bandeira, nome_cartao, cpf, vencimento, codigo_seguranca]; //5 é um número teste

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error("Erro ao salvar os dados:", error);
            res.status(500).send("Erro ao salvar os dados!");
        } else {
            res.redirect('http://localhost:3000/conta');
        }
    });
});

module.exports = app;