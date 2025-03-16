import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const EgfrThirdPage = () => {
  const currentEgfr = localStorage.getItem("egfr");
  const userId = localStorage.getItem("id");
  const gender = localStorage.getItem("gender");
  const age = localStorage.getItem("age");
  const serumCreatinine = localStorage.getItem("serumCreatinine");
  const yearOfData = localStorage.getItem("yearOfData");
  const navigate = useNavigate();

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

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">eGFR Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between gap-50">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4">Entered Details:</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-blue-300 text-gray-700">
                      Field
                    </TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="bg-blue-300 text-gray-700">
                      User ID
                    </TableCell>
                    <TableCell>{userId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-blue-300 text-gray-700">
                      Gender
                    </TableCell>
                    <TableCell>{gender === "1" ? "Female" : "Male"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-blue-300 text-gray-700">
                      Age
                    </TableCell>
                    <TableCell>{age}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-blue-300 text-gray-700">
                      Serum Creatinine (mg/dL)
                    </TableCell>
                    <TableCell>{serumCreatinine}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-blue-300 text-gray-700">
                      Year of Data
                    </TableCell>
                    <TableCell>{yearOfData}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="flex-2">
              <h3 className="text-xl font-semibold mb-4">eGFR Status Table:</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>eGFR Range</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { range: "> 60", status: "Normal Kidney Function" },
                    { range: "45 - 59", status: "Mild eGFR Decrease" },
                    { range: "30 - 44", status: "Moderate eGFR Decrease" },
                    { range: "15 - 29", status: "Severe eGFR Decrease" },
                    { range: "< 15", status: "Severe Kidney Failure" },
                  ].map((row, index) => (
                    <TableRow
                      key={index}
                      className="odd:bg-blue-100 even:bg-blue-50"
                    >
                      <TableCell className="font-semibold">
                        {row.range}
                      </TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Calculated eGFR:</h3>
            <div className="space-y-2 flex flex-col items-center">
              <p className="text-lg">
                <span className="font-semibold">eGFR Value:</span>{" "}
                {egfrNumber ? egfrNumber.toFixed(2) : "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Status:</span> {egfrStatus}
              </p>
            </div>
            <Button onClick={() => navigate("/egfr-forth")} className="mt-8">
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EgfrThirdPage;
