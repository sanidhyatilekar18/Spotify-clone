import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="...">
      <input
        type="search"
        placeholder="Search for songs or artists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded-md w-80"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md ml-4 h-10">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
