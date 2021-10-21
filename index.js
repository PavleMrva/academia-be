require('dotenv').config();

const config = require('./src/config');
const app = require('./src/app');
const logger = require('pino')();

let server;

main();

async function main() {
  try {
    setupProcessListeners();
    await setupServer();
  } catch (err) {
    logger.error('Error during bootstrap', err);
    stopGracefully();
  }
}

function setupServer() {
  server = app.listen(config.nodePort, () => {
    logger.info(`Listening on ${config.nodePort}`);
  });
}

function setupProcessListeners() {
  process.on('uncaughtException', (err) => {
    logger.error('uncaughtException', err);
  });

  process.on('unhandledRejection', (err) => {
    logger.error('unhandledRejection', err);
  });

  ['SIGINT', 'SIGTERM'].map((signal) => {
    process.once(signal, () => stopGracefully(signal));
  });
}

async function stopGracefully(signal) {
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
}

async function stopServices() {
  await server.close();
  logger.warn('HTTP server closed');
}
