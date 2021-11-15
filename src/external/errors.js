class ExternalServiceUnreachable extends Error {
  constructor(service, data = {}) {
    super();
    this.name = 'ExternalServiceUnreachable';
    this.message = `External service unreachable: ${service}`;
    this.service = service;
    this.url = data.url;
    this.json = data.json;
  }
}

class ExternalServiceClientError extends Error {
  constructor(service, data = {}) {
    super();
    this.name = 'ExternalServiceClientError';
    this.message = `External service client error: ${service}`;
    this.service = service;
    this.url = data.url;
    this.json = data.json;
    this.statusCode = data.statusCode;
    this.body = data.body;
  }
}

module.exports = {
  ExternalServiceUnreachable,
  ExternalServiceClientError,
};
