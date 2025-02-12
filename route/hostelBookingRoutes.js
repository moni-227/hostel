const express = require('express');
const router = express.Router();
const hostelBookingController = require('../controller/hostelBookingController');

// Route to create a new booking
router.post('/book', hostelBookingController.createBooking);

// Route to get all bookings
router.get('/bookings', hostelBookingController.getBookings);

router.get('/booking/:bookingId', hostelBookingController.getBookingById);

// Route to update booking details
router.put('/booking/:bookingId', hostelBookingController.updateBooking);
router.delete('/booking/:id',hostelBookingController.deleteBooking);
router.get('/missing', hostelBookingController.findMissingBookings);



module.exports = router;
