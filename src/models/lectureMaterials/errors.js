const {BaseError} = require('../../common');

class FileNotFoundByName extends BaseError {
  constructor(name, lectureId) {
    super(404, 'file_not_found',
      `File with name ${name}, for lecture with id ${lectureId}, not found`);
  }
}

module.exports = {
  FileNotFoundByName,
};
