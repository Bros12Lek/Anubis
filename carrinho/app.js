const express = require('express');
const app = express();
const path = require('path'); 
const connection = require('../database/usuario_database');

const styles = path.join(__dirname, '../styles');
const imagens = path.join(__dirname, '../imagens');

app.use(express.static(styles));
app.use(express.static(imagens));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/shopcar.html');
});
module.exports = app;