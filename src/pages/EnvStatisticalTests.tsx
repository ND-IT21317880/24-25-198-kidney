import EnvWaterSourceAnalysis from "@/components/EnvWaterSourceAnalysis";
import { useState } from "react";

interface TestResult {
    variable: string;
    p_value: number;
    cliffs_delta: number;
    interpretation: string;
}

interface TestResults {
    large: TestResult[];
    medium: TestResult[];
    small: TestResult[];
}

function EnvStatisticalTests() {
    const [testResults, setTestResults] = useState<TestResults | null>(null);
    const [effectSize, setEffectSize] = useState<"large" | "medium" | "small">("large");
    const [selectedVariable, setSelectedVariable] = useState<TestResult | null>(null);

    const handleTestClick = async () => {
        try {
            // const response = await axios.get("http://127.0.0.1:5000/mannwhitneyu");
            // setTestResults(response.data);
            setSelectedVariable(null); // Reset selected variable when new results are loaded
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleVariableClick = (variable: TestResult) => {
        setSelectedVariable(variable);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
                <h2 className="text-2xl font-bold text-center text-blue-600">Statistical Tests</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-xl font-semibold">Mann-Whitney U Test</h3>
                        <p className="text-gray-600 mt-2">
                            The Mann-Whitney U test is a nonparametric test of the null hypothesis that it is equally likely that a randomly selected value from one sample will be less than or greater than a randomly selected value from a second sample.
                        </p>
                        <button
                            onClick={handleTestClick}
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                        >
                            Perform Mann-Whitney U Test
                        </button>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-xl font-semibold">Test Results</h3>
                        {testResults && (
                            <div className="mt-4">
                                <div className="flex space-x-4 mb-4">
                                    {(["large", "medium", "small"] as const).map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => {
                                                setEffectSize(size);
                                                setSelectedVariable(null);
                                            }}
                                            className={`px-4 py-2 rounded-lg ${
                                                effectSize === size ? (size === "large" ? "bg-red-500" : size === "medium" ? "bg-orange-500" : "bg-green-500") + " text-white" : "bg-gray-200"
                                            }`}
                                        >
                                            {size.charAt(0).toUpperCase() + size.slice(1)} Effect
                                        </button>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    {testResults[effectSize].map((result, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleVariableClick(result)}
                                            className={`p-2 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100 ${
                                                selectedVariable?.variable === result.variable ? "border-2 border-blue-500" : ""
                                            }`}
                                        >
                                            <p className="font-semibold">{result.variable}</p>
                                        </div>
                                    ))}
                                </div>
                                {selectedVariable && (
                                    <div className="mt-6 p-4 bg-white rounded-lg shadow">
                                        <h4 className="text-lg font-semibold">
                                            Details for {selectedVariable.variable}
                                        </h4>
                                        <p><strong>P-value:</strong> {selectedVariable.p_value}</p>
                                        <p><strong>Cliff's Delta:</strong> {selectedVariable.cliffs_delta}</p>
                                        <p><strong>Interpretation:</strong> {selectedVariable.interpretation}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <EnvWaterSourceAnalysis />
            </div>
        </div>
    );
}

export default EnvStatisticalTests;
