import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

const MapComponent = ({ locations }) => {
  const center = locations.length
    ? [locations[0].lat, locations[0].long]
    : [0, 0];

  return (
    <MapContainer center={center} zoom={2} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.lat, loc.long]}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

/*
{
    "answer": "The tallest mountain on Earth is Mount Everest, and it's like the giant of all giants when it comes to mountains! Imagine standing at the base, looking up at its snowy peak that seems to touch the sky. Mount Everest is located in the Mahalangur Himal sub-range of the Himalayas, right on the border between Nepal and the Tibet Autonomous Region of China. Climbing it is a dream for many adventurers, but it's not just a walk in the park—it's a challenging journey that requires lots of preparation and courage. The mountain is so tall that its peak reaches 8,848 meters (29,029 feet) above sea level, making it the highest point on Earth. The air up there is very thin, and the weather can change in a blink, adding to the adventure. Surrounding Everest are other majestic peaks, creating a breathtaking landscape that's home to unique wildlife and cultures. The Sherpa people, who live in the region, are known for their incredible mountaineering skills and have helped many climbers reach the summit. Visiting Everest, even just to see it from a distance, is an unforgettable experience that fills you with awe at the power and beauty of nature.",
    "source_data": {
        "display_name": "Mount Everest",
        "label": "mountain",
        "population": null,
        "lat": 27.9881,
        "lon": 86.925,
        "region": "Asia",
        "timezone": "Asia/Kathmandu",
        "contextual_label": "Roof of the World",
        "nearby": [
            "Kathmandu",
            "Namche Bazaar",
            "Lukla",
            "Pheriche",
            "Dingboche"
        ],
        "main_attractions": [
            "The summit of Mount Everest - the highest point on Earth",
            "Base Camp Trek - a popular route for adventurers",
            "Khumbu Icefall - a challenging section for climbers",
            "Sherpa culture - learn about the local communities",
            "Himalayan wildlife - spot unique species like the snow leopard"
        ],
        "nearby_data": [
            {
                "name": "Kathmandu",
                "lat": 27.708317,
                "lon": 85.3205817
            },
            {
                "name": "Namche Bazaar",
                "lat": 27.8041662,
                "lon": 86.7097956
            },
            {
                "name": "Lukla",
                "lat": 60.1815946,
                "lon": 24.9263861
            },
            {
                "name": "Pheriche",
                "lat": 27.8933858,
                "lon": 86.819991
            },
            {
                "name": "Dingboche",
                "lat": 27.8935203,
                "lon": 86.8309364
            }
        ]
    }
}
*/

export default MapComponent;
