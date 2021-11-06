const {BaseError} = require('../../common');

class LanguageDoesNotExist extends BaseError {
  constructor() {
    super(422, 'invalid_course_language',
      'Course language is not valid');
  }
}

module.exports = {
  LanguageDoesNotExist,
};
