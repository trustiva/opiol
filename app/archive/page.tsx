'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type StudentProfile = {
  id: number;
  name: string;
  university: string;
  field: string;
  country: string;
  ieltsScore: number;
  gpa: number;
  admitYear: number;
  sopPreview: string;
  resumePreview: string;
};

const mockProfiles: StudentProfile[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    university: 'Technical University of Munich',
    field: 'Computer Science',
    country: 'Germany',
    ieltsScore: 7.5,
    gpa: 3.8,
    admitYear: 2023,
    sopPreview: 'Passionate about AI and machine learning...',
    resumePreview: 'Software Engineering Intern at Google...',
  },
  {
    id: 2,
    name: 'Mohammed Ali',
    university: 'University of Toronto',
    field: 'Mechanical Engineering',
    country: 'Canada',
    ieltsScore: 8.0,
    gpa: 3.9,
    admitYear: 2023,
    sopPreview: 'Dedicated to sustainable energy solutions...',
    resumePreview: 'Research Assistant at Tehran University...',
  },
  {
    id: 3,
    name: 'Emma Chen',
    university: 'ETH Zurich',
    field: 'Data Science',
    country: 'Switzerland',
    ieltsScore: 7.0,
    gpa: 3.7,
    admitYear: 2023,
    sopPreview: 'Interested in big data analytics...',
    resumePreview: 'Data Analyst at Microsoft...',
  },
  {
    id: 4,
    name: 'Alex Rodriguez',
    university: 'Delft University of Technology',
    field: 'Civil Engineering',
    country: 'Netherlands',
    ieltsScore: 7.5,
    gpa: 3.8,
    admitYear: 2023,
    sopPreview: 'Focused on sustainable infrastructure...',
    resumePreview: 'Project Manager at Construction Co...',
  },
  // Add more mock profiles as needed
];

const countries = ['All', 'Germany', 'Canada', 'Switzerland', 'Netherlands', 'USA', 'UK'];
const degrees = ['All', 'BSc', 'MSc', 'PhD'];
const fields = ['All', 'Computer Science', 'Mechanical Engineering', 'Data Science', 'Civil Engineering'];

export default function Archive() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedDegree, setSelectedDegree] = useState('All');
  const [selectedField, setSelectedField] = useState('All');

  const filteredProfiles = mockProfiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.field.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || profile.country === selectedCountry;
    const matchesField = selectedField === 'All' || profile.field === selectedField;
    return matchesSearch && matchesCountry && matchesField;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <main className="min-h-screen bg-opiol-dark p-4 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <motion.div variants={cardVariants} className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Student Archive</h1>
          <p className="text-gray-400">Explore successful applications from previous students</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={cardVariants} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, university, or field..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
            />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
            >
              {degrees.map(degree => (
                <option key={degree} value={degree}>{degree}</option>
              ))}
            </select>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
            >
              {fields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Profile Cards Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProfiles.map((profile) => (
              <motion.div
                key={profile.id}
                variants={cardVariants}
                className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors"
              >
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
                    <p className="text-opiol-gold">{profile.university}</p>
                    <p className="text-gray-400">{profile.field}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Country</p>
                      <p className="text-white">{profile.country}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">IELTS</p>
                      <p className="text-white">{profile.ieltsScore}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">GPA</p>
                      <p className="text-white">{profile.gpa}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Admit Year</p>
                      <p className="text-white">{profile.admitYear}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <p className="text-sm text-gray-400 mb-1">SOP Preview</p>
                      <div className="p-3 bg-gray-700/50 rounded-lg">
                        <p className="text-sm text-gray-300 line-clamp-2">{profile.sopPreview}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <p className="text-sm text-gray-400 mb-1">Resume Preview</p>
                      <div className="p-3 bg-gray-700/50 rounded-lg">
                        <p className="text-sm text-gray-300 line-clamp-2">{profile.resumePreview}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full py-2 px-4 bg-opiol-gold text-opiol-dark font-semibold rounded-lg
                             hover:bg-opiol-gold/90 transition-colors"
                  >
                    Unlock Full Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </main>
  );
} 