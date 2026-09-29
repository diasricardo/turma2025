import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

// Listar todas as categorias ativas
router.get('/categorias', async (req, res) => {
    try {
        const comando = `SELECT * FROM categorias WHERE ativo = true`;
        const categorias = await BD.query(comando);
        return res.status(200).json(categorias.rows);
    } catch (error) {
        console.error('Erro ao listar categorias', error.message);
        return res.status(500).json({ error: 'Erro ao listar categorias' });
    }
});

// Cadastrar nova categoria
router.post('/categorias', async (req, res) => {
    const { nome, descricao, tipo, cor, icone } = req.body;
    try {
        const comando = `INSERT INTO categorias (nome, descricao, tipo, cor, icone) VALUES ($1, $2, $3, $4, $5)`;
        const valores = [nome, descricao, tipo, cor, icone];
        await BD.query(comando, valores);
        return res.status(201).json({ message: 'Categoria cadastrada com sucesso.' });
    } catch (error) {
        console.error('Erro ao cadastrar categoria', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar categoria' });
    }
});

// Atualizar categoria completamente (PUT)
router.put('/categorias/:id_categoria', async (req, res) => {
    const { id_categoria } = req.params;
    const { nome, descricao, tipo, cor, icone } = req.body;
    try {
        // Verificar se a categoria existe
        const verificarCategoria = await BD.query(
            `SELECT * FROM categorias WHERE id_categoria = $1 AND ativo = true`,
            [id_categoria]
        );
        if (verificarCategoria.rows.length === 0) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        const comando = `UPDATE categorias SET nome = $1, descricao = $2, tipo = $3, cor = $4, icone = $5
                         WHERE id_categoria = $6`;
        const valores = [nome, descricao, tipo, cor, icone, id_categoria];
        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar categoria', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
});

// Atualizar categoria parcialmente (PATCH)
router.patch('/categorias/:id_categoria', async (req, res) => {
    const { id_categoria } = req.params;
    const { nome, descricao, tipo, cor, icone } = req.body;
    try {
        // Verificar se a categoria existe
        const verificarCategoria = await BD.query(
            `SELECT * FROM categorias WHERE id_categoria = $1`,
            [id_categoria]
        );
        if (verificarCategoria.rows.length === 0) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        // Montar o update dinamicamente (apenas campos enviados)
        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) {
            campos.push(`nome = $${contador}`);
            valores.push(nome);
            contador++;
        }
        if (descricao !== undefined) {
            campos.push(`descricao = $${contador}`);
            valores.push(descricao);
            contador++;
        }
        if (tipo !== undefined) {
            campos.push(`tipo = $${contador}`);
            valores.push(tipo);
            contador++;
        }
        if (cor !== undefined) {
            campos.push(`cor = $${contador}`);
            valores.push(cor);
            contador++;
        }
        if (icone !== undefined) {
            campos.push(`icone = $${contador}`);
            valores.push(icone);
            contador++;
        }

        // Se nenhum campo foi enviado
        if (campos.length === 0) {
            return res.status(400).json({ message: 'Nenhum campo a atualizar' });
        }

        valores.push(id_categoria);
        const comando = `UPDATE categorias SET ${campos.join(', ')} WHERE id_categoria = $${contador}`;
        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar categoria', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

// Soft delete de categoria
router.delete('/categorias/:id_categoria', async (req, res) => {
    const { id_categoria } = req.params;
    try {
        const comando = `UPDATE categorias SET ativo = false WHERE id_categoria = $1`;
        await BD.query(comando, [id_categoria]);
        return res.status(200).json({ message: 'Categoria removida com sucesso' });
    } catch (error) {
        console.error('Erro ao remover categoria', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

export default router;