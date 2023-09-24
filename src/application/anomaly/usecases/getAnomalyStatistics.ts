import { inject, injectable } from "tsyringe";
import { AnomalyRepository } from "../../../infrastructure/db/repositories/anomaly.repository";
import { Anomaly } from "../../../domain/entities/anomaly.entity";
import { StatsAnomaly } from "../../../domain/entities/statsAnomaly.entity";
import { IStatsAnomalyResponse } from "../../../domain/interfaces/responses/anomaly.response";

@injectable()
export class GetAnomalyStatistics {
  constructor(
    @inject("AnomalyRepository") private anomalyRepo: AnomalyRepository
  ) {}

  async execute(): Promise<IStatsAnomalyResponse> {
    const resultAnomalies: Anomaly[] = await this.anomalyRepo.findAll();
    const statsAnomaly = new StatsAnomaly(resultAnomalies);
    return statsAnomaly.toResponse();
  }
}
