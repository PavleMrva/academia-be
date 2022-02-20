const errors = require('./errors');
const Iyzipay = require('iyzipay');

module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('subscription', {
    subscriptionStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subscriptionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [Object.values(Iyzipay.SUBSCRIPTION_STATUS)],
          msg: `Subscription status must be one of the following ${Object.values(Iyzipay.SUBSCRIPTION_STATUS)}`,
        },
      },
    },
  }, {
    // Other model options go here
    underscored: true,
  });

  Subscription.Errors = errors;

  Subscription.associate = ({
    CoursesModel,
    StudentsModel,
    PaymentsModel,
  }) => {
    Subscription.belongsTo(StudentsModel, {foreignKey: {allowNull: false}});
    Subscription.belongsTo(CoursesModel, {foreignKey: {allowNull: false}});
    Subscription.belongsTo(PaymentsModel, {foreignKey: {allowNull: false}});
  };

  return Subscription;
};
