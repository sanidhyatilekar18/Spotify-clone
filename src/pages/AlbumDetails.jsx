import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';

const AlbumDetails = () => {
  const { albumName } = useParams();
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <p className="text-white text-lg">Loading album...</p>;
  if (error) return <p className="text-red-500">Error loading album details.</p>;

  const songs = data?.filter(
    (song) => song?.attributes?.albumName === decodeURIComponent(albumName)
  );

  if (!songs.length) return <p className="text-gray-400">No songs found for this album.</p>;

  return (
    <div className="flex flex-col">
      <h2 className="text-white font-bold text-3xl mb-6">{albumName}</h2>
      <div className="flex flex-wrap gap-8">
        {songs.map((song, i) => (
          <SongCard key={song.id || i} song={song} i={i} data={songs} />
        ))}
      </div>
    </div>
  );
};

export default AlbumDetails;
