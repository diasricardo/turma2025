class Pessoa{
    //encapsulamento metodo privado
    #rg

    //publicos
    nome
    idade

    constructor(nome, idade, rg){
        this.nome = nome
        this.idade = idade
        this.#rg = rg
    }

    mostrarRg(){
        return this.#rg;
    }

    apresentar(){
        return `${this.nome},tenho ${this.idade} anos`
    }
}

const ana = new Pessoa('Ana', 28, 1121212)
console.log(ana.mostrarRg())
console.log(ana.apresentar())
console.log(ana.nome)
//O atributo privado Rg nao pode ser acessado fora da classe
// console.log(ana.#rg)