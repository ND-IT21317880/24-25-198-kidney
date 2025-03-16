import { Button } from "@/components/ui/button";
import { ckdProfiles, preventionStrategies } from "@/lib/constants";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CurrentCKDUPage = () => {
  const currentStage = localStorage.getItem("stage") as string;
  const navigate = useNavigate();
  // Find the profile matching the current stage
  const currentProfile = ckdProfiles.find(
    (profile) => profile.stage === currentStage
  );

  if (!currentProfile) {
    return <div>No data found for the current stage.</div>;
  }

  return (
    <motion.div
      className="p-8 w-full flex-1 flex flex-col items-center bg-gradient-to-r from-blue-50 to-indigo-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Current CKDu Stage: {currentProfile.stage}
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Profile Details */}
        <motion.div
          className="p-6 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-2">Profile Details</h2>
          <ul className="space-y-2">
            <li>
              <strong>Education (yrs):</strong> {currentProfile.educationYrs}
            </li>
            <li>
              <strong>Herbicide Usage History:</strong>{" "}
              {currentProfile.herbicideUsageHistory}
            </li>
            <li>
              <strong>Applied Herbicide V1:</strong>{" "}
              {currentProfile.appliedHerbicideV1}
            </li>
            <li>
              <strong>PPE Usage Score Severity:</strong>{" "}
              {currentProfile.ppeUsageScoreSeverity}
            </li>
            <li>
              <strong>Well Water Hx:</strong> {currentProfile.wellWaterHx}
            </li>
            <li>
              <strong>Natural Water Drinking V1:</strong>{" "}
              {currentProfile.naturalWaterDrinkingV1}
            </li>
            <li>
              <strong>Exhausion V5:</strong> {currentProfile.exhausionV5}
            </li>
            <li>
              <strong>Exhausion Severity V5:</strong>{" "}
              {currentProfile.exhausionSeverityV5}
            </li>
            <li>
              <strong>Joint Pain V2:</strong> {currentProfile.jointPainV2}
            </li>
          </ul>
        </motion.div>

        {/* Biomarkers */}
        <motion.div
          className="p-6 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-2">Biomarkers</h2>
          <ul className="space-y-2">
            <li>
              <strong>Na V3:</strong> {currentProfile.naV3}
            </li>
            <li>
              <strong>K V3:</strong> {currentProfile.kV3}
            </li>
            <li>
              <strong>K V4:</strong> {currentProfile.kV4}
            </li>
            <li>
              <strong>K V5:</strong> {currentProfile.kV5}
            </li>
            <li>
              <strong>Hb V1:</strong> {currentProfile.hbV1}
            </li>
            <li>
              <strong>Hb V2:</strong> {currentProfile.hbV2}
            </li>
            <li>
              <strong>Hb V3:</strong> {currentProfile.hbV3}
            </li>
            <li>
              <strong>Hb V4:</strong> {currentProfile.hbV4}
            </li>
            <li>
              <strong>Hb V5:</strong> {currentProfile.hbV5}
            </li>
            <li>
              <strong>Hb V6:</strong> {currentProfile.hbV6}
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {currentStage && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-2">Prevention Strategies</h3>
          <ul className="list-disc pl-6">
            {preventionStrategies[currentStage].map((strategy, index) => (
              <motion.li
                key={index}
                className="mb-2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {strategy}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
      <Button
        onClick={() => navigate("/detailed-classification-page")}
        className="mt-16"
      >
        Detailed Classification
      </Button>
    </motion.div>
  );
};

export default CurrentCKDUPage;
