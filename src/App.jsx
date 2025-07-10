import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Discover from './pages/Discover';
import Sidebar from './components/Sidebar'; 
import MusicPlayer from './components/MusicPlayer';
import TopCharts from './pages/TopCharts';

import AroundYou from './pages/AroundYou';
import { useSelector } from 'react-redux';
import './index.css'; 
import TrendingNow from './pages/TrendingNow';
import Genres from './pages/Genres';
import Search from './pages/Search';
import AlbumDetails from './pages/AlbumDetails';
import Albums from './pages/Albums';

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
          <Route path='/trending-now' element={<TrendingNow />} />
          <Route path="/around-you" element={<AroundYou />} />
          <Route path ="/genres" element={<Genres />} />
          <Route path="/search/:searchTerm" element={<Search />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/:albumName" element={<AlbumDetails />} />
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
