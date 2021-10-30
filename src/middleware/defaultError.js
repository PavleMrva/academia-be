const {v4: uuid} = require('uuid');
const {ValidationError} = require('sequelize');
const {UsersModel} = require('../models/users');
const config = require('../config');

module.exports = (err, req, res, next) => {
  const stack = config.prod ? {} : {stack: err.stack.split('\n')};

  if (err instanceof ValidationError) {
    const errors = err.errors.map((error) => ({
      value: error.value,
      param: error.path,
      msg: error.message,
    }));

    return res.status(400).json({
      info: {
        success: false,
        resultCode: err.name,
        id: uuid(),
      },
      errors,
    });
  }

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
