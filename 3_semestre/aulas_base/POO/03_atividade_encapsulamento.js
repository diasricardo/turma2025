// bruxo.js — versão simples com encapsulamento (público + privado)

// Classe Bruxo
class Bruxo {
  // Campo privado (encapsulado): só a classe acessa diretamente
  #energiaMagica = 100;

  // Campos públicos (qualquer código pode acessar)
  nome;
  nivelMagia;

  // Construtor: define os atributos básicos
  constructor(nome, nivelMagia = 1) {
    this.nome = nome;
    this.nivelMagia = nivelMagia;
    // #energiaMagica já nasce 100 (linha do campo)
  }

  // Método público de "leitura": mostra a energia atual (sem permitir alterar de fora)
  verEnergia() {
    return this.#energiaMagica;
  }

 
  // Método simples: recupera energia
  recarregarMagia() {
     this.#energiaMagica += 10;
  }

  // Método simples: lança feitiço e gasta energia
  lancarFeitico() {
    
     this.#energiaMagica -= 10;
  }

}

// ===== Exemplo de uso (para você mostrar em aula) =====
const harry = new Bruxo('Harry', 3);

console.log(harry.nome);             // público → OK
console.log(harry.nivelMagia);       // público → OK
console.log(harry.verEnergia());     // 100 (acesso controlado)

console.log(harry.lancarFeitico("expeliarmus")); // gasta 10
console.log(harry.verEnergia());     // 90

harry.recarregarMagia(5);
console.log(harry.verEnergia());     // 95

// Acesso direto ao privado dá erro de sintaxe (não compila):
// console.log(harry.#energiaMagica); // ❌