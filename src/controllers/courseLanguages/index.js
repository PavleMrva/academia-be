const courseLanguagesService = require('../../services/courseLanguages');

const getAllLanguages = async (req, res) => {
  const categories = await courseLanguagesService.getAllCourseLanguages();
  return res.success(categories);
};

const getLanguage = async (req, res) => {
  const {languageId} = req.params;
  const language = await courseLanguagesService.getCourseLanguageById(languageId);
  return res.success(language);
};

const addLanguage = async (req, res) => {
  const {languageName, languageCode} = req.body;

  if (!languageName || !languageCode) {
    return res.missingParams();
  }

  const courseLanguage = await courseLanguagesService.createCourseLanguage(languageName, languageCode);
  return res.success(courseLanguage);
};

const editLanguage = async (req, res) => {
  const {languageId} = req.params;
  const {languageName, languageCode} = req.body;

  if (!languageName || !languageCode) {
    return res.missingParams();
  }

  const language = await courseLanguagesService.updateCourseLanguage(languageId, languageName, languageCode);
  return res.success(language);
};

const removeLanguage = async (req, res) => {
  const {languageId} = req.params;
  await courseLanguagesService.deleteCourseLanguage(languageId);
  return res.success();
};

module.exports = {
  getAllLanguages,
  getLanguage,
  addLanguage,
  editLanguage,
  removeLanguage,
};
