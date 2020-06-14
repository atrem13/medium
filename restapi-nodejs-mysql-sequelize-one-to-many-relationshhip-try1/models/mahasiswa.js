'use strict';
module.exports = (sequelize, DataTypes) => {
  const mahasiswa = sequelize.define('mahasiswa', {
    nama: DataTypes.STRING,
    prodi_id: DataTypes.INTEGER
  }, {
    tableName: 'mahasiswas'
  });
  mahasiswa.associate = function(models) {
    // script dibawah ini artinya kita membuat model mahasiswa ber-relasi dengan model prodi. status model mahasiswa disini adalah belongsTo yang artinya data prodi_id itu berasal dari model prodi dan dihubungkan melalui mahasiswa.prodi_id = prodi.id
    // kemudian kalau kita inisialisasi data prodi_id tersebut dengan nama field prodi
    mahasiswa.belongsTo(models.prodi, {
      foreignKey: 'prodi_id',
      as: 'prodi'
    });
  };
  return mahasiswa;
};