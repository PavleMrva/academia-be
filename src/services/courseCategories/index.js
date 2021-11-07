const {
  CourseCategoriesModel,
} = require('../../models');

// COURSE CATEGORIES
const getAllCourseCategories = () => {
  return CourseCategoriesModel.findAll({
    where: {deleted: false},
    attributes: ['name'],
  });
};

const getCourseCategoryById = (categoryId) => {
  return CourseCategoriesModel.findOne({
    where: {id: categoryId, deleted: false},
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
