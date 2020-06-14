// import model mahasiswa dari models/index (semua file di folder models bisa kita akses melalui models/index)
const {mahasiswa, Sequelize } = require('../models/index');
// import fungsi rs dan re agar kita tidak perlu menulis hasil response untuk tiap function di controller
const {rs, re} = require('./function/rr_function');

// self ini nantinya akan kita export, kita buat berupa variable objek yang akan berisi fungsi untuk manipulasi database mahasiswa
let self = {};

// fungsi untuk create new data ke tabel mahasiswa
self.save = (req, res) => {
  // new data berisi input yang didapat dari req.body
  mahasiswa.create(req.body).then((data) => {
    // kalau input sukses maka akan memberi menjalankan fungsi rs
    if(data){
      rs(res, data);
    }
    // kalau gagal atau terjadi error akan menjalankan fungsi re
    else{
      re(res, false, 400, 'create fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};

// fungsi untuk mengambil seluruh data dari tabel mahasiswa
self.getAll = (req, res) => {
  // disini kita mengambil semua data tapi persyaratan / kondisi tertentu, kita bisa saja mengisikan kondisi nya tapi kalian bisa explore atau tanyakan di kolom komentar kalau ingin tau lebih lanjut
  // kita juga meng-include column prodi yang artinya kita memanggil relasi one to many antara mahasiswa dan prodi. data prodi bisa kita akses dalam json nantinya dengan key prodi 
  mahasiswa.findAll(
    {
      include: [
        'prodi'
      ]
    }
  ).then((data) => {
    // kalau kita berhasil mendapatkan data / database tidak kosong maka akan menjalankan fungsi rs kalau sebaliknya maka akan menjalankan fungsi re
    if(data.length > 0){
      rs(res, data);
    }else{
      re(res, false, 404, 'database empty');
    }
  }).catch((err) => {
    re(res, err);
  });
};

// fungsi untuk mengambil data berdasarkan id dari tabel mahasiswa
self.get = (req, res) => {
  // ini merupakan salah satu penerapan pengambilan data dengan perkondisian
  // kita juga meng-include column prodi yang artinya kita memanggil relasi one to many antara mahasiswa dan prodi. data prodi bisa kita akses dalam json nantinya dengan key prodi
  mahasiswa.findOne({
    include: [
      'prodi'
    ],
    where:{
      id: req.params.mahasiswaId
    }
  }).then((data) => {
    // kalau kita berhasil mendapatkan data maka akan menjalankan fungsi rs kalau sebaliknya maka akan menjalankan fungsi re
    if(data){
      rs(res, data);
    }else{
      re(res, false, 404, 'id doesnt exist');
    }
  }).catch((err) => {
    re(res, err);
  });
};

// fungsi untuk mengupdate data mahasiswa berdasarkan id
self.update = (req, res) => {
  mahasiswa.update(req.body, {
    where:{
      id: req.params.mahasiswaId
    }
  }).then((data) => {
    // kalau kita berhasil mengupdate data maka akan menjalankan fungsi rs kalau sebaliknya maka akan menjalankan fungsi re
    if(data){
      rs(res, data);
    }else{
      re(res, false, 400, 'update fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};

// fungsi untuk menghapus data mahasiswa berdasarkan id
self.delete = (req, res) => {
  mahasiswa.destroy({
    where:{
      id: req.params.mahasiswaId
    }
  }).then((data) => {
    // kalau kita berhasil menghapus data maka akan menjalankan fungsi rs kalau sebaliknya maka akan menjalankan fungsi re
    if(data){
      rs(res, data);
    }else{
      re(res, false, 400, 'delete fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};

// disini kita export semua fungsi diatas agar kita bisa panggil di routes nantinya
module.exports = self;