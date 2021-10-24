class AuthError extends Error {
  constructor(statusCode, name, message, data=null) {
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

module.exports = {
  PasswordValidationError,
};
