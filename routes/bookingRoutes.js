const express = require('express');
const router = express.Router();
const { createBooking, getBookings, getBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');

router.route('/').get(getBookings).post(createBooking);
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router;
