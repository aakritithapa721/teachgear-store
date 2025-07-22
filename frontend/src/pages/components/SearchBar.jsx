import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, onSearch, onClear }) => {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          placeholder="Search for products..."
          className="w-full px-4 py-3 pr-20 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        
        
        {value && (
          <button
            onClick={onClear}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
        
        <button
          onClick={onSearch}
          className="absolute right-0 top-0 h-full px-6 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition-colors"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;