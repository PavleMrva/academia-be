const {validate: uuidValidate} = require('uuid');
const errors = require('./errors');

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('course', {
    // guid: {
    //   // Used as unique identifier for the course independent from language
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     isUUID(value) {
    //       if (!uuidValidate(value)) {
    //         throw new errors.CourseGlobalIDNotUUID();
    //       }
    //     },
    //   },
    // },
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
      defaultValue: true,
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
    Course.hasMany(AssignmentsModel, {onDelete: 'cascade'});
    Course.hasMany(SubscriptionsModel, {onDelete: 'cascade'});
    Course.hasMany(CoursePricesModel, {onDelete: 'cascade'});
    Course.belongsTo(CourseCategoriesModel);
    Course.belongsTo(CourseLanguagesModel);
  };

  return Course;
};
