import { use, useState } from "react"

const Aula07_Perfil =() =>{
    const [nome, setNome] = useState("")
    const [imagem, setImagem] = useState("")
    const [botao, setBotao] = useState("")
    
    return(
        <div>
            <div>
                <img src={imagem} alt="" />
                <p>{nome}</p>
                <button>{botao}</button>
            </div>
        </div>
    )
}

export default Aula07_Perfil