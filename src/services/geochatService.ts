import { toast } from "@/hooks/use-toast";

export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
}

export interface LocationData {
  name: string;
  latitude?: number;
  longitude?: number;
  population?: string;
  country?: string;
  continent?: string;
  label?: string;
  region?: string;
  timezone?: string;
  contextual_label?: string;
  funFacts?: string[];
  nearbyLocations?: GeoLocation[];
  mainAttractions?: string[];
}

export interface ChatResponse {
  answer: string;
  source_data: {
    display_name?: string;
    lat?: number;
    lon?: number;
    population?: string | number;
    region?: string;
    timezone?: string;
    label?: string;
    contextual_label?: string;
    nearby?: string[];
    nearby_data?: Array<{
      name: string;
      lat: number;
      lon: number;
    }>;
    main_attractions?: string[];
  };
}

// The backend URL - you would typically store this in an environment variable
const API_URL = "http://localhost:8080";

export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: message }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending chat message:", error);
    toast({
      title: "Connection Error",
      description: "Could not connect to the GeoChatBot server. Please try again later.",
      variant: "destructive",
    });
    throw error;
  }
};

export const formatLocationData = (data: ChatResponse): LocationData => {
  const sourceData = data.source_data;
  
  return {
    name: sourceData.display_name || "Unknown Location",
    latitude: sourceData.lat,
    longitude: sourceData.lon,
    population: sourceData.population ? sourceData.population.toString() : "Unknown",
    country: sourceData.region || "Unknown",
    continent: sourceData.region || "Unknown",
    label: sourceData.label || "Location",
    region: sourceData.region || "Unknown",
    timezone: sourceData.timezone || "Unknown",
    contextual_label: sourceData.contextual_label || "Interesting Place",
    funFacts: [data.answer],
    nearbyLocations: sourceData.nearby_data?.map(location => ({
      name: location.name,
      latitude: location.lat,
      longitude: location.lon,
    })) || [],
    mainAttractions: sourceData.main_attractions || []
  };
};
