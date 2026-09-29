const Aula04_Filmes = ({titulo, genero, imagem}) =>{
    return(
        <div>
            <img src={imagem} alt="" />
            <h3>{titulo}</h3>
            <p>{genero}</p>
            <a href="">Assistir</a>
        </div>
    )
}

export default Aula04_Filmes;