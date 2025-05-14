import React, { useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import ChatInput from '@/components/ChatInput';
import ChatMessage from '@/components/ChatMessage';
import MapDisplay from '@/components/MapDisplay';
import MapComponent from '@/components/MapComponent';
import FunFactBubble from '@/components/FunFactBubble';
import { Trees, Mountain } from 'lucide-react';
import { sendChatMessage, formatLocationData } from '@/services/geochatService';
import { useGeoChat } from '@/hooks/useGeoChat';

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
const locations = [
  { name: "New York", lat: 40.7128, long: -74.006 },
  { name: "London", lat: 51.5074, long: -0.1278 },
  { name: "Tokyo", lat: 35.6895, long: 139.6917 },
];

const ChatSection = () => {
  const [messages, setMessages] = useState<{text: string; isBot: boolean}[]>([
    { text: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)], isBot: true }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { locationData, setLocationData } = useGeoChat();

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
    <div className="md:col-span-2 flex flex-col">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-4 mb-4 flex-1 overflow-hidden flex flex-col border-2 border-kid-green/30">
        <div className="flex flex-col gap-2 overflow-auto h-[500px] p-4">
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
        <MapComponent mainLocation={locationData ? {
                                  name: locationData.name,
                                  latitude: locationData.latitude || 0,
                                  longitude: locationData.longitude || 0
                                } : undefined}
                                locations={locationData?.nearbyLocations || []}/>
      </div>

      {locationData?.mainAttractions && locationData.mainAttractions.length > 0 && (
        <FunFactBubble mainAttractions={locationData.mainAttractions} />
      )}
    </div>
  );
};

export default ChatSection;
