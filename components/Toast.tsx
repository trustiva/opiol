'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error' | 'loading';
  onClose: () => void;
  duration?: number;
};

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (type !== 'loading') {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose, type]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'loading':
        return '⏳';
      default:
        return '';
    }
  };

  const getBackground = () => {
    switch (type) {
      case 'success':
        return 'bg-opiol-gold/20 border-opiol-gold';
      case 'error':
        return 'bg-red-500/20 border-red-500';
      case 'loading':
        return 'bg-opiol-gold/20 border-opiol-gold';
      default:
        return '';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 
                     px-6 py-3 rounded-lg border ${getBackground()} 
                     shadow-lg backdrop-blur-sm`}
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">{getIcon()}</span>
            <p className="text-white font-medium">{message}</p>
            {type !== 'loading' && (
              <button
                onClick={() => setIsVisible(false)}
                className="ml-2 text-white/60 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 