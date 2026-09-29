import { useEffect, useState } from "react"

const Aula10 = () =>{
    const [contador, setContador] = useState(0)

    function botaoContador(){
        const novoContador = contador + 1;
        setContador(novoContador);
    }

    useEffect(() => {
        console.log(contador);
        document.title = `Contagem ${contador}`
    }, [contador]);
    
    return(
        <div>
            <h2>Aula 10</h2>
            <h3>Conhecendo a hook useEffect e aprendendo a armazenar dados localmente</h3>
            <h4>{contador}</h4>
            <button onClick={botaoContador}>Clique aqui</button>
        </div>
    )
}

export default Aula10