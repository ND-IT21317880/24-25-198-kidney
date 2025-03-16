import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import homeImage from "@/assets/imagee.jpeg";

const EgfrPredictionDashboard = () => {
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
      className="p-6 max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Main Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 flex items-center">
          <span className="mr-2">📌</span> Why is eGFR Prediction Important?
        </h1>
        <p className="mt-2 text-gray-700">
          Estimated Glomerular Filtration Rate (eGFR) is a key indicator of
          kidney function. Tracking eGFR can:
        </p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <span className="mr-2 mt-1">🔍</span>
            <span>Detect early signs of kidney disease</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-1">⚠️</span>
            <span>
              Predict progression towards chronic kidney disease (CKD)
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-1">📉</span>
            <span>Monitor how kidney function changes over time</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-1">💡</span>
            <span>Help make informed health decisions</span>
          </li>
        </ul>
      </motion.div>

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Model Info Card - Spans 2 columns */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <span className="mr-2">🔧</span> How Does This Model Work?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This AI-driven model predicts your kidney function based on{" "}
                <strong>Serum Creatinine, Age, and Gender</strong> using a
                trained <strong>Random Forest algorithm</strong>. It provides:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">🔄</span>
                  <span>
                    <strong>Backward Analysis</strong>: Past eGFR trends (6+
                    years)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">🔮</span>
                  <span>
                    <strong>Forward Forecasting</strong>: Next 10 years of eGFR
                    predictions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">⚠️</span>
                  <span>
                    <strong>Risk Analysis</strong>: Identifies kidney disease
                    progression
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">📉</span>
                  <span>
                    <strong>Graphical Insights</strong>: Visualizes kidney
                    function decline
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Kidney Image Card */}
        <motion.div variants={itemVariants}>
          <Card className="h-full flex items-center justify-center p-4 bg-blue-50">
            <CardContent>
              <img
                src={homeImage}
                alt="Kidney illustration with blood test vial"
                className="max-w-full h-auto rounded"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Card - Full width */}
        <motion.div variants={itemVariants} className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <span className="mr-2">🚀</span> Features Implemented in this
                Web App:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">📝</span>
                  <span>User inputs: Age, Gender, Serum Creatinine, Year</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">🔍</span>
                  <span>
                    Real-time eGFR Calculation using{" "}
                    <strong>CKD-EPI Equation</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">📊</span>
                  <span>Graphical Analysis (Backward & Forward Trends)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">⚠️</span>
                  <span>Risk Alerts for Moderate to Severe Kidney Disease</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EgfrPredictionDashboard;
