const formatTime = (s) => {
  const mins = Math.floor(s / 60) || 0;
  const secs = Math.floor(s % 60) || 0;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const Seekbar = ({ value, max, onInput, duration }) => (
  <div className="flex items-center gap-2 w-full text-xs text-gray-300 mt-2">
    <span>{formatTime(value)}</span>
    <input
      type="range"
      value={value}
      max={max}
      step="0.01"
      onChange={(e) => onInput(+e.target.value)}
      className="w-full h-1 bg-gray-600 rounded-lg accent-white"
    />
    <span>{formatTime(duration)}</span>
  </div>
);

export default Seekbar;
