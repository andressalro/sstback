export interface IValidateAnomaly {
  dna: string[][];
}

export interface IAnomaly {
  id: number;
  description: string;
  isAnomalous: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStatsAnomaly {
  totalRecords: number;
  totalAnomalous: number;
  totalNonAnomalous: number;
  percentageAnomalous: number;
}

export interface ICheckDirectionInput {
  matrix: string[][];
  x: number;
  y: number;
  dx: number;
  dy: number;
  rows: number;
  cols: number;
}
