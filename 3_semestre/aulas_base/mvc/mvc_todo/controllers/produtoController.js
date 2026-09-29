// Importando a classe Produto do arquivo de modelo correspondente
import Produto from "../models/Produto.js";

// Criando uma lista inicial de produtos (simulando um banco de dados temporário)
let listaProdutos = [
    new Produto(1, "Mouse Gamer", 99.00),
    new Produto(2, "Teclado Mecânico", 250.00),
    new Produto(3, "Monitor Full HD", 1200.00)
];

// Definição do objeto controlador para manipular operações relacionadas a produtos
const produtoController = {

    // Método para listar os produtos na página 'produtos'
    listar: (req, res) => {
        res.render('produtos', { produtos: listaProdutos }); // Renderiza a view 'produtos' e envia a lista de produtos
    },

    // Método para adicionar um novo produto
    adicionar: (req, res) => {
        const { nome, preco } = req.body; // Obtém os dados enviados pelo formulário

        // Cria um novo produto com um ID sequencial baseado no tamanho da lista
        const novoProduto = new Produto(listaProdutos.length + 1, nome, parseFloat(preco));

        // Adiciona o novo produto à lista
        listaProdutos.push(novoProduto);

        // Redireciona o usuário para a página de listagem de produtos após a adição
        res.redirect('/produtos');
    }
};

// Exporta o controlador para ser utilizado em outras partes da aplicação
export default produtoController;
