import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const server = app.listen(env.port, () => {
  logger.info(`Support agent API listening on port ${env.port}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Closing HTTP server.');
  server.close(() => process.exit(0));
});
