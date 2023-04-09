import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../utils/errorResponse';

export const errorHandler = (
  err: Error | ErrorResponse,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error: Error | ErrorResponse = err;

  error.message = err.message;

  // Mongoose bad ObjectId format
  if (err.name === 'CastError') {
    const message = 'Bad ObjectId format';

    error = new ErrorResponse(message, 404);
  }

  const statusCode = error instanceof ErrorResponse ? error.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    error: error.message || 'Internal server error'
  });
};
