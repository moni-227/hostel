const express = require('express');
const { login ,user} = require('../controller/UserController');
const router = express.Router();

// POST login route
router.get('/login', login);
router.get('/', user);  // Use user controller for root route

module.exports = router;
