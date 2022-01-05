const errors = require('./errors');

module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('subscription', {
    subscriptionStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subscriptionEndDate: {
      type: DataTypes.DATE,
      validate: {
        isGreaterThanStartDate(value) {
          if (value.getTime() > this.subscribtionStartDate) {
            throw new errors.SubscriptionEndDateInvalid();
          }
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
