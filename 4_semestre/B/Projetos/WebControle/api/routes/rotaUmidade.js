import { Router } from "express";
import { onMessage, TOPICO_UMIDADE } from "../services/mqttClient.js";
const router = Router();
let umidade = "Desconhecido";
//Registrar a função de escuta dos topicos
onMessage(TOPICO_UMIDADE, (mensagem) =>{
    umidade = mensagem;
    console.log(`Mensagem recebida no ${TOPICO_UMIDADE}: ${umidade}`)
})
router.get('/umidade', async(req, res) =>{
    try{
        console.log(`Percentual de umidade: ${umidade}`)
        return res.status(200).json({
            umidade
        })
    }catch(error){
        return res.status(500).json({error: 'Erro ao obter dados'})
    }
})

export default router

