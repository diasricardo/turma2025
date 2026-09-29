import { Pool } from 'pg';

const BD = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'bd_ordem_servico_3a',
    port: 5432
})

const testarConexao = async () =>{
    try{
        const cliente = await BD.connect(); //realiza a conexao
        console.log('Conexao estabelecida');
        cliente.release(); //libera a conexao
    }catch(error){
        console.error('Erro ao conecta com o banco', error.message)
    }
}

export {BD, testarConexao}