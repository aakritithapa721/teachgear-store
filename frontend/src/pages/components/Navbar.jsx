import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Sun, Moon, X } from 'lucide-react';
import { useCart } from '../../context/Cartcontext';

const Navbar = () => {
  const { itemCount } = useCart();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } shadow-md sticky top-0 z-50 transition-colors duration-300`}
    >
      {/* Main Header */}
      <header className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-red-500 hover:text-red-600 transition-colors"
          >
            TEACHGEAR
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link to="/" className="hover:text-red-500 transition-colors font-medium">
              Home
            </Link>
            <Link to="/Products" className="hover:text-red-500 transition-colors font-medium">
              Products
            </Link>
            <Link to="/add-product" className="hover:text-red-500 transition-colors font-medium">
              Add Product
            </Link>
            <Link to="/about" className="hover:text-red-500 transition-colors font-medium">
              About Us
            </Link>
            <Link to="/ContactUs" className="hover:text-red-500 transition-colors font-medium">
              Contact Us
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Desktop */}
            <div className="hidden md:block relative">
              <Search
                size={20}
                className="cursor-pointer hover:text-red-500 transition-colors"
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Auth Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/Login" className="hover:text-red-500 transition-colors">
                <User size={20} />
              </Link>
              <Link
                to="/Register"
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative cursor-pointer hover:text-red-500 transition-colors">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar - Mobile/Tablet */}
      <div className={`md:hidden px-4 pb-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for tech products..."
            className={`w-full px-4 py-3 pl-12 rounded-lg border transition-colors ${
              darkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none`}
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </form>
      </div>

      {/* Desktop Search Bar */}
      <div className={`hidden md:block px-4 pb-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tech products, gadgets, accessories..."
                className={`w-full px-4 py-3 pl-12 rounded-lg border transition-colors ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none`}
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-t`}>
          <div className="px-4 py-4 space-y-4">
            <Link
              to="/"
              className="block py-2 hover:text-red-500 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/Products"
              className="block py-2 hover:text-red-500 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/add-product"
              className="block py-2 hover:text-red-500 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Add Product
            </Link>
            <Link
              to="/about"
              className="block py-2 hover:text-red-500 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/ContactUs"
              className="block py-2 hover:text-red-500 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />
            <Link
              to="/Login"
              className="block py-2 hover:text-red-500 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/Register"
              className="block bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors font-medium text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
