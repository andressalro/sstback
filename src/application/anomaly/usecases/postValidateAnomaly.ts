import { inject, injectable } from "tsyringe";
import { IValidateAnomaly } from "../../../domain/interfaces/anomaly.interface";
import { AnomalyService } from "../../../services/anomaly.service";
import { AnomalyRepository } from "../../../infrastructure/db/repositories/anomaly.repository";
import { Anomaly } from "../../../domain/entities/anomaly.entity";
import { ErrorHandler } from "../../../utils/errorHandler";
import { IValidateAnomalyResponse } from "../../../domain/interfaces/responses/anomaly.response";

@injectable()
export class PostValidateAnomaly {
  constructor(
    @inject("AnomalyService") private anomalyService: AnomalyService,
    @inject("AnomalyRepository") private anomalyRepo: AnomalyRepository
  ) {}

  async execute(body: IValidateAnomaly): Promise<IValidateAnomalyResponse> {
    const rows = body.dna.length;
    const cols = body.dna[0].length;
    const description = `${rows} x ${cols}`;
    const isAnomaly = this.anomalyService.checkForAnomaly(body.dna);
    const anomaly = new Anomaly(0, description, isAnomaly);
    const createAnomaly: Anomaly = await this.anomalyRepo.create(anomaly);
    if (!createAnomaly.isAnomalous) {
      throw new ErrorHandler("Not exist anomaly", 403);
    }
    return { message: "Exist anomaly" };
  }
}
