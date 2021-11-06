const {BaseError} = require('../../common');

class CourseGlobalIDNotUUID extends BaseError {
  constructor() {
    super(422, 'invalid_course_guid',
      'Course GUID has to be UUID v4 value');
  }
}

class CategoryDoesNotExist extends BaseError {
  constructor() {
    super(422, 'invalid_course_category',
      'Course category is not valid');
  }
}

class LanguageDoesNotExist extends BaseError {
  constructor() {
    super(422, 'invalid_course_language',
      'Course language is not valid');
  }
}

module.exports = {
  CourseGlobalIDNotUUID,
  CategoryDoesNotExist,
  LanguageDoesNotExist,
};
