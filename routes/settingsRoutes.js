const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

// Public: guests need payment details (bank, bitcoin, paypal client id)
router.get('/', getSettings);

// Admin-only: update settings
router.post('/', protect, updateSettings);

module.exports = router;
