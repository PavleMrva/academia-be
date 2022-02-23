const {BaseError} = require('../../common');

class CommentNotFound extends BaseError {
  constructor(commentId) {
    super(404, 'comment_not_found',
      `Comment with id ${commentId} not found`);
  }
}

module.exports = {
  CommentNotFound,
};
