import React from 'react';
import { motion } from 'framer-motion';
import { useDrag, useDrop } from 'react-dnd';



const ItemTypes = {
  TODO: 'todo',
};

const TodoItem = ({ todo, index, moveTodo, toggleComplete, deleteTodo }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TODO,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TODO,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTodo(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      className={`p-4 mb-2 rounded-lg shadow-md flex justify-between items-center ${isDragging ? 'bg-gray-200' : 'bg-white'} transition-all duration-200`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="mr-2 w-4 h-4"
        />
        <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''} text-sm md:text-base`}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700 text-lg md:text-xl"
      >
        ✕
      </button>
    </motion.div>
  );
};

export default TodoItem;
