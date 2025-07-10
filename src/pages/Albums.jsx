import React from 'react';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Link } from 'react-router-dom';

const Albums = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <p className="text-white text-lg px-4">Loading Albums...</p>;
  if (error) return <p className="text-red-500 px-4">Error fetching albums.</p>;

  // Group songs by albumName
  const albumMap = new Map();

  data?.forEach((song) => {
    const albumName = song?.attributes?.albumName;
    if (!albumName) return;

    if (!albumMap.has(albumName)) {
      albumMap.set(albumName, {
        albumName,
        artistName: song?.attributes?.artistName,
        artwork: song?.attributes?.artwork?.url,
        songs: [song],
      });
    } else {
      albumMap.get(albumName).songs.push(song);
    }
  });

  const albums = Array.from(albumMap.values());

  return (
    <div className="flex flex-col px-4">
      <h2 className="font-bold text-3xl text-white mt-4 mb-10">💿 Albums</h2>
      <div className="flex flex-wrap justify-center sm:justify-start gap-8">
        {albums.map((album, idx) => (
          <Link
            to={`/albums/${encodeURIComponent(album.albumName)}`}
            key={idx}
            className={`flex flex-col w-[250px] p-4 rounded-lg bg-white/5 backdrop-blur-sm cursor-pointer group hover:bg-white/10 transition`}
          >
            <div className="relative w-full h-56 mb-4 overflow-hidden">
              <img
                src={album.artwork?.replace('{w}', '250').replace('{h}', '250')}
                alt={album.albumName}
                className="w-full h-full rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-white truncate">{album.albumName}</p>
              <p className="text-sm text-gray-300 mt-1 truncate">{album.artistName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Albums;
