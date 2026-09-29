import Livro from '../models/Livro.js';

// "Banco" em memória (array)
let listaLivros = [
  new Livro(1, 'O Alienista', 'Machado de Assis', 96),
  new Livro(2, 'Dom Casmurro', 'Machado de Assis', 288),
  new Livro(3, 'Capitães da Areia', 'Jorge Amado', 280)
];

const livroController = {
  listar: (req, res) => {
    res.render('livros', { livros: listaLivros, erro: null });
  },

  adicionar: (req, res) => {
    const { titulo, autor, paginas } = req.body;

    try {
      const novo = new Livro(
        listaLivros.length + 1,
        titulo,
        autor,
        Number(paginas)
      );
      listaLivros.push(novo);
      res.redirect('/livros');
    } catch (e) {
      // Volta para a view com mensagem de erro
      res.status(400).render('livros', { livros: listaLivros, erro: e.message });
    }
  },

  // Opcional: marcar como lido (desafio)
  marcarComoLido: (req, res) => {
    const { id } = req.body;
    const livro = listaLivros.find(l => l.id === Number(id));
    if (!livro) {
      return res.status(404).render('livros', { livros: listaLivros, erro: 'Livro não encontrado.' });
    }
    livro.marcarComoLido();
    res.redirect('/livros');
  }
};

export default livroController;