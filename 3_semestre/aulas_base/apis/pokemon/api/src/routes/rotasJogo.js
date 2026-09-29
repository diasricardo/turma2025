import { Router } from "express";
import { BD } from "../../db.js"; // Mantendo o caminho padrão do seu db.js

const router = Router();

// ------------------------------------------------------------
// ROTA 2: Sortear o Pokémon correto e as 3 alternativas erradas
// ------------------------------------------------------------
router.get('/jogo/sortear', async (req, res) => {
    try {
        // 1. Traz 4 Pokémons ativos do banco usando o SELECT que eles já conhecem
        const comando = `SELECT id_pokemon, nome, imagem FROM pokemons`;
        const resultado = await BD.query(comando);
        const todosPokemons = resultado.rows;

        // Validação de segurança: precisa de pelo menos 4 cadastrados
        if (todosPokemons.length < 4) {
            return res.status(400).json({ message: 'Cadastre pelo menos 4 pokémons no banco para jogar.' });
        }

        // 2. Sorteia 4 Pokémons aleatórios da lista completa
        const quatroSorteados = [];
        while (quatroSorteados.length < 4) {
            const indiceAleatorio = Math.floor(Math.random() * todosPokemons.length);
            const pokemon = todosPokemons[indiceAleatorio];

            // Evita o risco de sortear o mesmo Pokémon duas vezes na mesma rodada
            if (!quatroSorteados.includes(pokemon)) {
                quatroSorteados.push(pokemon);
            }
        }

        // 3. Aplicando a sua lógica: O primeiro do array ([0]) SERÁ o correto!
        const pokemonCerto = quatroSorteados[0];

        // 4. Extrai apenas os nomes para criar a lista de botões
        const opcoes = quatroSorteados.map(p => p.nome);

        // 5. Embaralha os nomes para a resposta certa não ficar sempre no primeiro botão
        opcoes.sort(() => Math.random() - 0.5);

        // 6. Retorna a estrutura perfeita para o front-end
        return res.status(200).json({
            nomeCorreto: pokemonCerto.nome,
            imagem: pokemonCerto.imagem,
            opcoes: opcoes
        });

    } catch (error) {
        console.error('Erro ao processar rodada do jogo:', error.message);
        return res.status(500).json({ error: 'Erro interno do servidor ao gerar rodada' });
    }
});

export default router;