const Payment = require('../model/payment');

// Add a new payment
const HostelBooking = require('../model/HostelBooking'); // Assuming you have a HostelBooking model

exports.addPayment = async (req, res) => {
  try {
    const { fullname, paymentAmount, paymentDate, paymentMethod, remarks } = req.body;

    // Find the HostelBookingId by the fullname
    const hostelBooking = await HostelBooking.findOne({ fullName: fullname });

    if (!hostelBooking) {
      return res.status(400).json({ message: 'Booking not found for the given full name' });
    }

    // Create the payment object
    const payment = new Payment({
      HostelBookingId: hostelBooking._id,  // Assign HostelBookingId
      paymentAmount,
      paymentDate,
      paymentMethod,
      remarks
    });

    await payment.save();
    res.status(201).json({ message: 'Payment added successfully', payment });
  } catch (error) {
    console.error('Error adding payment:', error);
    res.status(500).json({ message: 'Error adding payment', error });
  }
};
// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('HostelBookingId', 'fullName rentAmount advanceAmount') // Populate the HostelBookingId reference with fullName, rentAmount, and advanceAmount
      .exec();

    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Error fetching payments', error });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('HostelBookingId');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment', error });
  }
};

// Update payment
exports.updatePayment = async (req, res) => {
  try {
    const { paymentAmount, paymentDate, paymentMethod, remarks } = req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      { paymentAmount, paymentDate, paymentMethod, remarks },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment updated successfully', updatedPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment', error });
  }
};

// Delete payment
exports.deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);

    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment', error });
  }
};


