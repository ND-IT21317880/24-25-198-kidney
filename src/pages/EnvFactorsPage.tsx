import { Link } from "react-router-dom";

const EnvFactorsPage = () => {
    return (
      <div className="min-h-screen bg-blue-50 text-gray-900">
          {/* Header Section */}
          <header className="bg-blue-950 text-white text-center shadow-lg h-100 bg-[url(./assets/Env_ckdu_3.png)] bg-no-repeat bg-cover py-30">
              {/* <img src={img} alt="" className="w-full max-h-60 object-cover rounded-lg mb-4" /> */}
              <h1 className="text-4xl font-bold">Environmental Risk Factors for CKDu</h1>
              <p className="mt-2 text-xl py-5">A platform for predicting CKDu risk and performing statistical analysis.</p>
          </header>

          {/* Navigation Boxes */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-4">
              <Link to="/environmental-factors-predict" className="p-6 bg-white h-50 shadow-md rounded-lg hover:scale-105 transition">
                  <h3 className="text-xl font-semibold">Risk Prediction</h3>
                  <p className="text-gray-600 mt-2">Predict CKDu risk using AI models</p>
              </Link>

              <Link to="/environmental-factors-stats" className="p-6 h-50 bg-white shadow-md rounded-lg hover:scale-105 transition">
                  <h3 className="text-xl font-semibold">Statistical Tests</h3>
                  <p className="text-gray-600 mt-2">Perform statistical analysis on CKDu data.</p>
              </Link>

              {/* <Link to="/results" className="p-6 bg-white shadow-md rounded-lg hover:scale-105 transition">
                  <h3 className="text-xl font-semibold">Analysis Results</h3>
                  <p className="text-gray-600 mt-2">View statistical results and insights.</p>
              </Link> */}
          </div>
      </div>
  );
  
}

export default EnvFactorsPage