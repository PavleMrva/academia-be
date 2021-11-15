const {BaseError} = require('../../common');

class LectureNotFoundById extends BaseError {
  constructor(id) {
    super(404, 'lecture_not_found',
      `Lecture with id ${id} not found`);
  }
}

module.exports = {
  LectureNotFoundById,
};
