const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  HostelBookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'HostelBooking', required: true },
  paymentAmount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
  remarks: { type: String }
});

module.exports = mongoose.model('Payment', paymentSchema);
