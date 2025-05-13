import React from 'react';
import GlobeMascot from '@/components/GlobeMascot';
import FactCard from '@/components/FactCard';
import { Rainbow } from 'lucide-react';
import { useGeoChat } from '@/hooks/useGeoChat';

const InfoSection = () => {
  const { locationData } = useGeoChat();

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-4 flex flex-col items-center border-2 border-kid-purple/30">
        <GlobeMascot />
      </div>
      
      {locationData && (
        <FactCard 
          title={`About ${locationData.name}`}
          facts={[
            { icon: "🗺️", label: "Type", value: locationData.label || "Location" },
            { icon: "🏙️", label: "Population", value: locationData.population || "Unknown" },
            { icon: "🌍", label: "Region", value: locationData.region || "Unknown" },
            { icon: "🕒", label: "Timezone", value: locationData.timezone || "Unknown" },
            { icon: "✨", label: "Known as", value: locationData.contextual_label || "Amazing Place" },
            { icon: "📍", label: "Coordinates", value: locationData.latitude && locationData.longitude ? 
              `${locationData.latitude.toFixed(2)}°, ${locationData.longitude.toFixed(2)}°` : "Unknown" },
            { icon: "🏢", label: "Nearby Places", value: locationData.nearbyLocations?.map(loc => loc.name).join(", ") || "None" }
          ]}
        />
      )}
      
      <div className="bg-gradient-to-br from-white/90 to-kid-yellow/30 backdrop-blur-sm rounded-2xl shadow-md p-4 border-2 border-kid-yellow/30">
        <h3 className="text-kid-blue font-bold mb-2 flex items-center gap-2">
          <Rainbow className="h-5 w-5" />
          Fun Geography Facts!
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2 bg-white/60 p-2 rounded-lg">
            <span className="text-lg">🌋</span>
            <span className="text-sm">There are about 1,500 active volcanoes on Earth!</span>
          </li>
          <li className="flex items-start gap-2 bg-white/60 p-2 rounded-lg">
            <span className="text-lg">🌊</span>
            <span className="text-sm">The Pacific Ocean covers almost one-third of Earth's surface!</span>
          </li>
          <li className="flex items-start gap-2 bg-white/60 p-2 rounded-lg">
            <span className="text-lg">🗺️</span>
            <span className="text-sm">The smallest country in the world is Vatican City!</span>
          </li>
          <li className="flex items-start gap-2 bg-white/60 p-2 rounded-lg">
            <span className="text-lg">🏔️</span>
            <span className="text-sm">Antarctica is the coldest, windiest continent!</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InfoSection;
