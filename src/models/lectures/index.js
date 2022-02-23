const errors = require('./errors');

module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define('lecture', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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

  Lecture.Errors = errors;

  Lecture.associate = ({
    LectureMaterialsModel,
    LectureCommentsModel,
    TeachersModel,
    CoursesModel,
    CourseLecturesModel,
  }) => {
    Lecture.hasMany(LectureMaterialsModel, {as: 'lecture_material', onDelete: 'cascade'});
    Lecture.hasMany(LectureCommentsModel, {as: 'lecture_comments', onDelete: 'cascade'});
    Lecture.belongsTo(TeachersModel, {as: 'teacher', foreignKey: {allowNull: false}});
    Lecture.belongsToMany(CoursesModel, {through: CourseLecturesModel});
  };

  return Lecture;
};
