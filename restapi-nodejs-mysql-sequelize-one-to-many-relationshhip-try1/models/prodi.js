'use strict';
module.exports = (sequelize, DataTypes) => {
  const prodi = sequelize.define('prodi', {
    nama: DataTypes.STRING
  }, {
    tableName:'prodis'
  });
  prodi.associate = function(models) {
    // script dibawah ini artinya kita membuat model prodi ber-relasi dengan model mahasiswa. status model prodi disini adalah hasMany yang artinya data prodi itu dimiliki oleh banyak data mahasiswa dan dihubungkan melalui mahasiswa.prodi_id = prodi.id
    // kemudian kita juga bisa mengambil data mahasiswa yang sudah ter-relasi tadi melalui column 'mahasiswas' yang kita deklarasikan dibawah ini
    prodi.hasMany(models.mahasiswa, {
      foreignKey: 'prodi_id',
      as: 'mahasiswas'
    });
  };
  return prodi;
};