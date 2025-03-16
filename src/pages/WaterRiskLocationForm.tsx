import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { predictWaterRisk } from "@/services/waterRiskService";
import { WaterRiskLocationResponse } from "@/types/water-risk-types";
import { Card } from "@/components/ui/card";
import chartImage from "@/assets/chart.jpeg";

const WaterRiskLocationForm = () => {
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const [prediction, setPrediction] =
    useState<WaterRiskLocationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const requestData = { lat: parseFloat(lat), lon: parseFloat(lon) };
      const response = await predictWaterRisk(requestData);
      setPrediction(response);
      toast.success("Prediction successful!");
    } catch (error) {
      toast.error("Failed to predict water risk.");
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 w-full flex gap-16">
      <div className="flex-1 flex flex-col gap-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md mx-auto w-full"
        >
          <div>
            <Label htmlFor="lat">Latitude</Label>
            <Input
              id="lat"
              type="number"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Enter latitude"
              required
            />
          </div>
          <div>
            <Label htmlFor="lon">Longitude</Label>
            <Input
              id="lon"
              type="number"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              placeholder="Enter longitude"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Predicting..." : "Predict Water Risk"}
          </Button>
        </form>
        <img style={{ width: "100%" }} src={chartImage} />
      </div>

      {prediction && (
        <Card className="mx-auto flex-1 px-16">
          <h2 className="text-xl font-bold mb-4">Prediction Results</h2>
          <p className="text-lg">
            Risk Level:{" "}
            <span className="font-semibold">{prediction.risk_level}</span>
          </p>
          <div className="mt-4">
            <Label>Map</Label>
            <iframe
              src={`http://127.0.0.1:5006/${prediction.map_path}`}
              title="Risk Map"
              className="w-full h-96 border rounded-lg"
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default WaterRiskLocationForm;
