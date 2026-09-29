import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useState } from "react";

export default function Login (){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function botaoEntrar(event) {
        event.preventDefault()

        try{
            if(email == '' || senha == ''){
                setMensagem('Preencha todos os campos')
                return
            }

            const login ={
                "email": email,
                "senha": senha
            }
        }catch{
            setMensagem(`Erro ao realizar login: ${erro.message}`)
        }   
    }

    return (
        <div>
            <h1>Tela de Login</h1>
            <label htmlFor="">Email</label>
            <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <h1>Tela de Login</h1>
            <label htmlFor="">Senha</label>
            <input type="email" placeholder="Digite seu senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <button onClick={() => navigate("/principal")}>Entrar</button>
            <p style={{color: '#f00'}}>{mensagem}</p>
        </div>
    )
}