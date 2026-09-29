import express from 'express';
import livroController from '../controllers/livroController.js';

const router = express.Router();

router.get('/livros', livroController.listar);
router.post('/livros', livroController.adicionar);

// Opcional (desafio): marcar como lido
router.post('/livros/marcar-lido', livroController.marcarComoLido);

export default router;