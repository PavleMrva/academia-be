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

class PaymentCannotBeCanceled extends BaseError {
  constructor(id) {
    super(422, 'payment_cannot_be_canceled',
      `Payment with id ${id} cannot be canceled`);
  }
}

module.exports = {
  AmountIsNotGreaterThanZero,
  ReceiptNumberNotUUID,
  PaymentNotFound,
  PaymentCannotBeCanceled,
};
