import WaterRiskLocationForm from "./WaterRiskLocationForm";

const WaterRiskLocationPage = () => {
  return (
    <div className="container mx-auto p-4 w-full px-32 h-full flex flex-col items-center justify-center">
      <h1 style={{ fontSize: 48 }} className="font-bold mb-4">
        Location Based Risk Prediction
      </h1>
      <WaterRiskLocationForm />
    </div>
  );
};

export default WaterRiskLocationPage;
