import jwt from 'jsonwebtoken';
// 2. A "assinatura" do seu servidor. Só o seu servidor conhece essa chave.
const SECRET_KEY = 'sua_chave_secreta'; 

export function autenticarToken(req, res, next) {
    // 3. Busca o cabeçalho 'Authorization' na requisição.
    const cabecalho = req.headers['authorization'];

    
    // 4. Extrai o token. No padrão 'Bearer TOKEN', o split pega só a segunda parte.
    //O prefixo Bearer serve para avisar ao servidor que o método de autenticação utilizado é o de "posse do token".
    const token = cabecalho && cabecalho.split(' ')[1];
        //Se tentarmos rodar um .split() em algo que é undefined, o servidor trava e cai.
        //

    // 5. Se não houver token, barra o acesso (Erro 401 - Não autorizado).
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    // 6. Tenta verificar se o token é legítimo e se a assinatura bate com a SECRET_KEY.
    jwt.verify(token, SECRET_KEY, (err, usuario) => {
        // 7. Se o token foi alterado ou expirou, barra o acesso (Erro 403 - Proibido).
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado' });
        }
        
        // 8. Se estiver tudo OK, anexa os dados do usuário na requisição (req.usuario).
        req.usuario = usuario;
        
        // 9. Chama o 'next()', que diz: "Pode passar para a próxima função/rota".
        next();
    });
}