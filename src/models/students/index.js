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
    // Other model options go here
    underscored: true,
  });

  Student.associate = ({
    UsersModel,
    StudentCourseDetailsModel,
    AssignmentSubmissionsModel,
    SubscriptionsModel,
  }) => {
    Student.belongsTo(UsersModel, {as: 'user'});
    Student.hasMany(StudentCourseDetailsModel, {onDelete: 'cascade'});
    Student.hasMany(AssignmentSubmissionsModel, {onDelete: 'cascade'});
    Student.hasMany(SubscriptionsModel, {onDelete: 'cascade'});
  };

  return Student;
};
