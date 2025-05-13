
import React from 'react';

const GlobeMascot = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 animate-bounce-slow">
        <div className="absolute inset-0 rounded-full bg-kid-blue opacity-20 animate-pulse"></div>
        <div className="absolute inset-2 rounded-full bg-kid-blue bg-opacity-40"></div>
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
        </div>
      </div>
      <h2 className="text-xl font-bold mt-2 text-kid-blue">Globy</h2>
      <p className="text-sm text-gray-600">Your world explorer friend!</p>
    </div>
  );
};

export default GlobeMascot;
