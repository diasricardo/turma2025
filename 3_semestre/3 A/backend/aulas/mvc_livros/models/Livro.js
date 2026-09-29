class Livro {
    // #lido

    constructor(id, titulo, autor, paginas){
        if(!titulo || !autor){
            throw new Error('Titulo e autor são obrigatórios')
        }
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.paginas = paginas;
        this.lido = false;
    }

    descricao(){
        return `${this.titulo} - ${this.autor}`
    }
    
    verificarTamanho(){
        if(this.paginas <= 150) return 'Leitura Curta';
        if(this.paginas <= 300) return 'Leitura média';
        return 'Leitura Longa'
    }

    marcarComoLido(){
        this.lido = true;
    }
}

export default Livro;