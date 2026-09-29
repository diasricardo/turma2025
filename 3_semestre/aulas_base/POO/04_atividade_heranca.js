// Classe base
class Bruxo {
  constructor(nome, nivelMagia = 1) {
    this.nome = nome;
    this.nivelMagia = nivelMagia;
  }

  apresentar() {
    return `Eu sou ${this.nome} (nível ${this.nivelMagia}).`;
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

  feiticoAssinatura() {
    // exemplo simples para fins didáticos
    return this.lancarFeitico("Expelliarmus");
  }
}

// Subclasse: Sonserina
class BruxoDaSonserina extends Bruxo {
  constructor(nome, nivelMagia = 1) {
    super(nome, nivelMagia);
    this.casa = "Sonserina";
  }

  feiticoAssinatura() {
    // exemplo simples para fins didáticos
    return this.lancarFeitico("Serpensortia");
  }
}

// ===== Demonstração (instâncias alinhadas ao diagrama) =====
const harry = new BruxoDaGrifinoria("Harry", 3);
const malfoy = new BruxoDaSonserina("Malfoy", 2);

console.log(harry.apresentar());         // Eu sou Harry (nível 3).
console.log(`Casa: ${harry.casa}`);      // Casa: Grifinória
console.log(harry.feiticoAssinatura());  // Harry lançou Expelliarmus!

console.log(malfoy.apresentar());        // Eu sou Malfoy (nível 2).
console.log(`Casa: ${malfoy.casa}`);     // Casa: Sonserina
console.log(malfoy.feiticoAssinatura()); // Malfoy lançou Serpensortia!