import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Home = () => {
  return (
    <div className="font-sans">
      {/* Menu Bar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-950 p-4 fixed w-full top-0 z-50 shadow-lg"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div className="text-white text-2xl font-bold">
            HealthCare
          </motion.div>
          <ul className="flex space-x-6">
            <li>
              <a href="#home" className="text-white hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="text-white hover:text-gray-200">
                Our Services
              </a>
            </li>
            <li>
              <a href="#about" className="text-white hover:text-gray-200">
                About Us
              </a>
            </li>
            {localStorage.getItem("id") ? (
              <li>
                <Link to="/profile" className="text-white hover:text-gray-200">
                  Profile
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"} className="text-white hover:text-gray-200">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="home"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 to-indigo-100 p-8 text-black"
      >
        <div className="text-center">
          <motion.h1 className="text-6xl font-bold mb-4">
            Our plan is to take care of your health
          </motion.h1>
          <motion.p className="text-xl">
            Your health is our priority. We provide the best care for you.
          </motion.p>
        </div>
      </motion.section>

      {/* Services Section */}
      {localStorage.getItem("id") && (
        <motion.section id="services" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-4xl font-bold text-center mb-12"
            >
              Our Services
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Kidney Care",
                  desc: "Comprehensive care for kidney health, including diagnostics and treatment.",
                  to: "/kidney",
                },
                {
                  title: "eGFR Testing",
                  desc: "Accurate eGFR testing to monitor kidney function and health.",
                  to: "/egfr",
                },
                {
                  title: "Water Quality Risk Factors",
                  desc: "Identify the risk factors of water quality.",
                  to: "/water-quality",
                },
                {
                  title: "Kidney Transplant",
                  desc: "Expert care and support for kidney transplant patients.",
                },
              ].map((service, index) => (
                <Link to={service.to ?? "/"}>
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-700">{service.desc}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>
      )}
      {/* About Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-20 bg-gradient-to-r from-purple-500 to-blue-400 text-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xl mb-4">
              We are a dedicated team of healthcare professionals committed to
              providing the best care for your kidneys and overall health.
            </p>
            <p className="text-xl">
              Our mission is to ensure that every patient receives personalized
              and compassionate care, using the latest medical advancements.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
