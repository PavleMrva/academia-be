module.exports = (sequelize, DataTypes) => {
  const CourseLecture = sequelize.define('course_lecture', {

  }, {
    // Other model options go here
    underscored: true,
    timestamps: false,
  });

  return CourseLecture;
};
