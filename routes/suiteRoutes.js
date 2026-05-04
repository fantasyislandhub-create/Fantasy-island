const express = require('express');
const router = express.Router();
const { getSuites, createSuite, updateSuite, deleteSuite } = require('../controllers/suiteController');
const upload = require('../middleware/upload');

const cpUpload = upload.fields([
  { name: 'img', maxCount: 1 },
  { name: 'gallery', maxCount: 6 }
]);

router.route('/')
  .get(getSuites)
  .post(cpUpload, createSuite);

router.route('/:id')
  .patch(cpUpload, updateSuite)
  .delete(deleteSuite);

module.exports = router;
