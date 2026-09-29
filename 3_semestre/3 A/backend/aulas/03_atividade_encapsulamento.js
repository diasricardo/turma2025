//Versão com encapsulamento

class Bruxo{
    #energiaMagica = 100;
    nome
    nivelMagia

    constructor(nome, nivelMagia =1){
        this.nome = nome
        this.nivelMagia = nivelMagia
    }

    verEnergia(){
        //retorna o valor do atributo energiaMagica
        return this.#energiaMagica;
    }
    recarregarMagia(){
        this.#energiaMagica += 10;
    }
    lancarFeitico(){
        this.#energiaMagica -= 10;
    }
}

const snape = new Bruxo('Severo', 6);
console.log(snape); //retorna objeto
console.log(snape.nivelMagia); //retorna o nivel da magia
console.log(snape.verEnergia());
snape.lancarFeitico();
console.log(snape.verEnergia());
snape.recarregarMagia();
console.log(snape.verEnergia());
