class Bruxo{
    constructor(nome, nivelMagia, casa, idade, matricula){
    this.nome = nome
    this.nivelMagia = nivelMagia
    this.casa = casa
    this.idade = idade
    this.matricula = matricula
    }
}

const bruxo1 = new Bruxo("Malfoy", 1, "Sonserina", 14, 12345)
console.log(bruxo1);