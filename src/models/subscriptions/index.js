const errors = require('./errors');

module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    subscriptionStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subscriptionEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isGreaterThanStartDate(value) {
          if (value.getTime() > this.subscribtionStartDate) {
            throw new errors.SubcriptionEndDateInvalid();
          }
        },
      },
    },
  }, {
    // Other model options go here
    underscored: true,
  });

  Subscription.associate = ({
    CoursesModel,
    StudentsModel,
    PaymentsModel,
  }) => {
    Subscription.belongsTo(StudentsModel);
    Subscription.belongsTo(CoursesModel);
    Subscription.belongsTo(PaymentsModel);
  };

  return Subscription;
};
