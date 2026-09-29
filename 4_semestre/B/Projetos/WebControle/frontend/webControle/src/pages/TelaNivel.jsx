import React, { useState, useEffect } from "react";
import { enderecoServidor } from "../utils";

export default function TelaLed() {
  const [nivel, setNivel] = useState("Desconhecido");

  const buscarDados = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/controleNivel/nivel`);
      const dados = await resposta.json();
      setNivel(dados.nivelBoia);
    } catch (error) {
      console.log("Erro ao buscar dados");
    }
  };



  useEffect(() => {
    buscarDados();
    const intervalo = setInterval(buscarDados, 5000);
    return () => clearInterval(intervalo);
  });

  return (
    <div className="text-center bg-blue-100 w-200 flex flex-col items-center">
      
        <h1 className="text-3xl font-bold mb-4 text-slate-800 mt-3">
          Tela de controle do Nivel via MQTT
        </h1>
        <p className="bg-yellow-400">Status nivel: {nivel}</p>

        
        <a href="https://wokwi.com/projects/472890999727444993">Nivel água</a>
      </div>
  );
}
