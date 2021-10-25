const {
  UsersModel,
} = require('../../models/users');

const getAllUsers = () => {
  return UsersModel.findAll({
    include: [{
      model: UsersModel,
    }],
  });
};

const authenticate = async (username, password, type) => {
  const user = await UsersModel.findOne({
    where: {username},
    attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'password'],
  });

  if (!user) {
    throw new UsersModel.Errors.UserWithUsernameNotFound(username);
  }

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

const register = async () => {};

module.exports = {
  getAllUsers,
  authenticate,
  register,
};
