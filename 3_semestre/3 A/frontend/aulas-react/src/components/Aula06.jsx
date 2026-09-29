import { estilos } from '../styles/Estilos';
import { useState } from 'react';
import Aula06_Contador from './Aula06_Contador';

const Aula06 = () => {
    //Variavel de estado
    //variavel , função atualização 
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [visivel, setVisivel] = useState("");

    function botaoLimpar(){
        setNome(" ");
        setEndereco(" ");
    }


    return(
        <div>
            <h2></h2>
            <h3></h3>
            <hr />
            <input type="text" name="" id="" onChange={() => setNome(event.target.value)} value={nome} />
            <p>Olá, {nome}</p>
            <input type="text" name="" id="" onChange={() => setEndereco(event.target.value)} value={endereco} />
            <p>Olá, {nome} voce mora em {endereco}</p>
            {/* <button onClick={() => {setNome(" "), setEndereco(" ")}}>Limpar</button> */}
            <button onClick={botaoLimpar}>Limpar</button>

            <button onClick={() => setVisivel(!visivel)}>
                {!visivel ? "Mostrar Saldo 👁️" : "Ocultar Saldo"}
            </button>
            {visivel == true ? <p>R$ 530,00 🔐</p> : <p>****,***</p> }

            {/* Contador */}
            <div>
                <Aula06_Contador />
                
            </div>
        </div>
    )
}

export default Aula06;