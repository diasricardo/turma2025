import { Router } from "express";
import { BD } from "../db.js";
import bcrypt from "bcrypt";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

// RF04: Consultar saldo/vencimentos do filiado logado
router.get("/filiados/saldo/:id_filiado", autenticarToken, async (req, res) => {
  const { id_filiado } = req.params;
  try {
    const query = `
      SELECT nome, codigo_funcionario, salario, limite_funcionario, limite_disponivel 
      FROM filiados 
      WHERE id_filiado = $1 AND ativo = true
    `;
    const resultado = await BD.query(query, [id_filiado]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: "Filiado não encontrado" });
    }

    return res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.error("Erro ao consultar saldo", error.message);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// RF03: Cadastrar Filiado (Inclusão com definição de limite)
router.post("/filiados", autenticarToken, async (req, res) => {
  const {
    codigo_funcionario, nome, cpf, rg, data_nascimento,
    estado_civil, endereco, bairro, cidade, estado,
    telefone, celular, email, salario, limite_funcionario, senha
  } = req.body;

  try {
    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    // Na inclusão, o limite_disponivel começa igual ao limite_funcionario
    const comando = `
      INSERT INTO filiados (
        codigo_funcionario, nome, cpf, rg, data_nascimento, estado_civil,
        endereco, bairro, cidade, estado, telefone, celular, email,
        salario, limite_funcionario, limite_disponivel, senha
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $15, $16)
    `;
    
    const valores = [
      codigo_funcionario, nome, cpf, rg, data_nascimento, estado_civil,
      endereco, bairro, cidade, estado, telefone, celular, email,
      salario, limite_funcionario, senhaCriptografada
    ];

    await BD.query(comando, valores);
    return res.status(201).json("Filiado cadastrado com sucesso.");
  } catch (error) {
    if (error.message.includes("filiados_cpf_key")) {
      return res.status(400).json({ message: "CPF já cadastrado." });
    }
    if (error.message.includes("filiados_codigo_funcionario_key")) {
      return res.status(400).json({ message: "Código de funcionário já existente." });
    }
    return res.status(500).json({ error: "Erro no servidor: " + error.message });
  }
});

// Atualização Parcial Dinâmica (PATCH)
router.patch("/filiados/:id_filiado", autenticarToken, async (req, res) => {
  const { id_filiado } = req.params;
  const { nome, email, telefone, celular, endereco, limite_funcionario } = req.body;

  try {
    const verificar = await BD.query("SELECT * FROM filiados WHERE id_filiado = $1", [id_filiado]);
    if (verificar.rows.length === 0) {
      return res.status(404).json({ message: "Filiado não encontrado" });
    }

    const campos = [];
    const valores = [];
    let contador = 1;

    if (nome !== undefined) { campos.push(`nome = $${contador}`); valores.push(nome); contador++; }
    if (email !== undefined) { campos.push(`email = $${contador}`); valores.push(email); contador++; }
    if (telefone !== undefined) { campos.push(`telefone = $${contador}`); valores.push(telefone); contador++; }
    if (celular !== undefined) { campos.push(`celular = $${contador}`); valores.push(celular); contador++; }
    if (endereco !== undefined) { campos.push(`endereco = $${contador}`); valores.push(endereco); contador++; }
    if (limite_funcionario !== undefined) { campos.push(`limite_funcionario = $${contador}`); valores.push(limite_funcionario); contador++; }

    if (campos.length === 0) {
      return res.status(400).json({ message: "Nenhum campo a atualizar" });
    }

    valores.push(id_filiado);
    const comando = `UPDATE filiados SET ${campos.join(", ")} WHERE id_filiado = $${contador}`;
    await BD.query(comando, valores);

    return res.status(200).json("Cadastro do filiado atualizado.");
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor: " + error.message });
  }
});

// Deleção Lógica
router.delete("/filiados/:id_filiado", autenticarToken, async (req, res) => {
  const { id_filiado } = req.params;
  try {
    await BD.query("UPDATE filiados SET ativo = false WHERE id_filiado = $1", [id_filiado]);
    return res.status(200).json({ message: "Filiado desativado com sucesso." });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
});

export default router;