import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

// Listar todas as subcategorias ativas
router.get('/subcategorias', async (req, res) => {
    try {
        const comando = `SELECT * FROM subcategorias WHERE ativo = true`;
        const subcategorias = await BD.query(comando);
        return res.status(200).json(subcategorias.rows);
    } catch (error) {
        console.error('Erro ao listar subcategorias', error.message);
        return res.status(500).json({ error: 'Erro ao listar subcategorias' });
    }
});


// Cadastrar subcategoria
router.post('/subcategorias', async (req, res) => {
    const { nome, id_categoria } = req.body;
    try {
        // Verificar se a categoria pai existe
        const verificarCategoria = await BD.query(
            `SELECT * FROM categorias WHERE id_categoria = $1 AND ativo = true`,
            [id_categoria]
        );
        if (verificarCategoria.rows.length === 0) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        const comando = `INSERT INTO subcategorias (nome, id_categoria) VALUES ($1, $2)`;
        const valores = [nome, id_categoria];
        await BD.query(comando, valores);

        return res.status(201).json({ message: 'Subcategoria cadastrada com sucesso.' });
    } catch (error) {
        console.error('Erro ao cadastrar subcategoria', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar subcategoria' });
    }
});

// Atualizar subcategoria completamente (PUT)
router.put('/subcategorias/:id_subcategoria', async (req, res) => {
    const { id_subcategoria } = req.params;
    const { nome, id_categoria } = req.body;
    try {
        const verificarSubcategoria = await BD.query(
            `SELECT * FROM subcategorias WHERE id_subcategoria = $1 AND ativo = true`,
            [id_subcategoria]
        );
        if (verificarSubcategoria.rows.length === 0) {
            return res.status(404).json({ message: 'Subcategoria não encontrada' });
        }

        // Verificar se a categoria pai existe
        const verificarCategoria = await BD.query(
            `SELECT * FROM categorias WHERE id_categoria = $1 AND ativo = true`,
            [id_categoria]
        );
        if (verificarCategoria.rows.length === 0) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        const comando = `UPDATE subcategorias SET nome = $1, id_categoria = $2 WHERE id_subcategoria = $3`;
        const valores = [nome, id_categoria, id_subcategoria];
        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Subcategoria atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar subcategoria', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar subcategoria' });
    }
});



// Soft delete de subcategoria
router.delete('/subcategorias/:id_subcategoria', async (req, res) => {
    const { id_subcategoria } = req.params;
    try {
        const comando = `UPDATE subcategorias SET ativo = false WHERE id_subcategoria = $1`;
        await BD.query(comando, [id_subcategoria]);
        return res.status(200).json({ message: 'Subcategoria removida com sucesso' });
    } catch (error) {
        console.error('Erro ao remover subcategoria', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

export default router;