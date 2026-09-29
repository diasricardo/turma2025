import React, { useState, useEffect } from "react";
import { enderecoServidor } from "../utils";

export default function TelaUmidade() {
  const [umidade, setUmidade] = useState("Desconhecido");

  const buscarDados = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/controleUmidade/umidade`);
      const dados = await resposta.json();
      setUmidade(dados.umidade);
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
          Tela de controle da umidade do Solo
        </h1>
        <p className="bg-yellow-400">Percentual umidade: {umidade}</p>
        <a href="https://wokwi.com/projects/472979601005708289">Monitor umidade</a>
      </div>
  );
}
