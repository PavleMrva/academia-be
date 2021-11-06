const {
  CourseCategoriesModel,
} = require('../../models');

// COURSE CATEGORIES
const getAllCourseCategories = () => {
  return CourseCategoriesModel.findAll({
    attributes: ['name'],
  });
};

const getCourseCategoryById = (categoryId) => {
  return CourseCategoriesModel.findOne({
    where: {id: categoryId},
  });
};

const createCourseCategory = (categoryName) => {
  return CourseCategoriesModel.create({name: categoryName});
};

const updateCourseCategory = async (categoryId, categoryName) => {
  await CourseCategoriesModel.update({name: categoryName}, {
    where: {id: categoryId},
  });
};

const deleteCourseCategory = (categoryId) => {
  return CourseCategoriesModel.update({deleted: true}, {
    where: {id: categoryId},
  });
};

module.exports = {
  getAllCourseCategories,
  getCourseCategoryById,
  createCourseCategory,
  updateCourseCategory,
  deleteCourseCategory,
};
