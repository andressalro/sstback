import { IAnomaly } from "../interfaces/anomaly.interface";

export class Anomaly implements IAnomaly {
  constructor(
    public id: number,
    public description: string,
    public isAnomalous: boolean,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
