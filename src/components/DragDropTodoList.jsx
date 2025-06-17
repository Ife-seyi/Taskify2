import React from 'react';

import { motion } from 'framer-motion';




const DragDropTodoList = ({ todos, setTodos, toggleComplete, deleteTodo }) => {
  const moveTodo = (fromIndex, toIndex) => {
    const updatedTodos = [...todos];
    const [movedItem] = updatedTodos.splice(fromIndex, 1);
    updatedTodos.splice(toIndex, 0, movedItem);
    setTodos(updatedTodos);
  };

  return (
    <div className="space-y-2">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          index={index}
          todo={todo}
          moveTodo={moveTodo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default DragDropTodoList;

