module.exports = (app, express) => {
  let router = express.Router();
  const controller = require('../controllers/mahasiswa_controller');
  router.get('/', controller.getAll);
  router.post('/', controller.save);
  router.get('/get/:mahasiswaId', controller.get);
  router.put('/update/:mahasiswaId', controller.update);
  router.delete('/delete/:mahasiswaId', controller.delete);

  app.use('/api/mahasiswa/', router);
}