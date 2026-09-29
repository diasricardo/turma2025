import express from 'express';
import {BD, testarConexao} from './db.js'
import swaggerUi from 'swagger-ui-express';
import documentacao from './config/swagger.js'
//importando rotas
import rotasUsuarios from './src/routes/rotasUsuarios.js'
import rotasDepartamentos from './src/routes/rotasDepartamentos.js'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
//biblioteca para permitir a conexao entre front e api
app.use(cors())

app.get('/', async(req, res) =>{
    await testarConexao();
    // res.status(200).json("Api Funcionando");
    res.redirect('/swagger')
})

//Utilizando rotas
app.use(rotasUsuarios);
app.use(rotasDepartamentos);

const porta = 3000;
app.listen(porta, () =>{
    console.log(`http://localhost:${porta}`)
})