const usersService = require('../../services/users');
const authService = require('../../services/auth');

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    return res.success(users);
  } catch (error) {
    return res.badRequest('Invalid parameters');
  }
};

const login = async (req, res, next) => {
  const {
    username,
    password,
  } = req.body;
  const {type} = req.params;

  if (!username || !password) {
    return res.missingParams(req.body);
  }

  const user = await usersService.authenticate(username, password, type);
  const {
    accessToken,
    refreshToken,
  } = await authService.generateTokens(user);

  // set HTTP cookies used for authentication
  res.cookie('refresh_token', refreshToken, {
    maxAge: 3600000,
    httpOnly: true,
  }); // 1h
  res.cookie('access_token', accessToken, {
    maxAge: 1800000,
    httpOnly: true,
  }); // 30min
  return res.success(user);
};

const logout = async (req, res, next) => {
  res.clearCookie('refresh_token');
  res.clearCookie('access_token');
  return res.success();
};

const register = async (req, res) => {
  const {type} = req.params;
  const userData = req.body;
  const user = await usersService.register(userData, type);
  return res.success(user);
};

module.exports = {
  getAllUsers,
  login,
  register,
  logout,
};
