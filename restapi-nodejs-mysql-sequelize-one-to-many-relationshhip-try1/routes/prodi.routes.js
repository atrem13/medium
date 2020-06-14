module.exports = (app, express) => {
  let router = express.Router();
  const controller = require('../controllers/prodi.controller');
  router.get('/', controller.getAll);
  router.post('/', controller.save);
  router.get('/get/:prodiId', controller.get);
  router.put('/update/:prodiId', controller.update);
  router.delete('/delete/:prodiId', controller.delete);

  app.use('/api/prodi/', router);
}