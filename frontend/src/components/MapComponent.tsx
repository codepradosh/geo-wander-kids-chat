import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const RedIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

interface Props {
  locations: Location[];
  mainLocation: Location;
}

// Helper component to update map center
const RecenterMap = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([latitude, longitude], map.getZoom());
  }, [latitude, longitude, map]);

  return null;
};

const MapComponent: React.FC<Props> = ({ mainLocation, locations }) => {
  const center: [number, number] = mainLocation
      ? [mainLocation.latitude, mainLocation.longitude]
      : [0, 0];

  return (
    <MapContainer center={center} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap latitude={center[0]} longitude={center[1]} />

            {/* Main location with red marker */}
            {mainLocation && (
              <Marker position={[mainLocation.latitude, mainLocation.longitude]} icon={RedIcon}>
                <Popup>{mainLocation.name} (Main)</Popup>
              </Marker>
            )}

            {/* Other locations with default marker */}
            {locations.map((loc, index) => (
              <Marker key={index} position={[loc.latitude, loc.longitude]}>
                <Popup>{loc.name}</Popup>
              </Marker>
            ))}
    </MapContainer>
  );
};

export default MapComponent;
