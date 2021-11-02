module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    underscored: true,
    // Other model options go here
  });

  Course.associate = ({LecturesModel, CourseLecturesModel}) => {
    Course.belongsToMany(LecturesModel, {through: CourseLecturesModel});
  };

  return Course;
};
