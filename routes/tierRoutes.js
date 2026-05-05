const express = require('express');
const router = express.Router();
const tierController = require('../controllers/tierController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', tierController.getAllTiers);
router.post('/', protect, tierController.createTier);
router.patch('/:id', protect, tierController.updateTier);
router.delete('/:id', protect, tierController.deleteTier);

module.exports = router;
