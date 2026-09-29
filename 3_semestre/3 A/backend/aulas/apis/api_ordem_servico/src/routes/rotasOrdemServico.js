import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Endpoint para listar todos os usuários
router.get('/ordemServico', async(req, res) =>{
    try{
        // criar uma variavel para enviar o comando sql
        const comando = `SELECT * FROM departamentos`
        //criar uma variavel para receber o retorno do sql
        const usuarios = await BD.query(comando)
        res.status(200).json(usuarios.rows)
    }
    catch(error){
        console.error('Erro ao listar usuários', error.message);
        res.status(500).json({error: 'Erro ao listar usuários'});
    }
})

export default router