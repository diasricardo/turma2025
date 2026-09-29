import express from 'express';
import cors from 'cors'
import rotaLed from './routes/rotaLed.js'
import rotaNivel from './routes/rotaNivel.js'
import rotaUmidade from './routes/rotaUmidade.js'
import rotaLeitor from './routes/rotaLeitor.js'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.json('API no ar')
})

app.use('/controleLed', rotaLed)
app.use('/controleNivel', rotaNivel)
app.use('/controleUmidade', rotaUmidade)
app.use('/leitor', rotaLeitor)
const porta = 3000
app.listen(porta, () =>{
    console.log(`Servidor iniciado http://localhost:${porta}`)
})