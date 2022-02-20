const {BaseError} = require('../../common');

class AmountIsNotGreaterThanZero extends BaseError {
  constructor() {
    super(422, 'invalid_price_amount',
      'Course price amount has to be greater than zero');
  }
}

class CoursePriceNotFound extends BaseError {
  constructor(courseId, currency) {
    super(404, 'course_not_found',
      `Course price for course with id ${courseId} and with currency ${currency} not found`);
  }
}

module.exports = {
  AmountIsNotGreaterThanZero,
  CoursePriceNotFound,
};
