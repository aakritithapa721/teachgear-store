import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Search, ShoppingCart, User, Menu, Sun, Moon, X, Settings, ChevronDown, LogOut, CreditCard, Bell, HelpCircle, Package, UserCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartModal from './CartModal';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const location = useLocation();

  // Hide navbar on login/register routes
  const hideNavbarRoutes = ['/login', '/register'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname.toLowerCase());

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
      if (isSearchVisible) setIsSearchVisible(false);
      if (userDropdownOpen) setUserDropdownOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSearchVisible, userDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownOpen && !event.target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen]);

  if (shouldHideNavbar) return null;

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMobileMenu = () => setMobileMenuOpen((open) => !open);
  const toggleSearchBar = () => setIsSearchVisible((visible) => !visible);
  const toggleUserDropdown = () => setUserDropdownOpen((open) => !open);
  const openCartModal = () => setCartModalOpen(true);
  const closeCartModal = () => setCartModalOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to /products with query parameter instead of /search
      window.location.href = `/products?query=${encodeURIComponent(searchQuery)}`;
      setSearchQuery(''); // Clear input after navigation
    }
  };

  // Decode token to check user role and login status
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;
  const isAdmin = user?.role === 'admin';
  const isLoggedIn = !!token;

  // Get role-specific dashboard route
  const getDashboardRoute = () => {
    if (isAdmin) {
      return '/admin';
    } else if (user?.role === 'user') {
      return '/account/dashboard';
    }
    return '/dashboard';
  };

  // Get dashboard label based on role
  const getDashboardLabel = () => {
    if (isAdmin) {
      return 'Admin Dashboard';
    } else if (user?.role === 'user') {
      return 'My Account';
    }
    return 'Dashboard';
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserDropdownOpen(false);
    window.location.href = '/login';
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    ...(isAdmin ? [{ to: '/add-product', label: 'Add Product' }] : []),
    { to: '/about', label: 'About Us' },
    { to: '/contact-us', label: 'Contact Us' },
  ];

  const getAccountMenuItems = () => {
    if (isAdmin) {
      return [
        { to: '/admin', label: 'Admin Dashboard', icon: Settings },
        { to: '/admin/users', label: 'Manage Users', icon: UserCircle },
        { to: '/admin/products', label: 'Manage Products', icon: Package },
        { to: '/admin/orders', label: 'All Orders', icon: Package },
        { to: '/admin/settings', label: 'System Settings', icon: Settings },
      ];
    } else {
      return [
        { to: '/account/dashboard', label: 'Account Dashboard', icon: UserCircle },
        { to: '/account/orders', label: 'My Orders', icon: Package },
        { to: '/account/settings', label: 'Account Settings', icon: Settings },
        { to: '/account/payment-methods', label: 'Payment Methods', icon: CreditCard },
        { to: '/account/notifications', label: 'Notifications', icon: Bell },
        { to: '/account/help', label: 'Help & Support', icon: HelpCircle },
      ];
    }
  };

  const accountMenuItems = getAccountMenuItems();

  return (
    <>
      <div
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? `${darkMode ? 'bg-gray-900/95' : 'bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-300'} backdrop-blur-md shadow-lg border-b border-white/20`
            : `${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-300'} shadow-md`
        }`}
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)'
            : 'linear-gradient(135deg, #a3bffa 0%, #c4b5fd 50%, #d8b4fe 100%)',
        }}
      >
        <header className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/teachgear-logo.png"
                  alt="TeachGear Store Logo"
                  className="h-10 w-auto group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span
                className={`text-2xl font-black transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700`}
              >
                TEACHGEAR-STORE
              </span>
            </Link>

            <nav className="hidden lg:flex space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                    location.pathname === link.to
                      ? 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'text-gray-800 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 ${
                      location.pathname === link.to ? 'w-full' : ''
                    }`}
                  ></span>
                </Link>
              ))}
              {isLoggedIn && (
                <Link
                  to={getDashboardRoute()}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                    location.pathname === getDashboardRoute()
                      ? 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'text-gray-800 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {getDashboardLabel()}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 ${
                      location.pathname === getDashboardRoute() ? 'w-full' : ''
                    }`}
                  ></span>
                </Link>
              )}
            </nav>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleSearchBar}
                className={`hidden md:flex p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600 hover:text-indigo-700'
                }`}
                aria-label="Toggle search bar"
              >
                <Search size={20} />
              </button>

              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                  darkMode
                    ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 hover:text-yellow-300'
                    : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600 hover:text-indigo-700'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="hidden lg:flex items-center space-x-3">
                {isLoggedIn ? (
                  <div className="relative user-dropdown">
                    <button
                      onClick={toggleUserDropdown}
                      className={`flex items-center space-x-2 p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                        darkMode
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                          : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600 hover:text-indigo-700'
                      }`}
                    >
                      <User size={20} />
                      <span className="font-medium">
                        {user?.name || 'Account'} {isAdmin && '(Admin)'}
                      </span>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${
                          userDropdownOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    {userDropdownOpen && (
                      <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-lg border backdrop-blur-md z-50 ${
                        darkMode 
                          ? 'bg-gray-800/95 border-gray-700' 
                          : 'bg-white/95 border-gray-200'
                      }`}>
                        <div className="py-2">
                          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {user?.name || 'User'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {user?.email || 'user@example.com'}
                            </p>
                            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                              {isAdmin ? 'Administrator' : 'User Account'}
                            </p>
                          </div>

                          {accountMenuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.to}
                                to={item.to}
                                className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${
                                  darkMode
                                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                                }`}
                                onClick={() => setUserDropdownOpen(false)}
                              >
                                <Icon size={16} />
                                <span>{item.label}</span>
                              </Link>
                            );
                          })}

                          <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                            <button
                              onClick={handleLogout}
                              className={`flex items-center space-x-3 w-full px-4 py-3 text-sm transition-colors ${
                                darkMode
                                  ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300'
                                  : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                              }`}
                            >
                              <LogOut size={16} />
                              <span>Logout</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={`p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                        darkMode
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                          : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600 hover:text-indigo-700'
                      }`}
                    >
                      <User size={20} />
                    </Link>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              <button
                onClick={openCartModal}
                className={`relative p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600 hover:text-indigo-700'
                }`}
                aria-label="Open cart"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>

              <Link
                to="/checkout"
                className="hidden lg:inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Checkout
              </Link>

              <button
                onClick={toggleMobileMenu}
                className={`lg:hidden p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600 hover:text-indigo-700'
                }`}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <button
                onClick={toggleSearchBar}
                className={`md:hidden p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600 hover:text-indigo-700'
                }`}
                aria-label="Toggle search bar"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </header>

        {isSearchVisible && (
          <div className={`px-4 pb-6 border-t border-gray-200 dark:border-gray-700 ${
            darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-300'
          }`}
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)'
              : 'linear-gradient(135deg, #a3bffa 0%, #c4b5fd 50%, #d8b4fe 100%)',
          }}>
            <div className="container mx-auto">
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for tech products, gadgets, accessories..."
                    className={`w-full px-6 py-4 pl-14 rounded-2xl border-2 transition-all duration-300 text-lg ${
                      darkMode
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500'
                        : 'bg-indigo-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-indigo-500'
                    } focus:ring-4 focus:ring-indigo-500/20 outline-none shadow-lg`}
                  />
                  <Search
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={24}
                  />
                </form>
              </div>
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <div className={`lg:hidden border-t border-gray-200 dark:border-gray-700 ${
            darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-300'
          }`}
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)'
              : 'linear-gradient(135deg, #a3bffa 0%, #c4b5fd 50%, #d8b4fe 100%)',
          }}>
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    location.pathname === link.to
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                      : 'text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-700 dark:hover:text-indigo-400'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn && (
                <Link
                  to={getDashboardRoute()}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    location.pathname === getDashboardRoute()
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                      : 'text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-700 dark:hover:text-indigo-400'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {getDashboardLabel()}
                </Link>
              )}
              <Link
                to="/checkout"
                className="block px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-700 dark:hover:text-indigo-400 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Checkout
              </Link>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-2">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user?.email || 'user@example.com'}
                      </p>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        {isAdmin ? 'Administrator' : 'User Account'}
                      </p>
                    </div>
                    {accountMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-700 dark:hover:text-indigo-400 transition-all duration-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-700 dark:hover:text-indigo-400 transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <CartModal isOpen={cartModalOpen} onClose={closeCartModal} />
    </>
  );
};

export default Navbar;
