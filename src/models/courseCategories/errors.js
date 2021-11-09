const {BaseError} = require('../../common');

class CategoryDoesNotExist extends BaseError {
  constructor(category) {
    super(404, 'category_not_found',
      `Course category ${category} not valid`);
  }
}

module.exports = {
  CategoryDoesNotExist,
};
