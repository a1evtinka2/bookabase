import { type NextFunction, type Request, type Response } from 'express';
import { AppError } from '../models/error.ts';

export default function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
    });

    return;
  }
  
  res.status(500).json({
    error: err,
  });;
}