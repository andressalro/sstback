import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

type CustomError = {
  statusCode?: number;
  message: string;
  stack?: string;
};

export const devMiddleware: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode);
  res.json(message);
};

export const prodMiddleware: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode);
  res.json({ statusCode, message });
};
