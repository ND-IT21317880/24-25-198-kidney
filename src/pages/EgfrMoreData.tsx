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
      className="w-full min-h-screen p-10 bg-gray-50 flex justify-center items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl w-full grid grid-cols-3 gap-8">
        {/* Container 1: Importance */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-red-600 flex items-center mb-4">
            <span className="mr-2">📌</span> Why is eGFR Prediction Important?
          </h2>
          <p className="text-gray-700 mb-4">
            Estimated Glomerular Filtration Rate (eGFR) is a key indicator of kidney function.
            Tracking eGFR can:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-3 text-blue-500">🔍</span>
              <span>Detect early signs of kidney disease</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-amber-500">⚠️</span>
              <span>Predict progression towards chronic kidney disease (CKD)</span>
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

        {/* Container 2: How It Works */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-bold flex items-center mb-4">
            <span className="mr-2">🔧</span> How Does This Model Work?
          </h2>
          <p className="text-gray-700 mb-4">
            This AI-driven model predicts your kidney function based on{" "}
            <strong>Serum Creatinine, Age, and Gender</strong> using a trained
            Random Forest algorithm. It provides:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-3">📊</span>
              <span><strong>Backward Analysis:</strong> Past eGFR trends (6+ years)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">🔮</span>
              <span><strong>Forward Forecasting:</strong> Next 10 years of eGFR predictions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-amber-500">⚠️</span>
              <span><strong>Risk Analysis:</strong> Identifies kidney disease progression</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-pink-500">📉</span>
              <span><strong>Graphical Insights:</strong> Visualizes kidney function decline</span>
            </li>
          </ul>
        </motion.div>

        {/* Container 3: Features */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-red-500 flex items-center mb-4">
            <span className="mr-2">🚀</span> Features Implemented in this Web App:
          </h2>
          <ul className="space-y-3">
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
              <span>Risks Alerts for Moderate to Severe Kidney Disease</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EgfrMoreData;
