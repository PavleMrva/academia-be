const {BaseError} = require('../../common');

class SubscriptionEndDateInvalid extends BaseError {
  constructor() {
    super(422, 'invalid_subscription_end_date',
      'Subscription end date cannot be earlier than subscription start date');
  }
}

class UserSubscriptionNotFound extends BaseError {
  constructor(userId, courseId) {
    super(422, 'subscription_not_found',
      `User ${userId} is not subscribed to course ${courseId}`);
  }
}

module.exports = {
  SubscriptionEndDateInvalid,
  UserSubscriptionNotFound,
};
