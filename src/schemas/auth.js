const {UsersModel} = require('../models/users');

const loginSchema = {
  username: {
    custom: {
      options: (value) => {
        return UsersModel.findOne({
          where: {username: value},
        }).then((user) => {
          if (!user) {
            throw new UsersModel.Errors.UserWithUsernameNotFound(value);
          }
        });
      },
    },
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      // Multiple options would be expressed as an array
      options: {min: 8},
    },
  },
};

const registrationSchema = {
  username: {
    custom: {
      options: (value) => {
        return UsersModel.findOne({
          where: {username: value},
        }).then((user) => {
          if (user) {
            throw new UsersModel.Errors.UsernameAlreadyInUse(value);
          }
        });
      },
    },
  },
  email: {
    custom: {
      options: (value) => {
        return UsersModel.findOne({
          where: {email: value},
        }).then((user) => {
          if (user) {
            throw new UsersModel.Errors.EmailInUse(value);
          }
        });
      },
    },
  },
};

module.exports = {
  loginSchema,
  registrationSchema,
};
