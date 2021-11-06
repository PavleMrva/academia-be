const coursesService = require('../../services/courses');

const getAllCourses = async (req, res) => {
  const courses = await coursesService.getAllCourses();
  return res.success(courses);
};

const getCourse = async (req, res) => {
  const {courseId} = req.params;
  const course = await coursesService.getCourseById(courseId);
  return res.success(course);
};

const addCourse = async (req, res) => {
  const {
    name,
    description,
    type,
    coursePrices,
    categoryId,
    languageId,
  } = req.body;

  if (!name || !description || !type || !coursePrices.length || !categoryId || !languageId) {
    return res.missingParams();
  }

  const course = await coursesService.createCourse(name, description, type, coursePrices, categoryId, languageId);
  return res.success(course);
};

const editCourse = async (req, res) => {
  const {courseId} = req.params;
  const {
    name,
    description,
    type,
    categoryId,
    languageId,
  } = req.body;

  if (!name || !description || !type || !categoryId || !languageId) {
    return res.missingParams();
  }

  const course = await coursesService.updateCourse(courseId, name, description, type, categoryId, languageId);
  return res.success(course);
};

const removeCourse = async (req, res) => {
  const {courseId} = req.params;
  await coursesService.deleteCourse(courseId);
  return res.success();
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  editCourse,
  removeCourse,
};
