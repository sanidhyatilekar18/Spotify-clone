import React, { useEffect, useState } from 'react';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';

const AroundYou = () => {
  const [countryCode, setCountryCode] = useState(null);
  const [errorLocation, setErrorLocation] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        setCountryCode(data.country_code);
      } catch (err) {
        setErrorLocation('Unable to detect location');
        setCountryCode('US');
      }
    };

    fetchCountry();
  }, []);

  const { data, isFetching, error } = useGetSongsByCountryQuery(countryCode);

  if (isFetching || !countryCode)
    return <p className="text-white p-4">Detecting location and loading music...</p>;

  if (error || !data)
    return (
      <p className="text-red-500 p-4">
        Error fetching songs for your region. {errorLocation}
      </p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">
        Around You 🌍 {countryCode && `- ${countryCode}`}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.slice(0, 50).map((song, i) => (
          <SongCard key={song.key || i} song={song} i={i} data={data} />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
