import { Router } from "express";
import { BD } from "../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

// RF05: Efetuar Lançamento de Venda com Verificação Rígida de Limite
router.post("/vendas", autenticarToken, async (req, res) => {
  const { id_empresa, codigo_funcionario, valor_gasto } = req.body;

  if (!id_empresa || !codigo_funcionario || !valor_gasto || valor_gasto <= 0) {
    return res.status(400).json({ message: "Dados de venda inválidos ou incompletos." });
  }

  // Para garantir a segurança ACID da transação, operamos direto no cliente isolado
  const client = await BD.connect(); 

  try {
    // Iniciando a transação manual no PostgreSQL
    await client.query("BEGIN");

    // 1. Localiza o filiado pelo código e efetua lock na linha ('FOR UPDATE') para evitar condições de corrida
    const buscaFiliado = await client.query(
      "SELECT id_filiado, limite_disponivel FROM filiados WHERE codigo_funcionario = $1 AND ativo = true FOR UPDATE",
      [codigo_funcionario]
    );

    if (buscaFiliado.rows.length === 0) {
      return res.status(404).json({ message: "Filiado não localizado ou inativo." });
    }

    const filiado = buscaFiliado.rows[0];

    // 2. Validação crucial de saldo online (Bloqueia a venda se ultrapassar o limite disponível)
    if (Number(filiado.limite_disponivel) < Number(valor_gasto)) {
      return res.status(400).json({ message: "Transação Recusada: Saldo Insuficiente no Convênio!" });
    }

    // 3. Deduz o valor gasto do saldo do filiado
    await client.query(
      "UPDATE filiados SET limite_disponivel = limite_disponivel - $1 WHERE id_filiado = $2",
      [valor_gasto, filiado.id_filiado]
    );

    // 4. Determina a competência atual (mês/ano) para o fechamento com a prefeitura
    const dataAtual = new Date();
    const competencia = `${String(dataAtual.getMonth() + 1).padStart(2, "0")}/${dataAtual.getFullYear()}`;

    // 5. Insere o registro histórico da transação
    const queryVenda = `
      INSERT INTO vendas (id_empresa, id_filiado, valor_gasto, competencia_mes_ano)
      VALUES ($1, $2, $3, $4)
    `;
    await client.query(queryVenda, [id_empresa, filiado.id_filiado, valor_gasto, competencia]);

    // Tudo ocorreu perfeitamente, commita as alterações permanentemente
    await client.query("COMMIT");
    return res.status(201).json({ message: "Venda aprovada e registrada com sucesso!" });

  } catch (error) {
    // Caso ocorra qualquer falha no meio do processo, desfaz todas as escritas
    await client.query("ROLLBACK");
    console.error("Erro na transação de venda:", error.message);
    return res.status(500).json({ message: "Erro interno ao processar venda: " + error.message });
  } finally {
    // Libera o cliente de volta para o Pool de conexões
    client.release();
  }
});

// Listar extrato de compras de um filiado específico
router.get("/vendas/extrato/:id_filiado", autenticarToken, async (req, res) => {
  const { id_filiado } = req.params;
  try {
    const query = `
      SELECT v.id_venda, v.valor_gasto, v.data_venda, e.nome_fantasia as loja
      FROM vendas v
      JOIN empresas_conveniadas e ON v.id_empresa = e.id_empresa
      WHERE v.id_filiado = $1
      ORDER BY v.data_venda DESC
    `;
    const extrato = await BD.query(query, [id_filiado]);
    return res.status(200).json(extrato.rows);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao gerar extrato." });
  }
});

export default router;