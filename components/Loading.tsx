'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-opiol-dark"
    >
      <div className="text-center space-y-6">
        {/* Logo Animation */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          OPIOL
        </motion.div>

        {/* Loading Text with Dots */}
        <div className="flex items-center justify-center space-x-1">
          <span className="text-opiol-gold">Loading</span>
          <motion.div
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-opiol-gold"
          >
            ...
          </motion.div>
        </div>

        {/* Spinner */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-8 h-8 border-2 border-opiol-gold border-t-transparent rounded-full mx-auto"
        />
      </div>
    </motion.div>
  );
} 