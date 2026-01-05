import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BlogLayout.scss';

export const BlogLayout = () => {
  return (
    <div className="blog-layout">
      <motion.div
        className="blog-layout__container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

