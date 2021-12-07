require('dotenv').config();
global.Promise = require('bluebird');

const {sequelize} = require('./src/models');
const config = require('./src/config');
const app = require('./src/app');
const logger = require('./src/libs/logger');

let server;

const setupProcessListeners = () => {
  process.on('uncaughtException', (err) => {
    logger.error({err}, 'uncaughtException');
  });

  process.on('unhandledRejection', (err) => {
    logger.error({err}, 'unhandledRejection');
  });

  ['SIGINT', 'SIGTERM'].map((signal) => {
    process.once(signal, () => stopGracefully(signal));
  });
};

const setupSequelize = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
    // await sequelize.sync({force: true});
    // logger.info('All models were synchronized successfully.');
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error}`);
  }
};

const setupServer = () => {
  server = app.listen(config.nodePort, () => {
    logger.info(`Listening on ${config.nodePort}`);
  });
};

const stopServices = async () => {
  await server.close();
  logger.warn('HTTP server closed');
  await sequelize.close();
  logger.warn('MySQL connection closed');
};

const stopGracefully = async (signal) => {
  if (signal) {
    logger.warn(`Got ${signal} signal`);
  }

  logger.warn('Stopping gracefully');

  try {
    await stopServices();
    process.exit(0);
  } catch (err) {
    logger.error('Could not stop gracefully, force stopping', {error: err});
    process.exit(1);
  }
};

const main = async () => {
  try {
    setupProcessListeners();
    await setupSequelize();
    await setupServer();
  } catch (err) {
    logger.error('Error during bootstrap', err);
    stopGracefully();
  }
};

main();
