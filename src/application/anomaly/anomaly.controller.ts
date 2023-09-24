import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { dnaBodySchema } from "../../domain/schemas/anomaly.schema";
import { PostValidateAnomaly } from "./usecases/postValidateAnomaly";
import { GetAnomalyStatistics } from "./usecases/getAnomalyStatistics";
import { ErrorHandler } from "../../utils/errorHandler";
import { ZodError } from "zod";

@injectable()
export class AnomalyController {
  constructor(
    @inject("PostValidateAnomaly")
    private PostValidateAnomaly: PostValidateAnomaly,
    @inject("GetAnomalyStatistics")
    private GetAnomalyStatistics: GetAnomalyStatistics
  ) {}

  async getAnomalyStatistics(req: Request, res: Response): Promise<any> {
    try {
      return await this.GetAnomalyStatistics.execute();
    } catch (error) {
      throw new ErrorHandler(error as any, (error as any)?.statusCode || 400);
    }
  }

  async postValidateAnomaly(req: Request, res: Response): Promise<any> {
    try {
      const body = dnaBodySchema.parse(req.body);
      return await this.PostValidateAnomaly.execute(body);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ErrorHandler("Validation failed", 400, error);
      }
      throw new ErrorHandler(error as any, (error as any)?.statusCode || 400);
    }
  }
}
