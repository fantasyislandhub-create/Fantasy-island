const express = require('express');
const router = express.Router();
const { getSuites, createSuite, updateSuite, deleteSuite } = require('../controllers/suiteController');
const upload = require('../middleware/upload');

const cpUpload = upload.fields([
  { name: 'img', maxCount: 1 },
  { name: 'gallery', maxCount: 6 }
]);

const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSuites)
  .post(protect, cpUpload, createSuite);

router.route('/:id')
  .patch(protect, cpUpload, updateSuite)
  .delete(protect, deleteSuite);

module.exports = router;
