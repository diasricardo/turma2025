import {Router} from 'express'
import { onMessage, TOPICO_UMIDADE_SOLO } from "../services/mqttClient.js";
const router = Router();
let umidade = ""

onMessage(TOPICO_UMIDADE_SOLO, (mensagem) =>{
    umidade = mensagem;
    console.log(`Mensagem recebida no ${TOPICO_UMIDADE_SOLO}: ${umidade} `)
})

router.get('/umidade', async(req, res) =>{
    try{    
        console.log(`Nivel: ${umidade}`)    
        return res.status(200).json({
            umidade
        })    
    }catch(erro){
        return res.status(500).json({erro: 'Erro ao obter status'})
    }
})
export default router;