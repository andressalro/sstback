import { ZodError } from "zod";
export class ErrorHandler extends Error {
  statusCode: number;
  formattedErrors?: any[];

  constructor(message: string, statusCode: number = 500, err?: ZodError) {
    super(message);
    this.statusCode = statusCode;
    if (err instanceof ZodError) {
      this.formattedErrors = err.issues.map((issue) => ({
        code: issue.code,
        message: issue.message,
        path: issue.path.join("."),
      }));
    }
    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }
}
