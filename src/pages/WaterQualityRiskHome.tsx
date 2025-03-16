import { Button } from "@/components/ui/button";
import WaterQualityPredictionForm from "@/components/WaterQualityForm";

const WaterQualityRiskHome = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 sm:px-16 lg:px-32 py-8 w-full min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      {/* Title */}
      <h1
        className="font-bold text-center w-full mb-10 sm:mb-14"
        style={{
          fontSize: "clamp(32px, 5vw, 60px)", // Responsive font size
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        Water Quality Risk Prediction for 
        CKDu
      </h1>

      {/* Form Section */}
      <div className="w-full flex flex-col items-center">
        <WaterQualityPredictionForm />
      </div>

      {/* Buttons Section */}
      <div className="flex flex-wrap mt-8 gap-6 justify-center">
        <Button
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => window.location.href = "/water-risk-location"}
        >
          My Location Based Prediction
        </Button>
        <Button
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={() => window.location.href = "/water-quality-recommendations"}
        >
          Recommendations
        </Button>
      </div>
    </div>
  );
};

export default WaterQualityRiskHome;
