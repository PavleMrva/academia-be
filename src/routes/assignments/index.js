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

module.exports = router;
