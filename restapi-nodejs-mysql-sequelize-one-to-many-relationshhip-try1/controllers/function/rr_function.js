// fungsi untuk memberikan respon ketika proses sukses
rs = (res, data) => {
  return res.status(200).json({
    status: 'ok',
    data: data
  });
};

// fungsi untuk memberikan respon ketika proses gagal
re = (res, err, code, action = '') => {
  let err_code = code | 500;
  let error = err | action;
  return res.status(err_code).json({
    status: 'error',
    error: 'occur error: ' + error
  });
};

// export semua fungsi diatas
module.exports = {rs, re};