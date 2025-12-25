export interface BaseStation {
  id: string;
  name: string;
  type: string;
  coverageArea: number;
  frequency: number;
  handoverRange: string;
  standard: string;
}

export interface District {
  id: string;
  name: string;
  area: string;
}

export interface CalculationResult {
  id: string;
  totalStations: number;
  lowHandoverValue: boolean;
}