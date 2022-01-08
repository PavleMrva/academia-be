const {BaseError} = require('../../common');

class StudentWithUserIdNotFound extends BaseError {
  constructor(userId) {
    super(404, 'student_not_found', `Student with userId "${userId}" not found`);
  }
}

module.exports = {
  StudentWithUserIdNotFound,
};
