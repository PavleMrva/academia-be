const paymentsService = require('../../services/payments');

const executePayment = async (req, res) => {
  const {user: {userId}} = req;
  const {courseId} = req.params;
  const {paymentDetails} = req.body;

  const result = await paymentsService.executePayment(courseId, userId, paymentDetails);
  return res.success(result);
};

const cancelPayment = async (req, res) => {
  const {paymentId} = req.params;
  const result = await paymentsService.cancelPayment(paymentId);
  return res.success(result);
};

module.exports = {
  executePayment,
  cancelPayment,
};
