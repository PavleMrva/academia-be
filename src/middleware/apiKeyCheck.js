const config = require('../config');

module.exports = (req, res, next) => {
  const bearerApiKey = 'Bearer ' + config.apiKey;

  const whitelistRoutes = [
    '/api/v1/ping',
    // TODO: change routes below
    '/api/v1/users/student/login',
    '/api/v1/users/teacher/login',
    '/api/v1/users/admin/login',
    '/api/v1/users/student/register',
    '/api/v1/users/teacher/register',
    '/api/v1/users/admin/register',
  ];

  if (whitelistRoutes.includes(req.path)) {
    return next();
  }

  const authHeader = req.header('Authorization');

  if (authHeader !== config.apiKey && authHeader !== bearerApiKey) {
    return res.forbidden('Invalid Authorization header');
  }

  next();
};
