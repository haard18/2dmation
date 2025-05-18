// components/VideoPlayer.jsx
import { motion } from "framer-motion";

const VideoPlayer = ({ videoUrl }) => {
  if (!videoUrl) return null;

  return (
    <motion.div
      className="mt-6 border-4 border-black bg-white p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <video
        controls
        className="w-full border-4 border-black bg-yellow-100"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser doesn’t support HTML5 video. Brutal.
      </video>
    </motion.div>
  );
};

export default VideoPlayer;
