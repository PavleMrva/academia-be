const {v4: uuid} = require('uuid');
const config = require('../config');

module.exports = (err, req, res, next) => {
  const stack = config.prod ? {} : {stack: err.stack.split('\n')};

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
