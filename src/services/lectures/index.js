const {
  sequelize,
  Sequelize: {Op},
  LecturesModel,
  LectureMaterialsModel,
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

const deleteLecture = (lectureId) => {
  return LecturesModel.update({deleted: true}, {
    where: {id: lectureId},
  });
};

module.exports = {
  getAllLectures,
  getLectureById,
  createLecture,
  deleteLecture,
};
