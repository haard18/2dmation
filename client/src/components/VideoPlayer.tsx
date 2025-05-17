// components/VideoPlayer.jsx
import { motion } from "framer-motion";

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  if (!videoUrl) return null;
  
  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <video
        controls
        className="w-full rounded-lg border-4 border-white/10 shadow-[4px_4px_0px_#39ff14]"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </motion.div>
  );
};

export default VideoPlayer;