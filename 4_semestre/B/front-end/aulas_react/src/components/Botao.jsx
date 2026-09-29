export default function Botao({funcao, classe}){
    
    return(
        <button onClick={() => funcao(classe)} 
        className="px-3 py-1 bg-sky-500 hover:bg-sky-700 text-white rounded">
            {classe}
        </button>
    )
}