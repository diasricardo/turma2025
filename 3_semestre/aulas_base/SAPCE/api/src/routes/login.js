import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const SECRET_KEY = 'sua_chave_secreta';

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const resultado = await BD.query('SELECT * FROM usuarios WHERE email = $1 AND ativo = true', [email]);
        if (resultado.rows.length === 0) return res.status(401).json({ message: 'E-mail não encontrado.' });

        const usuario = resultado.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) return res.status(401).json({ message: 'Senha inválida.' });

        const token = jwt.sign({ id_usuario: usuario.id_usuario, email: usuario.email }, SECRET_KEY, { expiresIn: '8h' });
        return res.status(200).json({ token, usuario: { nome: usuario.nome, email: usuario.email } });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;