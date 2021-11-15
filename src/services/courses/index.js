const {
  sequelize,
  Sequelize: {Op},
  CoursesModel,
  CourseCategoriesModel,
  CourseLanguagesModel,
  CoursePricesModel,
  LecturesModel,
} = require('../../models');

// COURSE CATEGORIES
const getAllCourses = (perPage, pageNum, name = null) => {
  const nameQuery = name ? {name: {[Op.like]: `%${name}%`}} : {};
  return CoursesModel.findAll({
    where: {
      ...nameQuery,
      deleted: false,
    },
    attributes: ['name'],
    limit: perPage,
    offset: perPage * (pageNum - 1),
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

const getCourseById = async (courseId) => {
  const course = await CoursesModel.findOne({
    where: {id: courseId, deleted: false},
    attributes: ['name'],
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

  if (!course) {
    throw new CoursesModel.Errors.CourseNotFoundById(courseId);
  }
  return course;
};

const createCourse = async (name, description, type, categoryId, languageId, coursePrices = null) => {
  const course = await sequelize.transaction(async (t) => {
    const course = await CoursesModel.create({
      name,
      type,
      description,
      courseCategoryId: categoryId,
      courseLanguageId: languageId,
    }, {
      transaction: t,
    });

    if (coursePrices && coursePrices.length > 0) {
      const prices = coursePrices.map((price) => ({
        courseId: course.id,
        ...price,
      }));
      await CoursePricesModel.bulkCreate(prices, {
        transaction: t,
      });
    }
    return course;
  });

  return getCourseById(course.id);
};

const updateCourse = async (courseId, name, description, type, categoryId, languageId) => {
  await CoursesModel.update({
    name,
    type,
    description,
    courseCategoryId: categoryId,
    courseLanguageId: languageId,
  }, {
    where: {id: courseId},
  });

  return getCourseById(courseId);
};

const updateCoursePrice = async (courseId, coursePrice) => {
  return await CoursePricesModel.upsert({courseId, ...coursePrice}, {courseId, currency: coursePrice.currency});
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
  updateCoursePrice,
  deleteCourse,
};
