const {Sequelize} = require('sequelize');
const logger = require('../libs/logger');

const sequelize = new Sequelize('academia', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: (msg) => logger.debug(msg),
});

module.exports = sequelize;
