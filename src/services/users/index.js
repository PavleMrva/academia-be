const UsersModel = require('../../models/users');
const StudentsModel = require('../../models/students');

const getAllUsers = () => {
  return UsersModel.findAll({
    include: [{
      model: StudentsModel,
    }],
    attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'gender', 'phone'],
  });
};

const authenticate = async (username, password, type) => {
  const user = await UsersModel.findOne({
    where: {username},
    attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'password'],
  });

  const userExists = await user.userByTypeExists(type);
  if (!userExists) {
    throw new UsersModel.Errors.UserTypeWithUsernameNotFound(type, username);
  }

  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new UsersModel.Errors.UserPasswordIncorrect();
  }

  return {
    userId: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

const register = async (userData, type) => {
  return await UsersModel.register(userData, type);
};

module.exports = {
  getAllUsers,
  authenticate,
  register,
};
