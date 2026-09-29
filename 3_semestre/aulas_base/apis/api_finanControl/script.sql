CREATE TABLE empresas (
    id_empresa SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cnpj VARCHAR(20),
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    id_empresa INTEGER REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
	descricao TEXT,
    tipo CHAR(1),
	cor VARCHAR(20),
	icone VARCHAR(50),
	ativo BOOLEAN DEFAULT TRUE,
    id_empresa INTEGER REFERENCES empresas(id_empresa) ON DELETE CASCADE
);

CREATE TABLE subcategorias (
    id_subcategoria SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
	ativo BOOLEAN DEFAULT TRUE,
    id_categoria INTEGER REFERENCES categorias(id_categoria) ON DELETE CASCADE,
    id_empresa INTEGER REFERENCES empresas(id_empresa) ON DELETE CASCADE
);

  CREATE TABLE TRANSACOES(
  id_transacao SERIAL PRIMARY KEY,
  valor NUMERIC(12,2) NOT NULL,
  descricao TEXT,
  data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_vencimento DATE,
  data_pagamento DATE,
  tipo CHAR(1),
  id_subcategoria INT,
  Id_categoria INT,
  FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
  FOREIGN KEY (id_subcategoria) REFERENCES subcategorias(id_subcategoria)
  );