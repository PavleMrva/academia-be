const {CoursesModel, CourseCategoriesModel, CourseLanguagesModel} = require('../../models');

const findCourseSchema = {
  courseId: {
    custom: {
      in: ['params'],
      options: async (value) => {
        const lecture = await CoursesModel.findOne({where: {id: value}});
        if (!lecture) {
          throw new CoursesModel.Errors.CourseNotFoundById(value);
        }
      },
    },
  },
};

const saveCourseSchema = {
  name: {
    notEmpty: true,
    errorMessage: 'Course name missing',
  },
  description: {
    notEmpty: true,
    errorMessage: 'Description missing',
  },
  type: {
    notEmpty: true,
    errorMessage: 'Course type missing',
  },
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
  findCourseSchema,
};
