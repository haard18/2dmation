// pages/Home.jsx
// import { useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import PromptInput from "../components/PromptInput";
import ScenesList from "../components/ScenesList";
import RenderButton from "../components/RenderButton";
import VideoPlayer from "../components/VideoPlayer";
import useVideoGeneration from "../hooks/useVideoGeneration";

const Home = () => {
  const {
    input,
    setInput,
    loading,
    videoUrl,
    scenes,
    polling,
    generateScenes,
    renderVideo
  } = useVideoGeneration();

  return (
    <Container>
      <Header />
      
      <PromptInput 
        input={input}
        setInput={setInput}
        onGenerate={generateScenes}
        loading={loading}
        polling={polling}
      />
      
      <ScenesList scenes={scenes} />
      
      <RenderButton 
        onRender={renderVideo}
        loading={loading}
        polling={polling}
        showButton={scenes.length > 0 && !videoUrl}
      />
      
      <VideoPlayer videoUrl={videoUrl} />
    </Container>
  );
};

export default Home;