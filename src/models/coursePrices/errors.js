const {BaseError} = require('../../common');

class AmountIsNotGreaterThanZero extends BaseError {
  constructor() {
    super(422, 'invalid_price_amount',
      'Course price amount has to be greater than zero');
  }
}

module.exports = {
  AmountIsNotGreaterThanZero,
};
