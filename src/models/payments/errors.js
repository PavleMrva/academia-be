const {BaseError} = require('../../common');

class AmountIsNotGreaterThanZero extends BaseError {
  constructor() {
    super(422, 'invalid_payment_amount',
      'Payment amount has to be greater than zero');
  }
}

class ReceiptNumberNotUUID extends BaseError {
  constructor() {
    super(422, 'invalid_receipt_number',
      'Receipt number has to be UUID v4 value');
  }
}

class PaymentNotFound extends BaseError {
  constructor(id) {
    super(404, 'payment_not_found',
      `Payment with id ${id} not found`);
  }
}

module.exports = {
  AmountIsNotGreaterThanZero,
  ReceiptNumberNotUUID,
  PaymentNotFound,
};
