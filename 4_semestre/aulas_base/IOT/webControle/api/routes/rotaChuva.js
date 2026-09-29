import {Router} from 'express'
import { onMessage, TOPICO_CHUVA } from "../services/mqttClient.js";

const router = Router();

let radarChuva = "Desconhecido"

//Registrar a função de escuta para o topico de status
onMessage(TOPICO_CHUVA, (mensagem) =>{
    radarChuva = mensagem;
    console.log(`Mensagem recebida no ${TOPICO_CHUVA}: ${radarChuva} `)
})

router.get('/chuva', async(req, res) =>{
    try{    

        return res.status(200).json({
            radarChuva: radarChuva
        })    
    }catch(erro){
    return res.status(500).json({erro: 'Erro ao obter status'})
    }
})

export default router;