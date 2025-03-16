import {
  WaterQualityPredictionRequest,
  WaterQualityPredictionResponse,
} from "@/types/water-quality-types";

const API_URL = "http://127.0.0.1:5005/predict"; // Replace with your API endpoint

// Fetch water quality prediction
export const predictWaterQuality = async (
  requestData: WaterQualityPredictionRequest
): Promise<WaterQualityPredictionResponse> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch water quality prediction");
  }

  return response.json();
};
