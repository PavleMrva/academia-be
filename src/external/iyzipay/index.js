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

  async executePayment(paymentDetails, userInfo, itemDetails) {
    const request = {
      locale: paymentDetails.locale,
      price: itemDetails.price,
      paidPrice: paymentDetails.paidPrice,
      currency: paymentDetails.currency,
      installment: '1', // hardcoded value
      paymentGroup: Iyzipay.PAYMENT_GROUP.SUBSCRIPTION,
      paymentCard: {
        cardHolderName: paymentDetails.paymentCard.cardHolderName,
        cardNumber: paymentDetails.paymentCard.cardNumber,
        expireMonth: paymentDetails.paymentCard.expireMonth,
        expireYear: paymentDetails.paymentCard.expireYear,
        cvc: paymentDetails.paymentCard.cvc,
        registerCard: paymentDetails.paymentCard.registerCard,
      },
      buyer: {
        id: userInfo.userId,
        name: userInfo.firstName,
        surname: userInfo.lastName,
        email: userInfo.email,
        identityNumber: paymentDetails.identityNumber, // Identity number of buyer. TCKN for Turkish merchants, passport number for foreign merchants
        registrationAddress: userInfo.address,
        city: userInfo.city,
        country: userInfo.country,
        zipCode: userInfo.zipCode,
      },
      billingAddress: {
        contactName: paymentDetails.billingAddress.fullName,
        city: paymentDetails.billingAddress.city,
        country: paymentDetails.billingAddress.country,
        address: paymentDetails.billingAddress.address,
        zipCode: paymentDetails.billingAddress.zipCode,
      },
      basketItems: [
        {
          id: itemDetails.id,
          name: itemDetails.name,
          category1: itemDetails.category,
          itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
          price: itemDetails.price,
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

  async cancelPayment(paymentId) {
    return new Promise((resolve, reject) => {
      this.#client.cancel.create({
        paymentId,
      }, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
}

module.exports = IyzipayService;
