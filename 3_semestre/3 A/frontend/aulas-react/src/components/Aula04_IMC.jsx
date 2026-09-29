const Aula04_IMC = ({nome, peso, altura, cor}) =>{
    // const nome = 'Mauricio'
    // const peso = 105;
    // const altura = 1.75

    const imc = peso / (altura ** 2);
    let resultado = "IMC"

    
    if(imc < 16.9){
        resultado = "muito abaixo do peso"
    }else if(imc > 1.9 && imc <= 18.4){
        resultado = "Abaixo do peso"
    }else if(imc > 18.4 && imc <= 24.9){
        resultado = "Peso Ideal"
    }else if(imc >= 25 && imc <= 29.9){
        resultado = "Acima do peso"
    }

    console.log(resultado)
    return(
        <div>
            <h3>Calculadora de IMC</h3>
            <p style={{ color: cor }}>Olá {nome}</p>
            <p>Altura: {altura} / Peso {peso}</p>
            <p>IMC: {imc.toFixed(1)}</p>
            <p>Voce está {resultado}</p>
        </div>
    )
}

export default Aula04_IMC;