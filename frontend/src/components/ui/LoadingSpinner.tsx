import React from 'react';
import { motion } from 'framer-motion';

// Modern loading spinner with geography theme
export const LoadingSpinner: React.FC = () => {
  return (
    <div className="relative w-20 h-20">
      {/* Animated globe circles */}
      <motion.div
        className="absolute w-full h-full rounded-full border-4 border-blue-400/30"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-full h-full rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {/* Center dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default LoadingSpinner; 