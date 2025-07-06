import { FaBackward, FaPlay, FaPause, FaForward } from 'react-icons/fa';

const Controls = ({ isPlaying, setIsPlaying, handleNext, handlePrev }) => (
  <div className="flex items-center gap-6">
    <FaBackward onClick={handlePrev} className="cursor-pointer text-lg" />
    {isPlaying ? (
      <FaPause onClick={() => setIsPlaying(false)} className="cursor-pointer text-xl" />
    ) : (
      <FaPlay onClick={() => setIsPlaying(true)} className="cursor-pointer text-xl" />
    )}
    <FaForward onClick={handleNext} className="cursor-pointer text-lg" />
  </div>
);

export default Controls;
