// kita include file db.js yang berisi koneksi ke database kita
const sql = require("./db.js");

// constructor
// berfungsi untuk mendifinisikan table customer itu memiliki column apa saja untuk diisi
const Customer = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

// selain mendefinisikan column dari tabel customer, kita juga tambahkan fungsi untuk melakukan CRUD terhadap tabel customers
// fungsi untuk menambah data custumer baru
Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    // cek apakah terjadi error saat menambahkan data
    if (err) {
      // kalau error akan memberikan response error apa yang terjadi
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // jika tidak ada error akan memberikan response data yang berhasil dimasukan
    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

// fungsi untuk mengambil data customer berdasarkan id
Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    // cek apakah terjadi error saat menambahkan data
    if (err) {
      // kalau error akan memberikan response error apa yang terjadi
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // kalau ada data yang berhasil diupdate maka akan memberi response data yang dicari berdasarkan id
    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // kalau tidak menemukan data customer dengan id yang dimaksud maka akan diberi response pemberitahuan data tidak ditemukan
    result({ kind: "not_found" }, null);
  });
};

// fungsi untuk mengambil data dari semua customer
Customer.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    // cek apakah terjadi error saat menambahkan data
    if (err) {
      // kalau error akan memberikan response error apa yang terjadi
      console.log("error: ", err);
      result(null, err);
      return;
    }
    // kalau tidak ada error akan memberi response list data customer yang ada
    console.log("customers: ", res);
    result(null, res);
  });
};

// fungsi untuk mengupdate data customer berdasarkan id
Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      // cek apakah terjadi error saat menambahkan data
      if (err) {
        // kalau error akan memberikan response error apa yang terjadi
        console.log("error: ", err);
        result(null, err);
        return;
      }

      // cek apakah tidak ada data yang terupdate
      if (res.affectedRows == 0) {
        // akan memberikan response pemberitahuan bahwa data dengan id yang dimaksud tidak ada
        result({ kind: "not_found" }, null);
        return;
      }

      // kalau tidak ada error maka akan memberi response dari data yang baru diupdate
      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

// fungsi untuk menghapus customer dari tabel berdasarkan id
Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
      // cek apakah terjadi error saat menambahkan data
      if (err) {
      // kalau error akan memberikan response error apa yang terjadi
      console.log("error: ", err);
      result(null, err);
      return;
    }
    // cek apakah tidak ada data yang terhapus
    if (res.affectedRows == 0) {
      // akan memberikan response pemberitahuan bahwa data dengan id yang dimaksud tidak ada
      result({ kind: "not_found" }, null);
      return;
    }
    // kalau tidak ada error maka akan memberi response pemberitahuan id data yang baru dihapus
    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

// terakhir kita exports model Customer yang berisi struktur tabel dan semua fungsi diatas untuk melakukan crud customers
module.exports = Customer;