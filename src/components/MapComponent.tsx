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
L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  name: string;
  lat: number;
  long: number;
}

interface Props {
  locations: Location[];
}

// Helper component to update map center
const RecenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);

  return null;
};

const MapComponent: React.FC<Props> = ({ locations }) => {
  const defaultCenter: [number, number] = locations.length
    ? [locations[0].lat, locations[0].long]
    : [0, 0];

  return (
    <MapContainer center={defaultCenter} zoom={2} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.length > 0 && (
        <RecenterMap lat={locations[0].lat} lng={locations[0].long} />
      )}
      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.lat, loc.lon]}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
