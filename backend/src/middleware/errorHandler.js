import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

export function errorHandler(error, _req, res, _next) {
  logger.error(error);

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    details: process.env.NODE_ENV === 'production' ? undefined : error.message
  });
}
