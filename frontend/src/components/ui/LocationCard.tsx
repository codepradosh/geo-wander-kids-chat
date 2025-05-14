import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Info } from 'lucide-react';

interface LocationCardProps {
  name: string;
  description: string;
  distance?: number;
  onSelect: () => void;
}

// Modern location card with glass morphism effect
export const LocationCard: React.FC<LocationCardProps> = ({
  name,
  description,
  distance,
  onSelect,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-4 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-x-16 -translate-y-16 blur-2xl" />
      
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-blue-500/10">
          <MapPin className="w-5 h-5 text-blue-500" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
            {name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {description}
          </p>
          
          {distance && (
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
              <Navigation className="w-4 h-4" />
              <span>{distance.toFixed(1)} km away</span>
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-blue-500/10 transition-colors"
        >
          <Info className="w-5 h-5 text-blue-500" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LocationCard; 