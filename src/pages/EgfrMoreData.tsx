import { motion } from "framer-motion";

const EgfrMoreData = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto border border-gray-200 rounded-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Importance Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-bold text-red-600 flex items-center mb-4">
          <span className="mr-2">📌</span> Why is eGFR Prediction Important?
        </h2>
        <p className="text-gray-700 mb-4">
          Estimated Glomerular Filtration Rate (eGFR) is a key indicator of
          kidney function. Tracking eGFR can:
        </p>
        <ul className="space-y-3 pl-2">
          <li className="flex items-start">
            <span className="mr-3 text-blue-500">🔍</span>
            <span>Detect early signs of kidney disease</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-amber-500">⚠️</span>
            <span>
              Predict progression towards chronic kidney disease (CKDU)
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-pink-500">📉</span>
            <span>Monitor how kidney function changes over time</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-yellow-500">💡</span>
            <span>Help make informed health decisions</span>
          </li>
        </ul>
      </motion.div>

      {/* Model Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-bold flex items-center mb-4">
          <span className="mr-2">🔧</span> How Does This Model Work?
        </h2>
        <p className="text-gray-700 mb-4">
          This AI-driven model predicts your kidney function based on{" "}
          <strong>Serum Creatinine, Age, and Gender</strong> using a trained
          Random Forest algorithm. It provides:
        </p>
        <ul className="space-y-3 pl-2">
          <li className="flex items-start">
            <span className="mr-3">📊</span>
            <div>
              <strong>Backward Analysis</strong>: Past eGFR trends (6+ years)
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-3">🔮</span>
            <div>
              <strong>Forward Forecasting</strong> Next 10 years of eGFR
              predictions
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-amber-500">⚠️</span>
            <div>
              <strong>Risk Analysis</strong>: Identifies kidney disease
              progression
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-pink-500">📉</span>
            <div>
              <strong>Graphical Insights</strong>: Visualizes kidney function
              decline
            </div>
          </li>
        </ul>
      </motion.div>

      {/* Features Section */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-red-500 flex items-center mb-4">
          <span className="mr-2">🚀</span> Features Implemented in this Web App:
        </h2>
        <ul className="space-y-3 pl-2">
          <li className="flex items-start">
            <span className="mr-3">📝</span>
            <span>User inputs: Age, Gender, Serum Creatinine, Year</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-blue-500">🔍</span>
            <span>
              Real-time eGFR Calculation using <strong>CKD-EPI Equation</strong>
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-3">📊</span>
            <span>Graphical Analysis (Backward & Forward Trends)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-amber-500">⚠️</span>
            <span>Risk Alerts for Moderate to Severe Kidney Disease</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default EgfrMoreData;
