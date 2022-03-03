const errors = require('./errors');

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'course',
      validate: {
        isIn: {
          args: [['course', 'package', 'custom']],
          msg: 'Course type can only be: course, package or custom',
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

  Course.Errors = errors;

  Course.associate = ({
    LecturesModel,
    CourseLecturesModel,
    StudentCourseDetailsModel,
    AssignmentsModel,
    SubscriptionsModel,
    CoursePricesModel,
    CourseCategoriesModel,
    CourseLanguagesModel,
  }) => {
    Course.belongsToMany(LecturesModel, {through: CourseLecturesModel});
    Course.hasMany(StudentCourseDetailsModel, {onDelete: 'cascade'});
    Course.hasMany(SubscriptionsModel, {onDelete: 'cascade'});
    Course.hasMany(CoursePricesModel, {onDelete: 'cascade'});
    Course.belongsTo(CourseCategoriesModel, {foreignKey: {allowNull: false}});
    Course.belongsTo(CourseLanguagesModel, {foreignKey: {allowNull: false}});
  };

  return Course;
};
