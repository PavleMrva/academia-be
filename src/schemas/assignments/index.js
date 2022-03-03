const {AssignmentsModel} = require('../../models');
const {findLectureSchema} = require('../lectures');

const findAssignmentSchema = {
  assignmentId: {
    custom: {
      in: ['params'],
      options: async (value) => {
        const assignment = await AssignmentsModel.findOne({where: {id: value}});
        if (!assignment) {
          throw new AssignmentsModel.Errors.AssignmentNotFoundById(value);
        }
      },
    },
  },
};

const saveAssignmentSchema = {
  ...findLectureSchema,
  title: {
    notEmpty: true,
    errorMessage: 'Assignment title missing',
  },
  description: {
    notEmpty: true,
    errorMessage: 'Description missing',
  },
  deadline: {
    notEmpty: true,
    errorMessage: 'Course type missing',
  },
};

module.exports = {
  saveAssignmentSchema,
  findAssignmentSchema,
};
