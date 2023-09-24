import { inject, injectable } from "tsyringe";
import { AnomalyRepository } from "../../../infrastructure/db/repositories/anomaly.repository";
import { AnomalyService } from "../../../services/anomaly.service";
import { Anomaly } from "../../../domain/entities/anomaly.entity";
import { StatsAnomaly } from "../../../domain/entities/statsAnomaly.entity";

@injectable()
export class GetTest {
  constructor(
    @inject("AnomalyService") private anomalyService: AnomalyService
  ) {}

  async execute(): Promise<any> {
    // this.anomalyService.generateMatrixMala()
    return { success: true };
  }
}
