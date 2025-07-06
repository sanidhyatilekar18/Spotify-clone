import React, { useState } from 'react';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';

const Discover = () => {
  const { data, isFetching, error } = useGetTopChartsQuery('IN');
  const [activeSong, setActiveSong] = useState(null);

  if (isFetching) return <p className="text-white p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">Error loading songs</p>;

  return (
    <div className="p-4 pb-24"> {/* leave space at bottom for player */}
      <h2 className="text-3xl font-bold mb-4 mt-4">Discover</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((song, i) => (
          <div key={i} onClick={() => setActiveSong(song)}>
            <SongCard song={song} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Discover;
