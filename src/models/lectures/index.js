module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define('Lecture', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    underscored: true,
    // Other model options go here
  });

  Lecture.associate = ({LectureMaterialsModel, TeachersModel, CoursesModel, CourseLecturesModel}) => {
    Lecture.hasMany(LectureMaterialsModel, {as: 'lecture_material'});
    Lecture.belongsTo(TeachersModel, {as: 'teacher'});
    Lecture.belongsToMany(CoursesModel, {through: CourseLecturesModel});
  };

  return Lecture;
};
