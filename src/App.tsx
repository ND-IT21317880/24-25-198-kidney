import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalculateCkduStage from "./components/CalculateCkduStage";
import CurrentCKDUPage from "./pages/CurrentCKDUPage";
import DetailedClassificationPage from "./pages/DetailedClassificationPage";
import KidneyHome from "./pages/KidneyHome";
import Home from "./pages/Home";
import EgfrHome from "./pages/EgfrHome";
import EgfrPredictionFormOne from "./pages/EgfrPredictionFormOne";
import EgfrThirdPage from "./pages/EgfrThirdPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import EGFRPredictionPage from "./pages/EGFRPredictionPage";
import WaterQualityRiskHome from "./pages/WaterQualityRiskHome";
import WaterQualityRecommendationsPage from "./pages/WaterQualityRecomendationsPage";
import WaterRiskLocationPage from "./pages/WaterRiskLocationPage";

function App() {
  return (
    <div className="flex flex-col w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/kidney" element={<KidneyHome />} />
          <Route path="/egfr" element={<EgfrHome />} />
          <Route path="/egfr-third" element={<EgfrThirdPage />} />
          <Route path="/egfr-forth" element={<EGFRPredictionPage />} />
          <Route
            path="/egfr-prediction-form-one"
            element={<EgfrPredictionFormOne />}
          />
          <Route path="/calculate-cku-stage" element={<CalculateCkduStage />} />
          <Route path="/current-ckdu-page" element={<CurrentCKDUPage />} />
          <Route
            path="/detailed-classification-page"
            element={<DetailedClassificationPage />}
          />
          <Route path="/water-quality" element={<WaterQualityRiskHome />} />
          <Route
            path="/water-quality-recommendations"
            element={<WaterQualityRecommendationsPage />}
          />
          <Route
            path="/water-risk-location"
            element={<WaterRiskLocationPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
