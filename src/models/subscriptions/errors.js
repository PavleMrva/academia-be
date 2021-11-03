const {BaseError} = require('../../common');

class SubcriptionEndDateInvalid extends BaseError {
  constructor() {
    super(422, 'invalid_subscription_end_date',
      'Subscription end date cannot be earlier than subscription start date');
  }
}

module.exports = {
  SubcriptionEndDateInvalid,
};
