// src/components/SearchBar.jsx
import { useSearch } from '../context/SearchContext';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    handleSearch 
  } = useSearch();

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Search for products..."
        className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      )}
      <button
        onClick={handleSearch}
        className="absolute right-0 top-0 h-full px-4 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700"
      >
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;