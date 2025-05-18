// components/Container.jsx
import { motion } from "framer-motion";

const Container = ({ children }) => {
  return (
    <div className="min-h-screen bg-yellow-100 text-black flex items-center justify-center px-4 py-12 border-8 border-black">
      <motion.div
        className="bg-white border-4 border-black p-8 md:p-12 w-full max-w-3xl space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Container;
