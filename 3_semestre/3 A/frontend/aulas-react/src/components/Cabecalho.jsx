import logoReact from '../assets/react.svg'
import '../styles/Cabecalho.css'

const Cabecalho = ({aula}) => {
    return(
        <header className='cabecalho'>
            <img src={logoReact} alt="Logo" />
            <div>
                <h2>Senai - Desenvolvimento de sistemas</h2>
                <p>Aulas de {aula}</p>
            </div>
        </header>
    )
}

export default Cabecalho;