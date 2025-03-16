import { ApiResponse } from "@/types/types";

export async function predictClassification(
  features: number[]
): Promise<ApiResponse> {
  const apiUrl = "http://127.0.0.1:5000/predict"; // Replace with your API URL

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error;
  }
}
