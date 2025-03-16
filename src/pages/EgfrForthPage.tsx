import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const EgfrForthPage = () => {
  const currentEgfr = localStorage.getItem("egfr");
  const userId = localStorage.getItem("id");
  const gender = localStorage.getItem("gender");
  const age = localStorage.getItem("age");

  const getEgfrStatus = (egfr: number) => {
    if (egfr > 60) return "Normal Kidney Function";
    if (egfr >= 45 && egfr <= 59) return "Mild eGFR Decrease";
    if (egfr >= 30 && egfr <= 44) return "Moderate eGFR Decrease";
    if (egfr >= 15 && egfr <= 29) return "Severe eGFR Decrease";
    if (egfr < 15) return "Severe Kidney Failure";
    return "Unknown";
  };

  const egfrNumber = currentEgfr ? parseFloat(currentEgfr) : null;
  const egfrStatus = egfrNumber ? getEgfrStatus(egfrNumber) : "Unknown";

  // Generate data for the chart
  const currentYear = new Date().getFullYear();
  const currentAge = age ? parseInt(age) : 0;
  const data = [];

  for (let year = currentYear - 5; year <= currentYear + 10; year++) {
    const ageAtYear = currentAge + (year - currentYear);
    data.push({
      year: year,
      age: ageAtYear,
      egfr: egfrNumber ? egfrNumber - (currentYear - year) * 2 : 0, // Example calculation
    });
  }

  return (
    <div className="p-8 bg-gray-50 flex-1">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">eGFR Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Patient Details</h3>
            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Patient ID:</span> {userId}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Age:</span> {age}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Gender:</span>{" "}
                {gender === "1" ? "Female" : "Male"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Serum Creatinine</h3>
            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-semibold">eGFR Value:</span>{" "}
                {egfrNumber ? egfrNumber.toFixed(2) : "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Current Status:</span>{" "}
                {egfrStatus}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              eGFR Backward and Forward Analysis
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="egfr"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EgfrForthPage;
