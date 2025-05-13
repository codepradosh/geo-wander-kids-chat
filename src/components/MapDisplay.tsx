
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
      <div className="map-container flex items-center justify-center bg-gradient-to-r from-kid-green/10 to-kid-blue/10 border-4 border-kid-green/20 h-64 rounded-xl">
        <div className="text-center p-8">
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
            alt="Nature scene" 
            className="w-24 h-24 mx-auto mb-4 rounded-full object-cover shadow-md"
          />
          <p className="text-lg text-gray-600">Ask about a place to see it on the map!</p>
        </div>
      </div>
    );
  }

  // In a real app, this would be an actual map implementation
  // For now, we'll create a simplified visual representation
  return (
    <div className="map-container relative bg-gradient-to-br from-kid-blue/20 to-kid-green/20 overflow-hidden border-4 border-kid-green/20 shadow-md h-64 rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-kid-blue/30 to-kid-green/30"></div>
      
      {/* Nature elements overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-5 left-5 w-16 h-16 bg-kid-green/20 rounded-full blur-sm"></div>
        <div className="absolute top-20 left-20 w-12 h-12 bg-kid-blue/20 rounded-full blur-sm"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-kid-green/20 rounded-full blur-sm"></div>
      </div>
      
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
          <div className="absolute -top-8 -left-1 w-10 h-10 bg-gradient-to-br from-kid-pink to-red-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10 animate-pulse">
            <span className="text-white font-bold">📍</span>
          </div>
          <div className="absolute -top-3 -left-3 animate-ping w-4 h-4 bg-kid-pink rounded-full opacity-50"></div>
          <div className="absolute top-2 -left-10 w-20 text-center bg-white px-2 py-1 rounded-lg shadow-md text-xs font-bold border-2 border-kid-pink/30">
            {mainLocation.name}
          </div>
        </div>
      </div>
      
      {/* Nearby location pins */}
      {nearbyLocations.filter(loc => loc.latitude && loc.longitude).map((location, index) => (
        <div 
          key={index}
          className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            left: `${50 + (location.longitude / 180) * 40}%`, 
            top: `${50 - (location.latitude / 90) * 40}%` 
          }}
        >
          <div className="w-4 h-4 bg-gradient-to-br from-kid-green to-green-400 rounded-full border-2 border-white"></div>
          <p className="absolute top-4 -left-10 w-20 text-center bg-white/80 px-1 rounded text-[10px] border border-kid-green/30">
            {location.name}
          </p>
        </div>
      ))}
      
      {/* Map icons - trees and mountains for decoration */}
      <div className="absolute bottom-5 left-5 text-lg">🌲</div>
      <div className="absolute bottom-10 left-20 text-lg">🌳</div>
      <div className="absolute top-5 right-10 text-lg">🏔️</div>
      <div className="absolute top-15 right-20 text-lg">⛰️</div>
      
      <div className="absolute bottom-2 right-2 text-xs text-white bg-black/30 px-2 py-1 rounded">
        Fun Nature Map
      </div>
    </div>
  );
};

export default MapDisplay;
