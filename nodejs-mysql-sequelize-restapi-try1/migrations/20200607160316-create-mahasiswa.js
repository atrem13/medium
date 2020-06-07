'use strict';
module.exports = {
  // fungsi dijalankan ketika migrate dilakukan
  up: (queryInterface, Sequelize) => {
    // disini kalian bisa liat alasan kalian mendefinisikan nama tabel menjadi mahasiswas, karena secara otomatis dibuat prural oleh sequelize, tapi kalau mau ganti ya silahkan. kusaranin jangan sih biar kita ikutin rule codingnya
    return queryInterface.createTable('mahasiswas', { //definisi nama tabel
      // definisi kolom pada tabel
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      prodi: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  // fungsi dijalankan ketika migrate dibatalkan
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('mahasiswas');
  }
};