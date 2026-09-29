import { useState } from 'react'
import { estilos } from '../styles/Aula03_Login_Estilos'

const Aula03_Login = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [mensagem, setMensagem] = useState("")
    
    function acessar() {
        if(email == "senai@senai.br" && senha == "123"){
            setMensagem("Bem vindo")
        }else{
            setMensagem("Usuario ou senha inválidos!")
        }
    }


    return(
        <div style={estilos.loginConteudo}>
            <div style={estilos.loginCaixa}>
                <img src="" alt="" style={estilos.logo} />
                <h2 style={estilos.titulo}>Login</h2>
                <div style={estilos.grupoInput}>
                    <label style={estilos.label}>Email</label>
                    <input onChange={(event) => setEmail(event.target.value)} value={email} type="text" style={estilos.input} placeholder='Digite seu email!' />
                </div>
                <div style={estilos.grupoInput}>
                    <label style={estilos.label}>Senha</label>
                    <input onChange={(event) => setSenha(event.target.value)} value={senha} type="password" style={estilos.input} placeholder='Digite sua senha!' />
                </div>
                <button style={estilos.botaoLogin} onClick={acessar}>Entrar</button>
                <p>{mensagem}</p>
            </div>
        </div>
    )
}

export default Aula03_Login