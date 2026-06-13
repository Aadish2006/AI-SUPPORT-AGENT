import { logger } from '../utils/logger.js';

export function requestLogger(req, _res, next) {
  req.requestStartedAt = Date.now();
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
}
