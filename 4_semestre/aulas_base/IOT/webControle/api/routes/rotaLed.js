import {Router} from 'express'
import { publicar, onMessage, TOPICO_ESTADO_LED, TOPICO_STATUS } from "../services/mqttClient.js";

const router = Router();

let ultimoStatus = "Desconhecido";
let ultimoEstadoLed = "Desconhecido";

//Registrar a função de escuta para o topico de status
onMessage(TOPICO_STATUS, (mensagem) =>{
    ultimoStatus = mensagem;
    console.log(`Mensagem recebida no ${TOPICO_STATUS}: ${ultimoStatus} `)
})

//Registra funcao de escuta para o topico estado Led
onMessage(TOPICO_ESTADO_LED, (mensagem) =>{
    ultimoEstadoLed = mensagem;
    console.log(`Mensagem recebida no ${TOPICO_ESTADO_LED}: ${ultimoEstadoLed} `)
})

router.get('/status', async(req, res) =>{
    try{    
        console.log(`Status: ${ultimoStatus}`)    
        console.log(`Estado: ${ultimoEstadoLed}`)
        return res.status(200).json({
            status: ultimoStatus,
            estado: ultimoEstadoLed
        })    
    }catch(erro){
    return res.status(500).json({erro: 'Erro ao obter status'})
    }
})

//Metodo post para enviar o comando
router.post("/enviar", async(req, res) =>{
    const {comando} = req.body;

    try{
        //publicar no topico assinado
        await publicar(TOPICO_STATUS, comando);
        const estadoLed = comando === 'LIGADO' ? '1' : '0';
        await publicar(TOPICO_ESTADO_LED, estadoLed)

        return res.status(200).json({
            message: `Comando enviado`,
            status: comando,
            estadoLed: estadoLed
        })
    }catch(error){
        return res.status(500).json({error: 'Erro ao enviar comando'})
    }
})

export default router;