// hooks/useVideoGeneration.js
import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

const useVideoGeneration = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [scenes, setScenes] = useState([]);
  const [videoId, setVideoId] = useState(null);
  const [, setJobId] = useState(null);
  const [polling, setPolling] = useState(false);
  const [model, setModel] = useState("gemini");
  const generateScenes = async () => {
    setLoading(true);
    setVideoUrl("");
    setScenes([]);
    setVideoId(null);
    setJobId(null);

    try {
      const genRes = await axios.post(`${API_BASE}/generate`, {
        prompt: input,
        model: model,
      });

      setScenes(genRes.data.scenes);
      setVideoId(genRes.data.video_id);
    } catch (err) {
      console.error("Generation error:", err);
      alert("Something went wrong during generation.");
    } finally {
      setLoading(false);
    }
  };

  const renderVideo = async () => {
    if (!videoId) return;
    setLoading(true);

    try {
      const renderRes = await axios.post(`${API_BASE}/render/${videoId}`);
      const job = renderRes.data.render_job_id;
      setJobId(job);
      setPolling(true);

      const poll = setInterval(async () => {
        try {
          const statusRes = await axios.get(`${API_BASE}/status/job/${job}`);
          const status = statusRes.data.status;

          if (status === "completed") {
            clearInterval(poll);
            setVideoUrl(statusRes.data.video_url);
            setPolling(false);
            setLoading(false);
          } else if (status === "failed") {
            clearInterval(poll);
            setPolling(false);
            setLoading(false);
            alert("❌ Video generation failed.");
          }
        } catch (pollErr) {
          clearInterval(poll);
          setPolling(false);
          setLoading(false);
          alert("Polling failed.");
        }
      }, 3000);
    } catch (err) {
      console.error("Render error:", err);
      alert("Failed to start rendering.");
      setLoading(false);
    }
  };

  return {
    input,
    setInput,
    loading,
    videoUrl,
    scenes,
    polling,
    generateScenes,
    renderVideo,
    model,
    setModel,
  };
};

export default useVideoGeneration;