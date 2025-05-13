
import React from 'react';

interface FunFactBubbleProps {
  fact: string;
}

const FunFactBubble: React.FC<FunFactBubbleProps> = ({ fact }) => {
  return (
    <div className="relative my-6">
      <div className="absolute -top-3 left-6 transform -translate-x-1/2 bg-gradient-to-r from-kid-yellow to-yellow-300 text-kid-blue px-4 py-1 rounded-full text-sm font-bold shadow-md border border-yellow-400/30 z-10">
        Fun Fact!
      </div>
      <div className="bg-gradient-to-br from-kid-yellow/60 to-kid-yellow/20 backdrop-blur-sm rounded-xl p-5 pt-6 border-2 border-kid-yellow/30 shadow-md">
        <div className="relative">
          <div className="absolute -top-2 -left-2 text-xl">🌟</div>
          <div className="absolute -bottom-2 -right-2 text-xl">🌟</div>
          <p className="text-gray-700 bg-white/60 p-3 rounded-lg">{fact}</p>
        </div>
        
        {/* Nature elements */}
        <div className="absolute bottom-2 right-2 text-sm">🌿</div>
        <div className="absolute top-6 right-4 text-sm">🦜</div>
      </div>
    </div>
  );
};

export default FunFactBubble;
