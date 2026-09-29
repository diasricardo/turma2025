import jwt from 'jsonwebtoken';

const SECRET_KEY = 'sua_chave_secreta'; // Tem que ser exatamente a mesma chave que você usou no usuarios.js

export function autenticarToken(req, res, next) {
    // 1. Busca o token que vem no cabeçalho (Header) da requisição
    const authHeader = req.headers['authorization'];
    
    // O formato padrão enviado pelo front é: "Bearer TOKEN_AQUI"
    // O split separa a palavra 'Bearer' do 'TOKEN' e pega apenas o token
    const token = authHeader && authHeader.split(' ')[1];

    // 2. Se nenhum token foi enviado, barra a entrada na hora (401 Não Autorizado)
    if (!token) {
        return res.status(401).json({ message: 'Token de acesso não fornecido.' });
    }

    // 3. Se o token existe, vamos verificar se ele é válido e não expirou
    jwt.verify(token, SECRET_KEY, (err, usuarioDescriptografado) => {
        if (err) {
            // Se o token for inválido ou já tiver passado dos 15 minutos, barra (403 Proibido)
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }

        // 4. Se estiver tudo certo, salvamos os dados do usuário (id, email) dentro da requisição (req.usuario)
        req.usuario = usuarioDescriptografado;

        // 5. Libera para prosseguir para o endpoint (ir para a rota de usuários ou avaliações)
        next();
    });
}