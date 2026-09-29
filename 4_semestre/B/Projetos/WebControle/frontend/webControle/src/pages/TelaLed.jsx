import React, { useState, useEffect } from "react";
import { enderecoServidor } from "../utils";

export default function TelaLed() {
  const [statusLed, setStatusLed] = useState("Desconhecido");

  const buscarDados = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/controleLed/status`);
      const dados = await resposta.json();
      setStatusLed(dados.status);
    } catch (error) {
      console.log("Erro ao buscar dados");
    }
  };

  const enviarComando = async(comando) =>{
    try{
        const resposta = await fetch(`${enderecoServidor}/controleLed/comando`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comando})
        })
        console.log(resposta.message)
        buscarStatus()
    }
    catch(error){
        console.log("Erro ao enviar comando")
    }
  }

  useEffect(() => {
    buscarDados();
    const intervalo = setInterval(buscarDados, 5000);
    return () => clearInterval(intervalo);
  });

  return (
    <div className="text-center bg-blue-100 w-200 flex flex-col items-center">
      
        <h1 className="text-3xl font-bold mb-4 text-slate-800 mt-3">
          Tela de controle do LED via MQTT
        </h1>
        <p className="bg-yellow-400">Status LED: {statusLed}</p>

        <h2 className="mt-3">Ligar/Desligar seu led</h2>
        <div className="flex justify-center gap-4 mb-4">
          <button onClick={() => enviarComando('LIGADO')} className="bg-green-400 rounded px-5 shadow-2xl font-bold border-2 border-green-300 mt-3">
            Ligar
          </button>
          <button onClick={() => enviarComando('DESLIGADO')} className="bg-red-400 rounded px-5 shadow-2xl font-bold border-2 border-red-300 mt-3">
            Desligar
          </button>
        </div>
        <a href="https://wokwi.com/projects/471694054633524225">LED Envia</a>
        <a href="https://wokwi.com/projects/471709771861673985">LED Recebe</a>
      </div>
  );
}
