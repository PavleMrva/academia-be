module.exports = (sequelize, DataTypes) => {
  const CourseLecture = sequelize.define('CourseLecture', {

  }, {
    // Other model options go here
    underscored: true,
    timestamps: false,
  });

  return CourseLecture;
};
