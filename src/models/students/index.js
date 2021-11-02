const ZIP_CODE_REGEX = new RegExp(/^\d{5}[-\s]?(?:\d{4})?$/gm);

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('student', {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: true,
          msg: 'City has to contain only letters',
        },
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: true,
          msg: 'Country has to contain only letters',
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ZIP_CODE_REGEX,
      },
    },
  }, {
    underscored: true,
    // Other model options go here
  });

  Student.associate = ({UsersModel}) => {
    Student.belongsTo(UsersModel, {as: 'user'});
  };

  return Student;
};
