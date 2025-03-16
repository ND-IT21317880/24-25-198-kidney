import {
  WaterRiskLocationRequest,
  WaterRiskLocationResponse,
} from "@/types/water-risk-types";

const API_URL = "http://127.0.0.1:5006/predict"; // Replace with your API endpoint

// Fetch water risk prediction based on location
export const predictWaterRisk = async (
  requestData: WaterRiskLocationRequest
): Promise<WaterRiskLocationResponse> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch water risk prediction");
  }

  return response.json();
};
