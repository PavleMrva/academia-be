class BaseError extends Error {
  constructor(statusCode, name, message, data = null) {
    super();
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
    this.data = data;
  }
}

module.exports = {
  BaseError,
};
