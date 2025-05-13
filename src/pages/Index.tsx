
import React, { useState } from 'react';
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import GlobeMascot from '@/components/GlobeMascot';
import ChatInput from '@/components/ChatInput';
import ChatMessage from '@/components/ChatMessage';
import MapDisplay from '@/components/MapDisplay';
import FactCard from '@/components/FactCard';
import FunFactBubble from '@/components/FunFactBubble';
import NatureBackground from '@/components/NatureBackground';
import { Globe, Trees, Mountain, Cloud, Rainbow } from 'lucide-react';
import { sendChatMessage, formatLocationData, LocationData } from '@/services/geochatService';

// Sample welcome messages
const welcomeMessages = [
  "Hi there! I'm Globy, your friendly world explorer! Ask me about any place on Earth!",
  "Want to learn about mountains, oceans, countries, or cities? Just ask me!",
  "Did you know there are 195 countries in the world? Which one would you like to learn about?",
];

// Sample preset questions for kids
const presetQuestions = [
  "Where is the tallest mountain?",
  "Tell me about Australia",
  "What animals live in Africa?",
  "How big is the ocean?",
  "Where is the North Pole?",
  "What's the capital of Japan?",
];

const Index = () => {
  const [messages, setMessages] = useState<{text: string; isBot: boolean}[]>([
    { text: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)], isBot: true }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  const handleSendMessage = async (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    
    // Start loading
    setIsLoading(true);
    
    try {
      // Call the actual API
      const response = await sendChatMessage(message);
      
      // Format the response data
      const formattedData = formatLocationData(response);
      setLocationData(formattedData);
      
      // Add bot response
      setMessages(prev => [...prev, { text: response.answer, isBot: true }]);
      
      // Show success toast
      toast({
        title: "New fact learned!",
        description: "Keep exploring to discover more about our world!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error handling message:", error);
      
      // Add fallback response in case of error
      setMessages(prev => [...prev, { 
        text: "I'm having trouble connecting to my knowledge base right now. Please try again later!", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <NatureBackground />
      <Container className="py-6 relative z-10">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-kid-green to-kid-blue text-white flex items-center justify-center text-xl">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gradient-to-br from-kid-green via-kid-blue to-kid-purple">GeoChatBot for Kids</h1>
          </div>
          <p className="text-gray-600 max-w-lg mx-auto backdrop-blur-sm bg-white/30 rounded-full py-1 px-4">
            Ask questions and learn amazing facts about places all around the world!
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-4 mb-4 flex-1 overflow-hidden flex flex-col border-2 border-kid-green/30">
              <div className="flex-1 overflow-y-auto p-2 flex flex-col">
                {messages.map((msg, index) => (
                  <ChatMessage key={index} message={msg.text} isBot={msg.isBot} />
                ))}
                {isLoading && (
                  <div className="self-start bg-gray-100 rounded-2xl p-4 animate-pulse flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-kid-blue/30"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {presetQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-kid-green/20 to-kid-blue/20 hover:from-kid-green/30 hover:to-kid-blue/30 text-gray-700 text-sm rounded-full px-3 py-1 border border-kid-green/20"
                    >
                      {index % 2 === 0 ? <Trees className="inline-block h-3 w-3 mr-1" /> : <Mountain className="inline-block h-3 w-3 mr-1" />}
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <MapDisplay 
                mainLocation={locationData ? {
                  name: locationData.name,
                  latitude: locationData.latitude || 0,
                  longitude: locationData.longitude || 0
                } : undefined}
                nearbyLocations={locationData?.nearbyLocations || []}
              />
            </div>

            {locationData && locationData.funFacts && locationData.funFacts.length > 0 && (
              <FunFactBubble fact={locationData.funFacts[0]} />
            )}
          </div>
          
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
                    `${locationData.latitude.toFixed(2)}°, ${locationData.longitude.toFixed(2)}°` : "Unknown" }
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
        </div>
        
        <footer className="mt-12 text-center text-xs text-gray-500 bg-white/60 backdrop-blur-sm py-2 rounded-full">
          <p className="flex items-center justify-center gap-2">
            <Cloud className="h-3 w-3" />
            GeoChatBot for Kids © 2025 | Learning about our amazing planet!
            <Cloud className="h-3 w-3" />
          </p>
        </footer>
      </Container>
    </div>
  );
};

export default Index;
