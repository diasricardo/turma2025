import { Router } from "express";
import { publicar, onMessage, TOPICO_ESTADO_LED, TOPICO_STATUS } from "../services/mqttClient.js";

const router = Router();

let ultimoStatus = "Desconhecido";
let ultimoEstadoLed = "Desconhecido";

//Registrar a função de escuta dos topicos
onMessage(TOPICO_ESTADO_LED, (mensagem) =>{
    ultimoEstadoLed = mensagem;
    console.log(`Mensagem recebida no ${TOPICO_ESTADO_LED}: ${ultimoEstadoLed}`)
})
onMessage(TOPICO_STATUS, (mensagem) =>{
    ultimoStatus = mensagem;
    console.log(`Mensagem recebida no ${TOPICO_STATUS}: ${ultimoStatus}`)
})

router.get('/status', async(req, res) =>{
    try{
        console.log(`Status: ${ultimoStatus}`)
        console.log(`Status: ${ultimoEstadoLed}`)
        
        return res.status(200).json({
            status: ultimoStatus,
            estadoLed: ultimoEstadoLed,
        })
    }catch(error){
        return res.status(500).json({error: 'Erro ao obter dados'})
    }
})

 router.post('/comando', async(req, res) =>{
    const {comando} = req.body;

    try{
        //Publicar no topico assinado
        await publicar(TOPICO_STATUS, comando)
        const estadoLed = comando === 'LIGADO' ? '1' : '0';
        await publicar(TOPICO_ESTADO_LED, estadoLed)

        return res.status(200).json({
            message: "Comando enviado",
            status: comando,
            estadoLed: estadoLed
        })
    }
    catch(error){
        return res.status(500).json({error: 'Erro ao enviar comando'})
    }
 })

export default router