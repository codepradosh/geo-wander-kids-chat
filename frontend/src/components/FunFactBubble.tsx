import React from 'react';

interface FunFactBubbleProps {
  fact?: string;
  mainAttractions?: string[];
}

const FunFactBubble: React.FC<FunFactBubbleProps> = ({ mainAttractions }) => {
  if (!mainAttractions || mainAttractions.length === 0) return null;

  return (
    <div className="relative my-6">
      <div className="absolute -top-3 left-6 transform -translate-x-1/2 bg-gradient-to-r from-kid-yellow to-yellow-300 text-kid-blue px-4 py-1 rounded-full text-sm font-bold shadow-md border border-yellow-400/30 z-10">
        Fun Fact!
      </div>
      <div className="bg-gradient-to-br from-kid-yellow/60 to-kid-yellow/20 backdrop-blur-sm rounded-xl p-5 pt-6 border-2 border-kid-yellow/30 shadow-md">
        <div className="relative space-y-4">
          <div className="absolute -top-2 -left-2 text-xl">🌟</div>
          <div className="absolute -bottom-2 -right-2 text-xl">🌟</div>
          
          <div className="bg-white/60 p-4 rounded-lg">
            <h4 className="text-kid-blue font-bold mb-3 flex items-center gap-2">
              Must-Visit Places:
            </h4>
            <ul className="space-y-2">
              {mainAttractions.map((attraction, index) => {
                const [place, description] = attraction.split(" - ");
                return (
                  <li key={index} className="bg-white/40 p-2 rounded-lg border border-kid-yellow/20">
                    <span className="font-bold text-kid-blue">{place}</span>
                    <p className="text-sm text-gray-600">{description}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        
        {/* Nature elements */}
        <div className="absolute bottom-2 right-2 text-sm">🌿</div>
        <div className="absolute top-6 right-4 text-sm">🦜</div>
      </div>
    </div>
  );
};

export default FunFactBubble;
