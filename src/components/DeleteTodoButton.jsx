import React from 'react'
import { motion } from 'framer-motion'

const DeleteTodoButton = ({onClick}) => {
  return (
    <motion.button
    onClick={onClick}
    className="text-red-500 hover:text-red-700"
    whileTap={{ scale: 0.9 }} // Animate on click
    transition={{ duration: 0.2 }}
  >
    Delete
  </motion.button>
  )
}

export default DeleteTodoButton