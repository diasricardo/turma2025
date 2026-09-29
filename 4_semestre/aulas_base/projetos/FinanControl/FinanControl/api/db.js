import { Pool } from 'pg';

// const BD = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     password: 'admin',
//     database: 'bd_financontrol',
//     port: 5432
// })

// Utilizando banco do Supabase
const BD = new Pool({
    connectionString: "postgres://postgres.awpeyzenbxfxdlhuzkqo:fLyp44eu87rKicLn@aws-1-us-east-1.pooler.supabase.com:5432/postgres",
    ssl:{rejectUnauthorized: false}
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