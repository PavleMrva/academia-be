const {Iyzipay} = require('../../external');

const getSubscriptions = async (req, res) => {
  const result = await Iyzipay.executePayment();
  res.success(result);
};

module.exports = {
  getSubscriptions,
};
