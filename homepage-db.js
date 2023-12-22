const mysql = require("mysql");

// Konfigurasi koneksi ke database
const connection = mysql.createConnection({
  host: "localhost",
  user: "username", // Ganti dengan username database Anda
  password: "password", // Ganti dengan password database Anda
  database: "nama_database", // Ganti dengan nama database yang telah Anda buat
});

// Membuka koneksi ke database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database");
});

// CREATE: Menambahkan data ke tabel Toko
const tambahToko = (dataToko) => {
  const query = "INSERT INTO Toko SET ?";

  connection.query(query, dataToko, (err, results) => {
    if (err) throw err;
    console.log("Toko ditambahkan, ID: ", results.insertId);
  });
};

// READ: Mengambil data dari tabel Toko
const ambilSemuaToko = () => {
  const query = "SELECT * FROM Toko";

  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log("Data Toko:");
    console.log(results);
  });
};

// UPDATE: Mengubah data pada tabel Toko
const ubahToko = (idToko, dataBaru) => {
  const query = "UPDATE Toko SET ? WHERE IDToko = ?";

  connection.query(query, [dataBaru, idToko], (err, results) => {
    if (err) throw err;
    console.log("Toko diubah, ID: ", idToko);
  });
};

// DELETE: Menghapus data dari tabel Toko
const hapusToko = (idToko) => {
  const query = "DELETE FROM Toko WHERE IDToko = ?";

  connection.query(query, idToko, (err, results) => {
    if (err) throw err;
    console.log("Toko dihapus, ID: ", idToko);
  });
};

// Menutup koneksi ke database
const tutupKoneksi = () => {
  connection.end((err) => {
    if (err) {
      console.error("Error closing database connection: ", err);
      return;
    }
    console.log("Connection closed");
  });
};

// Contoh penggunaan fungsi CRUD
const dataTokoBaru = {
  NamaToko: "Toko Baru",
  AlamatToko: "Jalan Baru No. 1",
};

// CREATE
tambahToko(dataTokoBaru);

// READ
ambilSemuaToko();

// UPDATE (misalnya, mengubah alamat toko dengan ID 1)
const idTokoUntukDiubah = 1;
const dataBaruToko = {
  AlamatToko: "Jalan Update No. 123",
};
ubahToko(idTokoUntukDiubah, dataBaruToko);

// READ setelah UPDATE
ambilSemuaToko();

// DELETE (misalnya, menghapus toko dengan ID 2)
const idTokoUntukDihapus = 2;
hapusToko(idTokoUntukDihapus);

// READ setelah DELETE
ambilSemuaToko();

// Menutup koneksi setelah operasi CRUD
tutupKoneksi();
