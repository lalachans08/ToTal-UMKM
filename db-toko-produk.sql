CREATE DATABASE produk;
USE produk;

CREATE TABLE Toko (
    IDToko INT PRIMARY KEY,
    NamaToko VARCHAR(255),
    AlamatToko VARCHAR(255)
);

CREATE TABLE Produk (
    IDProduk INT PRIMARY KEY,
    NamaProduk VARCHAR(255),
    GambarProduk VARCHAR(255),
    DeskripsiProduk TEXT,
    IDToko INT,
    RatingProduk FLOAT,
    FOREIGN KEY (IDToko) REFERENCES Toko(IDToko)
);