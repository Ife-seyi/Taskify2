import React from 'react';
import TodoItem from './TodoItem';
import { motion, AnimatePresence } from 'framer-motion';

function TodoList({ todos, toggleComplete, deleteTodo }) {
  return (
    <AnimatePresence>
      {todos.map((todo) => (
        <motion.div
          key={todo.id}
          initial={{ y: -10, opacity: 0 }}    // Smooth slide-down animation
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mb-2" // Margin for spacing
        >
          <TodoItem 
            todo={todo} 
            toggleComplete={toggleComplete} 
            deleteTodo={deleteTodo} 
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export default TodoList;
