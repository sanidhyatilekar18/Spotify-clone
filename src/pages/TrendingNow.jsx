import React from 'react';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';

const TrendingNow = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <p className="text-white text-lg">Loading Trending Songs...</p>;
  if (error) return <p className="text-red-500">Error fetching trending songs.</p>;

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a?.attributes?.releaseDate || '2000-01-01');
    const dateB = new Date(b?.attributes?.releaseDate || '2000-01-01');
    return dateB - dateA;
  });

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white mt-4 mb-10">🔥 Trending Now</h2>
      <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
        {sortedData?.map((song, i) => (
          <SongCard
            key={song?.id || i}
            song={song}
            i={i}
            data={sortedData}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;
