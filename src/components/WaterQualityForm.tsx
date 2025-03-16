import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { predictWaterQuality } from "@/services/waterQualityService";
import {
  WaterQualityPredictionRequest,
  WaterQualityPredictionResponse,
} from "@/types/water-quality-types";
import { Card } from "./ui/card";
import image from "@/assets/page-1.png";

const WaterQualityPredictionForm = () => {
  const [waterParameters, setWaterParameters] = useState<
    WaterQualityPredictionRequest["water_parameters"]
  >({
    "Na+(mg/L) (ppb)": 0,
    "K+(mg/L) (ppb)": 0,
    "Ca2+(mg/L) (ppb)": 0,
    "Mg2+(mg/L) (ppb)": 0,
    "Si4+ (mg/L) (ppb)": 0,
    "HCO3-  (mg/L) (ppb)": 0,
    "F- (mg/L) (ppb)": 0,
    "Br- (mg/L) (ppb)": 0,
    "SO42- (mg/L) (ppb)": 0,
    "Total Hardness (mg/L) (ppb)": 0,
  });
  const [prediction, setPrediction] =
    useState<WaterQualityPredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    parameter: keyof typeof waterParameters,
    value: string
  ) => {
    setWaterParameters((prev) => ({
      ...prev,
      [parameter]: parseFloat(value),
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const requestData: WaterQualityPredictionRequest = {
        water_parameters: waterParameters,
      };
      const response = await predictWaterQuality(requestData);
      setPrediction(response);
      toast.success("Prediction successful!");
    } catch (error) {
      toast.error("Failed to predict water quality.");
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex gap-5 w-full h-full">
      <Card className="p-4 flex-1">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {Object.keys(waterParameters).map((parameter) => (
            <div key={parameter}>
              <Label htmlFor={parameter}>{parameter}</Label>
              <Input
                id={parameter}
                type="number"
                value={
                  waterParameters[parameter as keyof typeof waterParameters]
                }
                onChange={(e) =>
                  handleInputChange(
                    parameter as keyof typeof waterParameters,
                    e.target.value
                  )
                }
                placeholder={`Enter ${parameter}`}
              />
            </div>
          ))}
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Predicting..." : "Predict Water Quality"}
        </Button>
      </Card>
      <div className="flex-1 flex flex-col gap-8">
        <Card className="p-16">
          {prediction && (
            <>
              {" "}
              <h2 className="text-xl font-bold mb-4">Predicted Results</h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Overall Risk</h3>
                <p>
                  Confidence:{" "}
                  <span className="font-medium">
                    {prediction.overall_risk.confidence}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span>Level:</span>
                  <span
                    className={`
        font-bold px-2 py-1 rounded-full 
        ${prediction.overall_risk.level === "HIGH Risk" ? "text-red-500" : ""}
        ${
          prediction.overall_risk.level === "MEDIUM Risk"
            ? "text-yellow-400"
            : ""
        }
        ${prediction.overall_risk.level === "LOW Risk" ? "text-green-600" : ""}
      `}
                  >
                    {prediction.overall_risk.level}
                  </span>
                </p>
                <ul className="mt-2 space-y-1">
                  {Object.entries(prediction.overall_risk.probabilities).map(
                    ([risk, probability]) => (
                      <li key={risk} className="flex items-center gap-2">
                        <span>{risk}:</span>
                        <span
                          className={`w-4 h-4 rounded-full 
            ${risk === "High Risk" ? "bg-red-500" : ""} 
            ${risk === "Medium Risk" ? "bg-yellow-400" : ""} 
            ${risk === "Low Risk" ? "bg-green-600" : ""}`}
                        ></span>
                        <span>{probability}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>{" "}
            </>
          )}
          <div className="flex flex-col space-y-4">
            <img src={image} alt="img" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WaterQualityPredictionForm;
