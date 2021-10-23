const studentsService = require('../../services/students');

const getAllStudents = async (req, res) => {
  try {
    const students = await studentsService.getAllStudents();
    return res.success(students);
  } catch (error) {
    return res.badRequest('Invalid parameters', error);
  }
};

module.exports = {
  getAllStudents,
};
