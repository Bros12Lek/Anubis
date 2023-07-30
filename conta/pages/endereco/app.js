const express = require('express');
const app = express();
const path = require('path');
const connection = require('../../../database/usuario_database');
const imagens = path.join('../../../../imagens');
const styles = path.join('../../../../styles');

app.use(express.static(__dirname + imagens));
app.use(express.static(__dirname + styles));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/endereco.html');
});

/*
// Configuração para permitir o uso de req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
*/

app.post('/enviar', (req, res) => {
    function capitalizeWords(str) {
        return str.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase());
    }

    let cep = req.body.cep;
    let bairro = capitalizeWords(req.body.bairro);
    let rua = capitalizeWords(req.body.rua);
    let num = req.body.numerocasa;
    let complemento = capitalizeWords(req.body.complemento);
    let cidade = req.body.cidade;
    let estado = req.body.estado;
    let referencia = capitalizeWords(req.body.referencia);

    if(!cep || !bairro || !rua || !num || !cidade || !estado){
        res.status(400).send("Preencha do cep, rua ,num, cidade e estado!");
        return;
    }

    const query = 'INSERT INTO endereco(id_usuario2, cep, bairro, rua, num_casa, complemento, cidade, estado, referencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [5,cep, bairro, rua, num, complemento,cidade,estado,referencia]; //5 é um número teste

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