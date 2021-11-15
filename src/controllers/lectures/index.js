const lecturesService = require('../../services/lectures');
const {S3} = require('../../external');
const {Readable} = require('stream');
const logger = require('../../libs/logger');

const getAllLectures = async (req, res) => {
  const {name, perPage, pageNum} = req.query;
  const lectures = await lecturesService.getAllLectures(perPage, pageNum, name);
  return res.success(lectures);
};

const getLecture = async (req, res) => {
  const {lectureId} = req.params;
  const lecture = await lecturesService.getLectureById(lectureId);
  return res.success(lecture);
};

// const getLectureImage = async (req, res) => {
//   const readStream = await S3.getFile(req.params.lectureId);
//   return readStream.Body.pipe(res);
// };

const addLecture = async (req, res) => {
  const {teacherId, title, description} = req.body;
  const {material} = req.files;
  const files = [];
  await Promise.map(material, async ({name, data, mimetype}) => {
    const fileName = `${Date.now().toString()}-${name}`;
    const fileStream = Readable.from(data);
    await S3.uploadStream(fileName, fileStream, mimetype);
    files.push({name: fileName, type: mimetype});
  });

  const lecture = await lecturesService.createLecture(teacherId, title, description, files);
  return res.success(lecture);
};

const removeLecture = async (req, res) => {
  const {lectureId} = req.params;
  await lecturesService.deleteLecture(lectureId);
  return res.success();
};

module.exports = {
  getAllLectures,
  getLecture,
  addLecture,
  removeLecture,
};
