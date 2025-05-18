// pages/Home.jsx
// import { useState } from "react";
// import Container from "../components/Container";
// import Header from "../components/Header";
// import PromptInput from "../components/PromptInput";
// import ScenesList from "../components/ScenesList";
// import RenderButton from "../components/RenderButton";
// import VideoPlayer from "../components/VideoPlayer";
// import useVideoGeneration from "../hooks/useVideoGeneration";

const Home = () => {
  // const {
  //   input,
  //   setInput,
  //   loading,
  //   videoUrl,
  //   scenes,
  //   polling,
  //   generateScenes,
  //   renderVideo,
  //   model,
  //   setModel,
  // } = useVideoGeneration();

  // return (
  //   <Container>
  //     <Header />
      
  //     <PromptInput 
  //       model={model}
  //       setModel={setModel}
  //       input={input}
  //       setInput={setInput}
  //       onGenerate={generateScenes}
  //       loading={loading}
  //       polling={polling}
  //     />
      
  //     <ScenesList scenes={scenes} />
      
  //     <RenderButton 
  //       onRender={renderVideo}
  //       loading={loading}
  //       polling={polling}
  //       showButton={scenes.length > 0 && !videoUrl}
  //     />
      
  //     <VideoPlayer videoUrl={videoUrl} />
  //   </Container>
  // );
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '40px',
        border: '4px solid #000000',
        borderRadius: '8px',
        boxShadow: '8px 8px 0px #000000',
        transform: 'rotate(-2deg)',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '900',
          marginBottom: '20px',
          color: '#000000'
        }}>
          WE'LL BE BACK!
        </h1>
        <p style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#333333',
          marginBottom: '30px'
        }}>
          Our site is under development.
        </p>
        <div style={{
          backgroundColor: '#FFD700',
          padding: '15px 30px',
          border: '3px solid #000000',
          borderRadius: '4px',
          display: 'inline-block',
          fontWeight: 'bold',
          transform: 'rotate(2deg)'
        }}>
          Coming Soon
        </div>
      </div>
    </div>
  );
};

export default Home;