const router = require('express').Router();
const {upload} = require('../../external');
const validate = require('../../middleware/validateSchema');
const {checkSchema} = require('express-validator');
const {
  lectures: {saveLectureSchema},
  search: {paginationSchema},
} = require('../../schemas');
const lecturesController = require('../../controllers/lectures');

// COURSES
router.get('/', validate(checkSchema(paginationSchema)), lecturesController.getAllLectures);
router.post('/', validate(checkSchema(saveLectureSchema)), lecturesController.addLecture);
router.get('/:lectureId', lecturesController.getLecture);
// router.put('/:lectureId', validate(checkSchema(saveLectureSchema)), lecturesController.editLecture);
// router.patch('/:lectureId/material', lecturesController.addLectureMaterial);
// router.patch('/:lectureId/course/:courseId', lecturesController.addLectureToCourse);
router.delete('/:lectureId', lecturesController.removeLecture);

module.exports = router;
