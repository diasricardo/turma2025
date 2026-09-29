import express from 'express';
import jogadoresRoutes from './routes/jogadores.js';

const app = express();

// Engine de view (pasta padrão: ./views)
app.set('view engine', 'ejs');

// Body parser para formulários
app.use(express.urlencoded({ extended: true }));

// Landing page
app.get('/', (req, res) => {
  res.render('landing/index');
});

// Rotas de jogadores
app.use(jogadoresRoutes);

// Porta
const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log(`Servidor rodando em: http://localhost:${porta}`);
});
