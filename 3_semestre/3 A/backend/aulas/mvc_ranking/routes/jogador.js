import express from 'express'
import jogadorController from '../controllers/jogadorController.js'

const router = express.Router();

router.get('/jogadores', jogadorController.listar);
router.post('/jogadores', jogadorController.adicionar);

export default router