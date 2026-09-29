// pessoa.js — Público e Privado (#) de forma simples
class Pessoa {
  // privado (só a classe acessa)
  #documento;

  // públicos (qualquer um acessa)
  nome;
  idade;

  constructor(nome, idade, documento) {
    this.nome = nome;           // público
    this.idade = idade;         // público
    this.#documento = documento; // privado
  }

  // método público (qualquer um pode chamar)
  apresentar() {
    return `${this.nome}, ${this.idade} anos`;
  }

  // método público que expõe o documento de forma segura (sem vazar tudo)

  // método público simples
  mostrarDocumento() {
    return this.#documento;
  }

}

// Exemplo de uso (didático)
const ana = new Pessoa('Ana', 28, '12345678901');
console.log(ana.apresentar());            // "Ana, 28 anos"
console.log(ana.mostrarDocumento()); 

// Acesso direto ao privado dá erro de sintaxe:
// console.log(ana.#documento); // ❌