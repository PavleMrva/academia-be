module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define('Lecture', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    // Other model options go here
    underscored: true,
  });

  Lecture.associate = ({LectureMaterialsModel, TeachersModel, CoursesModel, CourseLecturesModel}) => {
    Lecture.hasMany(LectureMaterialsModel, {as: 'lecture_material'});
    Lecture.belongsTo(TeachersModel, {as: 'teacher'});
    Lecture.belongsToMany(CoursesModel, {through: CourseLecturesModel});
  };

  return Lecture;
};
