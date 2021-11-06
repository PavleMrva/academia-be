const {BaseError} = require('../../common');

class CategoryDoesNotExist extends BaseError {
  constructor() {
    super(422, 'invalid_course_category',
      'Course category is not valid');
  }
}

module.exports = {
  CategoryDoesNotExist,
};
