const {Sequelize} = require('sequelize');
const logger = require('../libs/logger');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: logger.info,
});

module.exports = sequelize;
