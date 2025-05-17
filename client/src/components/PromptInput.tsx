// components/PromptInput.jsx
import { motion } from "framer-motion";

const PromptInput = ({
  input,
  setInput,
  onGenerate,
  loading,
  polling,
  model,
  setModel,
}: {
  input: string;
  setInput: (input: string) => void;
  model: string;
  setModel: (model: string) => void;
  onGenerate: () => void;
  loading: boolean;
  polling: boolean;
}) => {
  return (
    <div className="space-y-4">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-end mb-2">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-black/40 border border-white/10 text-white font-mono px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          >
            <option value="gemini">Gemini</option>
            <option value="together">Together</option>
          </select>
        </div>
        <motion.input
          type="text"
          placeholder="Describe your video idea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 pl-12 bg-black/40 backdrop-blur-sm border border-white/10 text-white placeholder-gray-500 font-mono rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
          whileFocus={{ scale: 1.01 }}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </motion.div>

      <motion.button
        onClick={onGenerate}
        disabled={loading || !input}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium font-mono py-3.5 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {loading && !polling ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating Scenes...
          </span>
        ) : (
          "Generate Scenes"
        )}
      </motion.button>
    </div>
  );
};

export default PromptInput;
