
import React from 'react';

const NatureBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50"></div>
      
      {/* Sun */}
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-kid-yellow to-yellow-200 opacity-80 blur-sm"></div>
      
      {/* Clouds */}
      <div className="absolute top-20 left-[10%] w-32 h-16 rounded-full bg-white opacity-60 blur-sm animate-bounce-slow"></div>
      <div className="absolute top-12 left-[30%] w-40 h-20 rounded-full bg-white opacity-70 blur-sm animate-bounce-slow" style={{ animationDelay: "1.5s" }}></div>
      <div className="absolute top-24 left-[70%] w-28 h-14 rounded-full bg-white opacity-60 blur-sm animate-bounce-slow" style={{ animationDelay: "0.7s" }}></div>
      
      {/* Mountains in the distance */}
      <div className="absolute bottom-0 left-0 right-0 h-[20vh] overflow-hidden">
        <div className="absolute -bottom-10 -left-10 right-[-10%] h-[25vh] bg-kid-green/30 rounded-[100%]"></div>
        <div className="absolute -bottom-5 left-[20%] right-[10%] h-[22vh] bg-kid-green/40 rounded-[100%]"></div>
        <div className="absolute -bottom-15 left-[50%] right-[-5%] h-[28vh] bg-kid-green/20 rounded-[100%]"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-[15vh] left-[5%] w-6 h-16 bg-kid-green rounded-full"></div>
      <div className="absolute bottom-[15vh] left-[8%] w-5 h-12 bg-kid-green rounded-full"></div>
      <div className="absolute bottom-[15vh] left-[12%] w-4 h-14 bg-kid-green rounded-full"></div>
      
      <div className="absolute bottom-[18vh] right-[15%] w-6 h-16 bg-kid-green rounded-full"></div>
      <div className="absolute bottom-[18vh] right-[18%] w-5 h-12 bg-kid-green rounded-full"></div>
      <div className="absolute bottom-[18vh] right-[21%] w-4 h-14 bg-kid-green rounded-full"></div>
      
      {/* Small decorative elements/flowers */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i} 
          className="absolute w-3 h-3 rounded-full" 
          style={{
            backgroundColor: ['#FF90BC', '#FFCE5C', '#7AC74F', '#9381FF'][i % 4],
            bottom: `${Math.random() * 15 + 5}vh`,
            left: `${Math.random() * 90 + 5}%`,
            opacity: 0.7
          }}
        ></div>
      ))}
    </div>
  );
};

export default NatureBackground;
