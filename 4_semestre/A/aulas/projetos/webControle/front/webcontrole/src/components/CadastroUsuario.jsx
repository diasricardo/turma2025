import {enderecoServidor} from '../utils'
import { useState, useEffect } from 'react'

export default function CadastroUsuario(){
    const [nome, setNome] = useState("");
    const [uid, setUid] = useState("");
    const [mensagem, setMensagem] = useState("")
    const [carregando, setCarregando] = useState(false);

    const buscarUltimaLeitura = async() =>{
        const resposta = await fetch(`${enderecoServidor}/leitor/ultima-leitura`)
        const dados = await resposta.json();

        setUid(dados.uid);
        setMensagem("Cartao detectado!");
    }

    const cadastrarUsuario = async(e) =>{
        e.preventDefault();
        try{
            const resposta = await fetch(`${enderecoServidor}/leitor/cadastrar`,
            {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({
                    nome: nome,
                    uid: uid
                })
            })
            const dados = await resposta.json();
            if(dados.ok){
                setMensagem("Usuario cadastrado")
                setNome('')
                setUid('')
            }else{
                setMensagem('Erro ao cadastrar')
            }
        }catch(erro){
            setMensagem('Erro ao conectar')
        }
    }

    useEffect(() =>{
        buscarUltimaLeitura();
        const intervalo = setInterval(buscarUltimaLeitura, 1000)
        return () => clearInterval(intervalo)
    }, [uid]);

  return (
    <form onSubmit={cadastrarUsuario} className="flex flex-col gap-5 w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {mensagem && (
        <div className="p-3 bg-blue-50 text-blue-700 text-sm rounded-md border border-blue-200 text-center font-medium">
          {mensagem}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700">
          Nome do Usuário:
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome completo"
          className="p-2.5 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700">
          UID do Cartão:
        </label>
        <input
          type="text"
          value={uid}
          readOnly
          placeholder="Aproxime o cartão no leitor..."
          className={`p-2.5 text-base rounded-md border font-mono transition-all ${
            uid
              ? 'bg-green-50 border-green-600 text-green-900 font-bold'
              : 'bg-gray-100 border-gray-300 text-gray-500'
          }`}
        />
        <span className="text-xs text-gray-500">
          {uid ? (
            <span className="text-green-600 font-medium">✓ Cartão capturado!</span>
          ) : (
            'Aproxime o crachá do leitor para preencher automaticamente.'
          )}
        </span>
      </div>

      <button
        type="submit"
        disabled={carregando || !uid || !nome}
        className={`p-3 text-white font-semibold rounded-lg transition-all text-base shadow ${
          carregando || !uid || !nome
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
        }`}
      >
        {carregando ? 'Salvando...' : 'Salvar Cadastro'}
      </button>
    </form>
  );
}
