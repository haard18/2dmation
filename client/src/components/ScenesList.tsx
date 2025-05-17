// components/ScenesList.jsx
import { motion } from "framer-motion";

const ScenesList = ({ scenes }: { scenes: any[] }) => {
  if (scenes.length === 0) return null;
  
  return (
    <motion.div
      className="bg-black/40 backdrop-blur-sm border border-white/10 p-6 rounded-xl space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Generated Scenes
        </h2>
      </div>
      
      <div className="space-y-3">
        {scenes.map((scene, idx) => (
          <motion.div
            key={idx}
            className="bg-white/5 p-4 rounded-lg border border-white/5 hover:border-cyan-400/20 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * idx }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-medium">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">{scene.title || `Scene ${idx + 1}`}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {scene.narration || "No narration available"}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ScenesList;