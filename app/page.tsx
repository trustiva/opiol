'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/profile-setup');
  };

  return (
    <main className="min-h-screen bg-opiol-dark relative overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/campus-bg.jpg')",
          filter: 'blur(8px)',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Welcome to OPIOL
          </h1>
          <h2 className="text-2xl md:text-3xl text-opiol-gold mb-8">
            Your Journey Abroad Starts Here
          </h2>
          <p className="text-gray-300 text-lg mb-12">
            Let's build your application success roadmap
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-opiol-gold text-opiol-dark font-semibold px-8 py-4 rounded-full 
                     shadow-lg hover:shadow-xl transition-all duration-300
                     transform hover:-translate-y-1"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
} 