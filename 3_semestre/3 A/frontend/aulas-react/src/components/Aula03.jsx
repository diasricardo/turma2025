import '../styles/Aula03.css'
import '../styles/Estilos'
import { estilos } from '../styles/Estilos'
import Aula03_Login from './Aula03_Login'
const Aula03 = () => {
    return(
        <div>
            <h2>Aula 03 - Componentes e estilização</h2>
            <h3 className='texto'>Criação de componentes reutilizaveis e suas estilizações</h3>
            <p className='descricao'>Aprendendo a criar e reutilizar componentes e estilizações para melhorar a UI</p>
            <hr />
            <p style={estilos.tituloModulo}>CSS Modules</p>
            <p style={estilos.descricaoModulo}>CSS Modularizado é a forma .....</p>
            <Aula03_Login />
        </div>
    )
}

export default Aula03