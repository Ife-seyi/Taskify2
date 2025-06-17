import React from "react";
import { color, motion } from "framer-motion";

function SplashScreen({ onAnimationComplete }) {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
      onAnimationComplete={onAnimationComplete}
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate__animated animate__fadeInDown">
          Taskify
        </h1>
        <p className="text-lg md:text-2xl animate__animated animate__fadeInUp">
          Manage your tasks like never before.
        </p>

   </div>
   


    </motion.div>
  );
}

export default SplashScreen;
