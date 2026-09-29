import { Router } from "express";

const router = Router();

let ultimaLeitura = null;

// ESP32 envia a leitura
router.post('/cadastro', (req, res) => {
  const { uid } = req.body;
  if (!uid) return res.status(400).json({ error: 'UID não informado' });

  ultimaLeitura = uid;
  console.log(`[CADASTRO] Cartão capturado: ${uid}`);
  return res.json({ mensagem: 'Cartão capturado com sucesso', uid });
});

// React consulta a leitura
router.get('/ultima-leitura', (req, res) => {
  return res.json({ uid: ultimaLeitura });
});


// // 3. React salva o usuário + cartão no PostgreSQL
router.post('/cadastrar', async (req, res) => {
  const { nome, uid} = req.body;

  try {
    const query = 'INSERT INTO usuarios (nome, uid) VALUES ($1, $2) RETURNING *';
    const result = await BD.query(query, [nome, uid]);

    // Limpa a variável após salvar com sucesso
    ultimaLeitura = null;

    return res.status(201).json({ mensagem: 'Usuário cadastrado!', usuario: result.rows[0] });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao cadastrar usuário (UID pode já existir)' + erro });
  }
});


//4
router.post('/registrar', async (req, res) => {
  const {uid} = req.body;

  try {

    // Busca o usuário
    const usuario = await BD.query(
      'SELECT * FROM usuarios WHERE uid = $1',
      [uid]
    );

    if (usuario.rows.length === 0) {
      return res.status(404).json({
        erro: 'Cartão não cadastrado'
      });
    }

    // Busca o último acesso deste usuário
    const ultimoAcesso = await BD.query(
      `SELECT tipo_movimento
       FROM historico_acessos
       WHERE uid = $1
       ORDER BY id DESC
       LIMIT 1`,
      [uid]
    );

    let tipoMovimento = 'ENTRADA';

    if (
      ultimoAcesso.rows.length > 0 &&
      ultimoAcesso.rows[0].tipo_movimento === 'ENTRADA'
    ) {
      tipoMovimento = 'SAIDA';
    }

    // Grava o novo acesso
    await BD.query(
      `INSERT INTO historico_acessos
      (uid, tipo_movimento, status_acesso)
      VALUES ($1, $2, $3)`,
      [uid, tipoMovimento, 'LIBERADO']
    );

    ultimaLeitura = null;

    return res.status(201).json({
      mensagem: `${tipoMovimento} registrada com sucesso`
    });

  } catch (erro) {
    return res.status(500).json({
      erro: erro.message
    });
  }
});

export default router