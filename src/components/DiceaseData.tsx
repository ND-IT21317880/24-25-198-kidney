import { motion } from "framer-motion";

const DiseaseData = () => {
  return (
    <section className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Global Impact Card */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Global Impact
          </h3>
          <p className="text-gray-700">
            CKDu disproportionately affects young and middle-aged individuals in
            rural areas, leading to significant social and economic
            consequences. The disease progresses silently, often detected only
            in advanced stages, making early identification crucial.
          </p>
        </motion.div>

        {/* Suspected Causes Card */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Suspected Causes
          </h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li>
              <strong>Environmental Contaminants:</strong> Exposure to heavy
              metals, pesticides, and agrochemicals is strongly linked to CKDu.
            </li>
            <li>
              <strong>Occupational Hazards:</strong> Heat stress and dehydration
              from strenuous agricultural work are believed to contribute
              significantly.
            </li>
            <li>
              <strong>Water Quality:</strong> Contaminated drinking water
              sources may play a role in CKDu's prevalence.
            </li>
          </ul>
        </motion.div>

        {/* Key Features Card */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Key Features
          </h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li>
              Patients typically exhibit minimal proteinuria and normal blood
              pressure in early stages.
            </li>
            <li>
              Histopathological findings include tubular atrophy and
              interstitial fibrosis.
            </li>
            <li>
              Rapid progression often requires renal replacement therapy in
              advanced stages.
            </li>
          </ul>
        </motion.div>

        {/* Importance of Profiling Card */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col col-span-1 md:col-span-2 lg:col-span-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Importance of Profiling
          </h3>
          <p className="text-gray-700">
            This application provides tools to assess CKDu stages using
            biomarkers like serum creatinine and eGFR. It also offers advanced
            classification options based on additional variables for precise
            risk categorization and prevention strategies.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DiseaseData;
