//criação da classe
class Pessoa{
    //atributos
    nome
    idade
}
const pessoa1 = new Pessoa()
pessoa1.nome = "Carlos"
pessoa1.idade = 30

console.log(pessoa1)

const pessoa2 = new Pessoa()
pessoa2.nome = "Ana"
pessoa2.idade = 28

console.log(pessoa2)

class Pessoa2 {
    constructor(nome, idade){
        this.nome = nome
        this.idade = idade
    }
}

const Joao = new Pessoa2("João", 36);
console.log(Joao.nome)
console.log(Joao.idade)
console.log(`Olá meu nome é ${Joao.nome} e tenho
   ${Joao.idade} `)