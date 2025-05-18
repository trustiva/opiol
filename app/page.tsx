'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-opiol-dark flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-6">
          به OPIOL خوش آمدید
        </h1>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          همراه هوشمند شما برای تحصیل در خارج از کشور. با ما سفر تحصیلی خود را برنامه‌ریزی کنید.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/profile-setup')}
          className="px-8 py-3 rounded-lg bg-opiol-gold text-opiol-dark font-semibold
                   hover:bg-opiol-gold/90 transition-colors"
        >
          شروع کنید
        </motion.button>
      </motion.div>
    </main>
  );
} 