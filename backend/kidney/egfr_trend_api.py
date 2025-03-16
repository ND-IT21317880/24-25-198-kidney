from flask import Flask, request, jsonify, send_file
import numpy as np
import matplotlib.pyplot as plt
import joblib
import os
from flask_cors import CORS
# Initialize Flask app
app = Flask(__name__)
CORS(app)
# Load trained model
MODEL_PATH = "egfr_trend_model.pkl"
model = joblib.load(MODEL_PATH)

# Ensure static directory exists for storing images
STATIC_DIR = "static"
if not os.path.exists(STATIC_DIR):
    os.makedirs(STATIC_DIR)

@app.route("/predict", methods=["POST"])
def predict_egfr():
    try:
        # Get JSON input (years and eGFR values)
        data = request.get_json()
        years = np.array(data.get("years", [])).reshape(-1, 1)
        egfr_values = np.array(data.get("egfr_values", []))

        if len(years) == 0 or len(egfr_values) == 0:
            return jsonify({"error": "Missing input data"}), 400

        # Predict future eGFR values (2025-2034)
        future_years = np.arange(2025, 2035).reshape(-1, 1)
        predicted_egfr = model.predict(future_years)

        # Generate the plot
        plt.figure(figsize=(10, 5))
        plt.plot(years.flatten(), egfr_values, marker='o', linestyle='-', color='blue', label="Actual eGFR")
        plt.plot(future_years.flatten(), predicted_egfr, marker='o', linestyle='--', color='red', label="Predicted eGFR (2025-2034)")

        # Highlight risk zones
        plt.axhspan(30, 45, color='orange', alpha=0.3, label="Moderate eGFR Decrease (30-45)")
        plt.axhspan(15, 30, color='red', alpha=0.3, label="Severe eGFR Decrease (15-30)")
        plt.axhspan(0, 15, color='darkred', alpha=0.3, label="Kidney Failure (<15)")

        # Labels and title
        plt.xlabel("Year")
        plt.ylabel("eGFR (mL/min)")
        plt.title("eGFR Trend Prediction (2016-2034)")
        plt.legend()
        plt.grid(True)

        # Save plot as an image
        plot_path = os.path.join(STATIC_DIR, "egfr_plot.png")
        plt.savefig(plot_path)
        plt.close()

        # Return the image URL
        return jsonify({"image_url": f"/static/egfr_plot.png"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_file(os.path.join(STATIC_DIR, filename))

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5002)
