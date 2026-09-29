import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Endpoint para listar todos os usuários
router.get('/departamentos', async(req, res) =>{
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

router.post('/departamentos', async(req, res) => {
    const {nome, descricao} = req.body;

    try{
        //A sitaxe abaixo protege de sql injection
        const comando = `INSERT INTO DEPARTAMENTOS(nome,descricao)
                        VALUES($1, $2)`
        const valores = [nome, descricao]
        await BD.query(comando, valores);
        res.status(201).json("Usuário cadastrado com sucesso!");
    }catch(error){
        console.error('Erro ao cadastrar usuario', error.message);
        res.status(500).json({error: 'Erro ao cadastrar usuario'})
    }
})

export default router