import { Card } from "@/components/ui/card";
import EGFRPredictionForm from "./EGFRPredictionForm";
import image from "@/assets/image333.jpeg";
const EGFRPredictionPage = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center w-full h-full">
      <Card className="w-full flex items-center justify-center mb-10">
        <h1 className="text-2xl font-bold mb-4">eGFR Prediction</h1>
      </Card>

      <div className="flex w-full">
        <Card className="flex-1">
          <EGFRPredictionForm />
        </Card>
        <div className="flex-1">
          <img src={image} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default EGFRPredictionPage;
