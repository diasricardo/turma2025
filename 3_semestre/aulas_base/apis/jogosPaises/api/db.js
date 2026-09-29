import { Pool } from 'pg';

// const BD = new Pool({
//     connectionString:"postgres://postgres.clckmjgvxzjfrfifrgsf:bf9YXw1Th4WS3vEt@aws-1-us-east-1.pooler.supabase.com:5432/postgres",
//     ssl: {rejectUnauthorized: false}
// })


const BD = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'bd_jogo_bandeiras',
    port: 5432
})

const testarConexao = async () =>{
    try{
        const cliente = await BD.connect(); // Realiza a conexão
        console.log('Conexão estabelecida');
        cliente.release(); // Libera a conexão
    }catch(error){
        console.error('Erro ao conectar com o banco', error.message);
    }
}

export {BD, testarConexao}