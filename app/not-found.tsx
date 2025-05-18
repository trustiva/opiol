'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-opiol-dark flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Warning Emoji with Animation */}
        <motion.div
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="text-8xl mb-6"
        >
          ⚠️
        </motion.div>

        {/* Main Message */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-opiol-gold"
        >
          This page doesn't exist
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 text-lg"
        >
          Please check the URL or return to dashboard
        </motion.p>

        {/* Dashboard Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-8 py-3 bg-opiol-gold text-opiol-dark font-semibold rounded-lg 
                       hover:bg-opiol-gold/90 transition-colors duration-200"
            >
              Go to Dashboard
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
} 