module.exports = (sequelize, DataTypes) => {
  const CourseLecture = sequelize.define('CourseLecture', {

  }, {
    underscored: true,
    // Other model options go here
  });

  return CourseLecture;
};
