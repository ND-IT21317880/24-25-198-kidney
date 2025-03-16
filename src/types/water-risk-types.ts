export interface WaterRiskLocationRequest {
  lat: number;
  lon: number;
}

export interface WaterRiskLocationResponse {
  map_path: string;
  risk_level: string;
}
