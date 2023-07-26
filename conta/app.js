const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');

app.use(express.static(__dirname + '/styles'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/conta.html'));
});

// Configuração para permitir o uso de req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

module.exports = app;