import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Discover from './pages/Discover';
import Sidebar from './components/Sidebar'; // 👈 make sure you import your sidebar
import MusicPlayer from './components/MusicPlayer';
import TopCharts from './pages/TopCharts';
import TopArtists from './pages/TopArtists';
import AroundYou from './pages/AroundYou';
import { useSelector } from 'react-redux';
import './index.css'; 

function App() {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#121212] to-black text-white">
      <div className="w-[240px] bg-[#0c0c24] hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-y-scroll h-full px-6 pb-32">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/top-charts" element={<TopCharts />} />
          <Route path="/top-artists" element={<TopArtists />} />
          <Route path="/around-you" element={<AroundYou />} />

        </Routes>
      </div>

{activeSong?.attributes?.name && (
  <div className="fixed bottom-0 left-0 right-0 z-10">
    <MusicPlayer />
  </div>
)}

    </div>
  );
}

export default App;
