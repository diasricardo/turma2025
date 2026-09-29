const documentacao = {
    openapi: '3.0.3',
    info:{
        title: 'API de Ordem de Serviços',
        description: 'Documentação da API de ordens de serviço',
        version: '1.0.0'
    },
    servers: [
        {url: 'http://localhost:3000', description: 'Localhost'}
    ],
    tags:[
        {name: 'Usuários', description: 'Operações relacionadas a usuarios'},
        {name: 'Departamentos', description: 'Operações relacionadas a departamentos'}
    ],
    paths: {
        "/usuarios": {
            get: {
                tags:["Usuários"],
                summary: "Listar todos usuários",
                responses:{
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content:{
                            "apllication/json": {
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Usuarios'}
                                }
                            }
                        }
                    },
                    500:{
                        
                    }
                }
            },
            post:{
                tags:['Usuários'],
                summary: 'Cadastrar novo usuário',
                description: "Recebe nome, email, senha para cadastrar novo usuario",
                requestBody: {
                    required: true,
                    content:{
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Usuario"
                            }
                        }
                    }
                },
                responses:{
                    201:{
                        description: "Usuario cadastrado com sucesso!"
                    },
                    500:{
                        description: "Erro interno no servidor"
                    }
                } 
            }
        },
        "/usuarios/{id_usuario}":{
            put:{
                tags: ['Usuários'],
                summary: 'Atualizar todos os dados do usuário',
                description: 'Atualiza todos os dados de um usuários existente, é necessario enviar todos os campos',
                parameters: [
                    {
                        name: "id_usuario",
                        in: 'path',
                        required: true,
                        description: "ID do usuário a ser atualizado",
                        schema:{
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content:{
                        "application/json": {
                            schema: {$ref: "#/components/schemas/Atualizar_Usuario"},
                            example: {
                                nome: "Ricardo Santos",
                                email: "ricardo@sesisp.com",
                                senha: "senhaAtualizada"
                            }
                        }
                    }
                },
                responses:{
                    201:{
                        description: "Usuario atualizado com sucesso!"
                    },
                    404: {
                        description: "Usuario não encontrado",
                        content:{
                            "application/json":{
                                example: {message: "Usuario não encontrado"}
                            }
                        }
                    },
                    500:{
                        description: "Erro interno no servidor"
                    }
                }
            },
            patch:{
                tags: ['Usuários'],
                summary: 'Atualizar parcialmente usuário',
                description: `Atualiza apenas os campos enviados do usuário. Não é necessario 
                enviar todos os campos`,
                parameters: [
                    {
                        name: "id_usuario",
                        in: 'path',
                        required: true,
                        description: "ID do usuário a ser atualizado",
                        schema:{
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content:{
                        "application/json": {
                            schema: {$ref: "#/components/schemas/Atualizar_Parcial_Usuario"},
                            examples: {
                                apenas_nome: {
                                    summary: "Atualizar apenas o nome",
                                    value: {nome: "novo Nome"}
                                },
                                apenas_email: {
                                    summary: "Atualizar apenas o email",
                                    value: {email: "novoemail@email.com"}
                                }
                            }
                        }
                    }
                },
                responses:{
                    200:{
                        description: "Usuario atualizado com sucesso!"
                    },
                    400: {description: "Nenhum campo para atualizar"},
                    404: {
                        description: "Usuario não encontrado",
                        content:{
                            "application/json":{
                                example: {message: "Usuario não encontrado"}
                            }
                        }
                    },
                    500:{
                        description: "Erro interno no servidor"
                    }
                }
            },
            delete:{
                tags: ['Usuários'],
                summary: 'remover usuario',
                description: 'Remove usuario existente pelo ID',
                parameters: [
                    {
                        name: "id_usuario",
                        in: 'path',
                        required: true,
                        description: "ID do usuário a ser removido",
                        schema:{
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses:{
                    200:{
                        description: "Usuario removido com sucesso!"
                    },
                    404: {
                        description: "Usuario não encontrado",
                        content:{
                            "application/json":{
                                example: {message: "Usuario não encontrado"}
                            }
                        }
                    },
                    500:{
                        description: "Erro interno no servidor"
                    }
                }
            },
        },
        "/departamentos":{

        }
    },
    components:{
        schemas:{
            Listar_Usuarios:{
                type: 'object',
                properties: {
                    id: {type: "integer", example: 1},
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo@email.com"}
                }
            },
            Cadastrar_Usuario:{
                type: 'object',
                properties: {
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo@email.com"},
                    senha: {type: "string", example: "Senha123"}
                }
            },
            Atualizar_Usuario:{
                type: 'object',
                required: ["nome", "email", "senha"],
                properties: {
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo@email.com"},
                    senha: {type: "string", example: "Senha123"}
                }
            },
            Atualizar_Parcial_Usuario:{
                type: 'object',
                properties: {
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo@email.com"},
                    senha: {type: "string", example: "Senha123"}
                }
            },
            Listar_Departamentos: {

            }
        }
    }
}

export default documentacao