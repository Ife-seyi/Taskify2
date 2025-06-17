import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getStarted from '../assets/getStarted.jpeg';

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f766e] to-[#0d9488] text-white flex flex-col items-center justify-between px-6 py-10">
      
      {/* Top section */}
      <motion.div 
        className="text-center mt-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Get Started
        </motion.h1>
        <motion.p 
          className="mt-2 text-sm text-[#f0f4f8] max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Create tags · Track progress · Stay organized
        </motion.p>
      </motion.div>

      {/* Middle illustration */}
      <motion.div 
        className="my-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <img
          src={getStarted}
          alt="Task management illustration"
          className="w-[280px] sm:w-[320px] mx-auto rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Bottom buttons */}
      <motion.div 
        className="w-full flex flex-col items-center gap-4 mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <Link
          to="/login"
          className="w-full max-w-xs text-center py-3 rounded-md bg-white text-[#0f766e] font-semibold shadow-lg hover:bg-[#f0f4f8] transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="w-full max-w-xs text-center py-3 rounded-md border border-white text-white font-semibold hover:bg-white hover:text-[#0f766e] transition"
        >
          Sign Up
        </Link>
      </motion.div>
    </div>
  );
};

export default GetStarted;
