// disini kita akan mengeksport route berikut
module.exports = app => {
  // include file customer.controller.js agar kita bisa meminta server menjalankan fungsi dari file ini ketika client mengakses route / melakukan request tertentu
  const customers = require("../controllers/customer.controller.js");

  // saat client mengakses route /customers dengan method post maka server akan memanggil fungsi create pada file customer.controller.js. dimana controller akan menjalankan fungsi untuk menambahkan data baru ke tabel customers pada database
  app.post("/customers", customers.create);

  // saat client mengakses route /customers dengan method get maka server akan memanggil fungsi findAll pada file customer.controller.js. dimana controller akan menjalankan fungsi untuk mengambil/menampilkan seluruh data customer pada database 
  app.get("/customers", customers.findAll);

  // saat client mengakses route /customers/:customerId(:customerId merupakan parameter route) dengan method get maka server akan memanggil fungsi findOne pada file customer.controller.js dimana fungsi ini akan mengambil/menampilkan data customer pada database berdasarkan id (id ditentukan dengan parameter yang diberikan, misal /customers/2 artinya memberikan parameter '2' kemudian mencari data customer dengan id 2)
  app.get("/customers/:customerId", customers.findOne);

  // saat client mengakses route /customers/:customerId(:customerId merupakan parameter route) dengan method put maka server akan memanggil fungsi update pada file customer.controller.js dimana fungsi ini akan mengupdate data customer pada database berdasarkan id
  app.put("/customers/:customerId", customers.update);

  // saat client mengakses route /customers/:customerId(:customerId merupakan parameter route) dengan method delete maka server akan memanggil fungsi delete pada file customer.controller.js dimana fungsi ini akan mengupdate data customer pada database berdasarkan id
  app.delete("/customers/:customerId", customers.delete);

};