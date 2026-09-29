class Pessoa{
    nome
    constructor(nome){
        this.nome = nome;
    }

    apresentar(){
        return `Olá, eu sou ${this.nome}`
    }
}

class PessoaFisica extends Pessoa{
    constructor(nome, cpf){
        super(nome) //inicializa o nome da classe pai
        this.cpf = cpf
    }
}
class PessoaJuridica extends Pessoa{
    constructor(nome, cnpj){
        super(nome) //inicializa o nome da classe pai
        this.cnpj = cnpj
    }
}

const ana = new PessoaFisica("Ana Laura", "123.456.789-00")
console.log(ana.apresentar())

const sesi = new PessoaJuridica("SESI-ANDRADINA", "12.345.78/0001-90")
console.log(sesi.apresentar())
console.log(sesi.cnpj)