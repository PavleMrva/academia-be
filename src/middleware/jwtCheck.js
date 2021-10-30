const jwt = require('jsonwebtoken');
const logger = require('../libs/logger');
const authService = require('../services/auth');

module.exports = async (req, res, next) => {
  const receivedAccessToken = req.cookies['access_token'];
  const receivedRefreshToken = req.cookies['refresh_token'];

  try {
    const {
      accessToken,
      refreshToken,
    } = await authService.checkTokens(receivedAccessToken, receivedRefreshToken);

    // set HTTP cookies used for authentication
    res.cookie('refresh_token', refreshToken, {maxAge: 3600000, httpOnly: true}); // 1h
    res.cookie('access_token', accessToken, {maxAge: 1800000, httpOnly: true}); // 30min
    req.user = jwt.decode(refreshToken);
    next();
  } catch (err) {
    logger.error('[jwtCheck] Invalid or not provided access or refresh tokens');
    return res.unauthorized();
  }
};
