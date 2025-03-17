import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EgfrPredictionDashboard = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
      className="p-6 max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Reusable Card Component */}
        {[
          {
            title: "📌 Why is eGFR Prediction Important?",
            textColor: "text-blue-600",
            content: [
              "🔍 Detect early signs of kidney disease",
              "⚠️ Predict progression towards chronic kidney disease (CKDU)",
              "📉 Monitor how kidney function changes over time",
              "💡 Help make informed health decisions",
            ],
          },
          {
            title: "🔧 How Does This Model Work?",
            textColor: "text-blue-700",
            content: [
              "📊 Backward Analysis: Past eGFR trends (6+ years)",
              "🔮 Forward Forecasting: Next 10 years of eGFR predictions",
              "⚠️ Risk Analysis: Identifies kidney disease progression",
              "📉 Graphical Insights: Visualizes kidney function decline",
            ],
          },
          {
            title: "🚀 Features Implemented in this Web App:",
            textColor: "text-blue-500",
            content: [
              "📝 User inputs: Age, Gender, Serum Creatinine, Year",
              "🔍 Real-time eGFR Calculation using CKD-EPI Equation",
              "📊 Graphical Analysis (Backward & Forward Trends)",
              "⚠️ Risk Alerts for Moderate to Severe Kidney Disease",
            ],
          },
        ].map((card, index) => (
          <motion.div key={index} variants={itemVariants} className="h-full">
            <motion.div
              className="h-full"
              whileHover={{
                y: -5,
                scale: 1.03,
                boxShadow: "0px 10px 20px rgba(59, 130, 246, 0.5)", // Blue shadow
                borderColor: "#3b82f6", // Tailwind 'blue-500'
              }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full border border-gray-300 shadow-md p-6 transition-all hover:border-blue-500">
                <CardHeader>
                  <CardTitle className={`text-xl font-bold flex items-center ${card.textColor}`}>
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    {card.content.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">{item.split(" ")[0]}</span>
                        <span>{item.substring(item.indexOf(" ") + 1)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EgfrPredictionDashboard;
