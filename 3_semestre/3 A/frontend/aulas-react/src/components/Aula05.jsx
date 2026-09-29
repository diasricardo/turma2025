const Aula05 = () =>{
    function botaoClique(){
        alert('Voce clicou no botao')
    }

    function entradaMouse (event){
        console.log('Mouse entrou');
        event.target.style.backgroundColor = '#7db5ff'
    }

    function saidaMouse (event){
        console.log('Mouse entrou');
        event.target.style.backgroundColor = '#9925b6'
    }

    function alterarCor(event){
        if(event.key == 'a'){
            event.target.style.backgroundColor = '#666fff'
        }
        else if(event.key == 'v'){
            event.target.style.backgroundColor = '#42ea14'
        }
        else if(event.key == 'c'){
            event.target.style.backgroundColor = '#5b5b5b'
        }
        else if(event.key == 'r'){
            event.target.style.backgroundColor = '#e51411'
        }
    }
    return(
        <div>
            <h2>Aula 05 - Eventos de um componente </h2>
            <h3>Os eventos são fundamentaos</h3>
            <p onClick={botaoClique}>Clique aqui</p>
            <p onClick={() => alert('Clique aqui 2')}>Este é outro paragrafo clicavel</p>

            <select name="" id="">
                <option value="1A">1º A EM</option>
                <option value="2A">2º A EM</option>
                <option value="3A">3º A EM</option>
                <option value="3B">3º B EM</option>
            </select>
            <hr />

            <p>Evento onMouseEnter / onMOuseLeave</p>
            <p onMouseEnter={entradaMouse} onMouseLeave={saidaMouse}>Passe o mouse</p>

            <hr />
            <p>Evento onKeyDown</p>
            <input type="text" onKeyDown={(event) =>{event.key}} name="" id="" />
            <input type="text" onKeyDown={alterarCor} placeholder="a - Azul, v - Verde, c - Cinze, r - Roxo" />
        </div>
    )
}

export default Aula05;