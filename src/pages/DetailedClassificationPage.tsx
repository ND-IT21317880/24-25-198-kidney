import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { predictClassification } from "@/hooks/getPredictionHook";
import { names } from "@/lib/constants";
import { Card } from "@/components/ui/card";

interface FormField {
  id: string;
  label: string;
  type: string;
}

interface FormValues {
  [key: string]: number;
}

const DetailedClassificationPage = () => {
  const formFields: FormField[] = [
    { id: "age", label: "Age", type: "number" },
    { id: "gender", label: "Gender (1 for male 0 for Female)", type: "number" },
    { id: "sCr", label: "S.Cr", type: "number" },
    { id: "eGFR", label: "eGFR", type: "number" },
    { id: "stage", label: "Stage", type: "number" },
    { id: "na", label: "Na(ppm)", type: "number" },
    { id: "mg", label: "Mg(ppm)", type: "number" },
    { id: "k", label: "K(ppm)", type: "number" },
    { id: "ca", label: "Ca(ppm)", type: "number" },
    { id: "al", label: "Al(ppb)", type: "number" },
    { id: "v", label: "V(ppb)", type: "number" },
    { id: "ti", label: "Ti(ppb)", type: "number" },
    { id: "cr", label: "Cr(ppb)", type: "number" },
    { id: "mn", label: "Mn(ppb)", type: "number" },
    { id: "fe", label: "Fe(ppb)", type: "number" },
    { id: "co", label: "Co(ppb)", type: "number" },
    { id: "ni", label: "Ni(ppb)", type: "number" },
    { id: "cu", label: "Cu(ppb)", type: "number" },
    { id: "zn", label: "Zn(ppb)", type: "number" },
    { id: "rb", label: "Rb(ppb)", type: "number" },
    { id: "sr", label: "Sr(ppb)", type: "number" },
    { id: "ba", label: "Ba(ppb)", type: "number" },
    { id: "pb", label: "Pb(ppb)", type: "number" },
  ];

  const [formValues, setFormValues] = useState<FormValues>({});
  const [result, setResult] = useState<string | undefined>();

  const handleInputChange = (id: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create features array in the same order as formFields
    const features = formFields.map((field) => formValues[field.id] || 0);

    try {
      const result = await predictClassification(features);
      if (result) {
        if (result.prediction.length > 0) {
          setResult(names[result.prediction[0] ?? ""]);
        }
      }
    } catch (error) {
      console.error("Failed to get prediction:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Detailed Classification Form</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {formFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                type={field.type}
                placeholder={`Enter ${field.label}`}
                value={formValues[field.id] || ""}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Submit
        </Button>
      </form>
      {result && (
        <Card className="px-32 mt-10">
          <div className="flex items-center justify-center">
            <h1 className="text-lg font-bold">Predicted Result is {result}</h1>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DetailedClassificationPage;
