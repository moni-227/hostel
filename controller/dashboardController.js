// controllers/dashboardController.js
const HostelBooking = require('../model/HostelBooking');
const Payment = require('../model/payment');

exports.getDashboardData = async (req, res) => {
  try {
    // Aggregate data for chart (e.g., number of bookings and payments over time)
    const bookingsData = await HostelBooking.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$checkInDate" } },
          totalBookings: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Sort by date ascending
    ]);

    const paymentsData = await Payment.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$paymentDate" } },
          totalPayments: { $sum: "$paymentAmount" }
        }
      },
      { $sort: { _id: 1 } } // Sort by date ascending
    ]);

    // Send the aggregated data
    res.json({ bookingsData, paymentsData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
exports.getRentAndAdvanceData = async (req, res) => {
  try {
    const rentAndAdvanceData = await HostelBooking.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$checkInDate" } },
          totalRent: { $sum: "$rentAmount" },
          totalAdvance: { $sum: "$advanceAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ rentAndAdvanceData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};