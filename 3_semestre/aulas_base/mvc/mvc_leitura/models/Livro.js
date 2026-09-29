class Livro {
  constructor(id, titulo, autor, paginas) {
    // Validações simples (opcional, mas didático)
    if (!titulo || !autor) {
      throw new Error('Título e autor são obrigatórios.');
    }
    const nPag = Number(paginas);
    if (Number.isNaN(nPag) || nPag <= 0) {
      throw new Error('Páginas deve ser um número maior que zero.');
    }

    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = nPag;
    this.lido = false; // pode ser usado em desafio
  }

  descricao() {
    return `${this.titulo} — ${this.autor}`;
  }

  verificarTamanho() {
    if (this.paginas <= 150) return 'Leitura curta';
    if (this.paginas <= 300) return 'Leitura média';
    return 'Leitura longa';
  }

  // Opcional (desafio): marca como lido
  marcarComoLido() {
    this.lido = true;
  }
}

export default Livro;