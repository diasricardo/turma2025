import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

router.get('/uc', async (req, res) => {
    try {
        const resultado = await BD.query("SELECT id, nome, sigla FROM unidades_curriculares ORDER BY nome ASC");
        return res.status(200).json(resultado.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post('/uc', async (req, res) => {
    const { nome, sigla } = req.body;
    try {
        await BD.query("INSERT INTO unidades_curriculares (nome, sigla) VALUES ($1, $2)", [nome, sigla.toUpperCase()]);
        return res.status(201).json("Unidade Curricular inserida.");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;