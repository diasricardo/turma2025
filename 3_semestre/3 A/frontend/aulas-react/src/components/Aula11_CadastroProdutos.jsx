import { estilos } from "../styles/Estilos"
import { useState } from "react"

const Aula11_CadastroProdutos = () => {
    const [ listaProdutos, setListaProdutos ] = useState([])

    const [ nome, setNome] = useState('')
    const [ preco, setPreco] = useState('')
    const [ url, setUrl] = useState('')
    const [ linkProduto, setLinkProduto] = useState('')
    const [ categoria, setCategoria] = useState('')
    const [ freteGratis, setFreteGratis] = useState('')

    return(
        <div>
            <h1>Cadastro de Produtos</h1>
            <div style={{display: "flex", flexDirection: "column", width: "400px", gap: "2px"}}>
                <input style={{height: "30px", padding: "10px", fontSize: "17px"}} value={nome} placeholder="Nome" onChange={(event) => setNome(event.target.value)} />
                <input style={{height: "30px", padding: "10px", fontSize: "17px"}} value={preco} placeholder="Preço" onChange={(event) => setPreco(event.target.value)} />
                <input style={{height: "30px", padding: "10px", fontSize: "17px"}} value={url} placeholder="URL da imagem" onChange={(event) => setUrl(event.target.value)} />
                <input style={{height: "30px", padding: "10px", fontSize: "17px"}} value={linkProduto} placeholder="Link do Produto" onChange={(event) => setLinkProduto(event.target.value)} />
                
                <select style={{height: "40px", padding: "10px", fontSize: "17px"}} value={categoria} onChange={(event) => setCategoria(event.target.value)}>
                    <option value="">Selecione uma categoria</option>
                    <option value="eletrodomesticos">Eletrodomesticos</option>
                    <option value="roupas">Roupas</option>
                    <option value="livros">Livros</option>
                </select>
                <div> <input type="checkbox"/> Frete Gratis</div>
                <button style={{height: "40px", backgroundColor: "#be0000", color: "white", borderColor: "white"}}>Adicionar Produto</button>
            </div>
        </div>
    )
}

export default Aula11_CadastroProdutos