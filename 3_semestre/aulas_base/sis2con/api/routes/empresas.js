import { Router } from "express";
import { BD } from "../db.js";
import bcrypt from "bcrypt";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

// Listar todas as empresas parceiras ativas
router.get("/empresas", autenticarToken, async (req, res) => {
  try {
    const empresas = await BD.query("SELECT id_empresa, codigo_convenio, nome_fantasia, telefone, email FROM empresas_conveniadas WHERE ativo = true");
    return res.status(200).json(empresas.rows);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar empresas conveniadas" });
  }
});

// RF02: Cadastrar Empresa Conveniada
router.post("/empresas", autenticarToken, async (req, res) => {
  const { codigo_convenio, razao_social, nome_fantasia, cnpj, inscricao_estadual, telefone, fax, email, senha } = req.body;
  try {
    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    const comando = `
      INSERT INTO empresas_conveniadas (codigo_convenio, razao_social, nome_fantasia, cnpj, inscricao_estadual, telefone, fax, email, senha)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    const valores = [codigo_convenio, razao_social, nome_fantasia, cnpj, inscricao_estadual, telefone, fax, email, senhaCriptografada];

    await BD.query(comando, valores);
    return res.status(201).json("Empresa conveniada cadastrada com sucesso.");
  } catch (error) {
    if (error.message.includes("empresas_conveniadas_cnpj_key")) {
      return res.status(400).json({ message: "CNPJ já cadastrado." });
    }
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

export default router;