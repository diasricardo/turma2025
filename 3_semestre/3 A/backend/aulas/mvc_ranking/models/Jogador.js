class Jogador{
    constructor(id, nome, pontuacao){
        this.id = id
        this.nome = nome
        this.pontuacao = pontuacao
    }
    resumo(){
        return `${this.nome} - ${this.pontuacao}`
    }

    nivelJogador(){
        if(this.pontuacao <= 150) return "Iniciante";
        if(this.pontuacao <= 300) return "Intermediario";
        return 'Avançado'
    }

    aumentarPontuacao(){
        this.pontuacao += 10
    }

}

export default Jogador