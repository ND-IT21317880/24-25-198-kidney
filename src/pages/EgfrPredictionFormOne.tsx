import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import formImage from "@/assets/2.jpg"; // Ensure this image has no background
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createEgfr } from "@/services/egfrService";
import { eGFR } from "@/types/egfr-types";

const EgfrPredictionFormOne = () => {
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<number | string>("");
  const [serumCreatinine, setSerumCreatinine] = useState<number | string>("");
  const [yearOfData, setYearOfData] = useState<string>(new Date().getFullYear().toString());
  const navigate = useNavigate();
  const userId = localStorage.getItem("id") || "";

  const calculateEgfr = async () => {
    try {
      if (!gender || !age || !serumCreatinine || !yearOfData) {
        return;
      }

      const scr = parseFloat(serumCreatinine.toString());
      const ageNum = parseFloat(age.toString());

      let kappa = 0.9;
      let alpha = -0.302;

      if (gender === "1") {
        kappa = 0.7;
        alpha = -0.241;
      }

      let egfr =
        141 *
        (Math.min(scr / kappa, 1) ** alpha *
          (Math.max(scr / kappa, 1) ** -1.209 * 0.993 ** ageNum));

      if (gender === "1") {
        egfr *= 1.018;
      }

      localStorage.setItem("egfr", egfr.toString());
      localStorage.setItem("gender", gender);
      localStorage.setItem("age", age.toString());
      localStorage.setItem("serumCreatinine", serumCreatinine.toString());
      localStorage.setItem("yearOfData", yearOfData.toString());

      const egFrData: eGFR = {
        _id: null,
        user: userId,
        gender: gender === "1" ? "Male" : "Female",
        age: parseInt(age.toString()),
        scValue: parseFloat(serumCreatinine.toString()),
        yearOfData: parseInt(yearOfData.toString()),
      };
      await createEgfr(egFrData);
      navigate("/egfr-third");
    } catch (error) {
      console.error(error);
      toast.error("Error Calculation eGFR");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex items-center justify-center">
      {/* Single Card with Form on Left and Image on Right */}
      <div className="w-full max-w-6xl bg-white border-2 border-gray-300 rounded-lg shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 items-center p-10">
          
          {/* Left Side: Form */}
          <div className="p-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
              eGFR Prediction Form
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-xl font-semibold text-gray-700">
                  User ID
                </label>
                <Input type="text" value={userId} disabled className="mt-1 block w-full text-xl p-4 border border-gray-400 rounded-md" />
              </div>
              <div>
                <label className="block text-xl font-semibold text-gray-700">
                  Gender
                </label>
                <Select onValueChange={(value) => setGender(value)}>
                <SelectTrigger className="mt-1 block w-full text-xl p-4 border border-gray-400 rounded-md flex items-center h-[56px]">
               <SelectValue placeholder="Select Gender" />
        </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">Female</SelectItem>
                    <SelectItem value="2">Male</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xl font-semibold text-gray-700">
                  Age
                </label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 block w-full text-xl p-4 border border-gray-400 rounded-md"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-xl font-semibold text-gray-700">
                  Serum Creatinine (mg/dL)
                </label>
                <Input
                  type="number"
                  value={serumCreatinine}
                  onChange={(e) => setSerumCreatinine(e.target.value)}
                  className="mt-1 block w-full text-2xl p-4 border border-gray-400 rounded-md"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xl font-semibold text-gray-700">
                  Year of Data
                </label>
                <Input
                  type="number"
                  value={yearOfData}
                  onChange={(e) => setYearOfData(e.target.value)}
                  className="mt-1 block w-full text-xl p-4 border border-gray-400 rounded-md"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
              <Button
                type="button"
                onClick={calculateEgfr}
                className="w-full text-2xl bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-md"
              >
                Calculate eGFR
              </Button>
            </form>
          </div>

          {/* Right Side: Larger Image WITHOUT Background */}
          <div className="flex justify-center items-center p-8">
            <img src={formImage} alt="form" className="w-[450px] h-auto rounded-lg shadow-lg" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default EgfrPredictionFormOne;
