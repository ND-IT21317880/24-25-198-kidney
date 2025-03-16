export interface WaterParameters {
  "Na+(mg/L) (ppb)": number;
  "K+(mg/L) (ppb)": number;
  "Ca2+(mg/L) (ppb)": number;
  "Mg2+(mg/L) (ppb)": number;
  "Si4+ (mg/L) (ppb)": number;
  "HCO3-  (mg/L) (ppb)": number;
  "F- (mg/L) (ppb)": number;
  "Br- (mg/L) (ppb)": number;
  "SO42- (mg/L) (ppb)": number;
  "Total Hardness (mg/L) (ppb)": number;
}

export interface RiskProbabilities {
  "High Risk": string;
  "Low Risk": string;
  "Medium Risk": string;
}

export interface OverallRisk {
  confidence: string;
  level: string;
  probabilities: RiskProbabilities;
}

export interface ParameterThreshold {
  high: number;
  very_high: number;
}

export interface ParameterAnalysis {
  risk_level: string;
  threshold: ParameterThreshold;
  value: number;
}

export interface WaterQualityPredictionResponse {
  overall_risk: OverallRisk;
  parameter_analysis: {
    [key: string]: ParameterAnalysis;
  };
  provided_parameters: number;
  total_parameters: number;
}

export interface WaterQualityPredictionRequest {
  water_parameters: WaterParameters;
}
