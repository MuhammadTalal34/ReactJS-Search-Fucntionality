import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const loadingCircleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "60%",
    },
  };

  const loadingCircleTransition = {
    duration: 0.6,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="flex space-x-2"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-blue-500 rounded-full"
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loader;
