import axios from 'axios';
import { useState } from 'react';

interface ChiSquareResults {
    chi2_statistic: number;
    p_value: number;
    association: "Yes" | "No";
}

interface ElementResult {
    significant_pairs: string[];
    highest_source: string;
}

interface AnalysisResults {
    chi2_results: ChiSquareResults;
    element_results: Record<string, ElementResult>;
    plots: Record<string, string>; // Base64-encoded images
}

const EnvWaterSourceAnalysis: React.FC = () => {
    const [results, setResults] = useState<AnalysisResults | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleAnalysis = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://127.0.0.1:5000/water_source_analysis");
            setResults(response.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-center text-blue-600">Water Source Analysis</h2>

            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold">Statistical Analysis of Water Sources</h3>
                <p className="text-gray-600 mt-2">
                    This analysis identifies significant differences in elements across water sources, determines which source has the highest median value for each element, and provides distribution charts.
                </p>
                <button
                    onClick={handleAnalysis}
                    disabled={loading}
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:bg-gray-400"
                >
                    {loading ? "Analyzing..." : "Perform Analysis"}
                </button>
            </div>

            {results && (
                <div className="mt-8">
                    {/* Chi-square Results */}
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-semibold">Association Between Type and Risk</h3>
                        <p>
                            <strong>Chi-square Statistic:</strong> {results.chi2_results.chi2_statistic}<br />
                            <strong>P-value:</strong> {results.chi2_results.p_value}<br />
                            <strong>Conclusion:</strong> There is {results.chi2_results.association === "Yes" ? "a significant" : "no significant"} association between water source type and risk.
                        </p>
                    </div>

                    {/* Element Results */}
                    <div className="p-6 bg-white rounded-lg shadow mt-6">
                        <h3 className="text-xl font-semibold">Significant Differences in Elements</h3>
                        {Object.entries(results.element_results).map(([element, result]) => (
                            <div key={element} className="mt-4">
                                <h4 className="text-lg font-semibold">{element}</h4>
                                <p><strong>Significant Differences:</strong> {result.significant_pairs.join(", ") || "None"}</p>
                                <p><strong>Highest Median Value:</strong> {result.highest_source}</p>
                                <div className="mt-4">
                                    <h5 className="text-md font-semibold">Distribution Chart</h5>
                                    <img 
                                        src={`data:image/png;base64,${results.plots[element]}`} 
                                        alt={`Distribution of ${element}`} 
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnvWaterSourceAnalysis;
