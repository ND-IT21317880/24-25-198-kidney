import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import EnvSriLankaMap from "@/components/EnvSriLankaMap";

interface FormData {
  sodium: string;
  calcium: string;
  magnesium: string;
  chloride: string;
  temperature: string;
}

const Prediction: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    sodium: "",
    calcium: "",
    magnesium: "",
    chloride: "",
    temperature: "",
  });

  const [prediction, setPrediction] = useState<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ prediction: number }>(
        "http://127.0.0.1:5000/predict",
        formData
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
          CKDu Risk Prediction
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <form onSubmit={handleSubmit} className="mt-4">
              {[
                { key: "sodium", label: "Sodium (mg/L)" },
                { key: "calcium", label: "Calcium (mg/L)" },
                { key: "magnesium", label: "Magnesium (mg/L)" },
                { key: "chloride", label: "Chloride (mg/L)" },
                { key: "temperature", label: "Temperature (°C)" },
              ].map(({ key, label }) => (
                <div key={key} className="mb-4">
                  <label className="block text-gray-700 font-semibold">
                    {label}:
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key as keyof FormData]}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Predict Risk
              </button>
            </form>
            {prediction !== null && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
                <h3 className="text-xl font-semibold">Prediction Result:</h3>
                <p
                  className={`text-lg font-bold mt-2 ${
                    prediction === 1 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {prediction === 1 ? "Risk" : "Not Risk"}
                </p>
              </div>
            )}
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4">
              Risk Areas in Sri Lanka
            </h3>
            <EnvSriLankaMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
