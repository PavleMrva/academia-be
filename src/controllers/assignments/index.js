const assignmentsService = require('../../services/assignments');

const getAssignment = async (req, res) => {
  const {assignmentId} = req.params;
  const assignment = await assignmentsService.getAssignmentById(assignmentId);

  if (!assignment) {
    return res.notFound();
  }

  return res.success(assignment);
};

const getAssignmentsByCourseId = async (req, res) => {
  const {courseId} = req.params;
  const assignments = await assignmentsService.getAssignmentsByCourseId(courseId);

  if (!assignments.length) {
    return res.notFound();
  }

  return res.success(assignments);
};

const addAssignment = async (req, res) => {
  const {courseId, title, description, deadline} = req.body;

  if (!courseId || !title || !description || !deadline) {
    return res.missingParams();
  }

  await assignmentsService.createAssignment(courseId, title, description, deadline);
  return res.success();
};

const editAssignment = async (req, res) => {
  const {assignmentId} = req.params;
  const {courseId, title, description, deadline} = req.body;

  if (!courseId || !description || !deadline) {
    return res.missingParams();
  }

  const assignment = await assignmentsService.updateAssignment(assignmentId, courseId, title, description, deadline);
  return res.success(assignment);
};

const removeAssignment = async (req, res) => {
  const {assignmentId} = req.params;
  await assignmentsService.deleteAssignment(assignmentId);
  return res.success();
};

module.exports = {
  getAssignment,
  getAssignmentsByCourseId,
  addAssignment,
  editAssignment,
  removeAssignment,
};
