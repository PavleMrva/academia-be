const {v4: uuid} = require('uuid');
const {UsersModel} = require('../models/users');
const config = require('../config');

module.exports = (err, req, res, next) => {
  const stack = config.prod ? {} : {stack: err.stack.split('\n')};

  if (err instanceof UsersModel.Errors.AuthError) {
    return res.status(err.statusCode).json({
      info: {
        success: false,
        resultCode: err.name,
        message: err.message,
        id: uuid(),
      },
      ...stack,
    });
  }

  res.status(500).json({
    info: {
      success: false,
      resultCode: 'internal_server_error',
      message: 'Internal server error',
      id: uuid(),
    },
    ...stack,
  });
};
