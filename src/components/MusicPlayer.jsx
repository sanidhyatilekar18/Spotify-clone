import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playPause, nextSong, prevSong } from '../redux/features/playerSlice';
import Controls from './Controls';
import Seekbar from './Seekbar';
import VolumeBar from './VolumeBar';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, currentSongs, currentIndex } = useSelector((state) => state.player);
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const currentAudio = activeSong?.attributes?.previews?.[0]?.url;

  useEffect(() => {
  if (audioRef.current && currentAudio) {
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Play failed:', error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }
}, [isPlaying, currentAudio]);

  const handleNext = () => {
    if (currentIndex + 1 < currentSongs.length) dispatch(nextSong());
  };

  const handlePrev = () => {
    if (currentIndex - 1 >= 0) dispatch(prevSong());
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] h-[90px] px-6 py-3 flex items-center justify-between z-50 text-white">
      
      <div className="flex items-center gap-4 w-1/4">
        <img
          src={activeSong?.attributes?.artwork?.url?.replace('{w}x{h}', '80x80') || 'https://via.placeholder.com/80'}
          alt="art"
          className="w-16 h-16 rounded"
        />
        <div>
          <h4 className="font-semibold text-sm truncate w-40">
            {activeSong?.attributes?.name || 'No Song Playing'}
          </h4>
          <p className="text-xs text-gray-400 truncate w-40">
            {activeSong?.attributes?.artistName || 'Unknown Artist'}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center w-2/5">
        <Controls
          isPlaying={isPlaying}
          setIsPlaying={(val) => dispatch(playPause(val))}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
        <Seekbar
          value={appTime}
          max={duration}
          onInput={(val) => {
            audioRef.current.currentTime = val;
            setAppTime(val);
          }}
          duration={duration}
        />
      </div>

      <div className="w-1/4 flex justify-end items-center">
        <VolumeBar volume={volume} setVolume={(val) => {
          setVolume(val);
          audioRef.current.volume = val;
        }} />
      </div>

      <audio
        ref={audioRef}
        src={currentAudio}
        onTimeUpdate={(e) => setAppTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      />
    </div>
  );
};

export default MusicPlayer;
