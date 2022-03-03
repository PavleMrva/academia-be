const {LectureMaterialsModel, LecturesModel} = require('../../models');

const findLectureSchema = {
  lectureId: {
    custom: {
      in: ['params', 'body'],
      options: async (value) => {
        const lecture = await LecturesModel.findOne({where: {id: value}});
        if (!lecture) {
          throw new LecturesModel.Errors.LectureNotFoundById(value);
        }
      },
    },
  },
};

const saveLectureSchema = {
  title: {
    notEmpty: true,
    errorMessage: 'Lecture title missing',
  },
  description: {
    notEmpty: true,
    errorMessage: 'Description missing',
  },
};

const addLectureMaterialSchema = {
  ...findLectureSchema,
  material: {
    notEmpty: true,
    in: ['files'],
    errorMessage: 'Lecture material missing',
  },
};

const removeLectureMaterialSchema = {
  ...findLectureSchema,
  fileNames: {
    custom: {
      options: async (value, {req}) => {
        if (!Array.isArray(value) || value.length <= 0) {
          return false;
        }
        await Promise.map(value, async (fileName) => {
          const {lectureId} = req.params;
          const file = await LectureMaterialsModel.findOne({where: {fileName, lectureId}});
          if (!file) {
            throw new LectureMaterialsModel.Errors.FileNotFoundByName(fileName, lectureId);
          }
        });
      },
    },
  },
};

const getLectureMaterialSchema = {
  ...findLectureSchema,
  fileName: {
    custom: {
      options: async (value, {req}) => {
        const {lectureId} = req.params;
        const file = await LectureMaterialsModel.findOne({where: {fileName: value, lectureId}});
        if (!file) {
          throw new LectureMaterialsModel.Errors.FileNotFoundByName(value, lectureId);
        }
      },
    },
  },
};

module.exports = {
  saveLectureSchema,
  addLectureMaterialSchema,
  removeLectureMaterialSchema,
  findLectureSchema,
  getLectureMaterialSchema,
};
