// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AllVideos from "./Pages/AllVideos";
import { Analytics } from "@vercel/analytics/react";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Analytics />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<AllVideos />} />
        </Routes>
      </BrowserRouter>
      {/* </Analytics> */}
    </>
  );
}

export default App;
