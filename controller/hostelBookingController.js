const HostelBooking = require('../model/HostelBooking');
const path = require('path');
const fs = require('fs');
const payment = require('../model/payment');



// Create a new hostel booking
exports.createBooking = async (req, res) => {
  try {
    const { fullName, email, phone, checkInDate, gender, frontIdProof, backIdProof, paymentMethod, advanceAmount, rentAmount, specialRequests,checkOutDate } = req.body;
    if (frontIdProof) {
      const frontIdData = frontIdProof.split(';base64,').pop(); // Extract Base64 data
      fs.writeFile('uploads/frontIdProof.png', frontIdData, { encoding: 'base64' }, (err) => {
        if (err) {
          console.error('Error saving front ID proof:', err);
        } else {
          console.log('Front ID proof saved successfully');
        }
      });
    }
  
    if (backIdProof) {
      const backIdData = backIdProof.split(';base64,').pop(); // Extract Base64 data
      fs.writeFile('uploads/backIdProof.png', backIdData, { encoding: 'base64' }, (err) => {
        if (err) {
          console.error('Error saving back ID proof:', err);
        } else {
          console.log('Back ID proof saved successfully');
        }
      });
    }
  
    const booking = new HostelBooking({
      fullName,
      email,
      phone,
      checkInDate,
      checkOutDate,
      gender,
      frontIdProof,
      backIdProof,
      paymentMethod,
      advanceAmount,
      rentAmount,
      specialRequests
    });


    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await HostelBooking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

exports.getBookingById = async (req, res) => {
  const { bookingId } = req.params;
  console.log('Booking ID:', bookingId); // Log to check if the bookingId is passed correctly

  try {
    const booking = await HostelBooking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error); // Log the actual error
    res.status(500).json({ message: 'Error fetching booking details', error });
  }
};


// Update booking
exports.updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const updatedData = req.body;

  try {
    const updatedBooking = await HostelBooking.findByIdAndUpdate(bookingId, updatedData, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error });
  }
};


exports. deleteBooking = async (req, res) => {
  try {
    const { id } = req.params; // Get booking ID from URL params

    // Find and delete the booking by its ID
    const booking = await HostelBooking.findByIdAndDelete(id);

    // If no booking is found
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};





// Controller to find missing HostelBookingId in the Payment table
exports.findMissingBookings = async (req, res) => {
  try {
    // Fetch all HostelBooking IDs with full details
    const hostelBookings = await HostelBooking.find({});

    // Fetch all HostelBookingIds from the Payment table
    const paymentBookings = await payment.find({}, 'HostelBookingId');

    // Extract HostelBookingId from payment data
    const paymentBookingIds = paymentBookings.map(payment => payment.HostelBookingId.toString());

    // Find HostelBooking documents that do not have a matching HostelBookingId in the Payment table
    const missingBookings = hostelBookings.filter(hostel => 
      !paymentBookingIds.includes(hostel._id.toString())
    );

    // Return the full details of the missing HostelBookings
    res.status(200).json({
      success: true,
      message: 'Missing HostelBooking details from Payment table',
      missingBookings, // Full details are returned
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching missing bookings',
      error: error.message,
    });
  }
};
