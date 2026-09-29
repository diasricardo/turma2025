import express from 'express';
import produtoController from '../controllers/produtoController.js';

// Criando um objeto de roteador do Express
const router = express.Router();

// Definição das rotas para manipulação de produtos

// Rota para listar todos os produtos (responde a requisições GET)
router.get('/produtos', produtoController.listar);

// Rota para adicionar um novo produto (responde a requisições POST)
router.post('/produtos', produtoController.adicionar);

// Exportando o roteador para ser utilizado na aplicação principal
export default router;
