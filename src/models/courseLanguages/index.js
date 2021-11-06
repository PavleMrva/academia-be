const errors = require('./errors');

module.exports = (sequelize, DataTypes) => {
  const CourseLanguage = sequelize.define('course_language', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlpha: {
          args: true,
          msg: 'Language name has to contain only letters',
        },
      },
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    // Other model options go here
    underscored: true,
  });

  CourseLanguage.Errors = errors;

  CourseLanguage.associate = ({CoursesModel}) => {
    CourseLanguage.hasMany(CoursesModel, {onDelete: 'cascade'});
  };

  return CourseLanguage;
};
