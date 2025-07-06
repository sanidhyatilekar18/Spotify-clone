import React from 'react';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Link } from 'react-router-dom';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <p className="text-white text-lg p-4">Loading Top Artists...</p>;
  if (error) return <p className="text-red-500 p-4">Error fetching artists</p>;

  // Extract top 10 unique artists
  const topArtists = [];
  const seen = new Set();

  for (const track of data) {
    const artist = track?.artists?.[0];
    const image = track?.images?.background;

    if (artist && !seen.has(artist.adamid)) {
      topArtists.push({ id: artist.adamid, name: artist.name, image });
      seen.add(artist.adamid);
    }

    if (topArtists.length >= 10) break;
  }

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-white text-3xl font-bold mb-8">🎤 Top Artists</h2>

      <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
        {topArtists.map((artist) => (
          <Link key={artist.id} to={`/artists/${artist.id}`} className="w-[150px] text-center group">
            <img
              src={artist.image}
              alt={artist.name}
              className="rounded-full w-[150px] h-[150px] object-cover mb-2 group-hover:scale-105 transition"
            />
            <p className="text-white truncate">{artist.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
