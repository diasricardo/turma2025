import { useState } from "react";

const Aula06_Contador =() =>{
    const [contador, setContador] = useState(0)

    return(
        <div>
            <p>Valor: {contador}</p>
            <button onClick={() => {setContador(contador + 1)}}>Aumentar</button>
        </div>
    )
}

export default Aula06_Contador;