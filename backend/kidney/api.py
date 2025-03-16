from flask import Flask, request, jsonify
import numpy as np
import joblib
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Load trained eGFR prediction model
model_path = "newupdated_egfr_model.pkl"
model = joblib.load(model_path)


@app.route("/api/predict-egfr", methods=["POST"])
def predict_egfr():
    data = request.json.get("egfrData", {})

    # Convert input dictionary to sorted array of values
    years = sorted(data.keys(), key=int)  # Ensure keys are sorted numerically
    past_egfr_values = [data[year] for year in years]

    # Ensure we have at least 9 years of data (pad if necessary)
    if len(past_egfr_values) < 9:
        padding_value = past_egfr_values[0]  # Use first available value as padding
        past_egfr_values = [padding_value] * (9 - len(past_egfr_values)) + past_egfr_values

    # Prepare data for prediction (last 9 values)
    input_features = np.array(past_egfr_values[-9:]).reshape(1, -1)

    # Predict next 10 years
    future_years = list(range(int(years[-1]) + 1, int(years[-1]) + 11))
    predicted_egfr = []

    for _ in range(10):
        next_egfr = model.predict(input_features)[0]
        predicted_egfr.append(next_egfr)

        # Maintain rolling window of last 9 features
        input_features = np.roll(input_features, -1)  # Shift left
        input_features[0, -1] = next_egfr  # Add new prediction

    return jsonify({"futureYears": future_years, "predictedEGFR": predicted_egfr})


if __name__ == "__main__":
    app.run(debug=True,port=5004)
