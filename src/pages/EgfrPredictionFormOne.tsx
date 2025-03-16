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
import formImage from "@/assets/2.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createEgfr } from "@/services/egfrService";
import { eGFR } from "@/types/egfr-types";

const EgfrPredictionFormOne = () => {
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<number | string>("");
  const [serumCreatinine, setSerumCreatinine] = useState<number | string>("");
  const [yearOfData, setYearOfData] = useState<number | string>("");
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
    <div className="p-16" style={{ width: "100vw", height: "100vh" }}>
      <h2 className="text-2xl font-bold mb-6 text-center">
        eGFR Prediction Form
      </h2>
      <div className="w-full flex  items-center justify-center">
        {" "}
        <div className="p-6 flex-1 bg-white rounded-lg shadow-md mx-auto">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <Input
                type="text"
                value={userId}
                disabled
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <Select onValueChange={(value) => setGender(value)}>
                <SelectTrigger className="mt-1 block w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Female</SelectItem>
                  <SelectItem value="2">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Serum Creatinine (mg/dL)
              </label>
              <Input
                type="number"
                value={serumCreatinine}
                onChange={(e) => setSerumCreatinine(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year of Data
              </label>
              <Input
                type="number"
                value={yearOfData}
                onChange={(e) => setYearOfData(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <Button
              type="button"
              onClick={calculateEgfr}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Calculate eGFR
            </Button>
          </form>
        </div>
        <div className="flex-1">
          <img src={formImage} alt="form" />
        </div>
      </div>
    </div>
  );
};

export default EgfrPredictionFormOne;
