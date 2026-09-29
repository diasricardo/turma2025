import React, {useState, useEffect} from "react"
import { enderecoServidor } from "../utils"

export default function TelaUmidade(){
    const [umidade, setUmidade] = useState("Desconhecido");
    
    //Buscando as informações na API conectada ao MQTT
    const buscarStatus = async() =>{
        try{
            const resposta = await fetch(`${enderecoServidor}/controleUmidade/umidade`)
            const dados = await resposta.json();
            setUmidade(dados.status)
        }
        catch(error){
            console.log("Erro ao buscar dados", error);
        }
    }

    useEffect(() =>{
        buscarStatus();
        const intervalo = setInterval(buscarStatus, 5000);
        return () => clearInterval(intervalo)
    })

    return(
        <div>
            <h2 className="text-xl font-bold mb-4">Controle de Umidade</h2>
            <p>{umidade}</p>
        </div>
    )
}