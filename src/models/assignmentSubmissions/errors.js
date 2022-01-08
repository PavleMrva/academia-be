const {BaseError} = require('../../common');

class AssignmentAlreadySubmitted extends BaseError {
  constructor(studentId, assignmentId) {
    super(404, 'assignment_already_submitted', `Student "${studentId}" already submitted assignment "${assignmentId}"`);
  }
}

module.exports = {
  AssignmentAlreadySubmitted,
};
