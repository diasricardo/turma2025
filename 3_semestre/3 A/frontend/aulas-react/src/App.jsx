import Cabecalho from "./components/Cabecalho";
import Aula01 from "./components/Aula01";
import Aula02 from "./components/Aula02";
import Aula03 from "./components/Aula03";
import Aula04 from "./components/Aula04";
import Aula06 from "./components/Aula06";
import Aula07 from "./components/Aula07";
import Aula11 from "./components/Aula11"
function App() {
  return ( 
    <div>
      <Cabecalho aula='React' />
      <main>
        <h2>Aulas</h2>
        <div>
          {/* {Aqui incluiremos todos os componentes} */}
          <Aula01 />
          <Aula02 />
          <Aula03 />
          <Aula04 />
          <Aula06 />
          <Aula07 />
          <Aula11 />
        </div>
      </main>
    </div>

)
}

export default App;