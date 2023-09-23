import { inject, injectable } from "tsyringe";
import { AnomalyRepository } from "../../../infrastructure/db/repositories/anomaly.repository";

@injectable()
export class GetAnomalyStatistics {
  constructor(
    @inject("AnomalyRepository") private anomalyRepo: AnomalyRepository
  ) {}

  async execute(): Promise<any> {
    //Ejecutar logica de stats
    const result = await this.anomalyRepo.findAll();
    console.log(result);
    return { success: true };
  }
}
