const router = require('express').Router();
const validate = require('../../middleware/validateSchema');
const {checkSchema} = require('express-validator');
const {
  courses: {
    saveCourseSchema,
    findCourseSchema,
  },
  search: {paginationSchema},
} = require('../../schemas');
const coursesController = require('../../controllers/courses');

// COURSES
router.get('/', validate(checkSchema(paginationSchema)), coursesController.getAllCourses);
router.post('/', validate(checkSchema(saveCourseSchema)), coursesController.addCourse);
router.get('/:courseId', coursesController.getCourse);
router.put('/:courseId', validate(checkSchema(saveCourseSchema)), coursesController.editCourse);
router.delete('/:courseId', validate(checkSchema(findCourseSchema)), coursesController.removeCourse);
router.patch('/:courseId/price', validate(checkSchema(findCourseSchema)), coursesController.addPrice);

module.exports = router;
