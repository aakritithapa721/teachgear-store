import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('laptop');
  const [isOpen, setIsOpen] = useState(true);
  const searchRef = useRef(null);

  // Sample product suggestions data
  const suggestions = [
    {
      id: 1,
      type: 'product',
      image: '📱',
      title: 'Msi air gaming backpack - laptop bag for 14", 15.6" 17.3" laptops',
      price: 'रू 8,000'
    },
    {
      id: 2,
      type: 'product',
      image: '🔌',
      title: 'Rapoo pa65 gan 65 watts usb type-c wall charger - for laptops, macbooks & smartphones',
      price: 'रू 4,624'
    },
    {
      id: 3,
      type: 'product',
      image: '⌨️',
      title: 'Rapoo e6350 anodized aluminum bluetooth mini keyboard - works with laptop, ipad, tablet, smartphones',
      price: 'रू 5,625'
    },
    {
      id: 4,
      type: 'product',
      image: '💾',
      title: 'Transcend 4gb ddr4 laptop ram – so-dimm, 2666mhz',
      price: 'रू 4,375'
    },
    {
      id: 5,
      type: 'product',
      image: '💾',
      title: 'Transcend 8gb ddr4 laptop ram – so-dimm, 2666mhz',
      price: 'रू 5,000'
    },
    {
      id: 6,
      type: 'product',
      image: '💾',
      title: 'Transcend 16gb ddr4 laptop ram – so-dimm, 2666mhz',
      price: 'रू 9,500'
    },
    {
      id: 7,
      type: 'product',
      image: '💾',
      title: 'Transcend 32gb ddr4 laptop ram – so-dimm, 3200mhz',
      price: 'रू 17,000'
    }
  ];

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title.split(' ').slice(0, 3).join(' '));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="relative" ref={searchRef}>
        {/* Search Input Container */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder="Search for products..."
            className="w-full px-4 py-3 pr-20 text-gray-700 bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          
          {/* Clear Button */}
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
          
          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 h-full px-6 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition-colors"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Dropdown Suggestions */}
        {isOpen && searchQuery && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-2">
              {suggestions
                .filter(suggestion => 
                  suggestion.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((suggestion) => (
                  <div
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
                  >
                    {/* Product Image/Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {suggestion.image}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900 line-clamp-2">
                        {suggestion.title}
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="flex-shrink-0">
                      <span className="text-lg font-semibold text-red-600">
                        {suggestion.price}
                      </span>
                    </div>
                  </div>
                ))}
              
              {suggestions.filter(suggestion => 
                suggestion.title.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No products found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Demo Info */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Features included:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Real-time search filtering</li>
          <li>• Product suggestions with images and prices</li>
          <li>• Clear button to reset search</li>
          <li>• Click outside to close dropdown</li>
          <li>• Hover effects and smooth transitions</li>
          <li>• Mobile-responsive design</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;