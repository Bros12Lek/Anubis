const express = require('express');
const app = express();
const path = require('path');
const imagens = path.join('../../imagens');
const styles = path.join('../../styles');

app.use(express.static(__dirname + imagens));
app.use(express.static(__dirname + styles));
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
});

module.exports = app;