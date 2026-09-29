const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'API BarberMatch 💈',
        description: 'Documentação da API de agendamentos para barbearias - BarberMatch',
        version: '1.0.0'
    },
    servers: [
        { url: 'http://localhost:3000', description: 'localhost' }
    ],
    tags: [
        { name: 'Usuários',      description: 'Cadastro, login e gerenciamento de clientes e barbeiros' },
        { name: 'Serviços',      description: 'Catálogo de serviços oferecidos pela barbearia' },
        { name: 'Agendamentos',  description: 'Criação e gerenciamento de agendamentos' }
    ],
    paths: {

        // ──────────────────────────────────────────────
        // USUÁRIOS
        // ──────────────────────────────────────────────
        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Listar todos os usuários",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Usuarios" }
                                }
                            }
                        }
                    },
                    401: { description: "Não autorizado - token ausente ou inválido" },
                    500: { description: "Erro interno no servidor" }
                }
            },
            post: {
                tags: ["Usuários"],
                summary: "Cadastrar novo usuário",
                description: "Recebe nome, email, senha e tipo (cliente ou barbeiro) para cadastrar",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Usuario" }
                        }
                    }
                },
                responses: {
                    201: { description: "Usuário cadastrado com sucesso!" },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/usuarios/{id_usuario}": {
            put: {
                tags: ["Usuários"],
                summary: "Atualizar todos os dados do usuário",
                description: "Atualiza todos os campos de um usuário existente",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser atualizado",
                        schema: { type: "integer", example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Usuario" }
                        }
                    }
                },
                responses: {
                    200: { description: "Usuário atualizado com sucesso!" },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Usuário não encontrado" }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            },
            delete: {
                tags: ["Usuários"],
                summary: "Remover usuário",
                description: "Remove um usuário existente pelo ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser removido",
                        schema: { type: "integer", example: 1 }
                    }
                ],
                responses: {
                    200: { description: "Usuário removido com sucesso!" },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Usuário não encontrado" }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/login": {
            post: {
                tags: ["Usuários"],
                summary: "Realizar Login",
                description: "Autentica um usuário e retorna o token JWT",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Login_Usuario" }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login realizado com sucesso!",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Resposta_Login" }
                            }
                        }
                    },
                    401: { description: "Email ou senha inválidos" },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        // ──────────────────────────────────────────────
        // SERVIÇOS
        // ──────────────────────────────────────────────
        "/servicos": {
            get: {
                tags: ["Serviços"],
                summary: "Listar todos os serviços",
                description: "Retorna todos os serviços disponíveis na barbearia",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Servicos" }
                                }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            },
            post: {
                tags: ["Serviços"],
                summary: "Cadastrar novo serviço",
                description: "Recebe nome, preco e descricao para cadastrar um novo serviço",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Servico" }
                        }
                    }
                },
                responses: {
                    201: { description: "Serviço cadastrado com sucesso!" },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/servicos/{id_servico}": {
            put: {
                tags: ["Serviços"],
                summary: "Atualizar todos os dados do serviço",
                description: "Atualiza todos os campos de um serviço existente",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id_servico",
                        in: "path",
                        required: true,
                        description: "ID do serviço a ser atualizado",
                        schema: { type: "integer", example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Servico" }
                        }
                    }
                },
                responses: {
                    200: { description: "Serviço atualizado com sucesso!" },
                    404: {
                        description: "Serviço não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Serviço não encontrado." }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            },
            delete: {
                tags: ["Serviços"],
                summary: "Remover serviço",
                description: "Remove um serviço existente pelo ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id_servico",
                        in: "path",
                        required: true,
                        description: "ID do serviço a ser removido",
                        schema: { type: "integer", example: 1 }
                    }
                ],
                responses: {
                    200: { description: "Serviço removido com sucesso!" },
                    404: {
                        description: "Serviço não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Serviço não encontrado." }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        // ──────────────────────────────────────────────
        // AGENDAMENTOS
        // ──────────────────────────────────────────────
        "/agendamentos": {
            get: {
                tags: ["Agendamentos"],
                summary: "Listar todos os agendamentos",
                description: "Retorna todos os agendamentos com dados de cliente, barbeiro e serviço",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Agendamentos" }
                                }
                            }
                        }
                    },
                    401: { description: "Não autorizado" },
                    500: { description: "Erro interno no servidor" }
                }
            },
            post: {
                tags: ["Agendamentos"],
                summary: "Criar novo agendamento",
                description: "Reserva um horário para um cliente com um barbeiro. O id_cliente é extraído automaticamente do token JWT. Verifica conflito de horário antes de salvar.",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Criar_Agendamento" }
                        }
                    }
                },
                responses: {
                    201: { description: "Agendamento criado com sucesso!" },
                    409: {
                        description: "Conflito de horário",
                        content: {
                            "application/json": {
                                example: { message: "Horário já reservado para este barbeiro." }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/agendamentos/{id_agendamento}/status": {
            patch: {
                tags: ["Agendamentos"],
                summary: "Atualizar status do agendamento",
                description: "Atualiza apenas o status de um agendamento existente. Valores válidos: confirmado, concluido, cancelado",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id_agendamento",
                        in: "path",
                        required: true,
                        description: "ID do agendamento a ser atualizado",
                        schema: { type: "integer", example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Patch_Status" }
                        }
                    }
                },
                responses: {
                    200: { description: "Status atualizado com sucesso!" },
                    400: {
                        description: "Status inválido",
                        content: {
                            "application/json": {
                                example: { message: "Status inválido. Use: confirmado, concluido, cancelado" }
                            }
                        }
                    },
                    404: {
                        description: "Agendamento não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Agendamento não encontrado." }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/agendamentos/{id_agendamento}": {
            delete: {
                tags: ["Agendamentos"],
                summary: "Deletar agendamento",
                description: "Remove permanentemente um agendamento pelo ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id_agendamento",
                        in: "path",
                        required: true,
                        description: "ID do agendamento a ser removido",
                        schema: { type: "integer", example: 1 }
                    }
                ],
                responses: {
                    200: { description: "Agendamento removido com sucesso!" },
                    404: {
                        description: "Agendamento não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Agendamento não encontrado." }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/agendamentos/status/{status}": {
            get: {
                tags: ["Agendamentos"],
                summary: "Listar agendamentos por status",
                description: "Filtra agendamentos pelo status: confirmado, concluido ou cancelado",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "status",
                        in: "path",
                        required: true,
                        description: "Status do agendamento",
                        schema: {
                            type: "string",
                            enum: ["confirmado", "concluido", "cancelado"],
                            example: "confirmado"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Agendamentos" }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Status inválido",
                        content: {
                            "application/json": {
                                example: { message: "Status inválido. Use: confirmado, concluido, cancelado" }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/agendamentos/barbeiro/{id_barbeiro}": {
            get: {
                tags: ["Agendamentos"],
                summary: "Listar agendamentos de um barbeiro",
                description: "Retorna todos os agendamentos vinculados ao barbeiro informado",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id_barbeiro",
                        in: "path",
                        required: true,
                        description: "ID do barbeiro",
                        schema: { type: "integer", example: 2 }
                    }
                ],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Agendamentos" }
                                }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/agendamentos/cliente/{id_cliente}": {
            get: {
                tags: ["Agendamentos"],
                summary: "Listar agendamentos de um cliente",
                description: "Retorna todos os agendamentos feitos pelo cliente informado",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id_cliente",
                        in: "path",
                        required: true,
                        description: "ID do cliente",
                        schema: { type: "integer", example: 3 }
                    }
                ],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Agendamentos" }
                                }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/agendamentos/periodo": {
            get: {
                tags: ["Agendamentos"],
                summary: "Listar agendamentos por período",
                description: "Retorna todos os agendamentos entre duas datas. Formato: DD/MM/YYYY",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "inicio",
                        in: "query",
                        required: true,
                        description: "Data de início do período",
                        schema: { type: "string", example: "01/05/2025" }
                    },
                    {
                        name: "fim",
                        in: "query",
                        required: true,
                        description: "Data de fim do período",
                        schema: { type: "string", example: "31/05/2025" }
                    }
                ],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Agendamentos" }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Datas não informadas",
                        content: {
                            "application/json": {
                                example: { message: "Informe as datas de inicio e fim. Ex: ?inicio=01/05/2025&fim=31/05/2025" }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/agendamentos/total": {
            get: {
                tags: ["Agendamentos"],
                summary: "Total de agendamentos por status",
                description: "Retorna a contagem de agendamentos filtrados por status",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "status",
                        in: "query",
                        required: true,
                        description: "Status para contagem",
                        schema: {
                            type: "string",
                            enum: ["confirmado", "concluido", "cancelado"],
                            example: "confirmado"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Cálculo realizado com sucesso",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Total_Agendamentos" }
                            }
                        }
                    },
                    500: { description: "Erro interno no servidor" }
                }
            }
        }
    },

    // ──────────────────────────────────────────────
    // COMPONENTS
    // ──────────────────────────────────────────────
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Insira o token JWT obtido no login'
            }
        },
        schemas: {
            // Usuários
            Listar_Usuarios: {
                type: 'object',
                properties: {
                    id_usuario: { type: "integer", example: 1 },
                    nome:       { type: "string",  example: "João Silva" },
                    email:      { type: "string",  example: "joao@email.com" },
                    tipo:       { type: "string",  enum: ["cliente", "barbeiro"], example: "cliente" }
                }
            },
            Cadastrar_Usuario: {
                type: 'object',
                required: ["nome", "email", "senha", "tipo"],
                properties: {
                    nome:  { type: "string",  example: "João Silva" },
                    email: { type: "string",  example: "joao@email.com" },
                    senha: { type: "string",  example: "Senha123" },
                    tipo:  { type: "string",  enum: ["cliente", "barbeiro"], example: "cliente" }
                }
            },
            Atualizar_Usuario: {
                type: 'object',
                required: ["nome", "email", "senha", "tipo"],
                properties: {
                    nome:  { type: "string",  example: "João Atualizado" },
                    email: { type: "string",  example: "joaoatualizado@email.com" },
                    senha: { type: "string",  example: "NovaSenha123" },
                    tipo:  { type: "string",  enum: ["cliente", "barbeiro"], example: "cliente" }
                }
            },
            Login_Usuario: {
                type: 'object',
                required: ["email", "senha"],
                properties: {
                    email: { type: "string", example: "joao@email.com" },
                    senha: { type: "string", example: "Senha123" }
                }
            },
            Resposta_Login: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Login realizado com sucesso' },
                    token:   { type: 'string', example: 'eyJhbGciOiJIUzI1Ni...' },
                    usuario: {
                        type: 'object',
                        properties: {
                            id_usuario: { type: "integer", example: 1 },
                            nome:       { type: "string",  example: "João Silva" },
                            email:      { type: "string",  example: "joao@email.com" },
                            tipo:       { type: "string",  example: "cliente" }
                        }
                    }
                }
            },

            // Serviços
            Listar_Servicos: {
                type: "object",
                properties: {
                    id_servico: { type: "integer", example: 1 },
                    nome:       { type: "string",  example: "Corte de Cabelo" },
                    preco:      { type: "number",  example: 35.00 },
                    descricao:  { type: "string",  example: "Corte masculino com tesoura ou máquina" }
                }
            },
            Cadastrar_Servico: {
                type: "object",
                required: ["nome", "preco"],
                properties: {
                    nome:      { type: "string", example: "Barba" },
                    preco:     { type: "number", example: 25.00 },
                    descricao: { type: "string", example: "Modelagem e hidratação de barba" }
                }
            },

            // Agendamentos
            Listar_Agendamentos: {
                type: "object",
                properties: {
                    id_agendamento: { type: "integer", example: 1 },
                    data_hora:      { type: "string",  example: "15/05/2025 09:00" },
                    status:         { type: "string",  enum: ["confirmado", "concluido", "cancelado"], example: "confirmado" },
                    id_cliente:     { type: "integer", example: 3 },
                    nome_cliente:   { type: "string",  example: "João Silva" },
                    id_barbeiro:    { type: "integer", example: 2 },
                    nome_barbeiro:  { type: "string",  example: "Carlos Barbeiro" },
                    id_servico:     { type: "integer", example: 1 },
                    nome_servico:   { type: "string",  example: "Corte de Cabelo" },
                    preco:          { type: "number",  example: 35.00 }
                }
            },
            Criar_Agendamento: {
                type: "object",
                required: ["id_barbeiro", "id_servico", "data_hora"],
                properties: {
                    id_barbeiro: { type: "integer", example: 2 },
                    id_servico:  { type: "integer", example: 1 },
                    data_hora:   { type: "string",  example: "2025-05-15T09:00:00", description: "Formato ISO 8601" }
                }
            },
            Patch_Status: {
                type: "object",
                required: ["status"],
                properties: {
                    status: {
                        type: "string",
                        enum: ["confirmado", "concluido", "cancelado"],
                        example: "concluido"
                    }
                }
            },
            Total_Agendamentos: {
                type: 'object',
                properties: {
                    status: { type: 'string',  example: 'confirmado' },
                    total:  { type: 'integer', example: 12, description: 'Quantidade de agendamentos com o status informado' }
                }
            }
        }
    }
};

export default documentacao;