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

module.exports = {
  AmountIsNotGreaterThanZero,
  ReceiptNumberNotUUID,
};
