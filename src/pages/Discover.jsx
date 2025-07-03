import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';
import { genres } from '../assets/constants'; 

function Discover() {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const [selectedGenreId, setSelectedGenreId] = useState(genres[0]?.value || '');

    const { data, isFetching, error } = useGetTopChartsQuery();

    console.log("Data:", data);
    console.log("Is Fetching:", isFetching);
    console.error("API Error Object:", error); 

    if (isFetching) return <p className='text-white'>Loading...</p>;

    if (error) {
        return (
            <div className='text-red-500 text-center p-4'>
                <h1 className='text-xl font-bold'>Error Loading Music!</h1>
                <p>Status: {error.status}</p>
                <p>Data: {JSON.stringify(error.data)}</p>
                <p>Message: {error.message || 'No specific error message provided by API.'}</p>
                <p>Please check your API key, network connection, or RapidAPI dashboard for rate limits.</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col'>
            <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='font-bold text-3xl text-white text-left'>Discover</h2>
                {/* Ensure your select is updated with genres from constants */}
                <select
                    onChange={(e) => {
                        setSelectedGenreId(e.target.value);
                        // dispatch(setGenreListId(e.target.value)); // if you added this action
                    }}
                    value={selectedGenreId}
                    className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
                >
                    {genres.map((genre) => (
                        <option key={genre.value} value={genre.value}>
                            {genre.title}
                        </option>
                    ))}
                </select>
            </div>
 <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((song, i) => (
          <SongCard
            key={song.key || i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
            data={data}
          />
        ))}
      </div>
        </div>
    );
}

export default Discover;