const {CourseCategoriesModel, CourseLanguagesModel} = require('../../models');

const saveCourseSchema = {
  categoryId: {
    custom: {
      options: (value) => {
        return CourseCategoriesModel.findOne({
          where: {id: value},
        }).then((category) => {
          if (!category) {
            throw new CourseCategoriesModel.Errors.CategoryDoesNotExist(value);
          }
        });
      },
    },
  },
  languageId: {
    custom: {
      options: (value) => {
        return CourseLanguagesModel.findOne({
          where: {id: value},
        }).then((language) => {
          if (!language) {
            throw new CourseLanguagesModel.Errors.LanguageDoesNotExist(value);
          }
        });
      },
    },
  },
};

module.exports = {
  saveCourseSchema,
};
