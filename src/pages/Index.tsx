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

// Mock data - In a real app, this would come from an API
const mockLocationData = {
  name: "Paris",
  latitude: 48.8566,
  longitude: 2.3522,
  population: "2.2 million",
  country: "France",
  continent: "Europe",
  funFacts: [
    "The Eiffel Tower was originally built as a temporary exhibit for the 1889 World Fair!",
    "Paris has over 170 museums, including the world-famous Louvre!"
  ],
  nearbyLocations: [
    { name: "Versailles", latitude: 48.8044, longitude: 2.1232 },
    { name: "Disneyland Paris", latitude: 48.8673, longitude: 2.7836 }
  ]
};

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
  const [showLocation, setShowLocation] = useState(false);

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    
    // Simulate loading
    setIsLoading(true);
    
    // Simulate response (in a real app, this would call an API)
    setTimeout(() => {
      let botResponse = "";
      
      // Very simple "AI" responses based on keywords
      const lowercaseMsg = message.toLowerCase();
      
      if (lowercaseMsg.includes("paris") || lowercaseMsg.includes("france")) {
        botResponse = "Paris is the capital city of France! It's famous for the Eiffel Tower, delicious pastries, and beautiful art. Over 30 million people visit Paris every year!";
        setShowLocation(true);
      } 
      else if (lowercaseMsg.includes("mountain") || lowercaseMsg.includes("everest")) {
        botResponse = "Mount Everest is the tallest mountain in the world! It's in the Himalayan mountain range between Nepal and Tibet. It's 29,032 feet (8,849 meters) tall!";
      }
      else if (lowercaseMsg.includes("ocean") || lowercaseMsg.includes("sea")) {
        botResponse = "The Pacific Ocean is the largest ocean on Earth! It covers more than 30% of Earth's surface. That's bigger than all the land combined!";
      }
      else if (lowercaseMsg.includes("animal") || lowercaseMsg.includes("africa")) {
        botResponse = "Africa has amazing animals like lions, elephants, giraffes, zebras, and hippos! Many of these animals live in grasslands called savannas.";
      }
      else {
        botResponse = "That's a great question! I'd love to tell you about places around the world. Try asking me about specific countries, cities, or natural wonders!";
      }
      
      // Add bot response
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      setIsLoading(false);
      
      // Show success toast
      toast({
        title: "New fact learned!",
        description: "Keep exploring to discover more about our world!",
        variant: "default",
      });
    }, 1500);
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
                mainLocation={showLocation ? {
                  name: mockLocationData.name,
                  latitude: mockLocationData.latitude,
                  longitude: mockLocationData.longitude
                } : undefined}
                nearbyLocations={showLocation ? mockLocationData.nearbyLocations : []}
              />
            </div>

            {showLocation && (
              <FunFactBubble fact={mockLocationData.funFacts[Math.floor(Math.random() * mockLocationData.funFacts.length)]} />
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-4 flex flex-col items-center border-2 border-kid-purple/30">
              <GlobeMascot />
            </div>
            
            {showLocation && (
              <FactCard 
                title={`About ${mockLocationData.name}`}
                facts={[
                  { icon: "🗺️", label: "Continent", value: mockLocationData.continent },
                  { icon: "🏙️", label: "Population", value: mockLocationData.population },
                  { icon: "🌍", label: "Country", value: mockLocationData.country },
                  { icon: "📍", label: "Coordinates", value: `${mockLocationData.latitude.toFixed(2)}°, ${mockLocationData.longitude.toFixed(2)}°` }
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
