import React from 'react';
import { motion } from 'framer-motion';

const AddTodoButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto transition-all duration-200"
      whileTap={{ scale: 0.95 }} // Animate button press
      whileHover={{ scale: 1.02 }} // Slightly enlarge on hover
    >
      Add Task
    </motion.button>
  );
};

export default AddTodoButton;
