
import React from 'react';
import { Cloud } from 'lucide-react';

const PageFooter = () => {
  return (
    <footer className="mt-12 text-center text-xs text-gray-500 bg-white/60 backdrop-blur-sm py-2 rounded-full">
      <p className="flex items-center justify-center gap-2">
        <Cloud className="h-3 w-3" />
        World City Explorer for Kids © 2025 | Learning about our amazing planet!
        <Cloud className="h-3 w-3" />
      </p>
    </footer>
  );
};

export default PageFooter;
