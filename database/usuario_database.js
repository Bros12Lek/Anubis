const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'behappy',
    database: 'usuario_database'
});

connection.connect((error) => {
    if(error){
        console.error('Falha de conexão com o Banco de Dados (usuario_database)!');
    }else{
        console.log("Conexão com o banco de dados  (usuario_database) funcionando!");
    }
});

module.exports = connection;