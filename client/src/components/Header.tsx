// components/Header.jsx
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      className="text-center space-y-4 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent tracking-tight font-sans drop-shadow-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        2DMation
      </motion.h1>
      <motion.p
        className="text-gray-300 text-xl sm:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Transform your ideas into animated stories with clarity and character.
      </motion.p>
    </motion.div>
  );
};

export default Header;
