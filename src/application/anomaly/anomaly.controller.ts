import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { dnaBodySchema } from "../../domain/schemas/anomaly.schema";
import { PostValidateAnomaly } from "./usecases/postValidateAnomaly";
import { GetAnomalyStatistics } from "./usecases/getAnomalyStatistics";
import { ErrorHandler } from "../../utils/errorHandler";

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
      throw new ErrorHandler(error as any, 400);
    }
  }

  async postValidateAnomaly(req: Request, res: Response): Promise<any> {
    try {
      const body = dnaBodySchema.parse(req.body);
      return await this.PostValidateAnomaly.execute(body);
    } catch (error) {
      throw new ErrorHandler(error as any, 400);
    }
  }
}
