// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const getDashboardData  = require('../controller/dashboardController');

router.get('/dashboard', getDashboardData.getDashboardData);
router.get('/getRentAndAdvanceData', getDashboardData.getRentAndAdvanceData);


module.exports = router;
