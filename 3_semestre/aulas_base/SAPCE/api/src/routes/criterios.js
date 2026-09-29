import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

// 1. ROTA GET (Buscar critérios - Você já tem)
router.get('/criterios/:id_uc', async (req, res) => {
    const { id_uc } = req.params;
    try {
        const query = `
            SELECT c.id, c.capacidade, c.descricao, c.tipo_criterio
            FROM criterios c
            WHERE c.unidade_curricular_id = $1
            ORDER BY c.tipo_criterio DESC, c.id ASC;
        `;
        const resultado = await BD.query(query, [parseInt(id_uc)]);
        return res.status(200).json(resultado.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// 2. ROTA POST (Adicione esta rota agora para corrigir o erro 404)
router.post('/criterios', async (req, res) => {
    const { unidade_curricular_id, capacidade, descricao, tipo_criterio } = req.body;
    try {
        const query = `
            INSERT INTO criterios (unidade_curricular_id, capacidade, descricao, tipo_criterio)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `;
        const valores = [unidade_curricular_id, capacidade, descricao, tipo_criterio];
        const resultado = await BD.query(query, valores);
        
        return res.status(201).json({ 
            message: "Critério cadastrado com sucesso!", 
            id: resultado.rows[0].id 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;