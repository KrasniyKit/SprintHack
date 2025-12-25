export interface BaseStation {
  id: string;
  station_id: number;
  name: string;
  cover_area: number;
  frequency: number;
  ant_type: string;
  handover_min: number;
  handover_max: number;
  standard: string;
  coordinates: string;
  real_handover: number;
  cover_radius: number;
  cover_diameter: number;
}

export interface District {
  id: string;
  name: string;
  area: number;
  density: string; // 'med' | 'hard' и т.д.
}

export interface CalculationResult {
  district_name: string;
  area: number;
  buildings_coef: number;
  cover_radius: number;
  cells_quantity: number;
  cluster_size: number;
  handover_regulated: boolean;
  stations_quantity: number;
}