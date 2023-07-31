const express = require('express');
const app = express();
const path = require('path'); 
const connection = require('../database/usuario_database');
const bcrypt = require('bcrypt');

const styles = path.join(__dirname, '../styles2');
const imagens = path.join(__dirname, '../imagens');

app.use(express.static(styles));
app.use(express.static(imagens));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/login.html'));
});

// Configuração para permitir o uso de req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/enviado', (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;

    connection.query('SELECT senha FROM usuario WHERE email = ?', [email], async (err, results) => {
        if(err) throw err;

        if(results.length === 0){
            return res.status(401).send('Email ou senha incorretos');
        }

        const hashedPassword = results[0].senha;
        const match = await bcrypt.compare(senha,hashedPassword);

        if(!match){
            return res.status(401).send('Email ou senha incorretos');
        }

        res.redirect('http://localhost:3000/conta')
    });
});

module.exports = app;