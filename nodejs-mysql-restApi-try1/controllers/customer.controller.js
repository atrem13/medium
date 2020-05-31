// kita include dulu file models/customer.model.js biar nanti kita bisa panggil fungsi dari file ini di controller
const Customer = require("../models/customer.model.js");

// menambahkan data customer baru
exports.create = (req, res) => {
  // validasi input 
  if (!req.body) {
    // mengirimkan response error jika input kosong
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // inisialisasi data untuk customer baru
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // menyimppan data customerbaru di database
  // bisa kalian perhatikan disini kita memanggil fungsi crerate pada file models/customer.model.js dan mengirim parameter kesana
  Customer.create(customer, (err, data) => {
    // cek apakah terjadi error atau tidak
    if (err)
      // mengirim response error jika terjadi error 
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    // kalau tidak ada error maka akan mengirim response data yang baru saja dimasukan ke database 
    else res.send(data);
  });
};

// mengambil data semua customer dari database
exports.findAll = (req, res) => {
  // bisa kalian perhatikan disini kita memanggil fungsi getAll pada file models/customer.model.js dan mengirim parameter kesana
  Customer.getAll((err, data) => {
    // cek apakah terjadi error atau tidak
    if (err)
      // mengirim response error jika terjadi error 
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    // kalau tidak ada error maka akan mengirim response data semua customer pada database 
    else res.send(data);
  });
};

// mengambil data seorang customer berdasarkan id
exports.findOne = (req, res) => {
  // bisa kalian perhatikan disini kita memanggil fungsi findById pada file models/customer.model.js dan mengirim parameter kesana
  Customer.findById(req.params.customerId, (err, data) => {
    // cek apakah terjadi error atau tidak
    if (err) {
      // disini kita cek error apa yang terjadi
      // cek apakah data dengan id yang dimaksud ada atau tidak. (aku yakin kalian yang baru belajar jadi agak bingung disini. coba baca ulang fungsi findById di file models/customer.model.js lalu pahami bagaimana dia berinteraksi disini)
      if (err.kind === "not_found") {
        // mengirim response error id yang dimaksud tidak ada 
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        // mengirim response error jika terjadi error selain error id tidak ditemukan 
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else {
      // kalau tidak ada error maka akan memberi response data dari customer dengan id yang dimaksud
      res.send(data);
    } 
  });
};

// update customer berdasarkan id
exports.update = (req, res) => {
  // validasi input
  if (!req.body) {
    // mengirim response error input kosong
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // bisa kalian perhatikan disini kita memanggil fungsi updateById pada file models/customer.model.js dan mengirim parameter kesana
  Customer.updateById(req.params.customerId, new Customer(req.body),
    (err, data) => {
      // cek apakah terjadi error
      if (err) {
        // cek jenis error
        if (err.kind === "not_found") {
          // mengirim response error id yang dimaksud tidak ada 
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          // mengirim response error selain error id tidak ditemukan 
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else {
        // kalau tidak ada error maka akan memberi response data hasil update dari customer dengan id yang dimaksud
        res.send(data);
      }
    }
  );
};

// delete customer berdasarkan id
exports.delete = (req, res) => {
  // bisa kalian perhatikan disini kita memanggil fungsi remove pada file models/customer.model.js dan mengirim parameter kesana
  Customer.remove(req.params.customerId, (err, data) => {
    // cek apakah terjadi error
    if (err) {
      // cek jenis error
      if (err.kind === "not_found") {
        // mengirim response error id yang dimaksud tidak ada 
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        // mengirim response error selain error id tidak ditemukan 
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customerId
        });
      }
    } else {
      // mengirim response pemberitahuan data berhasil customer dengan id yang dimaksud berhasil dihapus 
      res.send({ message: `Customer was deleted successfully!` });
    }
  });
};

// bisa kalian perhatikan semua fungsi diatas langsung kita export