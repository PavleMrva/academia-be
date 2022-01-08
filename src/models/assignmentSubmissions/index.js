const errors = require('./errors');

const STATUSES = {
  PENDING: 'PENDING',
  SUBMITTED: 'SUBMITTED',
  DONE: 'DONE',
};

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
      defaultValue: STATUSES.SUBMITTED,
      validate: {
        isIn: {
          args: [Object.values(STATUSES)],
          msg: `Status can only be: ${Object.values(STATUSES)}`,
        },
      },
      set() {
        // Not sure if this will work
        const grade = this.getDataValue('grade');
        let status;
        if (grade) {
          if (grade === 'F') {
            status = STATUSES.PENDING;
          } else {
            status = STATUSES.DONE;
          }
        } else {
          status = STATUSES.SUBMITTED;
        }
        this.setDataValue('status', status);
      },
    },
    attachments: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('attachments').split(';');
      },
      set(val) {
        this.setDataValue('attachments', val.join(';'));
      },
    },
    feedback: {
      type: DataTypes.TEXT,
    },
  }, {
    // Other model options go here
    underscored: true,
  });

  AssignmentSubmission.Errors = errors;

  AssignmentSubmission.associate = ({StudentsModel, AssignmentsModel}) => {
    AssignmentSubmission.belongsTo(StudentsModel, {foreignKey: {allowNull: false}});
    AssignmentSubmission.belongsTo(AssignmentsModel, {foreignKey: {allowNull: false}});
  };

  return AssignmentSubmission;
};
