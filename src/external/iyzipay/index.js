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

  async executePayment(studentInfo, currency, platform, course) {
    // test
    const request = {
      locale: Iyzipay.LOCALE.EN,
      conversationId: '123456719',
      price: '1',
      paidPrice: '1.2',
      currency: Iyzipay.CURRENCY.TRY,
      installment: '1',
      basketId: 'B67832',
      paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: Iyzipay.PAYMENT_GROUP.SUBSCRIPTION,
      paymentCard: {
        cardHolderName: 'John Doe',
        cardNumber: '5528790000000008',
        expireMonth: '12',
        expireYear: '2030',
        cvc: '123',
        registerCard: '0',
      },
      buyer: {
        id: 'BY789',
        name: 'John',
        surname: 'Doe',
        gsmNumber: '+905350000000',
        email: 'email@email.com',
        identityNumber: '74300864791',
        registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        ip: '85.34.78.112',
        city: 'Istanbul',
        country: 'Turkey',
        zipCode: '34732',
      },
      billingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34742',
      },
      basketItems: [
        {
          id: 'BI102',
          name: 'Game code',
          category1: 'Game',
          category2: 'Online Game Items',
          itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
          price: '1',
        },
      ],
    };

    return new Promise((resolve, reject) => {
      this.#client.payment.create(request, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
}

module.exports = IyzipayService;
