import React, {useState, useEffect} from "react"
import { enderecoServidor } from "../utils"

export default function TelaLed(){
    const [status, setStatus] = useState("Desconhecido");
    
    //Buscando as informações na API conectada ao MQTT
    const buscarStatus = async() =>{
        try{
            const resposta = await fetch(`${enderecoServidor}/controleLed/status`)
            const dados = await resposta.json();
            setStatus(dados.status)
        }
        catch(error){
            console.log("Erro ao buscar dados", error);
        }
    }

    const enviarComando = async(comando) =>{
        try{
            const resposta = await fetch(`${enderecoServidor}/controleLed/enviar`, {
                method: 'POST',
                headers:{
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({comando})
            })
            const dados = await resposta.json();
            console.log(dados.message)
            buscarStatus();
        }
        catch(error){
            console.log('Erro ao enviar comando', error)
        }
    }

    useEffect(() =>{
        buscarStatus();
        const intervalo = setInterval(buscarStatus, 5000);
        return () => clearInterval(intervalo)
    })

    return(
        <div>
            <h2 className="text-xl font-bold mb-4">Controle de LED</h2>
            <p>{status}</p>
            <div className="flex gap-4">
                <button onClick={() => enviarComando('LIGADO')}
                    className="px-6 py-3 bg-green-500 hover:bg-green-700
                    text-white rounded-lg transition">Ligar</button>
                
                <button onClick={() => enviarComando('DESLIGADO')}
                    className="px-6 py-3 bg-red-500 hover:bg-red-700
                    text-white rounded-lg transition">Desligar</button>
            </div>
        </div>
    )
}