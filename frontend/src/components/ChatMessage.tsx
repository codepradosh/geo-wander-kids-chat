
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot }) => {
  return (
    <div 
      className={cn(
        "max-w-[80%] rounded-2xl p-4 mb-4",
        isBot 
          ? "bg-gradient-to-r from-kid-blue to-kid-green/80 text-white self-start rounded-bl-none shadow-md" 
          : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 self-end rounded-br-none shadow-md"
      )}
    >
      <div className="flex items-start gap-2">
        {isBot && (
          <div className="w-8 h-8 rounded-full bg-white text-kid-blue flex items-center justify-center text-lg shadow-sm">
            🌍
          </div>
        )}
        <div>
          <p className={cn("text-sm font-semibold mb-1", isBot ? "text-white/90" : "text-gray-600")}>
            {isBot ? "Globy" : "You"}
          </p>
          <div className={cn("text-base leading-relaxed", isBot ? "text-white" : "text-gray-700")}>
            {message}
          </div>
          
          {/* Add nature-themed decoration for bot messages */}
          {isBot && (
            <div className="mt-2 flex justify-end gap-1">
              <span className="text-xs opacity-70">🌿</span>
              <span className="text-xs opacity-70">🦋</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
