import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Fix leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Location {
  Lat: number;
  Long: number;
  Risk: number;
}

const EnvSriLankaMap: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get<Location[]>(
          "http://127.0.0.1:5000/locations"
        );
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[7.8731, 80.7718]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.Lat, location.Long]}
            eventHandlers={{
              mouseover: (e) => e.target.openPopup(),
            }}
          >
            <Popup>
              {location.Risk === 1 ? "Risk Area" : "Non-Risk Area"} <br />
              Coordinates: {location.Lat.toFixed(4)}, {location.Long.toFixed(4)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EnvSriLankaMap;
