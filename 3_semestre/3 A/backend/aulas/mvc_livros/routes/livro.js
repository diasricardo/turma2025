import express from 'express';
import livroController from '../controllers/livroController.js'

const router = express.Router();
//rota listar livros
router.get('/livros', livroController.listar);

//adicionar livros
router.post('/livros', livroController.adicionar);

//rota para marcar como lido
router.post('/livros/marcar-lido', livroController.marcarComoLido);

export default router;