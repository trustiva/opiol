'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Task = {
  id: number;
  title: string;
  status: 'pending' | 'done';
  dueDate?: string;
};

type TaskGroup = {
  id: string;
  title: string;
  tasks: Task[];
};

const initialTaskGroups: TaskGroup[] = [
  {
    id: 'preparation',
    title: 'Preparation',
    tasks: [
      { id: 1, title: 'Research target universities', status: 'done' },
      { id: 2, title: 'Write Statement of Purpose', status: 'pending', dueDate: '2024-03-15' },
      { id: 3, title: 'Prepare Resume/CV', status: 'pending', dueDate: '2024-03-20' },
      { id: 4, title: 'Request recommendation letters', status: 'pending' },
    ],
  },
  {
    id: 'tests',
    title: 'Tests',
    tasks: [
      { id: 5, title: 'Book IELTS test', status: 'pending', dueDate: '2024-04-01' },
      { id: 6, title: 'Prepare for IELTS', status: 'pending' },
      { id: 7, title: 'Take IELTS test', status: 'pending' },
      { id: 8, title: 'Take GRE/GMAT if required', status: 'pending' },
    ],
  },
  {
    id: 'applications',
    title: 'Applications',
    tasks: [
      { id: 9, title: 'Create university accounts', status: 'pending' },
      { id: 10, title: 'Submit application documents', status: 'pending' },
      { id: 11, title: 'Pay application fees', status: 'pending' },
      { id: 12, title: 'Track application status', status: 'pending' },
    ],
  },
  {
    id: 'visa',
    title: 'Visa Process',
    tasks: [
      { id: 13, title: 'Gather visa documents', status: 'pending' },
      { id: 14, title: 'Book visa appointment', status: 'pending' },
      { id: 15, title: 'Attend visa interview', status: 'pending' },
      { id: 16, title: 'Receive visa', status: 'pending' },
    ],
  },
];

export default function Roadmap() {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>(initialTaskGroups);

  const toggleTaskStatus = (groupId: string, taskId: number) => {
    setTaskGroups(prevGroups =>
      prevGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            tasks: group.tasks.map(task =>
              task.id === taskId
                ? { ...task, status: task.status === 'done' ? 'pending' : 'done' }
                : task
            ),
          };
        }
        return group;
      })
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const groupVariants = {
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

  const taskVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Header */}
        <motion.div variants={groupVariants} className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Application Roadmap</h1>
          <p className="text-gray-400">Track your progress through each phase of your application journey</p>
        </motion.div>

        {/* Task Groups */}
        <div className="space-y-8">
          {taskGroups.map((group) => (
            <motion.div
              key={group.id}
              variants={groupVariants}
              className="bg-gray-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">{group.title}</h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {group.tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      variants={taskVariants}
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        task.status === 'done' ? 'bg-gray-700/50' : 'bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleTaskStatus(group.id, task.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            task.status === 'done'
                              ? 'border-opiol-gold bg-opiol-gold'
                              : 'border-gray-500 hover:border-opiol-gold'
                          }`}
                        >
                          {task.status === 'done' && (
                            <svg
                              className="w-4 h-4 text-opiol-dark"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                        <div>
                          <h3 className={`font-medium ${
                            task.status === 'done' ? 'text-gray-400 line-through' : 'text-white'
                          }`}>
                            {task.title}
                          </h3>
                          {task.dueDate && (
                            <p className="text-sm text-gray-400">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        task.status === 'done' ? 'bg-opiol-gold' : 'bg-gray-500'
                      }`} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
} 