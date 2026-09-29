// app.js
import express from 'express';
import { BD, testarConexao } from './db.js';
import cors from 'cors';

// Importação correta dos arquivos de rotas

import rotasFiliados from './routes/filiados.js';
import rotasEmpresas from './routes/empresas.js';
import rotasVendas from './routes/vendas.js';

const app = express();
app.use(express.json());
app.use(cors());

// Rota base para testar se a API está respondendo e conectar ao banco
app.get('/', async (req, res) => {
    await testarConexao();
    return res.status(200).json("API Sis2Con Funcionando Corretamente");
});

// Utilizando os middlewares das rotas do sistema

app.use(rotasFiliados);
app.use(rotasEmpresas);
app.use(rotasVendas);

const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando em: http://localhost:${porta}`);
});