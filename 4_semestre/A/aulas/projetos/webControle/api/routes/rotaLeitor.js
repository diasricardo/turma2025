import { Router } from "express";
import {BD} from '../db.js'
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
  const { nome, uid } = req.body;

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

//4 Registrar no banco os acessos a estufa
router.post('/registrar', async(req, res) =>{
  const uid = ultimaLeitura;

  try{
    //buscar no banco de dados o numero do cartao
    const comando = await BD.query(`SELECT * FROM usuarios WHERE uid = $1`);

    if(comando.rows.length === 0){
        return res.status(404).json({erro: "Cartao não cadastrado"})
      }

      //Busca o ultimo acesso do usuario
      const ultimoAcesso = await BD.query(`
        SELECT tipo_movimento
        FROM historico_acessos
        WHERE uid = $1
        ORDER BY id DESC
        LIMIT 1`, [uid])

      let tipoMovimento = 'ENTRADA';

        if(ultimoAcesso.tipo_movimento === 'ENTRADA'){
          tipoMovimento = 'SAIDA'
        }
      
      //grava no banco de dados
      await BD.query(`INSERT INTO historico_acessos(uid, tipo_movimento, status_acesso)
      VALUES($1, $2, $3)`, [uid, tipoMovimento, 'LIBERADO'])

      ultimaLeitura = null;
      return res.status(201).json({message: `${tipoMovimento} registrado`})
   
  }catch(erro){
    return res.status(500).json({erro: erro.message});
  }
})

export default router