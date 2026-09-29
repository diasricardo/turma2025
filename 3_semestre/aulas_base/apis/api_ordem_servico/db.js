// src/config/db.js
import pkg from 'pg';
const { Pool } = pkg;

const BD = new Pool({
  connectionString: "postgres://postgres.qqgnrbyaehesjvntvpve:BtUbR1R8eJF6i6RI@aws-1-us-east-1.pooler.supabase.com:6543/postgres",
  ssl: {
         rejectUnauthorized: false // O Supabase requer SSL
    }
});

// const BD = new Pool({
  // user: 'postgres',                                // usuário do Supabase
  // host: 'localhost',     // host do Supabase
  // database: 'bd_ordem_servicos',                            // normalmente "postgres"
  // password: 'admin',                  // senha do banco, NÃO a do site
  // port: 5432,
//   // ssl: { rejectUnauthorized: false }               // Supabase exige SSL
// });

const testarConexao = async () => {
  try {
    const client = await BD.connect(); // tenta conectar
    console.log('✔ Conexão com o banco de dados estabelecida (SUPABASE)');
    client.release(); // libera a conexão
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
};

export { BD, testarConexao };