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
}) => {
  return (
    <div className="space-y-6">
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
            className="bg-yellow-300 text-black border-4 border-black font-mono px-4 py-2 uppercase"
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
          className="w-full p-4 bg-white text-black placeholder-gray-700 font-mono border-4 border-black"
          whileFocus={{ scale: 1.01 }}
        />
        <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-700 font-mono">
          {[
            "Explain gravity",
            "What is AI?",
            "How does photosynthesis work?",
          ].map((example) => (
            <button
              key={example}
              onClick={() => setInput(example)}
              className="bg-yellow-200 px-2 py-1 border border-black rounded hover:bg-yellow-300 transition"
              type="button"
            >
              {example}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.button
        onClick={onGenerate}
        disabled={loading || !input}
        className="w-full bg-red-400 text-black font-bold font-mono py-4 border-4 border-black uppercase hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-transform"
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
