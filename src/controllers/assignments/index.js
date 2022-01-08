const assignmentsService = require('../../services/assignments');
const {addFiles} = require('../../common');

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

// ASSIGNMENT SUBMISSIONS
const getAssignmentSubmission = async (req, res) => {
  const {user: {userId}} = req;
  const {assignmentId} = req.params;

  const submission = await assignmentsService.getAssignmentSubmission(userId, assignmentId);

  if (!submission) {
    return res.notFound();
  }
  return res.success(submission);
};

const updateAssignmentSubmission = async (req, res) => {
  const {user: {userId}} = req;
  const {assignmentId} = req.params;
  const {grade, feedback} = req.body;

  let files;
  if (req.files) {
    const {attachments} = req.files;
    files = await addFiles(attachments);
  }

  const submission = await assignmentsService.updateAssignmentSubmission(
    userId,
    assignmentId,
    files,
    grade,
    feedback,
  );
  return res.success(submission);
};

const submitAssignment = async (req, res) => {
  const {user: {userId}} = req;
  const {assignmentId} = req.params;
  const {attachments} = req.files;
  const files = await addFiles(attachments);

  const submission = await assignmentsService.submitAssignment(userId, assignmentId, files);
  return res.success(submission);
};


module.exports = {
  getAssignment,
  getAssignmentsByCourseId,
  addAssignment,
  editAssignment,
  removeAssignment,
  getAssignmentSubmission,
  updateAssignmentSubmission,
  submitAssignment,
};
