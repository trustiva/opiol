'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type UserInfo = {
  name: string;
  email: string;
  field: string;
  targetCountry: string;
  degree: string;
  ieltsScore: string;
  gpa: string;
};

const initialUserInfo: UserInfo = {
  name: 'Sarah Johnson',
  email: 'sarah.j@example.com',
  field: 'Computer Science',
  targetCountry: 'Germany',
  degree: 'MSc',
  ieltsScore: '7.5',
  gpa: '3.8',
};

const usageStats = {
  roadmapTasks: 12,
  archiveViews: 45,
  aiChats: 28,
};

const premiumBenefits = [
  {
    title: 'Full Archive Access',
    description: 'Unlock all student profiles and success stories',
    icon: '📚',
  },
  {
    title: 'AI Advisor Boost',
    description: 'Priority access and extended chat history',
    icon: '🤖',
  },
  {
    title: 'Personalized Roadmap',
    description: 'Custom timeline and task recommendations',
    icon: '🗺️',
  },
  {
    title: 'Expert Reviews',
    description: 'Get your documents reviewed by professionals',
    icon: '✍️',
  },
];

export default function Profile() {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to a backend
  };

  return (
    <main className="min-h-screen bg-opiol-dark p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Profile</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        {/* Your Info Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Your Info</h2>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="px-4 py-2 bg-opiol-gold text-opiol-dark font-semibold rounded-lg hover:bg-opiol-gold/90 transition-colors"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(userInfo).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <label className="text-sm text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(key as keyof UserInfo, e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
                  />
                ) : (
                  <p className="text-white">{value}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Usage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Usage Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700/50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-opiol-gold">{usageStats.roadmapTasks}</p>
              <p className="text-gray-400">Roadmap Tasks</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-opiol-gold">{usageStats.archiveViews}</p>
              <p className="text-gray-400">Archive Views</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-opiol-gold">{usageStats.aiChats}</p>
              <p className="text-gray-400">AI Chats</p>
            </div>
          </div>
        </motion.div>

        {/* Upgrade Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-opiol-gold/20"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Upgrade to Premium</h2>
              <p className="text-gray-400">Unlock all features and boost your journey</p>
            </div>
            <span className="px-3 py-1 bg-opiol-gold/20 text-opiol-gold rounded-full text-sm">
              $9.99/month
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {premiumBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-2xl">{benefit.icon}</span>
                <div>
                  <h3 className="text-white font-medium">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-3 bg-opiol-gold text-opiol-dark font-semibold rounded-lg hover:bg-opiol-gold/90 transition-colors">
            Upgrade Now
          </button>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <button className="px-6 py-3 text-red-400 hover:text-red-300 transition-colors">
            Logout
          </button>
        </motion.div>
      </div>
    </main>
  );
} 