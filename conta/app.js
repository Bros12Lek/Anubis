const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const path = require('path');
const connection = require('../database/usuario_database')
const imagens = path.join('../../imagens');
const styles = path.join('../../styles');

app.use(express.static(__dirname + imagens));
app.use(express.static(__dirname + styles));
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/conta.html'));
});

// Configuração para permitir o uso de req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/enviar', async (req, res) => {
    const senha = req.body.novaSenha;
    const repetir_senha = req.body.repitaSenha;

    if(senha != repetir_senha){
        console.error("Você digitou 2 valores difirentes!");
        res.status(500).send("Você digitou 2 valores difirentes!");
    }else{
        const hashedPassword = await bcrypt.hash(senha, 10);

        const query = 'UPDATE usuario SET senha = ? WHERE id_usuario = ?';
        const values = [hashedPassword, 1];

        connection.query(query, values, (error, results) => {
            if (error) {
                console.error("Erro ao salvar os dados:", error);
                res.status(500).send("Erro ao salvar os dados!");
            } else {
                res.redirect('http://localhost:3000/login');
            }
        });
    }
})

module.exports = app;