import { useState } from "react";
import { motion } from "framer-motion";

const WaterQualityRecommendationsPage = () => {
  const [selectedRisk, setSelectedRisk] = useState<"HIGH" | "MEDIUM" | "LOW" | null>("HIGH");

  const recommendations = {
    HIGH: [
      "High levels of toxic elements.",
      "Presence of harmful bacteria (E. coli, coliforms, etc.).",
      "Extremely hard water with high TDS (Total Dissolved Solids).",
      "Acidic or highly alkaline pH levels.",
      "Immediate Actions to Reduce Risk:",
      "Stop using this water source for drinking and cooking.",
      "Install Reverse Osmosis (RO) filtration or an Ion-exchange filter.",
      "Use bottled or government-supplied purified water.",
      "Promote rainwater harvesting as an alternative.",
      "Seek medical checkups for early detection of kidney disease symptoms.",
      "Request government intervention to provide clean water solutions for affected communities.",
    ],
    MEDIUM: [
      "Slightly high levels of heavy metals (but below critical thresholds).",
      "Moderate pH imbalance.",
      "Presence of bacteria but not at severe levels.",
      "Recommendations to Reduce Risk:",
      "Use activated carbon filters or reverse osmosis (RO) filtration to remove contaminants.",
      "Boil water before consumption to kill bacteria.",
      "Avoid prolonged use of this water source.",
      "Blend water sources (mixing with safer water sources).",
      "Improve sanitation around the water source to prevent further contamination.",
      "Encourage government intervention for water purification programs.",
    ],
    LOW: [
      "Meets WHO drinking water standards.",
      "Low levels of heavy metals.",
      "Free from harmful bacteria and pesticides.",
      "Recommendations:",
      "Continue using the same water source.",
      "Conduct periodic testing (every 6 months) to ensure quality.",
      "Promote awareness of safe water consumption.",
      "Maintain clean storage tanks and wells.",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Water Quality Safety Recommendations
      </h1>

      {/* Buttons Section */}
      <div className="flex justify-center space-x-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-lg font-semibold ${
            selectedRisk === "HIGH" ? "bg-red-600 text-white" : "bg-red-200 text-red-800"
          }`}
          onClick={() => setSelectedRisk("HIGH")}
        >
          HIGH Risk
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-lg font-semibold ${
            selectedRisk === "MEDIUM" ? "bg-yellow-500 text-white" : "bg-yellow-200 text-yellow-800"
          }`}
          onClick={() => setSelectedRisk("MEDIUM")}
        >
          MEDIUM Risk
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-lg font-semibold ${
            selectedRisk === "LOW" ? "bg-green-600 text-white" : "bg-green-200 text-green-800"
          }`}
          onClick={() => setSelectedRisk("LOW")}
        >
          LOW Risk
        </motion.button>
      </div>

      {/* Recommendations Section */}
      {selectedRisk && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">{selectedRisk} Risk Recommendations</h2>
          <ul className="space-y-2">
            {recommendations[selectedRisk].map((item, index) =>
              item.includes("Immediate Actions to Reduce Risk:") || 
              item.includes("Recommendations to Reduce Risk:") || 
              item.includes("Recommendations:") ? (
                <li key={index} className="font-bold text-black">{item}</li>
              ) : (
                <li key={index} className="text-gray-700">{item}</li>
              )
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default WaterQualityRecommendationsPage;
