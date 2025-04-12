DROP DATABASE IF EXISTS libreria;
CREATE DATABASE IF NOT EXISTS libreria;
USE libreria;

CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(120) NOT NULL,
    autor VARCHAR(60) NOT NULL,
    categoria VARCHAR(60) NOT NULL,
    anyo INT(4) NOT NULL,
    paginas INT NOT NULL,
    precio DECIMAL(7, 2) NOT NULL,
    stock INT NOT NULL
);
