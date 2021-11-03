const {BaseError} = require('../../common');

class PasswordValidationError extends BaseError {
  constructor() {
    super(422, 'invalid_password_format',
      'Password must be word between 8 and 16 characters which is composed of at least one number, one symbol and one uppercase letter. Also, it mustn\'t be in the database of too simple passwords');
  }
}

class UserWithUsernameNotFound extends BaseError {
  constructor(username) {
    super(404, 'user_not_found', `User with username "${username}" not found`);
  }
}

class UserWithEmailNotFound extends BaseError {
  constructor(email) {
    super(404, 'user_not_found', `User with email "${email}" not found`);
  }
}

class UserTypeWithUsernameNotFound extends BaseError {
  constructor(type, username) {
    super(404, 'user_by_type_not_found', `User of type ${type} with username ${username} not found`);
  }
}

class UserPasswordIncorrect extends BaseError {
  constructor() {
    super(400, 'user_password_incorrect', 'User password is incorrect');
  }
}

class UsernameAlreadyInUse extends BaseError {
  constructor(username) {
    super(400, 'username_in_use', `Username ${username} already in use`);
  }
}

class UsernameCannotBeEmpty extends BaseError {
  constructor(username) {
    super(400, 'username_empty', 'Username cannot be empty');
  }
}

class EmailInUse extends BaseError {
  constructor(email) {
    super(400, 'username_in_use', `Email ${email} already in use`);
  }
}

class EmailCannotBeEmpty extends BaseError {
  constructor() {
    super(400, 'email_empty', 'Email cannot be empty');
  }
}

class UserTypeNotValid extends BaseError {
  constructor(type) {
    super(400, 'user_type_not_valid', `User type ${type} is invalid`);
  }
}

module.exports = {
  PasswordValidationError,
  UserWithUsernameNotFound,
  UserWithEmailNotFound,
  UserTypeWithUsernameNotFound,
  UserPasswordIncorrect,
  UsernameAlreadyInUse,
  UsernameCannotBeEmpty,
  EmailInUse,
  EmailCannotBeEmpty,
  UserTypeNotValid,
};
