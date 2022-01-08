const {
  AssignmentsModel,
  Sequelize: {Op},
  AssignmentSubmissionsModel,
  StudentsModel,
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

const deleteAssignment = (assignmentId) => {
  return AssignmentsModel.update({deleted: true}, {
    where: {id: assignmentId},
  });
};

const getAssignmentSubmission = async (userId, assignmentId) => {
  const student = await StudentsModel.findOne({
    where: {userId},
  });

  if (!student) {
    throw new StudentsModel.Errors.StudentWithUserIdNotFound(userId);
  }

  return AssignmentSubmissionsModel.findOne({
    where: {studentId: student.id, assignmentId},
  });
};

// ASSIGNMENT SUBMISSIONS
const updateAssignmentSubmission = async (userId, assignmentId, files = [], grade, feedback) => {
  const student = await StudentsModel.findOne({
    where: {userId},
  });
  const fileNames = files.map((file) => file.name);
  let status;

  if (!student) {
    throw new StudentsModel.Errors.StudentWithUserIdNotFound(userId);
  }

  if (grade) {
    if (grade.toUpperCase() === 'F') {
      status = 'PENDING';
    } else {
      status = 'DONE';
    }
  }

  return AssignmentSubmissionsModel.update({
    ...fileNames && {attachments: fileNames},
    ...grade && {grade},
    ...feedback && {feedback},
    ...status && {status},
  }, {
    where: {studentId: student.id, assignmentId},
  });
};

const submitAssignment = async (userId, assignmentId, files) => {
  const student = await StudentsModel.findOne({
    where: {userId},
  });
  const fileNames = files.map((file) => file.name);

  if (!student) {
    throw new StudentsModel.Errors.StudentWithUserIdNotFound(userId);
  }

  const submission = await AssignmentsModel.findOne({
    where: {studentId: student.id, assignmentId, status: {
      [Op.or]: ['SUBMITTED', 'DONE'],
    }},
  });

  if (submission) {
    throw new AssignmentSubmissionsModel.Errors.AssignmentAlreadySubmitted(student.id, assignmentId);
  }

  return AssignmentSubmissionsModel.create({
    studentId: student.id, assignmentId, attachments: fileNames,
  });
};

module.exports = {
  getAssignmentById,
  getAssignmentsByCourseId,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentSubmission,
  updateAssignmentSubmission,
  submitAssignment,
};
