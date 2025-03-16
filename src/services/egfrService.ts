import {
  eGFR,
  EGFRPredictionRequest,
  EGFRPredictionResponse,
} from "@/types/egfr-types";

const API_URL = "http://localhost:8081/api/egfrs";

// Create a new eGFR record
export const createEgfr = async (egfrData: eGFR) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Include cookies
    body: JSON.stringify(egfrData),
  });
  return response.json();
};

// Get all eGFR records
export const getAllEgfrs = async () => {
  const response = await fetch(`${API_URL}`, {
    credentials: "include", // Include cookies
  });
  return response.json();
};

// Get eGFR records by user ID
export const getEgfrsByUserId = async (userId: string) => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    credentials: "include", // Include cookies
  });
  return response.json();
};

// Update an eGFR record
// export const updateEgfr = async (egfrId: string, egfrData) => {
//   const response = await fetch(`${API_URL}/${egfrId}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include", // Include cookies
//     body: JSON.stringify(egfrData),
//   });
//   return response.json();
// };

// Delete an eGFR record
export const deleteEgfr = async (egfrId: string) => {
  const response = await fetch(`${API_URL}/${egfrId}`, {
    method: "DELETE",
    credentials: "include", // Include cookies
  });
  return response.json();
};

const API_URL_ML = "http://127.0.0.1:5002/predict";

// Fetch predicted eGFR values
export const predictEGFR = async (
  requestData: EGFRPredictionRequest
): Promise<EGFRPredictionResponse> => {
  const response = await fetch(API_URL_ML, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch eGFR prediction");
  }

  return response.json();
};
