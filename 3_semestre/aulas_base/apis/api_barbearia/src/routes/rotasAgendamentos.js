import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../../middlewares/autenticacao.js";

const router = Router();
const SECRET_KEY = 'sua_chave_secreta';

// ──────────────────────────────────────────────
// AGENDAMENTOS
// ──────────────────────────────────────────────

// Listar todos os agendamentos
router.get('/agendamentos', autenticarToken, async (req, res) => {
    try {
        const comando = `
            SELECT
                a.id_agendamento,
                TO_CHAR(a.data_hora, 'DD/MM/YYYY HH24:MI') AS data_hora,
                a.status,
                c.id_usuario  AS id_cliente,
                c.nome        AS nome_cliente,
                b.id_usuario  AS id_barbeiro,
                b.nome        AS nome_barbeiro,
                s.id_servico,
                s.nome        AS nome_servico,
                s.preco
            FROM agendamentos a
            JOIN usuarios c ON a.id_cliente  = c.id_usuario
            JOIN usuarios b ON a.id_barbeiro = b.id_usuario
            JOIN servicos s ON a.id_servico  = s.id_servico
            ORDER BY a.data_hora DESC
        `;
        const agendamentos = await BD.query(comando);
        return res.status(200).json(agendamentos.rows);
    } catch (error) {
        console.error('Erro ao listar agendamentos', error.message);
        return res.status(500).json({ error: 'Erro ao listar agendamentos' });
    }
});

// Criar novo agendamento
router.post('/agendamentos', autenticarToken, async (req, res) => {
    const { id_barbeiro, id_servico, data_hora } = req.body;
    const id_cliente = req.usuario.id_usuario; // extraído do token JWT

    try {
        const selecaoPreco = await BD.query(`
            SELECT preco from servicos WHERE id_servico = id_servico`)
        const preco = selecaoPreco.rows[0];


        // Verificar conflito de horário para o barbeiro
        const conflito = await BD.query(
            `SELECT id_agendamento FROM agendamentos
             WHERE id_barbeiro = $1
               AND data_hora = $2
               AND status != 'cancelado'`,
            [id_barbeiro, data_hora]
        );
        if (conflito.rows.length > 0) {
            return res.status(409).json({ message: 'Horário já reservado para este barbeiro.' });
        }

        const comando = `
            INSERT INTO agendamentos (id_cliente, id_barbeiro, id_servico, data_hora, status, preco)
            VALUES ($1, $2, $3, $4, 'confirmado', $5)
        `;
        await BD.query(comando, [id_cliente, id_barbeiro, id_servico, data_hora, preco]);
        return res.status(201).json({ message: 'Agendamento criado com sucesso.' });
    } catch (error) {
        console.error('Erro ao criar agendamento', error.message);
        return res.status(500).json({ error: 'Erro ao criar agendamento' });
    }
});

