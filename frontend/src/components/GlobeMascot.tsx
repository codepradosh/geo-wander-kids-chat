
import React from 'react';

const GlobeMascot = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 animate-bounce-slow">
        {/* Glow effect */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-kid-yellow/30 via-kid-green/30 to-kid-blue/30 animate-pulse blur-md"></div>
        
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-kid-blue/60 to-kid-green/60 opacity-20 animate-pulse"></div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-kid-blue/80 to-kid-green/80 bg-opacity-40"></div>
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-kid-blue to-kid-green animate-rotate-slow">
          {/* Continent-like shapes */}
          <div className="absolute top-7 left-7 w-12 h-10 rounded-full bg-kid-green rotate-12"></div>
          <div className="absolute top-16 right-8 w-8 h-10 rounded-full bg-kid-green -rotate-12"></div>
          <div className="absolute bottom-10 left-10 w-14 h-8 rounded-full bg-kid-green rotate-45"></div>
          
          {/* Face */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-16 h-8">
            <div className="absolute left-1 top-0 w-3 h-3 rounded-full bg-white"></div>
            <div className="absolute right-1 top-0 w-3 h-3 rounded-full bg-white"></div>
            <div className="absolute left-3 top-4 right-3 h-2 rounded-full bg-white"></div>
          </div>
          
          {/* Nature elements */}
          <div className="absolute bottom-5 right-7 w-6 h-6 bg-kid-yellow rounded-full opacity-70 flex items-center justify-center text-xs">🌻</div>
          <div className="absolute top-5 left-7 w-6 h-6 bg-white rounded-full opacity-70 flex items-center justify-center text-xs">❄️</div>
        </div>
        
        {/* Little floating nature elements around the mascot */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-float text-sm">🦋</div>
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 animate-float text-sm" style={{ animationDelay: "1s" }}>🍃</div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 animate-float text-sm" style={{ animationDelay: "1.5s" }}>🍄</div>
        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 animate-float text-sm" style={{ animationDelay: "0.5s" }}>🌱</div>
      </div>
      <h2 className="text-xl font-bold mt-2 bg-gradient-to-r from-kid-blue via-kid-green to-kid-blue bg-clip-text text-transparent">Globy</h2>
      <p className="text-sm text-gray-600">Your world explorer friend!</p>
    </div>
  );
};

export default GlobeMascot;
