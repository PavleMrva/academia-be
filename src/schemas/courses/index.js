const {CourseCategoriesModel, CourseLanguagesModel} = require('../../models');

const courseSchema = {
  categoryId: {
    custom: {
      options: (value) => {
        return CourseCategoriesModel.findOne({
          where: {id: value},
        }).then((category) => {
          if (!category) {
            throw new CourseCategoriesModel.Errors.CategoryDoesNotExist();
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
            throw new CourseLanguagesModel.Errors.LanguageDoesNotExist();
          }
        });
      },
    },
  },
};

module.exports = {
  courseSchema,
};
