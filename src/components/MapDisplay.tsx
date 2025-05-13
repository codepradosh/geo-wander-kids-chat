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

  // Calculate distances and angles for the connecting lines
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  return (
    <div className="map-container relative bg-gradient-to-br from-kid-blue/20 to-kid-green/20 overflow-hidden border-4 border-kid-green/20 shadow-md h-[400px] rounded-xl">
      {/* Map background with subtle grid */}
      <div className="absolute inset-0 bg-white/5">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-8">
          {Array(96).fill(0).map((_, i) => (
            <div key={i} className="border border-white/10"></div>
          ))}
        </div>
      </div>

      {/* Topographic-style background circles */}
      <div className="absolute inset-0">
        {Array(5).fill(0).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-kid-blue/5 to-kid-green/5"
            style={{
              width: `${100 + i * 40}px`,
              height: `${100 + i * 40}px`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
      
      {/* Main location marker */}
      <div 
        className="absolute w-20 h-20 transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${50 + (mainLocation.longitude / 180) * 40}%`, 
          top: `${50 - (mainLocation.latitude / 90) * 40}%` 
        }}
      >
        <div className="relative">
          <div className="absolute -top-10 -left-2 w-12 h-12 bg-gradient-to-br from-kid-pink to-red-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-20 animate-pulse">
            <span className="text-xl">📍</span>
          </div>
          <div className="absolute -top-4 -left-4 animate-ping w-6 h-6 bg-kid-pink rounded-full opacity-30"></div>
          <div className="absolute top-2 -left-16 w-32 text-center bg-white px-3 py-2 rounded-lg shadow-md text-sm font-bold border-2 border-kid-pink/30 z-10">
            {mainLocation.name}
          </div>
        </div>
      </div>

      {/* Connecting lines and nearby location markers */}
      {nearbyLocations.filter(loc => loc.latitude && loc.longitude).map((location, index) => {
        const distance = calculateDistance(
          mainLocation.latitude,
          mainLocation.longitude,
          location.latitude,
          location.longitude
        );

        // Calculate line coordinates
        const mainX = 50 + (mainLocation.longitude / 180) * 40;
        const mainY = 50 - (mainLocation.latitude / 90) * 40;
        const locX = 50 + (location.longitude / 180) * 40;
        const locY = 50 - (location.latitude / 90) * 40;

        return (
          <React.Fragment key={index}>
            {/* Connection line */}
            <div 
              className="absolute h-px bg-gradient-to-r from-kid-green/40 to-kid-blue/40"
              style={{
                left: `${Math.min(mainX, locX)}%`,
                top: `${mainY}%`,
                width: `${Math.abs(locX - mainX)}%`,
                transform: `rotate(${Math.atan2(locY - mainY, locX - mainX)}rad)`,
                transformOrigin: `${mainX < locX ? '0' : '100%'} 50%`,
              }}
            />
            
            {/* Distance indicator */}
            <div 
              className="absolute text-[10px] bg-white/80 px-1 rounded"
              style={{
                left: `${(mainX + locX) / 2}%`,
                top: `${(mainY + locY) / 2}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {distance}km
            </div>

            {/* Location marker */}
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${locX}%`, 
                top: `${locY}%` 
              }}
            >
              <div className="w-4 h-4 bg-gradient-to-br from-kid-green to-kid-blue rounded-full border-2 border-white shadow-md"></div>
              <div className="absolute top-4 -left-12 w-24 text-center bg-white/90 px-2 py-1 rounded-lg text-[10px] border border-kid-green/30 shadow-sm">
                {location.name}
              </div>
            </div>
          </React.Fragment>
        );
      })}
      
      {/* Decorative elements */}
      <div className="absolute bottom-4 left-4 text-lg space-x-2">🌲 🌳</div>
      <div className="absolute top-4 right-4 text-lg space-x-2">🏔️ ⛰️</div>
      
      <div className="absolute bottom-2 right-2 text-xs bg-black/30 px-2 py-1 rounded-lg text-white backdrop-blur-sm">
        Interactive Map
      </div>
    </div>
  );
};

export default MapDisplay;
