import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";

const EgfrThirdPage = () => {
  const currentEgfr = localStorage.getItem("egfr");
  const userId = localStorage.getItem("id");
  const gender = localStorage.getItem("gender");
  const age = localStorage.getItem("age");
  const serumCreatinine = localStorage.getItem("serumCreatinine");
  const yearOfData = localStorage.getItem("yearOfData");
  const navigate = useNavigate();

  const getEgfrStatus = (egfr) => {
    if (egfr > 60) return "Normal Kidney Function";
    if (egfr >= 45 && egfr <= 59) return "Mild eGFR Decrease";
    if (egfr >= 30 && egfr <= 44) return "Moderate eGFR Decrease";
    if (egfr >= 15 && egfr <= 29) return "Severe eGFR Decrease";
    if (egfr < 15) return "Severe Kidney Failure";
    return "Unknown";
  };

  const egfrNumber = currentEgfr ? parseFloat(currentEgfr) : null;
  const egfrStatus = egfrNumber ? getEgfrStatus(egfrNumber) : "Unknown";

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center relative">
      {/* eGFR Status Table (Top-Right Corner, Smaller Size) */}
      <div className="absolute top-4 right-4 w-1/4">
        <Card className="p-3 shadow-lg border border-gray-400 rounded-lg bg-blue-100">
          <CardHeader className="text-center">
            <CardTitle className="text-md font-bold">eGFR Status Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-gray-400 rounded-lg overflow-hidden shadow-md">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-300 border-b border-gray-500">
                    <th className="p-2 border-r border-gray-500">eGFR Range</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[ 
                    { range: "> 60", status: "Normal Kidney Function", color: "bg-red-100", font: "font-bold" },
                    { range: "45 - 59", status: "Mild eGFR Decrease", color: "bg-red-200" , font: "font-bold"},
                    { range: "30 - 44", status: "Moderate eGFR Decrease", color: "bg-orange-200", font: "font-bold" },
                    { range: "15 - 29", status: "Severe eGFR Decrease", color: "bg-red-300" , font: "font-bold"},
                    { range: "< 15", status: "Severe Kidney Failure", color: "bg-red-600 text-white", font: "font-bold" },
                  ].map((item, index) => (
                    <tr key={index} className={`${item.color} border-b border-gray-500`}>
                      <td className="p-2 border-r border-gray-500 font-semibold">{item.range}</td>
                      <td className="p-2">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Profile (Centered) */}
      <Card className="w-1/2 p-6 shadow-lg border border-gray-400 rounded-lg bg-blue-200">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center">
            <UserIcon className="w-14 h-14 text-gray-700" />
            <CardTitle className="text-2xl font-bold mt-2">Patient Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[ 
              { label: "User ID", value: userId, color: "bg-white" },
              { label: "Gender", value: gender === "1" ? "Female" : "Male", color: "bg-white" },
              { label: "Age", value: age, color: "bg-white" },
              { label: "Year of Data", value: yearOfData, color: "bg-white" },
              { label: "eGFR Value", value: egfrNumber ? egfrNumber.toFixed(2) : "N/A", color: "bg-white" },
              { label: "Status", value: egfrStatus, color: "bg-white" },
            ].map((item, index) => (
              <div key={index} className={`p-3 rounded-lg shadow-md ${item.color}`}>
                <p className="text-md font-semibold text-gray-800">{item.label}</p>
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
          
          {/* Continue Button */}
          <div className="flex justify-center mt-6">
            <Button onClick={() => navigate("/egfr-forth")} className="text-lg px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700">
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EgfrThirdPage;