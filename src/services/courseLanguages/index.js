const {
  CourseLanguagesModel,
} = require('../../models');

// COURSE CATEGORIES
const getAllCourseLanguages = () => {
  return CourseLanguagesModel.findAll({
    attributes: ['name', 'code'],
  });
};

const getCourseLanguageById = (languageId) => {
  return CourseLanguagesModel.findOne({
    where: {id: languageId},
  });
};

const createCourseLanguage = (languageName, languageCode) => {
  return CourseLanguagesModel.create({name: languageName, code: languageCode});
};

const updateCourseLanguage = async (languageId, languageName, languageCode) => {
  await CourseLanguagesModel.update({name: languageName, code: languageCode}, {
    where: {id: languageId},
  });
};

const deleteCourseLanguage = (languageId) => {
  return CourseLanguagesModel.update({deleted: true}, {
    where: {id: languageId},
  });
};

module.exports = {
  getAllCourseLanguages,
  getCourseLanguageById,
  createCourseLanguage,
  updateCourseLanguage,
  deleteCourseLanguage,
};
