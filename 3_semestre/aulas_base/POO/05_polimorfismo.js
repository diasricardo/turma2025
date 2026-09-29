// Classe base
class Pessoa {
  constructor(nome) {
    this.nome = nome;
  }

  // Método comum (será sobrescrito nas filhas)
  identificar() {
    return `Pessoa: ${this.nome}`;
  }
}

// Subclasse: Pessoa Física
class PessoaFisica extends Pessoa {
  constructor(nome, cpf) {
    super(nome);      // inicializa o que é comum (nome)
    this.cpf = cpf;   // atributo específico
  }

  // Sobrescrita (polimorfismo)
  identificar() {
    return `Pessoa Física: ${this.nome} | CPF: ${this.cpf}`;
  }
}

// Subclasse: Pessoa Jurídica
class PessoaJuridica extends Pessoa {
  constructor(nome, cnpj) {
    super(nome);
    this.cnpj = cnpj;
  }

  // Sobrescrita (polimorfismo)
  identificar() {
    return `Pessoa Jurídica: ${this.nome} | CNPJ: ${this.cnpj}`;
  }
}

// ===== Demonstração do polimorfismo (sem vetor) =====

// 1) Pessoa Física
const ana = new PessoaFisica("Ana", "123.456.789-00");
console.log(ana.identificar()); 
// -> Pessoa Física: Ana | CPF: 123.456.789-00

// 2) Pessoa Jurídica
const acme = new PessoaJuridica("ACME Ltda", "12.345.678/0001-90");
console.log(acme.identificar());
// -> Pessoa Jurídica: ACME Ltda | CNPJ: 12.345.678/0001-90

// 3) Classe base (opcional, para contraste)
const generico = new Pessoa("Genérico");
console.log(generico.identificar());
// -> Pessoa: Genérico