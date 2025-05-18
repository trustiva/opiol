'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Sample data for tasks
const upcomingTasks = [
  {
    id: 1,
    title: 'Write Statement of Purpose',
    status: 'pending',
    dueDate: '2024-03-15',
  },
  {
    id: 2,
    title: 'Upload Resume/CV',
    status: 'pending',
    dueDate: '2024-03-20',
  },
  {
    id: 3,
    title: 'Prepare for IELTS',
    status: 'pending',
    dueDate: '2024-04-01',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function Dashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-opiol-dark p-4 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Hi, Amir 👋
          </h1>
          <p className="text-gray-400">
            Welcome back! Let's continue your journey to studying abroad.
          </p>
        </motion.div>

        {/* Progress Section */}
        <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Your Progress</h2>
            <span className="text-opiol-gold">25%</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '25%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-opiol-gold"
            />
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Next Steps</h2>
          <div className="grid gap-4">
            {upcomingTasks.map((task) => (
              <motion.div
                key={task.id}
                variants={itemVariants}
                className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-opiol-gold" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-800 hover:bg-gray-700 rounded-xl p-6 text-left transition-colors"
            onClick={() => router.push('/roadmap')}
          >
            <h3 className="text-white font-semibold mb-2">View Full Roadmap</h3>
            <p className="text-sm text-gray-400">Track your complete application journey</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-800 hover:bg-gray-700 rounded-xl p-6 text-left transition-colors"
            onClick={() => router.push('/archive')}
          >
            <h3 className="text-white font-semibold mb-2">Explore Student Archive</h3>
            <p className="text-sm text-gray-400">Learn from successful applications</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-800 hover:bg-gray-700 rounded-xl p-6 text-left transition-colors"
            onClick={() => router.push('/ai-advisor')}
          >
            <h3 className="text-white font-semibold mb-2">Ask AI Advisor</h3>
            <p className="text-sm text-gray-400">Get personalized guidance</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-800 hover:bg-gray-700 rounded-xl p-6 text-left transition-colors"
            onClick={() => router.push('/profile')}
          >
            <h3 className="text-white font-semibold mb-2">Profile & Settings</h3>
            <p className="text-sm text-gray-400">Manage your account</p>
          </motion.button>
        </motion.div>
      </motion.div>
    </main>
  );
} 