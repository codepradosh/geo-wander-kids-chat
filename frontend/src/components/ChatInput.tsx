
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Globe } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const placeholders = [
    "Where is Tokyo?",
    "Tell me about Paris",
    "How big is Africa?",
    "What's the capital of Brazil?",
  ];

  const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <Input
          className="rounded-full py-6 px-4 text-lg border-2 border-kid-blue/30 focus-visible:ring-kid-blue bg-white/70 backdrop-blur-sm"
          placeholder={randomPlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          className="rounded-full bg-gradient-to-r from-kid-blue to-kid-green hover:opacity-90 text-white py-6 shadow-md"
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? "Thinking..." : <Globe className="h-5 w-5" />}
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
