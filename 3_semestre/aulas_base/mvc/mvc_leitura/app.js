import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import livrosRoutes from './routes/livros.js';

// ES Modules helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser para POST (formulário)
app.use(express.urlencoded({ extended: true }));

// Rota inicial (landing)
app.get('/', (req, res) => {
  res.render('landing/index');
});

// Rotas de livros
app.use(livrosRoutes);

// Porta
const porta = 3000;
app.listen(porta, () => {
  console.log(`Servidor rodando em: http://localhost:${porta}`);
});
