import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Endpoint para sortear questão

router.get('/jogo', async (req, res) =>{
    try{
        const comando = 'SELECT * FROM questoes';
        const resultado = await BD.query(comando);
        const todasQuestoes = resultado.rows;

        //Validar a condição se existe questoes cadastradas
        if(todasQuestoes.length === 0){
            return res.status(404).json({message: 'Nenhuma questão cadastrada'})
        }
        const indice = Math.floor(Math.random() * todasQuestoes.length);
        const perguntaSorteada = todasQuestoes[indice];

        const opcoes = [
            perguntaSorteada.opcao_1,
            perguntaSorteada.opcao_2,
            perguntaSorteada.opcao_3,
            perguntaSorteada.opcao_4
        ];
        return res.status(200).json({
            imagem: perguntaSorteada.bandeira_url,
            respostaCorreta: perguntaSorteada.resposta_correta,
            opcoes: opcoes
        })

    }catch(erro){
        return res.status(500).json({erro: "Erro interno ao gerar rodada" + erro})
    }
})

export default router