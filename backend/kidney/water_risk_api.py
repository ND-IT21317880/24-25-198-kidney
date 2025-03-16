# app.py - Flask API for CKDu risk prediction

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model and supporting data
with open('water_models/ckdu_risk_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('water_models/feature_columns.pkl', 'rb') as f:
    feature_columns = pickle.load(f)

with open('water_models/mean_values.pkl', 'rb') as f:
    mean_values = pickle.load(f)

with open('water_models/risk_thresholds.pkl', 'rb') as f:
    q1, q2 = pickle.load(f)


# Define function to classify concentration levels
def classify_concentration(value, mean):
    if value > mean * 1.3:
        return 2  # "Very High"
    elif value > mean * 1.1:
        return 1  # "High"
    else:
        return 0  # "Safe"


@app.route('/')
def home():
    return jsonify({
        "message": "CKDu Risk Prediction API",
        "available_parameters": feature_columns,
        "endpoints": {
            "/predict": "POST request with water parameters to get risk prediction"
        }
    })


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from request
        data = request.get_json()
        user_inputs = data.get('water_parameters', {})

        # Create input DataFrame with default values (mean values)
        input_data = {}
        for col in feature_columns:
            input_data[col] = mean_values.get(col, 0)

        # Update with user provided values
        for key, value in user_inputs.items():
            if key in feature_columns:
                try:
                    input_data[key] = float(value)
                except (ValueError, TypeError):
                    return jsonify({"error": f"Invalid value for parameter: {key}"}), 400

        # Convert to DataFrame
        input_df = pd.DataFrame([input_data])

        # Apply concentration classification
        for col in feature_columns:
            input_df[col] = input_df[col].apply(lambda x: classify_concentration(x, mean_values[col]))

        # Make prediction
        risk_prediction = model.predict(input_df)[0]
        risk_proba = model.predict_proba(input_df)[0]

        # Define risk levels
        risk_levels = ["Low Risk", "Medium Risk", "High Risk"]
        risk_level = risk_levels[risk_prediction]

        # Calculate confidence
        confidence = risk_proba[risk_prediction] * 100

        # Prepare parameter analysis
        parameter_analysis = {}
        for param, value in user_inputs.items():
            if param in feature_columns:
                risk_level_param = "Safe"
                risk_value = classify_concentration(float(value), mean_values[param])
                if risk_value == 1:
                    risk_level_param = "High"
                elif risk_value == 2:
                    risk_level_param = "Very High"

                parameter_analysis[param] = {
                    "value": value,
                    "risk_level": risk_level_param,
                    "threshold": {
                        "high": float(mean_values[param] * 1.1),
                        "very_high": float(mean_values[param] * 1.3)
                    }
                }

        # Prepare response
        response = {
            "overall_risk": {
                "level": risk_level,
                "confidence": f"{confidence:.1f}%",
                "probabilities": {level: f"{prob * 100:.1f}%" for level, prob in zip(risk_levels, risk_proba)}
            },
            "parameter_analysis": parameter_analysis,
            "provided_parameters": len(user_inputs),
            "total_parameters": len(feature_columns)
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5005)