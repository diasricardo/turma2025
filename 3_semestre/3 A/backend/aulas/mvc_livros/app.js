import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import rotasLivros from './routes/livro.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true}));

//quando acessar a pagina principla ele renderiza a livros.ejs

//rotas de livros
app.use(rotasLivros)

app.get('/', (req, res) =>{
    res.redirect('/livros');
});


const porta = 3000;
app.listen(porta, () =>{
    console.log(`Servidor http://localhost:${porta}`)
})