import { estilos } from "../styles/Estilos"
import Aula04_Filmes from "./Aula04_Filmes"
import Aula04_IMC from "./Aula04_IMC"

const Aula04 = () =>{
    return(
        <div style={estilos.cardAula}>
            <h2>Aula 04 - Props</h2>
            <h3>Props são usadas para passar dados de componente pai para componentes filho</h3>
            <hr />
            <Aula04_IMC nome="Ricardo" peso={105} altura={1.75} cor={'red'} />

            <div>
                <Aula04_Filmes titulo="O vento levou" genero="Romance" imagem="eijifdifdif" />
            </div>
        </div>
    )
}

export default Aula04