import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/errorHandler";

type CustomError = {
  statusCode?: number;
  message: string;
  stack?: string;
};

export const devMiddleware: ErrorRequestHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode);
  res.json({ message });
};

export const prodMiddleware: ErrorRequestHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode);
  res.json({ statusCode, message });
};
