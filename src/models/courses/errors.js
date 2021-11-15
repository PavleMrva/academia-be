const {BaseError} = require('../../common');

class CourseNotFoundById extends BaseError {
  constructor(id) {
    super(404, 'course_not_found',
      `Course with id ${id} not found`);
  }
}

module.exports = {
  CourseNotFoundById,
};
