const router = require('express').Router();
const paymentsController = require('../../controllers/payments');

router.post('/:courseId/payment', paymentsController.executePayment);
router.post('/:paymentId/cancel', paymentsController.cancelPayment);

module.exports = router;
