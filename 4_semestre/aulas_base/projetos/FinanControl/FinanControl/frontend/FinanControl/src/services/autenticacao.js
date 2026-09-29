import {apiFetch, API_URL} from './api';

export const autenticacao = {
    login: async(email, password) =>{
        const data = await apiFetch(API_URL, '/login', 'POST', {email, senha: password});

        const token = data?.token;
        if(token){
            localStorage.setItem('token', token);
        }
        return data;
    },
    signup: async(name, email, password) =>{
        const data = await apiFetch(API_URL, '/usuarios', 'POST', {
            nome: name,
            email: email,
            senha: password,
            tipo_acesso: 'Default'
        })
        const token = data?.token;

        if(token){
            localStorage.setItem('token', token);
        }
        return data;
    },
    logout: () =>{
        localStorage.removeItem('token');
    }
    
}