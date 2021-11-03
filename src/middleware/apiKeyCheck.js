const config = require('../config');

module.exports = (req, res, next) => {
  const bearerApiKey = 'Bearer ' + config.apiKey;
  const whitelistRoutesRegex = new RegExp(/\/(login|register|auth)$/);

  if (whitelistRoutesRegex.test(req.path)) {
    return next();
  }

  const authHeader = req.header('Authorization');

  if (authHeader !== config.apiKey && authHeader !== bearerApiKey) {
    return res.forbidden('Invalid Authorization header');
  }

  next();
};
