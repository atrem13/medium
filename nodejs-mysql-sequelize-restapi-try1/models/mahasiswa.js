'use strict';
module.exports = (sequelize, DataTypes) => {
  // mendefinisikan model dengan nama mahasiswa
  const mahasiswa = sequelize.define('mahasiswa', {
    // definisi atribut dari model mahasiswa
    nama: DataTypes.STRING,
    prodi: DataTypes.STRING
  }, {
    // tambahin kode ini untuk ngasi tau sequelize kalau ini merupakan model dari tabel mahasiswas
    // kenapa mahasiswas? karena dalam bahasa inggris itu menandakan bahwa ini dari tabel ini bersifat prural(lebih dari satu)
    tableName: 'mahasiswas'
  });
  // bagian ini kalau mau bikin relational database, untuk sekarang biarin dulu
  mahasiswa.associate = function(models) {
    // associations can be defined here
  };
  return mahasiswa;
};