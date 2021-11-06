const {
  sequelize,
  CoursesModel,
  CourseCategoriesModel,
  CourseLanguagesModel,
  CoursePricesModel,
  LecturesModel,
} = require('../../models');

// COURSE CATEGORIES
const getAllCourses = () => {
  return CoursesModel.findAll({
    attributes: ['guid', 'name'],
    include: [{
      model: CourseCategoriesModel,
      where: {deleted: false},
      attributes: ['name'],
    }, {
      model: CourseLanguagesModel,
      where: {deleted: false},
      attributes: ['name', 'code'],
    }, {
      model: CoursePricesModel,
      attributes: ['price', 'currency'],
    }],
  });
};

const getCourseById = (courseId) => {
  return CoursesModel.findOne({
    where: {id: courseId},
    attributes: ['guid', 'name'],
    include: [{
      model: CourseCategoriesModel,
      where: {deleted: false},
      attributes: ['name'],
    }, {
      model: CourseLanguagesModel,
      where: {deleted: false},
      attributes: ['name', 'code'],
    }, {
      model: CoursePricesModel,
      attributes: ['price', 'currency'],
    }, {
      model: LecturesModel,
      attributes: ['title'],
    }],
  });
};

const createCourse = async (name, description, type, coursePrices, categoryId, languageId) => {
  return await sequelize.transaction(async (t) => {
    const course = await CoursesModel.create({
      name,
      type,
      description,
      courseCategoryId: categoryId,
      courseLanguageId: languageId,
    }, {
      transaction: t,
    });

    const prices = coursePrices.map((price) => ({
      courseId: course.id,
      ...price,
    }));
    await CoursePricesModel.bulkCreate(prices, {
      transaction: t,
    });
    return course;
  });
};

const updateCourse = async (courseId, name, description, type, categoryId, languageId) => {
  return await sequelize.transaction(async (t) => {
    return await CoursesModel.update({
      name,
      type,
      description,
      courseCategoryId: categoryId,
      courseLanguageId: languageId,
    }, {
      where: {id: courseId},
      transaction: t,
    });
  });
};

const deleteCourse = (courseId) => {
  return CoursesModel.update({deleted: true}, {
    where: {id: courseId},
  });
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
