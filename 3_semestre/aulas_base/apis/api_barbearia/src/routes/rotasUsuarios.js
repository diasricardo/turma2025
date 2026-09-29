import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { autenticarToken } from "../../middlewares/autenticacao.js";

const router = Router();
const SALT_ROUNDS = 10;

const SECRET_KEY = 'sua_chave_secreta';

// Listar todos os usuários
router.get('/usuarios', autenticarToken, async (req, res) => {
    try {
        const comando = `SELECT id_usuario, nome, email, tipo FROM usuarios ORDER BY nome`;
        const usuarios = await BD.query(comando);
        return res.status(200).json(usuarios.rows);
    } catch (error) {
        console.error('Erro ao listar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
});

// Cadastrar novo usuário
router.post('/usuarios', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    try {
        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
        const comando = `
            INSERT INTO usuarios (nome, email, senha, tipo)
            VALUES ($1, $2, $3, $4)
        `;
        await BD.query(comando, [nome, email, senhaHash, tipo]);
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
        console.error('Erro ao cadastrar usuário', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

// Atualizar usuário (PUT)
router.put('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;
    const { nome, email, senha, tipo } = req.body;
    try {
        const verificar = await BD.query(
            `SELECT * FROM usuarios WHERE id_usuario = $1`, [id_usuario]
        );
        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
        await BD.query(
            `UPDATE usuarios SET nome = $1, email = $2, senha = $3, tipo = $4 WHERE id_usuario = $5`,
            [nome, email, senhaHash, tipo, id_usuario]
        );
        return res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar usuário', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

// Deletar usuário
router.delete('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const verificar = await BD.query(
            `SELECT * FROM usuarios WHERE id_usuario = $1`, [id_usuario]
        );
        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        await BD.query(`DELETE FROM usuarios WHERE id_usuario = $1`, [id_usuario]);
        return res.status(200).json({ message: 'Usuário removido com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover usuário', error.message);
        return res.status(500).json({ error: 'Erro ao remover usuário' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const resultado = await BD.query(
            `SELECT id_usuario, nome, email, senha, tipo FROM usuarios WHERE email = $1`,
            [email]
        );

        if (resultado.rows.length === 0) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        const usuario = resultado.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, tipo: usuario.tipo },
            SECRET_KEY,
            { expiresIn: '8h' }
        );

        return res.status(200).json({
            message: 'Login realizado com sucesso.',
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nome:       usuario.nome,
                email:      usuario.email,
                tipo:       usuario.tipo
            }
        });
    } catch (error) {
        console.error('Erro ao realizar login', error.message);
        return res.status(500).json({ error: 'Erro ao realizar login' });
    }
});

export default router;