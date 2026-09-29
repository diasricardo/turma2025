// Classe base
class Bruxo {
  constructor(nome, nivelMagia = 1) {
    this.nome = nome;
    this.nivelMagia = nivelMagia;
  }

  apresentar() {
    return `Bruxo ${this.nome} (nível ${this.nivelMagia})`;
  }

  lancarFeitico(nomeFeitico = "Feitiço") {
    return `${this.nome} lançou ${nomeFeitico}!`;
  }
}

// Subclasse: Grifinória
class BruxoDaGrifinoria extends Bruxo {
  constructor(nome, nivelMagia = 1) {
    super(nome, nivelMagia);
    this.casa = "Grifinória";
  }

  // Polimorfismo: sobrescreve 'apresentar'
  apresentar() {
    // usa comportamento do pai + especialização (opcional)
    const base = super.apresentar();
    return `${base} — Casa: ${this.casa}`;
  }

  feiticoAssinatura() {
    return this.lancarFeitico("Expelliarmus");
  }
}

// Subclasse: Sonserina
class BruxoDaSonserina extends Bruxo {
  constructor(nome, nivelMagia = 1) {
    super(nome, nivelMagia);
    this.casa = "Sonserina";
  }

  // Polimorfismo: sobrescreve 'apresentar'
  apresentar() {
    const base = super.apresentar();
    return `${base} — Casa: ${this.casa}`;
  }

  feiticoAssinatura() {
    return this.lancarFeitico("Serpensortia");
  }
}

// ===== Demonstração (sem vetor) =====

// 1) Harry (Grifinória)
const harry = new BruxoDaGrifinoria("Harry", 3);
console.log(harry.apresentar());         // polimorfismo (versão da subclasse)
console.log(harry.feiticoAssinatura());  // método específico

// 2) Malfoy (Sonserina)
const malfoy = new BruxoDaSonserina("Malfoy", 2);
console.log(malfoy.apresentar());        // polimorfismo (versão da subclasse)
console.log(malfoy.feiticoAssinatura()); // método específico

// 3) Classe base (opcional, para contraste)
const gen = new Bruxo("Genérico", 1);
console.log(gen.apresentar());           // versão da classe base
console.log(gen.lancarFeitico());        // método comum