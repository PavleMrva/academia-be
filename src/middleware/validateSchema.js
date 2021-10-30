const {validationResult} = require('express-validator');
const {v4: uuid} = require('uuid');

module.exports = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      info: {
        success: false,
        resultCode: 'SchemaValidationError',
        id: uuid(),
      },
      errors: errors.array(),
    });
  };
};
