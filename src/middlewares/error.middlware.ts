// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

// Global error handling middleware to catch unexpected errors
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('🔥 Error Handler Caught:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message,
    // Provide additional context if available, but avoid leaking stack traces in production
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};