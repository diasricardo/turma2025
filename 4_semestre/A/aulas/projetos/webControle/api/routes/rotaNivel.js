import {Router} from 'express'
import { onMessage, TOPICO_NIVEL_BOIA } from "../services/mqttClient.js";
const router = Router();
let nivelBoia = ""
onMessage(TOPICO_NIVEL_BOIA, (mensagem) =>{
    nivelBoia = mensagem;
    console.log(`Mensagem recebida no ${TOPICO_NIVEL_BOIA}: ${nivelBoia} `)
})
router.get('/nivel', async(req, res) =>{
    try{    
        console.log(`Nivel: ${nivelBoia}`)    
        return res.status(200).json({
            nivelBoia
        })    
    }catch(erro){
    return res.status(500).json({erro: 'Erro ao obter status'})
    }
})
export default router;