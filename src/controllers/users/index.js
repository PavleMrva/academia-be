const logger = require('../../libs/logger');
const usersService = require('../../services/users');

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    return res.success(users);
  } catch (error) {
    return res.badRequest('Invalid parameters', error);
  }
};

const login = async (req, res) => {
  const {username, password} = req.body;
  const {type} = req.params;

  if (!username || !password) {
    return res.missingParams(req.body);
  }

  try {
    const user = await usersService.authenticate(username, password, type);
    return res.success(user);
  } catch (error) {
    logger.warn(error);
    return res.badRequest(error);
  }
};

const register = async (req, res) => {};

module.exports = {
  getAllUsers,
  login,
  register,
};
