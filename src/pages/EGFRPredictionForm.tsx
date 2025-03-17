import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  EGFRPredictionRequest,
  EGFRPredictionResponse,
} from "@/types/egfr-types";
import { predictEGFR } from "@/services/egfrService";

const EGFRPredictionForm = () => {
  const [egfrData, setEgfrData] = useState<{ [key: string]: string }>({});
  const [prediction, setPrediction] = useState<EGFRPredictionResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (year: string, value: string) => {
    setEgfrData((prev) => ({ ...prev, [year]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const years = Object.keys(egfrData).map((year) => parseInt(year));
      const egfrValues = Object.values(egfrData).map((value) =>
        parseFloat(value)
      );

      const requestData: EGFRPredictionRequest = {
        years,
        egfr_values: egfrValues,
      };

      const response = await predictEGFR(requestData);
      if (!response) throw new Error("No response from server");
      setPrediction(response);
      setIsModalOpen(true); // Open the modal when prediction is successful

      toast.success("Prediction successful!");
    } catch (error) {
      toast.error("Failed to predict eGFR. Please try again later.");
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">eGFR Prediction Form</h2>
      <div className="grid grid-cols-3 gap-6 mb-6">
        {[2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map((year) => (
          <div key={year}>
            <Label htmlFor={`egfr-${year}`} className="text-lg font-semibold">
              eGFR {year}
            </Label>
            <Input
              id={`egfr-${year}`}
              type="number"
              value={egfrData[year] || ""}
              onChange={(e) =>
                handleInputChange(year.toString(), e.target.value)
              }
              placeholder={`Enter eGFR for ${year}`}
              className="p-3 text-lg border border-gray-400 rounded-md w-full"
            />
          </div>
        ))}
      </div>

      <Button 
        onClick={handleSubmit} 
        disabled={isLoading} 
        className="w-full text-xl py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        {isLoading ? "Predicting..." : "Predict Next 10 Years"}
      </Button>

      {/* Prediction Modal */}
      {prediction && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="mt-6 w-full text-lg bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800">
              View Prediction
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Predicted eGFR Chart</h2>
            {prediction.image_url ? (
              <img
                src={`http://127.0.0.1:5002${prediction.image_url}`}
                alt="Predicted eGFR"
                className="w-full rounded-lg shadow-lg"
              />
            ) : (
              <p className="text-center text-red-500">No prediction available.</p>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EGFRPredictionForm;