export default function Botao({funcao, classe}){
    return(
        <button onClick={() => funcao(classe)} className={`${classe} px-3 py-1 hover:bg-sky-700 rounded`}>
            {classe}
        </button>
    )
}