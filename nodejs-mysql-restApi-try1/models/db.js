// include mysql yang telah diinstall
const mysql = require("mysql");
// include data untuk konfigurasi database 
const dbConfig = require("../config/db.config.js");

// membuat koneksi ke database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// melakukan koneksi dan mengecek apakah terjadi error atau tidak
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;