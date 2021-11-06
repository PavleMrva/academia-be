const {v4: uuid} = require('uuid');
const errors = require('./errors');

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
    receiptNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUUID(value) {
          if (uuid.validate(value)) {
            throw new errors.ReceiptNumberNotUUID();
          }
        },
      },
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    currency: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: {
          args: [[1, 2, 3, 4, 5]],
          msg: 'Rating can be between 1 and 5',
        },
      },
    },
  }, {
    // Other model options go here
    underscored: true,
  });

  Payment.associate = ({SubscriptionsModel}) => {
    Payment.hasOne(SubscriptionsModel);
  };

  return Payment;
};
