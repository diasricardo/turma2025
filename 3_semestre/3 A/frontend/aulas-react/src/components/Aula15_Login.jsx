import { useState } from "react";
import { enderecoServidor } from "../utils";

const Aula15_Login =  () =>{
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    const botaoEntrar = async() => {
        try{
            if(email == '' || senha == ''){
                throw new Error('Preencha todos os campos')
            }

            
        }
        catch(error){
            console.error('Erro ao logar', error.message);
            setMensagem(error.message)
        }
    }
}

export default Aula15_Login