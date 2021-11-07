module.exports = (sequelize, DataTypes) => {
  const StudentCourseDetails = sequelize.define('student_course_details', {
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['A', 'B', 'C', 'D', 'E', 'F']],
          msg: 'Grade can be between A and F',
        },
      },
    },
    gradeDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: {
          args: [[1, 2, 3, 4, 5]],
          msg: 'Rating can be between 1 and 5',
        },
      },
    },
    feedback: {
      type: DataTypes.TEXT,
    },
  }, {
    // Other model options go here
    underscored: true,
    timestamps: false,
  });

  StudentCourseDetails.associate = ({StudentsModel, CoursesModel}) => {
    StudentCourseDetails.belongsTo(StudentsModel, {foreignKey: {allowNull: false}});
    StudentCourseDetails.belongsTo(CoursesModel, {foreignKey: {allowNull: false}});
  };

  return StudentCourseDetails;
};
