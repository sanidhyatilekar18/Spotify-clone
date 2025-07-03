import React from 'react'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import PlayPause from './PlayPause'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import 'swiper/css'
import 'swiper/css/free-mode'
function TopPlay() {
    const dispatch = useDispatch()
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data } = useGetTopChartsQuery()
    const topPlaysRef = useRef(null)
   useEffect(() => {
  topPlaysRef.current.scrollIntoView({ behavior: 'smooth' });
}, []);

    const topPlays = data?.slice(0, 5)
    const handlePause = () => {
        dispatch(playPause(false))
    }
    const handlePlay = (song, i) => {
        dispatch(setActiveSong({ song, data, i }))
        dispatch(playPause(true))
    }

    return (
        <div ref={topPlaysRef} className='xl:ml-6 ml-0 xl:mr-6 mr-0 flex-1 xl:max-w-[500px] max-w-full flex flex-col'>
            <h2 className='font-bold text-2xl text-white'>Top Plays</h2>
            <Swiper
                slidesPerView='auto'
                spaceBetween={15}
                freeMode
                modules={[FreeMode]}
                className='mt-4'
            >
                {topPlays?.map((song, i) => (
                    <SwiperSlide key={song.key} className='shadow-lg rounded-lg overflow-hidden'>
                        <img src={song.images?.coverart} alt={song.title || "cover-art"} className='w-full h-auto' />
                        <div className='p-4'>
                            <h3 className='font-semibold text-lg text-white'>{song.title}</h3>
                            <p className='text-sm text-gray-400'>{song.subtitle}</p>
                            <PlayPause
                                isPlaying={isPlaying && activeSong?.key === song.key}
                                activeSong={activeSong}
                                song={song}
                                handlePauseClick={handlePause}
                                handlePlayClick={() => handlePlay(song, i)}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default TopPlay