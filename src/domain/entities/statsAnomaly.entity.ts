import { IStatsAnomaly } from "../interfaces/anomaly.interface";
import { Anomaly } from "./anomaly.entity";

export class StatsAnomal implements IStatsAnomaly {
  totalRecords: number;
  totalAnomalous: number;
  totalNonAnomalous: number;
  percentageAnomalous: number;

  constructor(anomalies: Anomaly[]) {
    this.totalRecords = anomalies.length;
    this.totalAnomalous = anomalies.filter((a) => a.isAnomalous).length;
    this.totalNonAnomalous = this.totalRecords - this.totalAnomalous;
    this.percentageAnomalous = this.totalAnomalous / this.totalRecords;
  }
}
