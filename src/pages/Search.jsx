import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';

const Search = () => {
  const { searchTerm } = useParams();
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  if (isFetching) return <p className="text-white text-lg">Searching...</p>;
  if (error) return <p className="text-red-500">Failed to fetch search results</p>;

  const songs = data?.tracks?.hits?.map((hit) => hit.track) || [];

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white mb-6">
        🔍 Search Results for: <span className="text-blue-400">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
        {songs.map((song, i) => (
          <SongCard key={song.key || i} song={song} i={i} data={songs} />
        ))}
      </div>
    </div>
  );
};

export default Search;
