const coursesService = require('../../services/courses');

const getAllCourses = async (req, res) => {
  const {name, perPage, pageNum} = req.query;
  const courses = await coursesService.getAllCourses(perPage, pageNum, name);
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

  const course = await coursesService.createCourse(name, description, type, categoryId, languageId, coursePrices);
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

  const course = await coursesService.updateCourse(courseId, name, description, type, categoryId, languageId);
  return res.success(course);
};

const addPrice = async (req, res) => {
  const {courseId} = req.params;
  const {coursePrice} = req.body;

  if (!coursePrice) {
    return res.missingParams();
  }

  const newPrice = await coursesService.updateCoursePrice(courseId, coursePrice);
  return res.success(newPrice);
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
  addPrice,
  removeCourse,
};