// Atualizar status do agendamento (PATCH)
router.patch('/agendamentos/:id_agendamento/status', autenticarToken, async (req, res) => {
    const { id_agendamento } = req.params;
    const { status } = req.body;

    const statusPermitidos = ['confirmado', 'concluido', 'cancelado'];
    if (!statusPermitidos.includes(status)) {
        return res.status(400).json({
            message: `Status inválido. Use: ${statusPermitidos.join(', ')}`
        });
    }

    try {
        const verificar = await BD.query(
            `SELECT * FROM agendamentos WHERE id_agendamento = $1`, [id_agendamento]
        );
        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado.' });
        }

        await BD.query(
            `UPDATE agendamentos SET status = $1 WHERE id_agendamento = $2`,
            [status, id_agendamento]
        );
        return res.status(200).json({ message: 'Status atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar status', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar status do agendamento' });
    }
});

// Deletar agendamento
router.delete('/agendamentos/:id_agendamento', autenticarToken, async (req, res) => {
    const { id_agendamento } = req.params;
    try {
        const verificar = await BD.query(
            `SELECT * FROM agendamentos WHERE id_agendamento = $1`, [id_agendamento]
        );
        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado.' });
        }

        await BD.query(`DELETE FROM agendamentos WHERE id_agendamento = $1`, [id_agendamento]);
        return res.status(200).json({ message: 'Agendamento removido com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover agendamento', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});

// ──────────────────────────────────────────────
// FILTROS E BUSCAS
// ──────────────────────────────────────────────

// Listar agendamentos por status
router.get('/agendamentos/status/:status', autenticarToken, async (req, res) => {
    const { status } = req.params;
    const statusPermitidos = ['confirmado', 'concluido', 'cancelado'];

    if (!statusPermitidos.includes(status)) {
        return res.status(400).json({
            message: `Status inválido. Use: ${statusPermitidos.join(', ')}`
        });
    }

    try {
        const comando = `
            SELECT
                a.id_agendamento,
                TO_CHAR(a.data_hora, 'DD/MM/YYYY HH24:MI') AS data_hora,
                a.status,
                c.nome AS nome_cliente,
                b.nome AS nome_barbeiro,
                s.nome AS nome_servico,
                s.preco
            FROM agendamentos a
            JOIN usuarios c ON a.id_cliente  = c.id_usuario
            JOIN usuarios b ON a.id_barbeiro = b.id_usuario
            JOIN servicos s ON a.id_servico  = s.id_servico
            WHERE a.status = $1
            ORDER BY a.data_hora DESC
        `;
        const agendamentos = await BD.query(comando, [status]);
        return res.status(200).json(agendamentos.rows);
    } catch (error) {
        console.error('Erro ao filtrar por status', error.message);
        return res.status(500).json({ error: 'Erro ao filtrar agendamentos por status' });
    }
});

// Listar agendamentos por barbeiro
router.get('/agendamentos/barbeiro/:id_barbeiro', autenticarToken, async (req, res) => {
    const { id_barbeiro } = req.params;
    try {
        const comando = `
            SELECT
                a.id_agendamento,
                TO_CHAR(a.data_hora, 'DD/MM/YYYY HH24:MI') AS data_hora,
                a.status,
                c.nome AS nome_cliente,
                s.nome AS nome_servico,
                s.preco
            FROM agendamentos a
            JOIN usuarios c ON a.id_cliente = c.id_usuario
            JOIN servicos s ON a.id_servico = s.id_servico
            WHERE a.id_barbeiro = $1
            ORDER BY a.data_hora DESC
        `;
        const agendamentos = await BD.query(comando, [id_barbeiro]);
        return res.status(200).json(agendamentos.rows);
    } catch (error) {
        console.error('Erro ao buscar agendamentos do barbeiro', error.message);
        return res.status(500).json({ error: 'Erro ao buscar agendamentos do barbeiro' });
    }
});

// Listar agendamentos por cliente
router.get('/agendamentos/cliente/:id_cliente', autenticarToken, async (req, res) => {
    const { id_cliente } = req.params;
    try {
        const comando = `
            SELECT
                a.id_agendamento,
                TO_CHAR(a.data_hora, 'DD/MM/YYYY HH24:MI') AS data_hora,
                a.status,
                b.nome AS nome_barbeiro,
                s.nome AS nome_servico,
                s.preco
            FROM agendamentos a
            JOIN usuarios b ON a.id_barbeiro = b.id_usuario
            JOIN servicos s ON a.id_servico  = s.id_servico
            WHERE a.id_cliente = $1
            ORDER BY a.data_hora DESC
        `;
        const agendamentos = await BD.query(comando, [id_cliente]);
        return res.status(200).json(agendamentos.rows);
    } catch (error) {
        console.error('Erro ao buscar agendamentos do cliente', error.message);
        return res.status(500).json({ error: 'Erro ao buscar agendamentos do cliente' });
    }
});

// Listar agendamentos por período
router.get('/agendamentos/periodo', autenticarToken, async (req, res) => {
    const { inicio, fim } = req.query;
    try {
        if (!inicio || !fim) {
            return res.status(400).json({
                message: 'Informe as datas de inicio e fim. Ex: ?inicio=01/01/2025&fim=31/01/2025'
            });
        }

        const comando = `
            SELECT
                a.id_agendamento,
                TO_CHAR(a.data_hora, 'DD/MM/YYYY HH24:MI') AS data_hora,
                a.status,
                c.nome AS nome_cliente,
                b.nome AS nome_barbeiro,
                s.nome AS nome_servico,
                s.preco
            FROM agendamentos a
            JOIN usuarios c ON a.id_cliente  = c.id_usuario
            JOIN usuarios b ON a.id_barbeiro = b.id_usuario
            JOIN servicos s ON a.id_servico  = s.id_servico
            WHERE a.data_hora BETWEEN TO_TIMESTAMP($1, 'DD/MM/YYYY') 
                                  AND TO_TIMESTAMP($2, 'DD/MM/YYYY') + INTERVAL '1 day'
            ORDER BY a.data_hora DESC
        `;
        const agendamentos = await BD.query(comando, [inicio, fim]);
        return res.status(200).json(agendamentos.rows);
    } catch (error) {
        console.error('Erro ao filtrar por período', error.message);
        return res.status(500).json({ error: 'Erro ao filtrar agendamentos por período' });
    }
});

// Resumo: total de agendamentos por status
router.get('/agendamentos/total', autenticarToken, async (req, res) => {
    const { status } = req.query;
    try {
        const comando = `SELECT COUNT(*) AS total FROM agendamentos WHERE status = $1`;
        const resultado = await BD.query(comando, [status]);
        return res.status(200).json({
            status,
            total: parseInt(resultado.rows[0].total) || 0
        });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao calcular total de agendamentos' });
    }
});

export default router;