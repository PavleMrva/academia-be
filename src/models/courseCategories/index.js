const errors = require('./errors');

module.exports = (sequelize, DataTypes) => {
  const CourseCategory = sequelize.define('course_category', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlpha: {
          args: true,
          msg: 'Category name has to contain only letters',
        },
      },
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

  CourseCategory.Errors = errors;

  CourseCategory.associate = ({CoursesModel}) => {
    CourseCategory.hasMany(CoursesModel, {onDelete: 'cascade'});
  };

  return CourseCategory;
};
