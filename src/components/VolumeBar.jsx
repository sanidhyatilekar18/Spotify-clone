import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

const VolumeBar = ({ volume, setVolume }) => (
  <div className="flex items-center gap-2">
    {volume > 0 ? <HiVolumeUp /> : <HiVolumeOff />}
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={(e) => setVolume(+e.target.value)}
      className="w-24 h-1 bg-gray-600 rounded-lg accent-white"
    />
  </div>
);

export default VolumeBar;
