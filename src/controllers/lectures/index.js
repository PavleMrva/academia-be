const lecturesService = require('../../services/lectures');
const {S3} = require('../../external');
const {addFiles} = require('../../common');

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

const addLecture = async (req, res) => {
  const {teacherId, title, description} = req.body;
  const {material} = req.files || [req.file];
  const files = await addFiles(material);

  const lecture = await lecturesService.createLecture(teacherId, title, description, files);
  return res.success(lecture);
};

const editLecture = async (req, res) => {
  const {lectureId} = req.params;
  const {title, description} = req.body;
  const lecture = await lecturesService.updateLecture(lectureId, title, description);
  return res.success(lecture);
};

const addLectureMaterial = async (req, res) => {
  const {lectureId} = req.params;
  const {material} = req.files;
  const files = await addFiles(material);

  const lecture = await lecturesService.addLectureMaterial(lectureId, files);
  return res.success(lecture);
};

const addLectureToCourse = async (req, res) => {
  const {lectureId, courseId} = req.params;
  await lecturesService.addLectureToCourse(lectureId, courseId);
  return res.success();
};

const removeLectureMaterial = async (req, res) => {
  const {lectureId} = req.params;
  const {fileNames} = req.body;
  await Promise.map(fileNames, async (name) => {
    await S3.removeFile(name);
  });

  const lecture = await lecturesService.removeLectureMaterial(lectureId, fileNames);
  return res.success(lecture);
};

const getLectureMaterial = async (req, res) => {
  const {fileName} = req.params;
  const readStream = await S3.getFile(fileName);
  return readStream.Body.pipe(res);
};

const removeLecture = async (req, res) => {
  const {lectureId} = req.params;
  await lecturesService.deleteLecture(lectureId);
  return res.success();
};

const getLectureComments = async (req, res) => {
  const {lectureId} = req.params;
  const comments = await lecturesService.getLectureComments(lectureId);
  return res.success(comments);
};

const getLectureComment = async (req, res) => {
  const {lectureId, commentId} = req.params;
  const comment = await lecturesService.getLectureComment(lectureId, commentId);
  return res.success(comment);
};

const addLectureComment = async (req, res) => {
  const {user: {userId}} = req;
  const {lectureId} = req.params;
  const {content} = req.body;

  if (!content || !content.length) {
    return res.missingParams(['content']);
  }

  await lecturesService.addLectureComment(lectureId, userId);
  return res.success();
};

const deleteLectureComment = async (req, res) => {
  const {user: {userId}} = req;
  const {commentId} = req.params;
  await lecturesService.deleteLectureComment(userId, commentId);
  return res.success();
};


module.exports = {
  getAllLectures,
  getLecture,
  addLecture,
  editLecture,
  addLectureMaterial,
  addLectureToCourse,
  removeLectureMaterial,
  removeLecture,
  getLectureMaterial,
  getLectureComments,
  getLectureComment,
  addLectureComment,
  deleteLectureComment,
};
