import { Router } from "express";
import { BD } from "../../db.js";
import jwt from 'jsonwebtoken';
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();
const SECRET_KEY = 'sua_chave_secreta';

// Listar todas as transações
router.get('/transacoes', async (req, res) => {
    try {
        const comando = `
            SELECT 
                t.id_transacao,
                t.valor,
                t.descricao,
                TO_CHAR(t.data_registro, 'DD/MM/YYYY HH24:MI:SS') AS data_registro,
                TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                t.tipo,
                c.nome AS nome_categoria,
                s.nome AS nome_subcategoria
            FROM transacoes t
            LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
            LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
        `;
        const transacoes = await BD.query(comando);
        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar transações', error.message);
        return res.status(500).json({ error: 'Erro ao listar transações' });
    }
});


// Cadastrar nova transação
router.post('/transacoes', async (req, res) => {
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;
    try {
        const comando = `
            INSERT INTO transacoes (valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria];
        await BD.query(comando, valores);

        return res.status(201).json({ message: 'Transação cadastrada com sucesso.' });
    } catch (error) {
        console.error('Erro ao cadastrar transação', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar transação' + error.message });
    }
});

// Atualizar transação completamente (PUT)
router.put('/transacoes/:id_transacao', async (req, res) => {
    const { id_transacao } = req.params;
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;
    try {
        // Verificar se a transação existe
        const verificarTransacao = await BD.query(
            `SELECT * FROM transacoes WHERE id_transacao = $1`,
            [id_transacao]
        );
        if (verificarTransacao.rows.length === 0) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }


        const comando = `
            UPDATE transacoes 
            SET valor = $1, descricao = $2, data_vencimento = $3, data_pagamento = $4,
                tipo = $5, id_subcategoria = $6, id_categoria = $7
            WHERE id_transacao = $8
        `;
        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria, id_transacao];
        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Transação atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar transação', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar transação' });
    }
});


// Deletar transação
router.delete('/transacoes/:id_transacao', async (req, res) => {
    const { id_transacao } = req.params;
    try {
        // Verificar se a transação existe
        const verificarTransacao = await BD.query(
            `SELECT * FROM transacoes WHERE id_transacao = $1`,
            [id_transacao]
        );
        if (verificarTransacao.rows.length === 0) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }

        const comando = `DELETE FROM transacoes WHERE id_transacao = $1`;
        await BD.query(comando, [id_transacao]);

        return res.status(200).json({ message: 'Transação removida com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover transação', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
});


//Rotas de busca e filtro

// Listar transações por tipo (E = Entrada / S = Saída)
router.get('/transacoes/tipo/:tipo', async (req, res) => {
    const { tipo } = req.params;
    try {
        if (tipo !== 'E' && tipo !== 'S') {
            return res.status(400).json({ message: 'Tipo inválido. Use E para Entrada ou S para Saída.' });
        }

        const comando = `
            SELECT 
                t.id_transacao,
                t.valor,
                t.descricao,
                TO_CHAR(t.data_registro, 'DD/MM/YYYY HH24:MI:SS') AS data_registro,
                TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                t.tipo,
                t.id_categoria,
                t.id_subcategoria,
                c.nome AS nome_categoria,
                s.nome AS nome_subcategoria
            FROM transacoes t
            LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
            LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
            WHERE t.tipo = $1
            ORDER BY t.data_registro DESC
        `;
        const transacoes = await BD.query(comando, [tipo]);
        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar transações por tipo', error.message);
        return res.status(500).json({ error: 'Erro ao listar transações por tipo' });
    }
});

// Listar transações por categoria
router.get('/transacoes/categoria/:id_categoria', async (req, res) => {
    const { id_categoria } = req.params;
    try {
        const comando = `
            SELECT 
                t.id_transacao,
                t.valor,
                t.descricao,
                TO_CHAR(t.data_registro, 'DD/MM/YYYY HH24:MI:SS') AS data_registro,
                TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                t.tipo,
                t.id_categoria,
                t.id_subcategoria,
                c.nome AS nome_categoria,
                s.nome AS nome_subcategoria
            FROM transacoes t
            LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
            LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
            WHERE t.id_categoria = $1
            ORDER BY t.data_registro DESC
        `;
        const transacoes = await BD.query(comando, [id_categoria]);
        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar transações por categoria', error.message);
        return res.status(500).json({ error: 'Erro ao listar transações por categoria' });
    }
});

// Listar transações por subcategoria
router.get('/transacoes/subcategoria/:id_subcategoria', async (req, res) => {
    const { id_subcategoria } = req.params;
    try {
        const comando = `
            SELECT 
                t.id_transacao,
                t.valor,
                t.descricao,
                TO_CHAR(t.data_registro, 'DD/MM/YYYY HH24:MI:SS') AS data_registro,
                TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                t.tipo,
                t.id_categoria,
                t.id_subcategoria,
                c.nome AS nome_categoria,
                s.nome AS nome_subcategoria
            FROM transacoes t
            LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
            LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
            WHERE t.id_subcategoria = $1
            ORDER BY t.data_registro DESC
        `;
        const transacoes = await BD.query(comando, [id_subcategoria]);
        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar transações por subcategoria', error.message);
        return res.status(500).json({ error: 'Erro ao listar transações por subcategoria' });
    }
});

// Listar transações por período
router.get('/transacoes/periodo', async (req, res) => {
    const { inicio, fim } = req.query;
    try {
        if (!inicio || !fim) {
            return res.status(400).json({ message: 'Informe as datas de inicio e fim. Ex: ?inicio=01/01/2024&fim=31/01/2024' });
        }

        const comando = `
            SELECT 
                t.id_transacao,
                t.valor,
                t.descricao,
                TO_CHAR(t.data_registro, 'DD/MM/YYYY HH24:MI:SS') AS data_registro,
                TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                t.tipo,
                t.id_categoria,
                t.id_subcategoria,
                c.nome AS nome_categoria,
                s.nome AS nome_subcategoria
            FROM transacoes t
            LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
            LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
            WHERE t.data_registro BETWEEN TO_DATE($1, 'DD/MM/YYYY') AND TO_DATE($2, 'DD/MM/YYYY')
            ORDER BY t.data_registro DESC
        `;
        const transacoes = await BD.query(comando, [inicio, fim]);
        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar transações por período', error.message);
        return res.status(500).json({ error: 'Erro ao listar transações por período' });
    }
});


//resumo de  transacoes soma
router.get('/transacoes/total', async (req, res) => {
    const { tipo } = req.query; // Pega 'E' ou 'S' da URL

    try {
        const comando = `SELECT SUM(valor) as total FROM transacoes WHERE tipo = $1`;
        const resultado = await BD.query(comando, [tipo.toUpperCase()]);
        
        return res.status(200).json({ 
            tipo: tipo.toUpperCase(),
            total: resultado.rows[0].total || 0 
        });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao calcular total" });
    }
});



//Agendar compromissos, trabalhando com limites de datas e horarios

router.post('/transacoes/agendar', autenticarToken, async (req, res) => {
    const { valor, descricao,data_vencimento, data_pagamento,tipo,id_subcategoria,id_categoria} = req.body;
    const id_usuario = req.usuario.id_usuario;

    try {
        // 1. VERIFICAÇÃO (Usando TO_DATE para comparar corretamente)
        const consultaConflito = `
            SELECT id_transacao FROM transacoes 
            WHERE data_vencimento = TO_DATE($1, 'DD/MM/YYYY') 
            AND id_categoria = $2 
            AND id_usuario = $3
        `;
        
        const conflito = await BD.query(consultaConflito, [data_vencimento, id_categoria, id_usuario]);

        if (conflito.rows.length > 0) {
            return res.status(409).json({ 
                message: "Já existe um agendamento nesta categoria para esta data!" 
            });
        }

        // 2. INSERÇÃO (Também usando TO_DATE para converter a entrada)
        const comandoInsert = `
            INSERT INTO transacoes 
            (valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria, id_usuario) 
            VALUES ($1, $2, $3,$4, $5, $6, $7, $8)
        `;
        
        const valores = [valor,descricao,data_vencimento,data_pagamento,tipo,id_subcategoria, id_categoria,id_usuario];
        
        await BD.query(comandoInsert, valores);

        return res.status(201).json({ message: "Agendamento realizado com sucesso!" });

    } catch (error) {
        console.error('Erro no agendamento:', error.message);
        return res.status(500).json({ error: "Verifique o formato das datas (DD/MM/YYYY)." });
    }
});


//Filtros pensar em usar

router.get('/transacoes/filtro', async (req, res) => {
    // Agora pegamos também o 'nome' e a 'descricao'
    const { tipo, id_categoria, valor_minimo, nome, descricao } = req.query;

    try {
        let comando = `
            SELECT 
                t.*, 
                c.nome AS nome_categoria,
                u.nome AS nome_usuario
            FROM transacoes t
            LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
            LEFT JOIN usuarios u ON t.id_usuario = u.id_usuario
            WHERE 1=1`; 
        
        const valores = [];
        let contador = 1;

        // FILTRO DE TEXTO: Nome do Usuário (Busca estilo Google)
        if (nome) {
            comando += ` AND u.nome ILIKE $${contador}`;
            valores.push(`%${nome}%`); // O % permite achar "Maria" dentro de "Maria Silva"
            contador++;
        }

        // FILTRO DE TEXTO: Descrição da Transação
        if (descricao) {
            comando += ` AND t.descricao ILIKE $${contador}`;
            valores.push(`%${descricao}%`);
            contador++;
        }

        // FILTRO EXATO: Tipo (E ou S)
        if (tipo) {
            comando += ` AND t.tipo = $${contador}`;
            valores.push(tipo);
            contador++;
        }

        // FILTRO DE CATEGORIA
        if (id_categoria) {
            comando += ` AND t.id_categoria = $${contador}`;
            valores.push(id_categoria);
            contador++;
        }

        // FILTRO DE VALOR (Maior ou igual a)
        if (valor_minimo) {
            comando += ` AND t.valor >= $${contador}`;
            valores.push(valor_minimo);
            contador++;
        }

        comando += ` ORDER BY t.data_registro DESC`;

        const resultado = await BD.query(comando, valores);
        return res.status(200).json(resultado.rows);

    } catch (error) {
        console.error('Erro ao filtrar:', error.message);
        return res.status(500).json({ error: 'Erro ao processar filtros' });
    }
});

export default router;