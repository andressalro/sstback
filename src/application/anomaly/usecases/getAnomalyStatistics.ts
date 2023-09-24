import { inject, injectable } from "tsyringe";
import { AnomalyRepository } from "../../../infrastructure/db/repositories/anomaly.repository";
import { AnomalyService } from "../../../services/anomaly.service";
import { Anomaly } from "../../../domain/entities/anomaly.entity";
import { StatsAnomaly } from "../../../domain/entities/statsAnomaly.entity";

@injectable()
export class GetAnomalyStatistics {
  constructor(
    @inject("AnomalyRepository") private anomalyRepo: AnomalyRepository
  ) {}

  async execute(): Promise<any> {
    const resultAnomalies: Anomaly[] = await this.anomalyRepo.findAll();
    const statsAnomaly = new StatsAnomaly(resultAnomalies);
    return statsAnomaly.toResponse();
  }
}
