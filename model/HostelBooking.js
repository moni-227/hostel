const mongoose = require('mongoose');

const hostelBookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate:{type: Date, required: false },
  gender: { type: String, required: false },
  frontIdProof: { type: String, required: false },
  backIdProof: { type: String, required: false },
  paymentMethod: { type: String, required: false },
  advanceAmount: { type: Number, required: true },
  rentAmount: { type: Number, required: true },
  specialRequests: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('HostelBooking', hostelBookingSchema);
