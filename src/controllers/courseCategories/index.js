const courseCategoriesService = require('../../services/courseCategories');

const getAllCategories = async (req, res) => {
  const categories = await courseCategoriesService.getAllCourseCategories();
  return res.success(categories);
};

const getCategory = async (req, res) => {
  const {categoryId} = req.params;
  const category = await courseCategoriesService.getCourseCategoryById(categoryId);
  return res.success(category);
};

const addCategory = async (req, res) => {
  const {categoryName} = req.body;

  if (!categoryName) {
    return res.missingParams();
  }

  const category = await courseCategoriesService.createCourseCategory(categoryName);
  return res.success(category);
};

const editCategory = async (req, res) => {
  const {categoryId} = req.params;
  const {categoryName} = req.body;

  if (!categoryName) {
    return res.missingParams();
  }

  const course = await courseCategoriesService.updateCourseCategory(categoryId, categoryName);
  return res.success(course);
};

const removeCategory = async (req, res) => {
  const {categoryId} = req.params;
  await courseCategoriesService.deleteCourseCategory(categoryId);
  return res.success();
};

module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  editCategory,
  removeCategory,
};
