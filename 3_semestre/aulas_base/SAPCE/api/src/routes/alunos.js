import { Router } from "express";
import { BD } from "../../db.js";


const router = Router();

// Listar todas as turmas (Ex: '1/24', '1B/25') para o filtro do App
router.get('/turmas', async (req, res) => {
    try {
        const resultado = await BD.query("SELECT DISTINCT matricula as turma FROM alunos WHERE ativo = true ORDER BY matricula ASC");
        return res.status(200).json(resultado.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Listar apenas os alunos de uma turma específica (para a lista de chamada)
router.get('/alunos/turma/:codigo_turma', async (req, res) => {
    const { codigo_turma } = req.params;
    try {
        const resultado = await BD.query("SELECT id_aluno, nome, matricula FROM alunos WHERE matricula = $1 AND ativo = true ORDER BY nome ASC", [codigo_turma]);
        return res.status(200).json(resultado.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// CRUD do Aluno
router.post('/alunos', async (req, res) => {
    const { nome, matricula } = req.body;
    try {
        await BD.query("INSERT INTO alunos (nome, matricula, ativo) VALUES ($1, $2, true)", [nome, matricula]);
        return res.status(201).json("Aluno cadastrado com sucesso.");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete('/alunos/:id_aluno', async (req, res) => {
    const { id_aluno } = req.params;
    try {
        await BD.query("UPDATE alunos SET ativo = false WHERE id_aluno = $1", [id_aluno]);
        return res.status(200).json("Aluno desativado.");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;