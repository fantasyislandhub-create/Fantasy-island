const express = require('express');
const router = express.Router();
const { createBooking, getBookings, getBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Admin-only: list all bookings
router.get('/', protect, getBookings);

// Public: guests create, view, update, and cancel their own booking by ID
router.post('/', createBooking);
router.get('/:id', getBooking);
router.patch('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router;
