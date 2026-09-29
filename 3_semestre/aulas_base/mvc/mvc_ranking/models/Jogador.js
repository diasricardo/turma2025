class Jogador {
  constructor(id, nome, pontuacao = 0) {
    if (!nome) {
      throw new Error('Nome do jogador é obrigatório.');
    }

    const pts = Number(pontuacao);
    if (Number.isNaN(pts) || pts < 0) {
      throw new Error('Pontuação inicial deve ser um número >= 0.');
    }

    this.id = id;
    this.nome = nome;
    this.pontuacao = pts;
  }

  adicionarPontos(valor) {
    const v = Number(valor);
    if (Number.isNaN(v) || v <= 0) {
      throw new Error('O valor para adicionar deve ser um número > 0.');
    }
    this.pontuacao += v;
  }

  resumo() {
    return `${this.nome} — ${this.pontuacao} pontos`;
  }

  // Opcional (para badge de nível)
  nivel() {
    if (this.pontuacao <= 100) return 'Iniciante';
    if (this.pontuacao <= 300) return 'Intermediário';
    return 'Avançado';
  }
}

export default Jogador;
