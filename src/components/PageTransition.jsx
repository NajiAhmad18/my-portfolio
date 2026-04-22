import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ width: '100%', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
