CREATE DATABASE senaibattle;
\c senaibattle;
CREATE TABLE lutadoressenai (
    id SERIAL PRIMARY KEY ,
    nome VARCHAR(100) NOT NULL,
    classe VARCHAR(100) NOT NULL,
    vida INT NOT NULL,
    ataque INT NOT NULL,
    defesa INT NOT NULL,
    velocidade INT NOT NULL
);
CREATE TABLE campoDeBatalha (
    id SERIAL PRIMARY KEY,
    lutador1 INT NOT NULL,
    lutador2 INT NOT NULL,
    vencedor INT NOT NULL,
    campoID INT NOT NULL,
    FOREIGN KEY ( lutador1 ) REFERENCES lutadoressenai( id ),
    FOREIGN KEY ( lutador2 ) REFERENCES lutadoressenai( id ),
    FOREIGN KEY ( vencedor ) REFERENCES lutadoressenai( id ),
    FOREIGN KEY ( campoID ) REFERENCES tipoDoCampo( id )
);
CREATE TABLE tipoDoCampo (
    id SERIAL PRIMARY KEY,
    campoNome VARCHAR(100) NOT NULL,
    campoTipo VARCHAR(100) NOT NULL
);
INSERT INTO lutadoressenai (nome, classe, vida, ataque, defesa, velocidade) VALUES 
('Programador Senior', 'Programador', 50, 100, 60, 50),
('Mec Trincks', 'Mecanico', 100, 85, 70, 90),
('Eletrolux Demi', 'Eletricista', 90,80,10,50),
('AdmiSaulo', 'Administrador', 90, 85, 30, 40 ),
('Table Master', 'Excelers', 30, 50,10,10),
('Mbappe','Mecanico', 100, 85, 70, 90),
('Cabeça de brocolis', 'Eletricista', 90,80,10,50);
INSERT INTO tipoDoCampo (id, campoNome, campoTipo) VALUES 
(1 ,'Quadro de Forca', 'Eletrico'),
(2,'Tornos Divinos', 'Metal'),
(3 ,'Git Arena', 'Codigo'),
(4 ,'Arena Vendida', 'Adm'),
(5 ,'Table Arena', 'Excel');


