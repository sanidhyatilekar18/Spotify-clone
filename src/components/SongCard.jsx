import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { FaPlay, FaPause } from 'react-icons/fa';

const SongCard = ({ song, i, data }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const title = song?.attributes?.name;
  const artist = song?.attributes?.artistName;
  const imageUrl = song?.attributes?.artwork?.url?.replace('{w}x{h}', '400x400');

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const isActive = activeSong?.attributes?.name === title;

  return (
    <div className="w-[200px] h-[300px] bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition flex flex-col justify-between group">
      <div className="relative w-full h-[180px]">
        <img
          src={imageUrl || 'https://via.placeholder.com/400'}
          alt={title || 'No Title'}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition">
          {isActive && isPlaying ? (
            <button
              onClick={handlePauseClick}
              className="bg-white text-black rounded-full p-2 hover:scale-110 transition"
            >
              <FaPause />
            </button>
          ) : (
            <button
              onClick={handlePlayClick}
              className="bg-white text-black rounded-full p-2 hover:scale-110 transition"
            >
              <FaPlay />
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 h-[60px] flex flex-col justify-between">
        <h3 className="text-white font-semibold text-sm truncate">{title || 'Unknown Title'}</h3>
        <p className="text-gray-400 text-xs truncate">{artist || 'Unknown Artist'}</p>
      </div>
    </div>
  );
};

export default SongCard;
