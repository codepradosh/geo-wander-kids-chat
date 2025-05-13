
import React from 'react';

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

interface MapDisplayProps {
  mainLocation?: Location;
  nearbyLocations?: Location[];
}

const MapDisplay: React.FC<MapDisplayProps> = ({ mainLocation, nearbyLocations = [] }) => {
  if (!mainLocation) {
    return (
      <div className="map-container flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-lg text-gray-500">Ask about a place to see it on the map!</p>
        </div>
      </div>
    );
  }

  // In a real app, this would be an actual map implementation
  // For now, we'll create a simplified visual representation
  return (
    <div className="map-container relative bg-kid-blue/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-kid-blue/30 to-kid-green/30"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
        {Array(48).fill(0).map((_, i) => (
          <div key={i} className="border border-white/20"></div>
        ))}
      </div>
      
      {/* Main location pin */}
      <div 
        className="absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${50 + (mainLocation.longitude / 180) * 40}%`, 
          top: `${50 - (mainLocation.latitude / 90) * 40}%` 
        }}
      >
        <div className="relative">
          <div className="absolute -top-8 -left-1 w-10 h-10 bg-kid-pink rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10">
            <span className="text-white font-bold">📍</span>
          </div>
          <div className="absolute -top-3 -left-3 animate-ping w-4 h-4 bg-kid-pink rounded-full opacity-50"></div>
          <p className="absolute top-2 -left-10 w-20 text-center bg-white px-2 py-1 rounded-lg shadow-md text-xs font-bold">
            {mainLocation.name}
          </p>
        </div>
      </div>
      
      {/* Nearby location pins */}
      {nearbyLocations.map((location, index) => (
        <div 
          key={index}
          className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            left: `${50 + (location.longitude / 180) * 40}%`, 
            top: `${50 - (location.latitude / 90) * 40}%` 
          }}
        >
          <div className="w-4 h-4 bg-kid-green rounded-full border-2 border-white"></div>
          <p className="absolute top-4 -left-10 w-20 text-center bg-white/80 px-1 rounded text-[10px]">
            {location.name}
          </p>
        </div>
      ))}
      
      <div className="absolute bottom-2 right-2 text-xs text-white bg-black/30 px-2 py-1 rounded">
        Fun Map View
      </div>
    </div>
  );
};

export default MapDisplay;
