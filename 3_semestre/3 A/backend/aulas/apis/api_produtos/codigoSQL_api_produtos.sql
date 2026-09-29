-- CRIAÇÃO DAS TABELAS
CREATE TABLE USUARIOS(
id_usuario SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL
);

CREATE TABLE PRODUTOS(
id_produto SERIAL PRIMARY KEY,
nome VARCHAR(150) NOT NULL,
preco FLOAT NOT NULL,
categoria VARCHAR(150) NOT NULL, 
link_imagem VARCHAR(500) NOT NULL,
link_produto VARCHAR(500) NOT NULL,
frete BOOLEAN NOT NULL
);


-- INSERÇÃO DE DADOS NAS TABELAS
INSERT INTO USUARIOS(nome, email, senha) VALUES 
('Bárbara Féo', 'barbara.feo@email.com', 'senha123'),
('Livia Maria', 'livia.maria@email.com', 'senha1234')


INSERT INTO PRODUTOS(preco, categoria, link_imagem, link_produto, frete, nome) VALUES 
(178.90, 'Brinquedos', 'efhefefe', 'efuejfewf', true, 'Barbie Bailarina Borboleta')
INSERT INTO PRODUTOS(preco, categoria, link_imagem, link_produto, frete, nome) VALUES 
(159.99, 'Brinquedos', 'efhesffefe', 'efuejfefewf', false, 'Barbie Sereia')

