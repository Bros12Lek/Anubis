const { error } = require('console');
const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/cadastro.html');
});

// Configuração para permitir o uso de req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306, //Port padrão do mysql
    user: 'root',
    password: 'senacrs',
    database: 'usuario_database'
});

connection.connect((error) => {
    if(error){
        console.error("Falha de conexão!");
    }else{
        console.log("Conexão com o banco de dados funcionando!");
    }
});


app.post('/enviar', (req,res) => {
    let email = req.body.email;
    let senha = req.body.senha;

    function capitalizeWords(str) {
        return str.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase());
    }

    let nome = req.body.nome; 
    nome = capitalizeWords(nome);

    let sobrenome = req.body.sobrenome;
    sobrenome = capitalizeWords(sobrenome);

    const data_nascimento = req.body.data_nascimento;
    const celular = req.body.celular;
    const cpf = req.body.cpf;

    if(!email || !senha || !nome || !sobrenome || !data_nascimento || !celular || !cpf){
        res.status(400).send("Preencha todos os campos!");
        return;
    }

    const query = 'INSERT INTO usuario(email, senha, nome, sobrenome, data_de_nascimento, celular, cpf) VALUES(?, md5(?), ?, ?, ?, ?, ?)';
    const values = [email, senha, nome, sobrenome, data_nascimento, celular, cpf];

    connection.query(query,values, (error, results) => {
        if (error) {
            console.error("Erro ao salvar os dados:", error);
            res.status(500).send("Erro ao salvar os dados!");
        } else {
            console.log("Dados enviados!");
            res.send("Dados enviados!");
        }
    });
});

app.listen(port, () => {
    console.log(`Server works in http://localhost:${port}`);
});