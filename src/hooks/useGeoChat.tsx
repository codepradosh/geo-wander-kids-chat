
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LocationData } from '@/services/geochatService';

interface GeoChatContextType {
  locationData: LocationData | null;
  setLocationData: (data: LocationData | null) => void;
}

const GeoChatContext = createContext<GeoChatContextType | undefined>(undefined);

export const GeoChatProvider = ({ children }: { children: ReactNode }) => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  return (
    <GeoChatContext.Provider value={{ locationData, setLocationData }}>
      {children}
    </GeoChatContext.Provider>
  );
};

export const useGeoChat = () => {
  const context = useContext(GeoChatContext);
  if (context === undefined) {
    throw new Error('useGeoChat must be used within a GeoChatProvider');
  }
  return context;
};
