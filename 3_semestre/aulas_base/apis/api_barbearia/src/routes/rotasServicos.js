import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../../middlewares/autenticacao.js";

const router = Router();

const SECRET_KEY = 'sua_chave_secreta';

// ──────────────────────────────────────────────
// SERVIÇOS
// ──────────────────────────────────────────────

// Listar todos os serviços 
router.get('/servicos', async (req, res) => {
    try {
        const comando = `SELECT id_servico, nome, preco, descricao FROM servicos ORDER BY nome`;
        const servicos = await BD.query(comando);
        return res.status(200).json(servicos.rows);
    } catch (error) {
        console.error('Erro ao listar serviços', error.message);
        return res.status(500).json({ error: 'Erro ao listar serviços' });
    }
});

// Cadastrar novo serviço
router.post('/servicos', autenticarToken, async (req, res) => {
    const { nome, preco, descricao } = req.body;
    try {
        const comando = `
            INSERT INTO servicos (nome, preco, descricao)
            VALUES ($1, $2, $3)
        `;
        await BD.query(comando, [nome, preco, descricao]);
        return res.status(201).json({ message: 'Serviço cadastrado com sucesso.' });
    } catch (error) {
        console.error('Erro ao cadastrar serviço', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar serviço' });
    }
});

// Atualizar serviço (PUT)
router.put('/servicos/:id_servico', autenticarToken, async (req, res) => {
    const { id_servico } = req.params;
    const { nome, preco, descricao } = req.body;
    try {
        const verificar = await BD.query(
            `SELECT * FROM servicos WHERE id_servico = $1`, [id_servico]
        );
        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Serviço não encontrado.' });
        }

        await BD.query(
            `UPDATE servicos SET nome = $1, preco = $2, descricao = $3 WHERE id_servico = $4`,
            [nome, preco, descricao, id_servico]
        );
        return res.status(200).json({ message: 'Serviço atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar serviço', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar serviço' });
    }
});

// Deletar serviço
router.delete('/servicos/:id_servico', autenticarToken, async (req, res) => {
    const { id_servico } = req.params;
    try {
        const verificar = await BD.query(
            `SELECT * FROM servicos WHERE id_servico = $1`, [id_servico]
        );
        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Serviço não encontrado.' });
        }

        await BD.query(`DELETE FROM servicos WHERE id_servico = $1`, [id_servico]);
        return res.status(200).json({ message: 'Serviço removido com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover serviço', error.message);
        return res.status(500).json({ error: 'Erro ao remover serviço' });
    }
});

export default router;