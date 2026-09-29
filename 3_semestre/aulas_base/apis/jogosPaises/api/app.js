import express from 'express';
import {BD, testarConexao} from './db.js';
import rotasJogo from '../api/src/routes/rotasJogo.js'

import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', async(req, res) =>{
    await testarConexao();
    res.status(200).json("Api Funcionando");
})

//Utilizando rotas
app.use(rotasJogo)

const porta = 3000;
app.listen(porta, () =>{
    console.log(`http://localhost:${porta}`);
})