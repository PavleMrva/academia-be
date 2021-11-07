const errors = require('./errors');

module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('subscription', {
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
    Subscription.belongsTo(StudentsModel, {foreignKey: {allowNull: false}});
    Subscription.belongsTo(CoursesModel, {foreignKey: {allowNull: false}});
    Subscription.belongsTo(PaymentsModel, {foreignKey: {allowNull: false}});
  };

  return Subscription;
};
