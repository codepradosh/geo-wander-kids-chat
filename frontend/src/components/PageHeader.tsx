
import React from 'react';
import { Globe } from 'lucide-react';

const PageHeader = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-kid-green to-kid-blue text-white flex items-center justify-center text-xl">
          <Globe className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient-to-br from-kid-green via-kid-blue to-kid-purple">World City Explorer for Kids</h1>
      </div>
      <p className="text-gray-600 max-w-lg mx-auto backdrop-blur-sm bg-white/30 rounded-full py-1 px-4">
        Ask questions and learn amazing facts about places all around the world!
      </p>
    </header>
  );
};

export default PageHeader;
