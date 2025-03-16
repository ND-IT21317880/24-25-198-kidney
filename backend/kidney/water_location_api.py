import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import folium
import joblib
import uuid

app = Flask(__name__)
CORS(app)

# Load trained model and encoder
model = joblib.load("location_models/ckdu_risk_model_latlong.pkl")
encoder = joblib.load("location_models/risk_label_encoder_latlong.pkl")

# Load risk level data
location_risk_data = pd.read_csv("location_models/location_risk_levels.csv")

# Create maps directory if it doesn't exist
os.makedirs("maps", exist_ok=True)


# Function to predict risk based on Latitude & Longitude
def predict_risk(lat_x, long_x):
    input_df = pd.DataFrame([[lat_x, long_x]], columns=["Lat_x", "Long_x"])
    prediction = model.predict(input_df)[0]
    predicted_risk = encoder.inverse_transform([prediction])[0]
    return predicted_risk


# Function to generate an interactive map
def generate_map(user_lat, user_long):
    # Predict the risk level for user input
    user_risk = predict_risk(user_lat, user_long)

    # Initialize the map centered on the user's location
    m = folium.Map(location=[user_lat, user_long], zoom_start=10)

    # Add a marker for the user's location
    folium.Marker(
        location=[user_lat, user_long],
        popup=f"User Location: {user_lat}, {user_long}\nPredicted Risk: {user_risk}",
        icon=folium.Icon(color="blue", icon="info-sign")
    ).add_to(m)

    # Function to determine marker color based on risk level
    def get_marker_color(risk_level):
        if risk_level == "A High Risk Area":
            return "red"
        elif risk_level == "A Medium Risk Area":
            return "orange"
        else:
            return "green"

    # Add markers for all recorded risk locations
    for _, row in location_risk_data.iterrows():
        folium.CircleMarker(
            location=[row["Lat_x"], row["Long_x"]],
            radius=6,
            color=get_marker_color(row["Risk_Level"]),
            fill=True,
            fill_color=get_marker_color(row["Risk_Level"]),
            fill_opacity=0.7,
            popup=f"Risk Area: {row['Risk_Level']}\nLocation: {row['Lat_x']}, {row['Long_x']}"
        ).add_to(m)

    # Generate a unique filename
    map_file = f"maps/risk_map_{uuid.uuid4().hex}.html"
    m.save(map_file)

    return user_risk, map_file


@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from request
    data = request.get_json()

    # Extract latitude and longitude
    try:
        user_lat = float(data.get('lat'))
        user_long = float(data.get('lon'))
    except (TypeError, ValueError):
        return jsonify({
            'error': 'Invalid coordinates. Please provide valid lat and lon values.'
        }), 400

    # Generate prediction and map
    try:
        predicted_risk, map_path = generate_map(user_lat, user_long)

        # Return the prediction and file path
        return jsonify({
            'risk_level': predicted_risk,
            'map_path': map_path
        })
    except Exception as e:
        return jsonify({
            'error': f'Error generating prediction: {str(e)}'
        }), 500


@app.route('/maps/<filename>', methods=['GET'])
def get_map(filename):
    # Serve the generated map file
    try:
        return send_file(f"maps/{filename}")
    except FileNotFoundError:
        return jsonify({
            'error': 'Map file not found'
        }), 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5006)