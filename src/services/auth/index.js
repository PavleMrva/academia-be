const jwt = require('jsonwebtoken');
const config = require('../../config');
const logger = require('../../libs/logger');

const verifyJWT = (token) => {
  return jwt.verify(token, config.jwt.secretKey);
};

const generateJWT = (payload, type) => {
  const expiresIn = type === 'access' ? config.jwt.accessTokenInvalidationTime : config.jwt.refreshTokenInvalidationTime;
  logger.info(`[generateJWT] jwtSecretKey: ${config.jwt.secretKey}`);
  logger.info(`[generateJWT] expiresIn: ${expiresIn}`);
  logger.info({info: '[generateJWT] payload: ', payload});
  return jwt.sign({user: payload}, config.jwt.secretKey, {expiresIn});
};

const generateTokens = async (payload) => {
  const accessToken = await generateJWT(payload, 'access');
  const refreshToken = await generateJWT(payload, 'refresh');
  return {
    accessToken,
    refreshToken,
  };
};

const checkTokens = async (accessToken, refreshToken) => {
  try {
    await Promise.map([accessToken, refreshToken], (token) => verifyJWT(token));
    return {accessToken, refreshToken};
  } catch (err) {
    // check if the refresh token expired (this could happen if user was inactive for 1 hour)
    await verifyJWT(refreshToken);
    logger.info('[checkTokens] refresh token is valid');
    logger.info('[checkTokens] generating new tokens');
    logger.info(`[checkTokens] refreshToken ${refreshToken}`);
    const {user} = jwt.decode(refreshToken);
    return generateTokens(user);
  }
};

module.exports = {
  generateTokens,
  checkTokens,
};
