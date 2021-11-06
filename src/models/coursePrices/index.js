const errors = require('./errors');

module.exports = (sequelize, DataTypes) => {
  const CoursePrice = sequelize.define('course_price', {
    price: {
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
    currency: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['TRY', 'USD', 'EUR', 'GBP', 'IRR']],
          msg: 'Currency has to be one of the following: TRY, USD, EUR, GBP, IRR',
        },
      },
    },
  }, {
    // Other model options go here
    underscored: true,
    timestamps: false,
  });

  CoursePrice.associate = ({CoursesModel}) => {
    CoursePrice.belongsTo(CoursesModel);
  };

  return CoursePrice;
};
