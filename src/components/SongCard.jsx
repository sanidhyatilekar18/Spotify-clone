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
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition relative group">
      {/* Album Art with play button overlay */}
      <div className="relative">
        <img
          src={imageUrl || 'https://via.placeholder.com/400'}
          alt={title || 'No Title'}
          className="rounded w-full h-40 object-cover"
        />

        {/* Play/Pause button - visible only on hover or if active */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded opacity-0 group-hover:opacity-100 transition`}>
          {isActive && isPlaying ? (
            <button
              onClick={handlePauseClick}
              className="bg-white text-black rounded-full p-3 hover:scale-110 transition"
            >
              <FaPause />
            </button>
          ) : (
            <button
              onClick={handlePlayClick}
              className="bg-white text-black rounded-full p-3 hover:scale-110 transition"
            >
              <FaPlay />
            </button>
          )}
        </div>
      </div>

      {/* Song Info */}
      <h3 className="mt-2 text-white font-semibold truncate">{title || 'Unknown Title'}</h3>
      <p className="text-sm text-gray-300 truncate">{artist || 'Unknown Artist'}</p>
    </div>
  );
};

export default SongCard;
