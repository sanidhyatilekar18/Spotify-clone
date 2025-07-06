import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <p className="text-white px-4">Loading top charts...</p>;
  if (error) return <p className="text-red-500 px-4">Failed to load top charts</p>;

  // Limit to top 10 songs
  const topSongs = data?.slice(0, 10) || [];

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-white mb-6">Top Charts 🎵</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {topSongs.map((song, i) => (
          <SongCard
            key={song.key || i}
            song={song}
            i={i}
            data={topSongs}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
