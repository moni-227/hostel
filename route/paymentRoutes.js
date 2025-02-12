const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');

router.post('/', paymentController.addPayment);
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
