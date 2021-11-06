const router = require('express').Router();
const validate = require('../../middleware/validateSchema');
const {checkSchema} = require('express-validator');
const {courses: {courseSchema}} = require('../../schemas');
const coursesController = require('../../controllers/courses');
const courseCategoriesController = require('../../controllers/courseCategories');
const courseLanguagesController = require('../../controllers/courseLanguages');

// COURSES
router.get('/', coursesController.getAllCourses);
router.post('/', validate(checkSchema(courseSchema)), coursesController.addCourse);
router.get('/:courseId', coursesController.getCourse);
router.put('/:courseId', validate(checkSchema(courseSchema)), coursesController.editCourse);
// TODO: Add route for course price update
router.delete('/:courseId', coursesController.removeCourse);

// COURSE CATEGORIES
router.get('/categories', courseCategoriesController.getAllCategories);
router.post('/categories', courseCategoriesController.addCategory);
router.get('/categories/:categoryId', courseCategoriesController.getCategory);
router.put('/categories/:categoryId', courseCategoriesController.editCategory);
router.delete('/categories/:categoryId', courseCategoriesController.removeCategory);

// COURSE LANGUAGES
router.get('/languages', courseLanguagesController.getAllLanguages);
router.post('/languages', courseLanguagesController.addLanguage);
router.get('/languages/:languageId', courseLanguagesController.getLanguage);
router.put('/languages/:languageId', courseLanguagesController.editLanguage);
router.delete('/languages/:languageId', courseLanguagesController.removeLanguage);

module.exports = router;
