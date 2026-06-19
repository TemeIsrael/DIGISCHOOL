import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqId = req.headers['x-request-id'] || 'N/A';
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`[Error] RequestId: ${reqId} - Status: ${status} - Message: ${message}`, {
    stack: err.stack,
    reqId
  });

  res.status(status).json({
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: message,
      details: err.details || undefined
    }
  });
};
