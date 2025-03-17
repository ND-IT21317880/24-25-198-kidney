import { Card } from "@/components/ui/card";
import EGFRPredictionForm from "./EGFRPredictionForm";
import image from "@/assets/image333.jpeg";

const EGFRPredictionPage = () => {
  return (
    <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
      {/* Title Card */}
      <Card className="w-full max-w-3xl flex items-center justify-center mb-10 p-6 shadow-md bg-white">
        <h1 className="text-3xl font-bold text-center">eGFR Prediction</h1>
      </Card>

      {/* Content Layout: Form & Image */}
      <div className="flex w-full max-w-5xl gap-8">
        {/* Left Side: Form */}
        <Card className="flex-1 p-6 shadow-lg bg-white">
          <EGFRPredictionForm />
        </Card>

        {/* Right Side: Image */}
        <div className="flex-1 flex items-center justify-center">
          <img src={image} alt="Prediction Illustration" className="w-96 h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default EGFRPredictionPage;
