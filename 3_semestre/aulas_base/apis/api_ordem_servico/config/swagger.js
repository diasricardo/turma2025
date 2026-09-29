const documentacao = {
  openapi: '3.0.3',
  info: {
    title: 'API de Ordens de Serviço',
    description: 'Documentação da API de Ordens de Serviço (Configuração Manual)',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor Local (Ambiente de Desenvolvimento)',
    },
    {
      url: 'https://api-ordem-servico.vercel.app',
      description: 'API Vercel',
    }
  ],
  tags: [
    { name: "Usuários", description: "Operações relacionadas aos usuários" },
    { name: "Departamentos", description: "Operações CRUD relativas aos departamentos" }
  ],
  paths: {
    "/usuarios": {
      get: {
        tags: ["Usuários"],
        summary: "Listar usuários",
        responses: {
          200: {
            description: "Dados obtidos com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Lista_Usuario" }
                }
              }
            }
          },
          500: { description: "Erro interno do servidor" }
        }
      },
      post: {
        tags: ["Usuários"],
        summary: "Cadastrar um novo usuário",
        description: "Recebe nome, email e senha para cadastrar um novo usuário no sistema.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastro_Usuario" },
              example: {
                nome: "Ricardo",
                email: "ricardo@email.com",
                senha: "senha123"
              }
            }
          }
        },
        responses: {
          201: {
            description: "Usuário cadastrado com sucesso",
            content: {
              "application/json": {
                example: "Usuário cadastrado com sucesso"
              }
            }
          },
          400: { description: "Erro na requisição (dados inválidos ou faltando)" },
          500: { description: "Erro interno no servidor" }
        }
      }
    },

    "/usuarios/{id}": {
      put: {
        tags: ["Usuários"],
        summary: "Atualizar usuário completo",
        description: "Atualiza todos os dados de um usuário existente. É necessário enviar todos os campos (nome, email e senha).",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do usuário a ser atualizado",
            schema: { type: "integer" },
            example: 1
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Atualizacao_Usuario" },
              example: {
                nome: "Ricardo Silva",
                email: "ricardo.silva@email.com",
                senha: "novaSenha123"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Usuário atualizado com sucesso",
            content: {
              "application/json": {
                example: "Usuário atualizado com sucesso"
              }
            }
          },
          404: {
            description: "Usuário não encontrado",
            content: {
              "application/json": {
                example: { message: "Usuário não encontrado" }
              }
            }
          },
          400: { description: "Erro na requisição (dados inválidos ou faltando)" },
          500: { description: "Erro interno no servidor" }
        }
      },

      patch: {
        tags: ["Usuários"],
        summary: "Atualizar usuário parcialmente",
        description: "Atualiza apenas os campos enviados do usuário. Não é necessário enviar todos os campos.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do usuário a ser atualizado",
            schema: { type: "integer" },
            example: 1
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Atualizacao_Parcial_Usuario" },
              examples: {
                apenas_nome: {
                  summary: "Atualizar apenas o nome",
                  value: { nome: "Novo Nome" }
                },
                apenas_email: {
                  summary: "Atualizar apenas o email",
                  value: { email: "novo.email@dominio.com" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Usuário atualizado com sucesso",
            content: {
              "application/json": { example: "Usuário atualizado com sucesso" }
            }
          },
          404: {
            description: "Usuário não encontrado",
            content: {
              "application/json": { example: { message: "Usuário não encontrado" } }
            }
          },
          400: { description: "Nenhum campo para atualizar ou dados inválidos" },
          500: { description: "Erro interno no servidor" }
        }
      },

      delete: {
        tags: ["Usuários"],
        summary: "Remover usuário",
        description: "Remove um usuário existente pelo ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do usuário a ser removido",
            schema: { type: "integer" },
            example: 1
          }
        ],
        responses: {
          200: {
            description: "Usuário removido com sucesso",
            content: {
              "application/json": {
                example: { message: "Usuário removido com sucesso" }
              }
            }
          },
          404: {
            description: "Usuário não encontrado",
            content: {
              "application/json": {
                example: { message: "Usuário não encontrado" }
              }
            }
          },
          500: { description: "Erro interno no servidor ao tentar deletar" }
        }
      }
    },
    "/login": {
            post: {
                tags: ['Autenticação'],
                summary: 'Realizar login',
                description: 'Autentica um usuário e retorna seus dados básicos',
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
                        description: "Login realizado com sucesso",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Resposta_Login" }
                            }
                        }
                    },
                    400: { description: "Email e senha são obrigatórios" },
                    401: { description: "Credenciais inválidas (Email ou Senha)" },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },
  },

  components: {
    schemas: {
      // Use o mesmo naming do banco para evitar confusão
      Lista_Usuario: {
        type: "object",
        properties: {
          id_usuario: { type: "integer", example: 1 },
          nome: { type: "string", example: "Ricardo" },
          email: { type: "string", example: "ricardo@email.com" }
        }
      },

      Cadastro_Usuario: {
        type: "object",
        required: ["nome", "email", "senha"],
        properties: {
          nome: { type: "string", example: "Ricardo" },
          email: { type: "string", example: "ricardo@email.com" },
          senha: { type: "string", example: "senha123" }
        }
      },

      Atualizacao_Usuario: {
        type: "object",
        required: ["nome", "email", "senha"],
        properties: {
          nome: { type: "string", example: "Ricardo Silva" },
          email: { type: "string", example: "ricardo.novo@email.com" },
          senha: { type: "string", example: "novaSenha123" }
        }
      },

      Atualizacao_Parcial_Usuario: {
        type: "object",
        properties: {
          nome: { type: "string", example: "Apenas o nome novo" },
          email: { type: "string", example: "apenas.email@novo.com" },
          senha: { type: "string", example: "apenasSenhaNova" }
        }
      },
      // --- NOVOS SCHEMAS PARA LOGIN ---
      Login_Usuario: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
              email: { type: 'string', example: 'ricardo@email.com' },
              senha: { type: 'string', example: 'Senha123' }
          }
      },
      Resposta_Login: {
          type: 'object',
          properties: {
              message: { type: 'string', example: 'Login realizado com sucesso' },
              usuario: {
                  type: 'object',
                  properties: {
                      id_usuario: { type: 'integer', example: 1 },
                      nome: { type: 'string', example: 'Ricardo' },
                      email: { type: 'string', example: 'ricardo@email.com' }
                  }
              }
          }
      },

      Departamentos: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string", example: "TI" }
        }
      }
    }
  }
};

export default documentacao;
