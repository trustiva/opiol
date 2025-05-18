'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

type Category = {
  id: string;
  title: string;
  description: string;
  prompt: string;
};

const categories: Category[] = [
  {
    id: 'sop',
    title: 'SOP Help',
    description: 'Get guidance on writing your Statement of Purpose',
    prompt: 'Can you help me write a strong Statement of Purpose for my master\'s application?',
  },
  {
    id: 'ielts',
    title: 'IELTS Advice',
    description: 'Tips and strategies for IELTS preparation',
    prompt: 'What are the best strategies to improve my IELTS score?',
  },
  {
    id: 'visa',
    title: 'Visa Process',
    description: 'Understanding the student visa application process',
    prompt: 'What documents do I need for my student visa application?',
  },
  {
    id: 'funding',
    title: 'Funding & Scholarships',
    description: 'Information about scholarships and financial aid',
    prompt: 'What scholarship opportunities are available for international students?',
  },
];

const mockReplies: { [key: string]: string } = {
  'sop': 'I\'d be happy to help you with your Statement of Purpose! A strong SOP should include:\n\n1. Your academic background and achievements\n2. Research interests and career goals\n3. Why you chose this specific program\n4. How you\'ll contribute to the university\n\nWould you like me to help you structure your SOP?',
  'ielts': 'Here are some effective IELTS preparation strategies:\n\n1. Practice with official IELTS materials\n2. Focus on your weakest areas\n3. Take regular mock tests\n4. Improve your vocabulary and grammar\n5. Work on time management\n\nWhich section would you like to focus on first?',
  'visa': 'For a student visa application, you\'ll typically need:\n\n1. Valid passport\n2. University acceptance letter\n3. Proof of financial resources\n4. Health insurance\n5. Academic transcripts\n\nWould you like more details about any specific requirement?',
  'funding': 'There are several scholarship opportunities for international students:\n\n1. University-specific scholarships\n2. Government scholarships\n3. Private organization grants\n4. Research assistantships\n5. Teaching assistantships\n\nWhat type of funding are you most interested in?',
};

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      // Add AI reply
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: mockReplies[content.toLowerCase().includes('sop') ? 'sop' :
                 content.toLowerCase().includes('ielts') ? 'ielts' :
                 content.toLowerCase().includes('visa') ? 'visa' :
                 content.toLowerCase().includes('funding') ? 'funding' :
                 'I understand you\'re asking about studying abroad. Could you please provide more specific details about what you\'d like to know?'],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCategoryClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <main className="min-h-screen bg-opiol-dark flex flex-col">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold text-white">AI Advisor</h1>
        <p className="text-gray-400">Get personalized guidance for your study abroad journey</p>
      </div>

      {/* Categories */}
      <div className="p-4 md:p-6 border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick(category.prompt)}
              className="bg-gray-800 p-4 rounded-xl text-left hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-white font-semibold mb-1">{category.title}</h3>
              <p className="text-sm text-gray-400">{category.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] md:max-w-[70%] p-4 rounded-xl ${
                  message.type === 'user'
                    ? 'bg-opiol-gold text-opiol-dark'
                    : 'bg-gray-800 text-white'
                }`}
              >
                <p className="whitespace-pre-line">{message.content}</p>
                <p className="text-xs mt-2 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-800 p-4 rounded-xl">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex gap-4"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about studying abroad..."
              className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 bg-opiol-gold text-opiol-dark font-semibold rounded-xl hover:bg-opiol-gold/90 transition-colors"
            >
              Send
            </motion.button>
          </form>
        </div>
      </div>
    </main>
  );
} 