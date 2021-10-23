const {UsersModel, StudentsModel} = require('../../models/users');

const getAllStudents = () => {
  return StudentsModel.findAll({
    include: [{
      model: UsersModel,
    }],
  });
};

module.exports = {
  getAllStudents,
};
