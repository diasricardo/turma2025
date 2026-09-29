// import Jogador from '../models/Jogador.js';

// // "Banco" em memória
// let listaJogadores = [
//   new Jogador(1, 'Alex', 120),
//   new Jogador(2, 'Bianca', 260),
//   new Jogador(3, 'Caio', 80)
// ];

// const jogadorController = {
//   // GET /jogadores
//   listar: (req, res) => {
//     // Ranking: ordena por pontuação (desc) sem alterar o array original
//     const ranking = [...listaJogadores].sort((a, b) => b.pontuacao - a.pontuacao);
//     res.render('jogadores', { jogadores: ranking, erro: null });
//   },

//   // POST /jogadores
//   adicionar: (req, res) => {
//     const { nome, pontuacao } = req.body;
//     try {
//       const novo = new Jogador(
//         listaJogadores.length ? listaJogadores[listaJogadores.length - 1].id + 1 : 1,
//         nome,
//         Number(pontuacao ?? 0)
//       );
//       listaJogadores.push(novo);
//       res.redirect('/jogadores');
//     } catch (e) {
//       const ranking = [...listaJogadores].sort((a, b) => b.pontuacao - a.pontuacao);
//       res.status(400).render('jogadores', { jogadores: ranking, erro: e.message });
//     }
//   },

//   // POST /jogadores/pontos
//   adicionarPontos: (req, res) => {
//     const { id, valor } = req.body;
//     const jogador = listaJogadores.find(j => j.id === Number(id));
//     if (!jogador) {
//       const ranking = [...listaJogadores].sort((a, b) => b.pontuacao - a.pontuacao);
//       return res.status(404).render('jogadores', { jogadores: ranking, erro: 'Jogador não encontrado.' });
//     }
//     try {
//       jogador.adicionarPontos(Number(valor));
//       res.redirect('/jogadores');
//     } catch (e) {
//       const ranking = [...listaJogadores].sort((a, b) => b.pontuacao - a.pontuacao);
//       res.status(400).render('jogadores', { jogadores: ranking, erro: e.message });
//     }
//   }
// };

// export default jogadorController;


import Jogador from '../models/Jogador.js';

// "Banco" em memória
let listaJogadores = [
  new Jogador(1, 'Alex', 120),
  new Jogador(2, 'Bianca', 260),
  new Jogador(3, 'Caio', 80)
];

const jogadorController = {
  listar: (req, res) => {
    // cria ranking sem usar spread nem métodos avançados
    let ranking = listaJogadores.slice(); 
    ranking.sort((a, b) => b.pontuacao - a.pontuacao);

    res.render('jogadores', { jogadores: ranking, erro: null });
  },

  adicionar: (req, res) => {
    const { nome, pontuacao } = req.body;

    try {
      const novo = new Jogador(
        listaJogadores.length + 1,
        nome,
        Number(pontuacao)
      );

      listaJogadores.push(novo);
      res.redirect('/jogadores');
    } catch (e) {
      let ranking = listaJogadores.slice();
      ranking.sort((a, b) => b.pontuacao - a.pontuacao);

      res.status(400).render('jogadores', { jogadores: ranking, erro: e.message });
    }
  },

  adicionarPontos: (req, res) => {
    const { id, valor } = req.body;
    const jogador = listaJogadores.find(j => j.id === Number(id));

    if (!jogador) {
      let ranking = listaJogadores.slice();
      ranking.sort((a, b) => b.pontuacao - a.pontuacao);

      return res.status(404).render('jogadores', { jogadores: ranking, erro: 'Jogador não encontrado.' });
    }

    try {
      jogador.adicionarPontos(Number(valor));
      res.redirect('/jogadores');
    } catch (e) {
      let ranking = listaJogadores.slice();
      ranking.sort((a, b) => b.pontuacao - a.pontuacao);

      res.status(400).render('jogadores', { jogadores: ranking, erro: e.message });
    }
  }
};

export default jogadorController;