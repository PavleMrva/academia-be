const {
  AssignmentsModel,
} = require('../../models');

const getAssignmentById = (assignmentId) => {
  return AssignmentsModel.findOne({
    where: {id: assignmentId, deleted: false},
  });
};

const getAssignmentsByCourseId = (courseId) => {
  return AssignmentsModel.findAll({
    where: {courseId, deleted: false},
  });
};

const createAssignment = (courseId, title, description, deadline) => {
  return AssignmentsModel.create({courseId, title, description, deadline});
};

const updateAssignment = async (assignmentId, courseId, title, description, deadline) => {
  await AssignmentsModel.update({courseId, title, description, deadline}, {
    where: {id: assignmentId},
  });
};

const deleteAssignment = (AssignmentsModel) => {
  return AssignmentsModel.update({deleted: true}, {
    where: {id: AssignmentsModel},
  });
};

module.exports = {
  getAssignmentById,
  getAssignmentsByCourseId,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
