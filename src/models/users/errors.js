class AuthError extends Error {
  constructor(statusCode, name, message, data = null) {
    super();
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
    this.data = data;
  }
}

class PasswordValidationError extends AuthError {
  constructor() {
    super(422, 'invalid_password_format',
      'Password must be word between 8 and 16 characters which is composed of at least one number, one symbol and one uppercase letter. Also, it mustn\'t be in the database of too simple passwords');
  }
}

class UserWithUsernameNotFound extends AuthError {
  constructor(username) {
    super(404, 'user_not_found', `User with username "${username}" not found`);
  }
}

class UserWithEmailNotFound extends AuthError {
  constructor(email) {
    super(404, 'user_not_found', `User with email "${email}" not found`);
  }
}

class UserTypeWithUsernameNotFound extends AuthError {
  constructor(type, username) {
    super(404, 'user_not_found', `User of type ${type} with username ${username} not found`);
  }
}

class UserPasswordIncorrect extends AuthError {
  constructor() {
    super(400, 'user_password_incorrect', 'User password is incorrect');
  }
}

class UsernameAlreadyInUse extends AuthError {
  constructor(username) {
    super(400, 'username_in_use', `Username ${username} already in use`);
  }
}

class UsernameCannotBeEmpty extends AuthError {
  constructor(username) {
    super(400, 'username_empty', 'Username cannot be empty');
  }
}

class EmailInUse extends AuthError {
  constructor(email) {
    super(400, 'username_in_use', `Email ${email} already in use`);
  }
}

class EmailCannotBeEmpty extends AuthError {
  constructor() {
    super(400, 'email_empty', 'Email cannot be empty');
  }
}

module.exports = {
  AuthError,
  PasswordValidationError,
  UserWithUsernameNotFound,
  UserWithEmailNotFound,
  UserTypeWithUsernameNotFound,
  UserPasswordIncorrect,
  UsernameAlreadyInUse,
  UsernameCannotBeEmpty,
  EmailInUse,
  EmailCannotBeEmpty,
};
