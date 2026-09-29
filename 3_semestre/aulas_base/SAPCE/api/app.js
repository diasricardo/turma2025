import express from 'express';
import cors from 'cors';

import rotasLogin from './src/routes/login.js';
import rotasAlunos from './src/routes/alunos.js';
import rotasUC from './src/routes/unidadesCurriculares.js';
import rotasCriterios from './src/routes/criterios.js';
import rotasAvaliacoes from './src/routes/avaliacoes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Registro organizado de todas as rotas da imagem
app.use(rotasLogin);
app.use(rotasAlunos);
app.use(rotasUC);
app.use(rotasCriterios);
app.use(rotasAvaliacoes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta http://localhost:${PORT}`);
});