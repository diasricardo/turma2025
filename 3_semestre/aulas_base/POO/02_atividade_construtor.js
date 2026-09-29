// Criação da classe Bruxo (com construtor)
class Bruxo {

  // Método construtor
  constructor(nome, idade, escola, nivelMagia) {
    //  O this faz referência ao objeto que será criado a partir dessa função,
    //  ou seja ele recebe os valores passados como parâmetros e os atribui às propriedades do objeto.
    this.nome = nome;
    this.idade = idade;
    this.escola = escola;
    this.nivelMagia = nivelMagia;
    this.energiaMagica = 100; // valor inicial padrão
  }
}

const harry = new Bruxo("Harry", 17, "Hogwarts", 3);
const hermione = new Bruxo("Hermione", 18, "Hogwarts", 5);

console.log(harry);
console.log(hermione);