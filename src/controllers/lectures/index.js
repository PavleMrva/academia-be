const lecturesService = require('../../services/lectures');
const {S3} = require('../../external');
const {Readable} = require('stream');

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

const editLecture = async (req, res) => {
  const {lectureId} = req.params;
  const {title, description} = req.body;
  const lecture = await lecturesService.updateLecture(lectureId, title, description);
  return res.success(lecture);
};

const addLectureMaterial = async (req, res) => {
  const {lectureId} = req.params;
  const {material} = req.files;
  const files = [];
  await Promise.map(material, async ({name, data, mimetype}) => {
    const fileName = `${Date.now().toString()}-${name}`;
    const fileStream = Readable.from(data);
    await S3.uploadStream(fileName, fileStream, mimetype);
    files.push({name: fileName, type: mimetype});
  });

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
};
