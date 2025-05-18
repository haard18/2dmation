// components/Header.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="text-center space-y-6 py-16 px-6 bg-white border-4 border-black"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className="text-6xl sm:text-7xl font-black text-black uppercase tracking-tight border-4 border-black inline-block px-4 py-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        2DMation
      </motion.h1>
      <motion.p
        className="text-lg sm:text-xl font-bold text-black max-w-2xl mx-auto leading-snug bg-yellow-300 border-2 border-black p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Transform your ideas into animated stories with clarity and character.
      </motion.p>
      <motion.button
        className="bg-blue-400 text-black font-bold font-mono py-4 px-3 border-4 border-black uppercase hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-transform"
        onClick={() => navigate("/videos")}
      >
        Generated Videos here
      </motion.button>
    </motion.div>
  );
};

export default Header;
