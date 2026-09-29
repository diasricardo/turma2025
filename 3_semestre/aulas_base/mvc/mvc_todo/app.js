import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import produtosRoutes from './routes/produtos.js'

// Obtém o caminho absoluto do arquivo atual (necessário para ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuração do motor de templates EJS
app.set('view engine', 'ejs'); 

// Define o diretório onde os arquivos de visualização (views) estão localizados
app.set('views', path.join(__dirname, 'views'));

// Middleware para processar dados de formulários enviados via POST (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// Rota inicial (renderiza a página principal)
app.get('/', (req, res) => {
    res.render('landing/index');
});

// Importação das rotas de produtos (comentei porque ainda não está ativa)
 app.use(produtosRoutes);

// Define a porta do servidor
const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando em: http://localhost:${porta}`);
});
