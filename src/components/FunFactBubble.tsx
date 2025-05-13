
import React from 'react';

interface FunFactBubbleProps {
  fact: string;
}

const FunFactBubble: React.FC<FunFactBubbleProps> = ({ fact }) => {
  return (
    <div className="relative my-6">
      <div className="absolute -top-3 left-6 transform -translate-x-1/2 bg-kid-yellow text-kid-blue px-4 py-1 rounded-full text-sm font-bold">
        Fun Fact!
      </div>
      <div className="bg-gradient-to-br from-kid-yellow/50 to-kid-yellow/30 rounded-xl p-5 pt-6 border-2 border-kid-yellow/30">
        <p className="text-gray-700">{fact}</p>
      </div>
    </div>
  );
};

export default FunFactBubble;
