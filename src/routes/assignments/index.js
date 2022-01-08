const router = require('express').Router();
const validate = require('../../middleware/validateSchema');
const {checkSchema} = require('express-validator');
const {
  assignments: {
    saveAssignmentSchema,
    findAssignmentSchema,
  },
  search: {paginationSchema},
} = require('../../schemas');
const assignmentsController = require('../../controllers/assignments');

router.get('/:courseId', validate(checkSchema(paginationSchema)), assignmentsController.getAssignmentsByCourseId);
router.get('/:assignmentId', assignmentsController.getAssignment);
router.post('/', validate(checkSchema(saveAssignmentSchema)), assignmentsController.addAssignment);
router.put('/:assignmentId', validate(checkSchema(saveAssignmentSchema)), assignmentsController.editAssignment);
router.delete('/:assignmentId', validate(checkSchema(findAssignmentSchema)), assignmentsController.removeAssignment);

// ASSIGNMENT SUBMISSIONS
router.get('/submission/:assignmentId', assignmentsController.getAssignmentSubmission);

// For Teachers (update grade and feedback)
router.patch('/submission/:assignmentId', assignmentsController.updateAssignmentSubmission);
router.post('/submission/:assignmentId', assignmentsController.submitAssignment);

module.exports = router;
