const router = require('express').Router();
const validate = require('../../middleware/validateSchema');
const {checkSchema} = require('express-validator');
const {
  lectures: {
    saveLectureSchema,
    getLectureMaterialSchema,
    addLectureMaterialSchema,
    removeLectureMaterialSchema,
    findLectureSchema,
  },
  courses: {
    findCourseSchema,
  },
  search: {paginationSchema},
} = require('../../schemas');
const lecturesController = require('../../controllers/lectures');

// COURSES
router.get('/', validate(checkSchema(paginationSchema)), lecturesController.getAllLectures);
router.post('/', validate(checkSchema(saveLectureSchema)), lecturesController.addLecture);

router.get('/:lectureId', lecturesController.getLecture);
router.put('/:lectureId', validate(checkSchema(saveLectureSchema)), lecturesController.editLecture);

router.get('/:lectureId/material/:fileName', validate(checkSchema(getLectureMaterialSchema)), lecturesController.getLectureMaterial);
router.patch('/:lectureId/material', validate(checkSchema(addLectureMaterialSchema)), lecturesController.addLectureMaterial);
router.delete('/:lectureId/material', validate(checkSchema(removeLectureMaterialSchema)), lecturesController.removeLectureMaterial);

router.get('/:lectureId/comments', lecturesController.getLectureComments);
router.get('/:lectureId/comments/:commentId', lecturesController.getLectureComment);
router.post('/:lectureId/comments', lecturesController.addLectureComment);
router.delete('/:lectureId/comments', lecturesController.deleteLectureComment);

router.patch('/:lectureId/course/:courseId', validate(checkSchema({...findLectureSchema, ...findCourseSchema})), lecturesController.addLectureToCourse);
router.delete('/:lectureId', validate(checkSchema(findLectureSchema)), lecturesController.removeLecture);

module.exports = router;
