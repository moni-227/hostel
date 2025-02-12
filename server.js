const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


server.use(express.json({ limit: '10mb' }));  // Increase the limit as needed (e.g., '10mb')

// If you're using urlencoded data, you can increase the limit there too:
server.use(express.urlencoded({ limit: '10mb', extended: true }));


// Importing routes
const authRoutes = require('./route/userRoutes');
// Import routes
const hostelBookingRoutes = require('./route/hostelBookingRoutes');
const paymentRoutes = require('./route/paymentRoutes');
const dashboardRoutes = require('./route/dashboardRoutes');




server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

// Connect to MongoDB
const url = 'mongodb://127.0.0.1:27017/mmbcomplex';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected............");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Use routes
server.use('/api/auth', authRoutes);
server.use('/api', hostelBookingRoutes);
server.use('/api/payments', paymentRoutes);
server.use('/api', dashboardRoutes);  // Make the route available



// Start server
server.listen(3000, function () {
    console.log("Server started on port 3000...");
});
