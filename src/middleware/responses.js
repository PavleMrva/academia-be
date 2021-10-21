/* eslint-disable no-invalid-this */

const success = function(data) {
  this.status(200).json({
    info: {
      success: true,
      resultCode: 'success',
      message: 'success',
    },
    data,
  });
};

const error = function(statusCode, errorCode, message, data) {
  this.status(statusCode).json({
    info: {
      success: false,
      resultCode: errorCode,
      message: message ?? errorCode,
    },
    data,
  });
};

const badRequest = function(message = 'Bad request', data) {
  this.status(400).json({
    info: {
      success: false,
      resultCode: 'bad_request',
      message,
    },
    data,
  });
};

const forbidden = function(data) {
  this.status(403).json({
    info: {
      success: false,
      resultCode: 'forbidden',
      message: 'Forbidden',
    },
    data,
  });
};

const unavailable = function(data) {
  this.status(503).json({
    info: {
      success: false,
      resultCode: 'service_unavailable',
      message: 'Service unavailable',
    },
    data,
  });
};

const missingParams = function(params) {
  this.status(400).json({
    info: {
      success: false,
      resultCode: 'missing_params',
      message: 'Missing parameters',
    },
    params,
  });
};

const notFound = function(resultCode = 'not_found', message = 'Not found') {
  this.status(404).json({
    info: {
      success: false,
      resultCode,
      message,
    },
  });
};

const responses = {
  success,
  error,
  badRequest,
  forbidden,
  unavailable,
  missingParams,
  notFound,
};

module.exports = function addResponseMethods(app) {
  Object.entries(responses).map(
    ([name, func]) => app.response[name] = func,
  );
};
