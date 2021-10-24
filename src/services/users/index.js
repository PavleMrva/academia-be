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
  const user = await UsersModel.findOne({where: {username}});

  if (!user) {
    throw new Error(`User with username ${username} not found`);
  }

  const userExists = await user.userByTypeExists(type);
  if (!userExists) {
    throw new Error(`User of type ${type} with username ${username} not found`);
  }

  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new Error('User password is incorrect');
  }

  return user;
};

const register = async () => {};

module.exports = {
  getAllUsers,
  authenticate,
  register,
};
