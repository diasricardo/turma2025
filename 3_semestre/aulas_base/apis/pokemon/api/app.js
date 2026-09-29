// Importações das dependências principais (Padrão ES Modules que você usa)
import express from 'express';
import cors from 'cors';


// Importação da nova rota do Jogo do Pokémon que criamos
import rotasJogo from './src/routes/rotasJogo.js';

const app = express();

// Middlewares obrigatórios
app.use(cors()); // Permite que ferramentas de teste (e futuramente o celular) conectem aqui
app.use(express.json()); // Habilita o servidor a ler requisições em formato JSON

// Ativação da rota do jogo
app.use(rotasJogo);

// Rota base de teste para os alunos confirmarem no navegador que o servidor subiu
app.get('/', (req, res) => {
    return res.status(200).json({ status: "Servidor jogos rodando perfeitamente! 🚀" });
});

// Inicialização do servidor na porta 4000 para evitar qualquer tipo de conflito
const PORTA = 4000;
app.listen(PORTA, () => {
    console.log(`====================================================`);
    console.log(`  BACKEND INTEGRADO MASTER RODANDO NA PORTA ${PORTA} 🚀`);
    console.log(`  - Testar Endpoints do Jogo pelo Postman/Insomnia:`);
    console.log(`    👉 POST: http://localhost:${PORTA}/pokemons`);
    console.log(`    👉 GET:  http://localhost:${PORTA}/jogo/sortear`);
    console.log(`====================================================`);
});