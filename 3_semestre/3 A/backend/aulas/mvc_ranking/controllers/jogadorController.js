import Jogador from '../models/Jogador.js'

let listaJogadores = [
    new Jogador(1, 'Ronaldo', 900),
    new Jogador(2, 'Rivaldo', 500),
    new Jogador(3, 'Ronaldinho', 400)
]

const jogadorController = {
    listar: (req, res) => {
        res.render('jogadores.ejs', {jogadores: listaJogadores} )
    },
    adicionar: (req, res) =>{
        const nome = req.body.nome
        const pontuacao = req.body.pontuacao
        
        const novoJogador = new Jogador(
            listaJogadores.length + 1,
            nome,
            Number(pontuacao)
        )
        listaJogadores.push(novoJogador);
        res.redirect('/jogadores')
    }
}

export default jogadorController;