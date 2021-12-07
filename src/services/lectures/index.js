const {
  sequelize,
  Sequelize: {Op},
  LecturesModel,
  LectureMaterialsModel,
  CourseLecturesModel,
} = require('../../models');

const getAllLectures = (perPage, pageNum, title = null) => {
  const titleQuery = title ? {title: {[Op.like]: `%${title}%`}} : {};
  return LecturesModel.findAll({
    where: {
      ...titleQuery,
      deleted: false,
    },
    limit: perPage,
    offset: perPage * (pageNum - 1),
    include: [{
      model: LectureMaterialsModel,
      where: {deleted: false},
      as: 'lecture_material',
      required: false,
    }],
  });
};

const getLectureById = async (lectureId) => {
  const lecture = await LecturesModel.findOne({
    where: {id: lectureId, deleted: false},
    include: [{
      model: LectureMaterialsModel,
      where: {deleted: false},
      as: 'lecture_material',
      required: false,
    }],
  });

  if (!lecture) {
    throw new LecturesModel.Errors.LectureNotFoundById(lectureId);
  }
  return lecture;
};

const createLecture = async (teacherId, title, description, files) => {
  const lecture = await sequelize.transaction(async (t) => {
    const lecture = await LecturesModel.create({
      title,
      description,
      teacherId,
    }, {
      transaction: t,
    });

    if (files && files.length > 0) {
      const lectureFiles = files.map((file) => ({
        type: file.type,
        fileName: file.name,
        lectureId: lecture.id,
      }));
      await LectureMaterialsModel.bulkCreate(lectureFiles, {
        transaction: t,
      });
    }
    return lecture;
  });

  return getLectureById(lecture.id);
};

const updateLecture = async (lectureId, title, description) => {
  await LecturesModel.update({
    title,
    description,
  }, {
    where: {id: lectureId},
  });

  return getLectureById(lectureId);
};

const addLectureMaterial = async (lectureId, files) => {
  const lectureFiles = files.map((file) => ({
    type: file.type,
    fileName: file.name,
    lectureId: lectureId,
  }));
  await LectureMaterialsModel.bulkCreate(lectureFiles);

  return getLectureById(lectureId);
};

const addLectureToCourse = async (lectureId, courseId) => {
  return CourseLecturesModel.create({
    lectureId,
    courseId,
  });
};

const removeLectureMaterial = async (lectureId, files) => {
  await LectureMaterialsModel.update({deleted: true},
    {where: {fileName: files}},
  );
  return getLectureById(lectureId);
};

const deleteLecture = (lectureId) => {
  return LecturesModel.update({deleted: true}, {
    where: {id: lectureId},
  });
};

const getLectureMaterial = (lectureId, lectureMaterialId) => {
  return LectureMaterialsModel.findOne({
    where: {id: lectureMaterialId, lectureId, deleted: false},
  });
};

module.exports = {
  getAllLectures,
  getLectureById,
  createLecture,
  updateLecture,
  addLectureMaterial,
  removeLectureMaterial,
  addLectureToCourse,
  deleteLecture,
  getLectureMaterial,
};
