// pessoa.js
class Pessoa {
  constructor(nome) {
    this.nome = nome;
  }

  apresentar() {
    return `Olá, eu sou ${this.nome}`;
  }
}

class PessoaFisica extends Pessoa {
  constructor(nome, cpf) {
    super(nome);        // inicializa 'nome' na classe base
    this.cpf = cpf;     // atributo específico da PF
  }
}

class PessoaJuridica extends Pessoa {
  constructor(nome, cnpj) {
    super(nome);        // inicializa 'nome' na classe base
    this.cnpj = cnpj;   // atributo específico da PJ
  }
}

// ===== Exemplo de uso =====
const ana = new PessoaFisica("Ana", "123.456.789-00");
const acme = new PessoaJuridica("ACME Ltda", "12.345.678/0001-90");

console.log(ana.apresentar());   // "Olá, eu sou Ana"  (herdado)
console.log(ana.cpf);            // específico de PF

console.log(acme.apresentar());  // "Olá, eu sou ACME Ltda" (herdado)
console.log(acme.cnpj);          // específico de PJ