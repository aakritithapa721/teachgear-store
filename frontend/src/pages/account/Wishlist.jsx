import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Star,
  Search,
  Grid,
  List
} from 'lucide-react';

const Wishlist = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const wishlistItems = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: '$99.99',
      originalPrice: '$129.99',
      image: '/api/placeholder/300/300',
      rating: 4.5,
      reviews: 128,
      inStock: true,
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: '$199.99',
      originalPrice: '$249.99',
      image: '/api/placeholder/300/300',
      rating: 4.8,
      reviews: 95,
      inStock: true,
      category: 'Wearables'
    },
    {
      id: 3,
      name: 'Mechanical Gaming Keyboard',
      price: '$149.99',
      originalPrice: null,
      image: '/api/placeholder/300/300',
      rating: 4.6,
      reviews: 76,
      inStock: false,
      category: 'Gaming'
    },
    {
      id: 4,
      name: 'Wireless Charging Pad',
      price: '$29.99',
      originalPrice: '$39.99',
      image: '/api/placeholder/300/300',
      rating: 4.3,
      reviews: 54,
      inStock: true,
      category: 'Accessories'
    }
  ];

  const filteredItems = wishlistItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeFromWishlist = (itemId) => {
    // Handle remove from wishlist
    console.log('Remove item:', itemId);
  };

  const addToCart = (itemId) => {
    // Handle add to cart
    console.log('Add to cart:', itemId);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className={`rounded-xl border overflow-hidden ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } shadow-sm hover:shadow-lg transition-shadow`}
        >
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {!item.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-medium px-3 py-1 bg-red-600 rounded">
                  Out of Stock
                </span>
              </div>
            )}
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-red-50 transition-colors"
            >
              <Heart className="text-red-500 fill-current" size={20} />
            </button>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className={`font-semibold mb-2 line-clamp-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {item.name}
            </h3>
            
            <div className="flex items-center mb-2">
              {renderStars(item.rating)}
              <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                ({item.reviews})
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.price}
                </span>
                {item.originalPrice && (
                  <span className={`text-sm line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {item.originalPrice}
                  </span>
                )}
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {item.category}
              </span>
            </div>
            
            <button
              onClick={() => addToCart(item.id)}
              disabled={!item.inStock}
              className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                item.inStock
                  ? darkMode
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  : darkMode
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={18} className="mr-2" />
              {item.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className={`p-6 rounded-xl border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center space-x-6">
            {/* Product Image */}
            <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {!item.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xs font-medium px-2 py-1 bg-red-600 rounded">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {item.name}
              </h3>
              
              <div className="flex items-center mb-2">
                {renderStars(item.rating)}
                <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  ({item.reviews} reviews)
                </span>
                <span className={`ml-4 text-sm px-2 py-1 rounded ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.category}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.price}
                </span>
                {item.originalPrice && (
                  <span className={`text-sm line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {item.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => addToCart(item.id)}
                disabled={!item.inStock}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  item.inStock
                    ? darkMode
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                    : darkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={18} className="mr-2" />
                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button
                onClick={() => removeFromWishlist(item.id)}
                className={`p-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-red-400' 
                    : 'border-gray-300 text-gray-600 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          My Wishlist
        </h1>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {filteredItems.length} items saved for later
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`} size={20} />
          <input
            type="text"
            placeholder="Search wishlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                : darkMode ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                : darkMode ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      {filteredItems.length > 0 ? (
        viewMode === 'grid' ? <GridView /> : <ListView />
      ) : (
        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Heart size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">
            {searchTerm ? 'No items match your search' : 'Your wishlist is empty'}
          </h3>
          <p>
            {searchTerm 
              ? 'Try adjusting your search terms.' 
              : 'Save items you love to keep track of them here.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
