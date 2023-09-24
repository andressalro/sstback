export interface IStatsAnomalyResponse {
  count_anomalies: number;
  count_no_anomales: number;
  ratio: number;
}

export interface IValidateAnomalyResponse {
  message: string;
}
