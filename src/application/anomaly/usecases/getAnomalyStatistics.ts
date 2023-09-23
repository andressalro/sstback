import { injectable } from "tsyringe";

@injectable()
export class GetAnomalyStatistics {
  constructor() {}

  async execute(): Promise<any> {
    //Ejecutar logica de stats
    return { success: true };
  }
}
