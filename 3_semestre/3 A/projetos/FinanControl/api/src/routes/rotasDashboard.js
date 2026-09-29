import { Router } from "express";
import { BD } from "../../db.js";
import jwt from 'jsonwebtoken';
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();
const SECRET_KEY = 'sua_chave_secreta';

//Rota unica para o dashboard

router.get('/dashboard', async (req, res) => {
    try {
        // 1. Cards de resumo do mês atual
        const sqlResumoMes = `
            SELECT 
                SUM(CASE WHEN tipo = 'E' THEN valor ELSE 0 END) as entradas,
                SUM(CASE WHEN tipo = 'S' THEN valor ELSE 0 END) as saidas,
                SUM(CASE WHEN tipo = 'E' THEN valor ELSE -valor END) as saldo
            FROM transacoes
            WHERE DATE_TRUNC('month', data_registro) = DATE_TRUNC('month', CURRENT_DATE)
        `;

        // 2. Gráfico de Pizza: Gastos por Categoria
        const sqlCategorias = `
            SELECT c.nome, SUM(t.valor) as total
            FROM transacoes t
            INNER JOIN categorias c ON t.id_categoria = c.id_categoria
            WHERE t.tipo = 'S'
            GROUP BY c.nome
            ORDER BY total DESC
        `;

        // 3. Tabela: 5 Maiores despesas do mês
        const sqlMaioresGastos = `
            SELECT descricao, valor, TO_CHAR(data_registro, 'DD/MM/YYYY') as data
            FROM transacoes 
            WHERE tipo = 'S' 
            ORDER BY valor DESC 
            LIMIT 5
        `;

        // 4. Gráfico de Linha/Barra: Evolução Mensal
        const sqlEvolucao = `
            SELECT 
                TO_CHAR(data_registro, 'MM/YYYY') as mes,
                SUM(CASE WHEN tipo = 'E' THEN valor ELSE 0 END) as entradas,
                SUM(CASE WHEN tipo = 'S' THEN valor ELSE 0 END) as saidas
            FROM transacoes
            GROUP BY TO_CHAR(data_registro, 'MM/YYYY'), DATE_TRUNC('month', data_registro)
            ORDER BY DATE_TRUNC('month', data_registro) ASC
        `;

        // 5. Tabela: Últimas movimentações do extrato
        const sqlUltimasTransacoes = `
            SELECT descricao, valor, tipo, TO_CHAR(data_registro, 'DD/MM/YYYY') as data
            FROM transacoes
            ORDER BY data_registro DESC
            LIMIT 5
        `;

        // Executa todas as 5 consultas em paralelo
        const resResumo = await BD.query(sqlResumoMes);
        const resCategorias = await BD.query(sqlCategorias);
        const resMaioresGastos = await BD.query(sqlMaioresGastos);
        const resEvolucao = await BD.query(sqlEvolucao);
        const resUltimas = await BD.query(sqlUltimasTransacoes);

        // Estrutura a resposta para o Front-end
        const dadosDashboard = {
            resumoMesAtual: resResumo.rows[0] || { entradas: 0, saidas: 0, saldo: 0 },
            categorias: resCategorias.rows,
            maioresGastos: resMaioresGastos.rows,
            evolucaoMensal: resEvolucao.rows,
            ultimasTransacoes: resUltimas.rows
        };

        return res.status(200).json(dadosDashboard);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default router;