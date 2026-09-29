import React,{useState, useEffect} from "react";
import { enderecoServidor } from "../utils";

export default function TelaLed(){
    const [statusLed, setStatusLed] = useState('Desconhecido');

    const buscarStatus = async() =>{
        try{
            const resposta = await fetch(`${enderecoServidor}/api/status`);
            const dados = await resposta.json();
            setStatusLed(dados.status);
        }catch(error){
            console.log('Erro ao buscar status', error);
        }
    }

    const enviarComando = async(comando) =>{
        try{
            const resposta = await fetch(`${enderecoServidor}/api/comando`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({comando}),
            });
            const dados = await resposta.json();
            console.log(dados.message);
            buscarStatus();
        }catch(error){
            console.log('Erro ao enviar comando', error)
        }
    }

    useEffect(() =>{
        buscarStatus();
        const intervalo = setInterval(buscarStatus, 5000);
        return () => clearInterval(intervalo);
    })

    return(
        <div className="flex flex-col items-center bg-gray-100 p-6">
            <h1 className="text-2x1 font-bold text-gray-800 mb-6">Controle do LED</h1>
            <div className="mb-4">
                <p className="bg-gray-400">Status Atual: <span className="font-bold">{statusLed}</span></p>
            </div>
            <div className="flex gap-4">
                <button onClick={() => enviarComando('LIGADO')} className="px-6 py-3 bg-green-500 hover:bg-green-600
                 text-white font-semibold rounded-lg transition">Ligar</button>
                <button onClick={() => enviarComando('DESLIGADO')}  className="px-6 py-3 bg-red-500 hover:bg-red-600
                 text-white font-semibold rounded-lg transition">Desligar</button>
            </div>

             <div className="flex-column p-1 mt-4">
                <p className="text-center">Acesse o link do projeto do Wokwi</p>
                <div className="flex justify-center">
                    <a className="text-center text-3x1 font-bold text-white bg-blue-400 rounded p-3" href="https://wokwi.com/projects/438623469640140801" target="_blank">Controle Led</a>
                </div>
            </div>
        </div>
    )
}
