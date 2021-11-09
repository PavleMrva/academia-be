const {BaseError} = require('../../common');

class CourseDoesNotExist extends BaseError {
  constructor(name) {
    super(404, 'course_not_found',
      `Course with name ${name} not found`);
  }
}

module.exports = {
  CourseDoesNotExist,
};
