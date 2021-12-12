const Iyzipay = require('iyzipay');

class IyzipayService {
  #client;

  constructor({apiKey, secretKey, uri}) {
    this.#client = new Iyzipay({
      apiKey,
      secretKey,
      uri,
    });
  }
}

module.exports = IyzipayService;
