import React, { useState } from "react";

interface FormDataType {
    temp: string;
    precip: string;
    "Na+": string;
    "Ca2+": string;
    "Mg2+": string;
    "F-": string;
    depth: string;
    alkalinity: string;
    Na_Cl: string;
    "SO42-": string;
    "K+": string;
    "PO43-": string;
}

const EnvPredictionPage: React.FC = () => {
    const [formData, setFormData] = useState<FormDataType>({
        temp: "", precip: "", "Na+": "", "Ca2+": "",
        "Mg2+": "", "F-": "", depth: "", alkalinity: "",
        Na_Cl: "", "SO42-": "", "K+": "", "PO43-": ""
    });

    const [prediction, setPrediction] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // const response = await axios.post("http://127.0.0.1:5000/predict", formData);
            // setPrediction(response.data.prediction);
            setPrediction(null);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-blue-600">CKDu Risk Prediction</h2>

                <form onSubmit={handleSubmit} className="mt-4">
                    {Object.keys(formData).map((key) => (
                        <div key={key} className="mb-4">
                            <label className="block text-gray-700 font-semibold">{key}:</label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key as keyof FormDataType]}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Predict Risk
                    </button>
                </form>

                {prediction !== null && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
                        <h3 className="text-xl font-semibold">Prediction Result:</h3>
                        <p className={`text-lg font-bold mt-2 ${prediction === 1 ? "text-red-600" : "text-green-600"}`}>
                            {prediction === 1 ? "Risk" : "Not Risk"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnvPredictionPage;
