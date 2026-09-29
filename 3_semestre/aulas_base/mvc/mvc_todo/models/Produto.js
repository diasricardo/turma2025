// Definição da classe Produto para representar um item com ID, nome e preço
class Produto {
    constructor(id, nome, preco) {
        this.id = id;       // Identificador único do produto
        this.nome = nome;   // Nome do produto
        this.preco = preco; // Preço do produto
    }

    // Método para formatar o preço no formato de moeda brasileira (R$)
    formatarPreco() {
        return `R$${this.preco.toFixed(2)}`; // Formata o preço com duas casas decimais
    }
}

// Exporta a classe Produto para ser utilizada em outros arquivos
export default Produto;
