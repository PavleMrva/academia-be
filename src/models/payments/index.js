const {v4: uuid} = require('uuid');
const errors = require('./errors');
const Iyzipay = require('iyzipay');

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('payment', {
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isGreaterThanZero(value) {
          if (value <= 0) {
            throw new errors.AmountIsNotGreaterThanZero();
          }
        },
      },
    },
    paymentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [Object.values(Iyzipay.CURRENCY)],
          msg: `Currency must be one of the following ${Object.values(Iyzipay.CURRENCY)}`,
        },
      },
    },
  }, {
    // Other model options go here
    underscored: true,
  });

  Payment.Errors = errors;

  Payment.associate = ({SubscriptionsModel}) => {
    Payment.hasOne(SubscriptionsModel);
  };

  return Payment;
};
