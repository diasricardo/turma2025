// db.js
import { Pool } from 'pg';

const BD = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'bd_sis2con', // Nome do banco do sistema de convênios
    port: 5432
});

const testarConexao = async () => {
    try {
        const cliente = await BD.connect(); // Realiza a conexão
        console.log('Conexão estabelecida com o Sis2Con');
        cliente.release(); // Libera a conexão
    } catch (error) {
        console.error('Erro ao conectar com o banco', error.message);
    }
}

export { BD, testarConexao };