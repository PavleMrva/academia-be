module.exports = (sequelize, DataTypes) => {
  const AssignmentSubmission = sequelize.define('assignment_submission', {
    grade: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['A', 'B', 'C', 'D', 'E', 'F']],
          msg: 'Grade can be between A and F',
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['PENDING', 'SUBMITTED', 'DONE']],
          msg: 'Status can only be: PENDING, SUBMITTED, DONE',
        },
      },
    },
    feedback: {
      type: DataTypes.TEXT,
    },
  }, {
    // Other model options go here
    underscored: true,
  });

  AssignmentSubmission.associate = ({StudentsModel, AssignmentsModel}) => {
    AssignmentSubmission.belongsTo(StudentsModel);
    AssignmentSubmission.belongsTo(AssignmentsModel);
  };

  return AssignmentSubmission;
};
