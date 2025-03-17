import { motion } from "framer-motion";
import DataSection from "./DataSection";
import { useNavigate } from "react-router-dom";

const EgfrHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative w-full h-[50vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <h1 className="text-xl md:text-6xl font-bold text-black drop-shadow-lg">
            Welcome to the eGFR Prediction
          </h1>
          <p className="text-lg md:text-xl text-black mt-4 max-w-2xl mx-auto">
            A cutting-edge AI model designed to predict EGFR levels with high
            accuracy.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
          onClick={() => {
            navigate("/egfr-prediction-form-one");
          }}
        >
          Try the Model
        </motion.button>
      </section>
      <DataSection />
    </>
  );
};

export default EgfrHome;
