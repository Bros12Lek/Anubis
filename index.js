import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req,res) =>{
    res.send("Professor Felipe é o melhor de todos")
})
.listen(port);