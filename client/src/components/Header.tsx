// components/Header.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="text-center space-y-4 sm:space-y-6 py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white border-4 border-black"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black uppercase tracking-tight border-4 border-black inline-block px-3 sm:px-4 py-2 hover:scale-[1.02] transition-transform duration-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        2DMation
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg md:text-xl font-bold text-black max-w-2xl mx-auto leading-snug bg-yellow-200 border-4 border-black p-3 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Transform your ideas into animated stories with clarity and character.
      </motion.p>
      <motion.button
        className="bg-white text-black font-bold font-mono py-3 sm:py-4 px-4 sm:px-6 border-4 border-black uppercase hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02]"
        onClick={() => navigate("/videos")}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View All Videos
      </motion.button>
    </motion.div>
  );
};

export default Header;
