import React, { useState } from 'react';
import { useGetSongsByGenreAndCountryQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';

const genres = [
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop/Rap', value: 'HIP_HOP_RAP' },
  { title: 'Dance', value: 'DANCE' },
  { title: 'Electronic', value: 'ELECTRONIC' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Latin', value: 'LATIN' },
  { title: 'Afrobeat', value: 'AFRO_BEATS' },
];

const Genres = () => {
  const [genre, setGenre] = useState('POP');
  const [country, setCountry] = useState('IN'); 

  const { data, isFetching, error } = useGetSongsByGenreAndCountryQuery({
    genre,
    country,
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mt-4 mb-6">
        <h2 className="text-white text-3xl font-bold">🎼 Songs by Genre & Country</h2>
        <div className="flex gap-4">
          <select
            className="bg-gray-800 text-white p-2 rounded-md"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {genres.map((g) => (
              <option key={g.value} value={g.value}>
                {g.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="bg-gray-800 text-white p-2 rounded-md w-20"
            value={country}
            onChange={(e) => setCountry(e.target.value.toUpperCase())}
            placeholder="Country"
          />
        </div>
      </div>

      {isFetching ? (
        <p className="text-white">Loading songs...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching songs</p>
      ) : (
        <div className="flex flex-wrap gap-8">
          {data?.map((song, i) => (
            <SongCard key={song.key || i} song={song} i={i} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Genres;
