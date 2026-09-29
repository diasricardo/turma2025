import pkg from 'pg';
const { Pool } = pkg;

// Configuração das credenciais do teu banco de dados PostgreSQL
const pool = new Pool({
    user: 'postgres',       // ex: 'postgres'
    host: 'localhost',         // endereço do servidor do banco
    database: 'bd_senai',     // nome do banco de dados que criaste
    password: 'admin',     // a senha do teu PostgreSQL
    port: 5432,                // porta padrão do Postgres
});

// Criamos o objeto BD com o método query para manter exatamente o padrão que usas
export const BD = {
    query: (text, params) => pool.query(text, params)
};

// Evento opcional para monitorizar se a conexão foi feita com sucesso
pool.on('connect', () => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

// Trata erros inesperados em conexões ociosas
pool.on('error', (err) => {
    console.error('Erro inesperado no pool de conexões:', err.message);
});