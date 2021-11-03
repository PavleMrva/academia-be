module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    // Other model options go here
    underscored: true,
  });

  Course.associate = ({
    LecturesModel,
    CourseLecturesModel,
    StudentCourseDetailsModel,
    AssignmentsModel,
    SubscriptionsModel,
    CoursePricesModel,
  }) => {
    Course.belongsToMany(LecturesModel, {through: CourseLecturesModel});
    Course.hasMany(StudentCourseDetailsModel);
    Course.hasMany(AssignmentsModel);
    Course.hasMany(SubscriptionsModel);
    Course.hasMany(CoursePricesModel);
  };

  return Course;
};
