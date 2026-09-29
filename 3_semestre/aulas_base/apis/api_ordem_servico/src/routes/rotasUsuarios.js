import { Router } from 'express';
import { BD } from '../../db.js';

const router = Router();


router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await BD.query(
      'SELECT id_usuario, nome, email FROM usuarios ORDER BY id_usuario;'
    );
    return res.status(200).json(usuarios.rows); // 200 OK
  } catch (error) {
    console.error('Erro ao listar usuários:', error.message);
    return res.status(500).json({ message: 'Erro ao listar usuários' }); // 500
  }
});


//Exemplo sem parametros para evitar sql injection
router.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        // A sintaxe abaixo (usando [valores]) protege contra SQL Injection
        const comando = `INSERT INTO teste(nome, email, senha) VALUES(${nome}, ${email}, ${senha})`;
        console.log(comando);
        await BD.query(comando);

        res.status(201).json("Usuário cadastrado com sucesso");
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
});


// Exemplo usando parametrização para evitar SQL Injection
// router.post('/usuarios', async (req, res) => {
//     const { nome, email, senha } = req.body;
//     try {
//         // A sintaxe abaixo (usando [valores]) protege contra SQL Injection
//         const queryText = 'INSERT INTO USUARIOS(nome, email, senha) VALUES($1, $2, $3)';
//         const values = [nome, email, senha]; // Aqui você usaria a senha criptografada

//         await BD.query(queryText, values);

//         res.status(201).json("Usuário cadastrado com sucesso");
//     } catch (error) {
//         console.error('Erro ao cadastrar usuário:', error.message);
//         return res.status(500).json({ message: 'Erro interno no servidor' });
//     }
// });


router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    
    try {
        // Verifica se o usuário existe antes de atualizar
        const verificaUsuario = await BD.query('SELECT * FROM USUARIOS WHERE id_usuario = $1', [id]);
        
        if (verificaUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Atualiza todos os campos (PUT = substituição completa)
        const comando = 'UPDATE USUARIOS SET nome = $1, email = $2, senha = $3 WHERE id_usuario = $4';
        const valores = [nome, email, senha, id];

        await BD.query(comando, valores);

        return res.status(200).json("Usuário atualizado com sucesso");
    } catch (erro) {
        console.error('Erro ao atualizar usuário:', erro.message);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

router.patch('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    
    try {
        // Verifica se o usuário existe
        const verificaUsuario = await BD.query('SELECT * FROM USUARIOS WHERE id_usuario = $1', [id]);
        
        if (verificaUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Monta o UPDATE dinamicamente (apenas campos enviados)
        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) {
            campos.push(`nome = $${contador}`);
            valores.push(nome);
            contador++;
        }

        if (email !== undefined) {
            campos.push(`email = $${contador}`);
            valores.push(email);
            contador++;
        }

        if (senha !== undefined) {
            campos.push(`senha = $${contador}`);
            valores.push(senha);
            contador++;
        }

        // Se nenhum campo foi enviado
        if (campos.length === 0) {
            return res.status(400).json({ message: 'Nenhum campo para atualizar' });
        }

        // Adiciona o ID no final dos valores
        valores.push(id);

        // Monta a query dinâmica
        const comando = `UPDATE USUARIOS SET ${campos.join(', ')} WHERE id_usuario = $${contador}`;
        
        await BD.query(comando, valores);

        return res.status(200).json("Usuário atualizado com sucesso");
    } catch (erro) {
        console.error('Erro ao atualizar usuário:', erro.message);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
});


router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // 1. Verifica se o usuário existe antes de tentar deletar
        const verificaUsuario = await BD.query('SELECT id_usuario FROM usuarios WHERE id_usuario = $1', [id]);

        if (verificaUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // 2. Executa o comando de delete
        const comando = 'DELETE FROM usuarios WHERE id_usuario = $1';
        await BD.query(comando, [id]);

        // 3. Retorna sucesso
        return res.status(200).json({ message: 'Usuário removido com sucesso' });
        
    } catch (error) {
        console.error('Erro ao deletar usuário:', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor ao tentar deletar' + error.message });
    }
});

//endpoint de login

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    // 1. Validação básica de entrada
    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        // 2. Busca o usuário pelo email usando parametrização (seguro)
        const comando = 'SELECT id_usuario, nome, email, senha FROM usuarios WHERE email = $1';
        const result = await BD.query(comando, [email]);

        // 3. Verifica se o usuário foi encontrado
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        const usuario = result.rows[0];

        // 4. Verifica a senha 
        // IMPORTANTE: Aqui estou comparando texto puro para seguir seu exemplo atual.
        // Em um projeto real, você usaria bcrypt.compare(senha, usuario.senha)
        if (usuario.senha !== senha) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        // 5. Retorna sucesso (em um cenário real, você retornaria um Token JWT aqui)
        return res.status(200).json({
            message: 'Login realizado com sucesso',
            usuario: {
                id: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('Erro ao realizar login:', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
});



//Login com criptografia

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // 1. Busca o usuário pelo email
        const loginQuery = 'SELECT * FROM usuarios WHERE email = $1';
        const result = await BD.query(loginQuery, [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos' });
        }

        const usuario = result.rows[0];

        // 2. Compara a senha digitada com a criptografada do banco
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos' });
        }

        // 3. Login bem-sucedido
        return res.status(200).json({
            message: 'Login realizado!',
            usuario: { id: usuario.id_usuario, nome: usuario.nome }
        });

    } catch (error) {
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

//Cadastro com criptografia
router.post('/usuarios/cripto', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // 1. Defina a força da criptografia (10 é o padrão de mercado)
        const saltRounds = 10;

        // 2. Gera o hash da senha (operação assíncrona)
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

        // 3. Salva no banco usando a senha criptografada e PARAMETRIZAÇÃO
        const queryText = 'INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3)';
        const values = [nome, email, senhaCriptografada];

        await BD.query(queryText, values);

        return res.status(201).json("Usuário cadastrado com sucesso!");
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

export default router;