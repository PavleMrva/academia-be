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
const courseLanguagesController = require('../../controllers/courseLanguages');

// COURSES
router.get('/', validate(checkSchema(paginationSchema)), coursesController.getAllCourses);
router.post('/', validate(checkSchema(saveCourseSchema)), coursesController.addCourse);
router.get('/:courseId', coursesController.getCourse);
router.put('/:courseId', validate(checkSchema(saveCourseSchema)), coursesController.editCourse);
router.patch('/:courseId/price', validate(checkSchema(findCourseSchema)), coursesController.addPrice);
router.delete('/:courseId', validate(checkSchema(findCourseSchema)), coursesController.removeCourse);

module.exports = router;
