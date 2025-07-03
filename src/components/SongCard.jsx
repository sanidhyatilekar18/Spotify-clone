import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import PlayPause from './PlayPause';

function SongCard({ song, isPlaying, activeSong, i, data }) {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className={`flex flex-col w-[250px] p-4 rounded-lg cursor-pointer 
      ${activeSong?.title === song.title ? 'bg-white/20' : 'bg-white/5'} 
      backdrop-blur-sm animate-slideup`}>
      
      <div className='relative w-full h-56 group'>
        <div className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center hidden group-hover:flex">
          <PlayPause 
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        <img
          alt={song?.title || 'song image'}
          src={song?.images?.coverart || 'https://via.placeholder.com/250'}
          className='w-full h-full rounded-lg'
        />
      </div>

      <div className='mt-4 flex flex-col'>
        <p className='text-lg font-semibold text-white truncate'>
          <Link to={`/songs/${song?.key}`}>{song?.title}</Link>
        </p>
        <p className='text-sm text-gray-300 mt-1'>
          <Link to={song?.artists?.[0]?.adamid ? `/artists/${song.artists[0].adamid}` : '/top-artists'}>
            {song?.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SongCard;
