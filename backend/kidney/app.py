from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd


MODEL_PATH = 'egfr_prediction_model.pkl'
FEATURES_PATH = 'feature_columns.pkl'

app = Flask(__name__)
CORS(app)




# Load the model and scaler
with open('egfr_models/svm_model_v2.pkl', 'rb') as f:
    model = pickle.load(f)

with open('egfr_models/scaler_v2.pkl', 'rb') as f:
    scaler = pickle.load(f)

with open(MODEL_PATH, 'rb') as file:
    emodel = pickle.load(file)

# Load feature columns
with open(FEATURES_PATH, 'rb') as file:
    feature_columns = pickle.load(file)


def predict_egfr(scrmv1, gender, age):
    # Create DataFrame with input data
    data = pd.DataFrame({
        'scrmv1': [float(scrmv1)],
        'gender': [int(gender)],
        'age': [float(age)]
    })

    # Calculate derived features
    data['scrmv1_squared'] = data['scrmv1'] ** 2
    data['age_squared'] = data['age'] ** 2
    data['scrmv1_age_interaction'] = data['scrmv1'] * data['age']

    # Ensure all required columns are present in the correct order
    input_data = data[feature_columns]

    # In a production environment, you would use the saved scaler
    # Since we don't have it, we'll use the raw features
    # Normally you would do: input_data_scaled = scaler.transform(input_data)

    # Make prediction
    prediction = emodel.predict(input_data)[0]

    return prediction


@app.route('/egrf-predict', methods=['POST'])
def eg_predict():
    """Endpoint for EGFR prediction"""
    try:
        # Get data from request
        data = request.get_json()

        # Validate input
        if not all(key in data for key in ['scrmv1', 'gender', 'age']):
            return jsonify({
                "error": "Missing required fields. Please provide scrmv1, gender, and age."
            }), 400

        # Extract values
        scrmv1 = data['scrmv1']
        gender = data['gender']
        age = data['age']

        # Make prediction
        prediction = predict_egfr(scrmv1, gender, age)

        # Prepare response
        response = {
            "prediction": round(float(prediction), 2),
            "input": {
                "scrmv1": scrmv1,
                "gender": gender,
                "age": age
            }
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500
@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the request
    data = request.get_json(force=True)

    # Convert JSON data to a numpy array
    input_data = np.array(data['features']).reshape(1, -1)

    # Scale the input data
    scaled_data = scaler.transform(input_data)

    # Make a prediction
    prediction = model.predict(scaled_data)

    # Return the prediction as JSON
    return jsonify({'prediction': prediction.tolist()})


if __name__ == '__main__':
    app.run(debug=True)