/*import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/Cartcontext'

const NavBar = () => {
  const { itemCount } = useCart()

  return (
    <div className='flex'>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/'}>Home</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/ContactUs'}>Contact Us</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/about'}>About Us</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/Register'}>Register</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/Login'}>Login</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/Products'}>Products</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black relative' to={'/cart'}>
        Cart
        {itemCount > 0 && (
          <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs'>
            {itemCount}
          </span>
        )}
      </Link>
    </div>
  )
}

export default NavBar
*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Sun, Moon, X } from 'lucide-react';
import { useCart } from '../../context/Cartcontext';

const Homepage = () => {
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

  const categories = [
    {
      title: "Wireless HEADPHONES",
      subtitle: "Beats Solo",
      bgColor: "bg-gradient-to-br from-gray-100 to-gray-200",
      textColor: "text-black",
      buttonColor: "bg-red-500 hover:bg-red-600",
      image: "🎧"
    },
    {
      title: "Smart WATCHES", 
      subtitle: "New",
      bgColor: "bg-gradient-to-br from-yellow-400 to-orange-400",
      textColor: "text-black",
      buttonColor: "bg-white hover:bg-gray-100 text-black",
      image: "⌚"
    },
    {
      title: "Gaming LAPTOPS",
      subtitle: "Trend",
      bgColor: "bg-gradient-to-br from-red-500 to-pink-500",
      textColor: "text-white",
      buttonColor: "bg-white hover:bg-gray-100 text-black",
      image: "💻"
    },
    {
      title: "Gaming CONSOLES",
      subtitle: "Best",
      bgColor: "bg-gradient-to-br from-gray-200 to-gray-300",
      textColor: "text-black", 
      buttonColor: "bg-red-500 hover:bg-red-600",
      image: "🎮"
    },
    {
      title: "VR Gaming GEAR",
      subtitle: "Play",
      bgColor: "bg-gradient-to-br from-green-400 to-emerald-500",
      textColor: "text-white",
      buttonColor: "bg-white hover:bg-gray-100 text-black",
      image: "🥽"
    },
    {
      title: "Smart SPEAKERS",
      subtitle: "New Amazon",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600", 
      textColor: "text-white",
      buttonColor: "bg-white hover:bg-gray-100 text-black",
      image: "🔊"
    }
  ];

  const features = [
    { icon: "🚚", title: "Free Shipping", desc: "Free Delivery On All Order" },
    { icon: "💰", title: "Money Guarantee", desc: "30 Day Money Back" },
    { icon: "🎧", title: "Online Support 24/7", desc: "Technical Support 24/7" },
    { icon: "🔒", title: "Secure Payment", desc: "All Cards Accepted" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Navigation Header */}
      <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-md sticky top-0 z-50 transition-colors duration-300`}>
        {/* Main Header */}
        <header className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-red-500 hover:text-red-600 transition-colors">
              TEACHGEAR
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <Link to="/" className="hover:text-red-500 transition-colors font-medium">Home</Link>
              <Link to="/Products" className="hover:text-red-500 transition-colors font-medium">Products</Link>
              <Link to="/about" className="hover:text-red-500 transition-colors font-medium">About Us</Link>
              <Link to="/ContactUs" className="hover:text-red-500 transition-colors font-medium">Contact Us</Link>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon - Desktop */}
              <div className="hidden md:block relative">
                <Search size={20} className="cursor-pointer hover:text-red-500 transition-colors" />
              </div>

              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode} 
                className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Auth Links - Desktop */}
              <div className="hidden lg:flex items-center space-x-4">
                <Link to="/Login" className="hover:text-red-500 transition-colors">
                  <User size={20} />
                </Link>
                <Link to="/Register" className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors font-medium">
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
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Main featured product */}
          <div className={`${categories[0].bgColor} rounded-2xl p-8 lg:col-span-2 relative overflow-hidden`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium mb-2">{categories[0].subtitle}</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {categories[0].title}
                </h1>
                <Link 
                  to="/Products"
                  className={`${categories[0].buttonColor} text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-block`}
                >
                  Shop By Category
                </Link>
              </div>
              <div className="text-8xl opacity-20 absolute right-8 top-1/2 transform -translate-y-1/2">
                {categories[0].image}
              </div>
            </div>
          </div>

          {/* Side banner */}
          <div className="space-y-6">
            <div className={`${categories[1].bgColor} rounded-2xl p-6 text-center relative overflow-hidden`}>
              <div className="text-6xl mb-4">{categories[1].image}</div>
              <p className="text-sm font-medium mb-2">{categories[1].subtitle}</p>
              <h3 className="text-2xl font-bold mb-4">{categories[1].title}</h3>
              <Link 
                to="/Products"
                className={`${categories[1].buttonColor} px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-block`}
              >
                Browse
              </Link>
            </div>
            
            <div className={`${categories[2].bgColor} rounded-2xl p-6 text-center relative overflow-hidden`}>
              <div className="text-6xl mb-4">{categories[2].image}</div>
              <p className={`text-sm font-medium mb-2 ${categories[2].textColor}`}>{categories[2].subtitle}</p>
              <h3 className={`text-2xl font-bold mb-4 ${categories[2].textColor}`}>{categories[2].title}</h3>
              <Link 
                to="/Products"
                className={`${categories[2].buttonColor} px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-block`}
              >
                Browse
              </Link>
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className={`${categories[3].bgColor} rounded-2xl p-6 text-center relative overflow-hidden`}>
            <p className="text-sm font-medium mb-2">{categories[3].subtitle}</p>
            <h3 className="text-2xl font-bold mb-4">{categories[3].title}</h3>
            <div className="text-8xl mb-4 opacity-30">{categories[3].image}</div>
            <Link 
              to="/Products"
              className={`${categories[3].buttonColor} text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-block`}
            >
              Browse
            </Link>
          </div>

          <div className={`${categories[4].bgColor} rounded-2xl p-6 text-center relative overflow-hidden`}>
            <div className="text-8xl mb-4 opacity-80">{categories[4].image}</div>
            <p className={`text-sm font-medium mb-2 ${categories[4].textColor}`}>{categories[4].subtitle}</p>
            <h3 className={`text-2xl font-bold mb-4 ${categories[4].textColor}`}>{categories[4].title}</h3>
            <Link 
              to="/Products"
              className={`${categories[4].buttonColor} px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-block`}
            >
              Browse
            </Link>
          </div>

          <div className={`${categories[5].bgColor} rounded-2xl p-6 text-center relative overflow-hidden`}>
            <p className={`text-sm font-medium mb-2 ${categories[5].textColor}`}>{categories[5].subtitle}</p>
            <h3 className={`text-2xl font-bold mb-4 ${categories[5].textColor}`}>{categories[5].title}</h3>
            <div className="text-8xl mb-4 opacity-80">{categories[5].image}</div>
            <Link 
              to="/Products"
              className={`${categories[5].buttonColor} px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-block`}
            >
              Browse
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-110 z-40"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
};

export default Homepage;