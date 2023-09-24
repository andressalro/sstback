import { IStatsAnomaly } from "../interfaces/anomaly.interface";
import { IStatsAnomalyResponse } from "../interfaces/responses/anomaly.response";
import { Anomaly } from "./anomaly.entity";

export class StatsAnomaly implements IStatsAnomaly {
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

  toResponse() {
    const statsAnomalyResponse: IStatsAnomalyResponse = {
      count_anomalies: this.totalAnomalous,
      count_no_anomales: this.totalNonAnomalous,
      ratio: this.percentageAnomalous,
    };
    return statsAnomalyResponse;
  }
}
