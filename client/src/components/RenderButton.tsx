// components/RenderButton.jsx
import { motion } from "framer-motion";

const RenderButton = ({ onRender, loading, polling, showButton }: { onRender: () => void, loading: boolean, polling: boolean, showButton: boolean }) => {
  if (!showButton) return null;
  
  return (
    <motion.button
      onClick={onRender}
      disabled={loading || polling}
      className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium font-mono py-3.5 rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {polling ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Rendering...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Render Video
        </span>
      )}
    </motion.button>
  );
};

export default RenderButton;