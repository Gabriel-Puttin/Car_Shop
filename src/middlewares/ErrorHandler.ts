import { NextFunction, Request, Response } from 'express';
import ErrorMap from '../utils/ErrorMap';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { message, status } = error as ErrorMap;
    res.status(status || 500).json({ message });
    next();
  }
}

export default ErrorHandler;