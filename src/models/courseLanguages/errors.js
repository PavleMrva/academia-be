const {BaseError} = require('../../common');

class LanguageDoesNotExist extends BaseError {
  constructor(language) {
    super(404, 'language_not_found',
      `Course language ${language} not found`);
  }
}

module.exports = {
  LanguageDoesNotExist,
};
