import { motion } from "framer-motion";
import imageone from "@/assets/image001.jpeg";
import imagethree from "@/assets/image002.jpeg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      id="hero"
      className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 to-indigo-100 p-8"
    >
      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-center text-gray-900 mb-6"
      >
        Overview of Chronic Kidney Disease of Unknown Etiology
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg text-gray-700 text-center max-w-2xl mb-12"
      >
        Chronic Kidney Disease of Unknown Etiology (CKDu) is a progressive
        kidney disease prevalent in certain regions, particularly among
        agricultural workers. Unlike traditional CKD, CKDu develops in
        individuals without common risk factors like diabetes or hypertension.
        Its causes remain unclear, but environmental and occupational factors
        are strongly suspected.
      </motion.p>

      {/* Content Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
        {/* Images Container (Single Row) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex w-full gap-8 justify-center"
        >
          {/* Image 1 */}
          <div className="w-1/3 h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={imageone}
              alt="home"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="w-1/3 h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={imagethree}
              alt="image-2"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Start Profiling Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="mt-12 px-8 py-3 bg-indigo-600 cursor-pointer text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        onClick={() => {
          navigate("/calculate-cku-stage");
        }}
      >
        Start Profiling
      </motion.button>
    </section>
  );
};

export default Hero;
