export interface eGFR {
  _id: string | null;
  gender: string;
  age: number;
  scValue: number;
  yearOfData: number;
  user: string; // User ID
}
export interface EGFRData {
  [year: number]: number; // Key-value pairs for year and eGFR value
}

export interface EGFRPredictionRequest {
  years: number[]; // Array of future years
  egfr_values: number[]; // Historical eGFR data
}

export interface EGFRPredictionResponse {
  image_url: string;
}
