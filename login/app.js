const express = require('express');
const app = express();
const path = require('path'); 
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const style = path.join(__dirname, 'styles');

app.use(express.static(style));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/login.html'));
});

// Configuração para permitir o uso de req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'senacrs',
    database: 'usuario_database'
});

connection.connect((error) => {
    if(error){
        console.error('Falha de conexão com o Banco de Dados no login!');
    }else{
        console.log("Conexão com o banco de dados funcionando no login!");
    }
});

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

        res.send('Login realizado com sucesso!');
    });
});
module.exports = app;