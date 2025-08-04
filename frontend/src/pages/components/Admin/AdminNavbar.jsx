import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { 
  Shield, 
  Settings, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  LogOut, 
  Menu, 
  X,
  Sun,
  Moon,
  Bell,
  Plus
} from 'lucide-react';

const AdminNavbar = ({ darkMode, setDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdmin(decoded);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout from the admin panel?')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const adminNavLinks = [
    { to: '/admin', label: 'Dashboard', icon: BarChart3 },
    { to: '/admin/add-product', label: 'Add Product', icon: Plus },
    { to: '/admin/products-list', label: 'Product List', icon: Package }, // ✅ Corrected Route
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`sticky top-0 z-50 shadow-lg ${darkMode ? 'bg-gray-900 border-b border-gray-700' : 'bg-white border-b border-gray-200'}`}>
      <header className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/admin" className="flex items-center space-x-3 group">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors">
              <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <span className="text-xl font-black text-gray-900 dark:text-white">
                ADMIN PANEL
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                TechGear Store Management
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex space-x-1">
            {adminNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to || location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">
            <button className={`p-3 rounded-lg relative transition-colors ${
              darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {admin?.username || 'Administrator'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  System Admin
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>

            <button
              onClick={toggleMobileMenu}
              className={`lg:hidden p-3 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className={`lg:hidden border-t ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
          <div className="px-4 py-6 space-y-2">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {admin?.username || 'Administrator'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  System Administrator
                </p>
              </div>
            </div>

            {adminNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to || location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 mt-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border-t border-gray-200 dark:border-gray-700"
            >
              <LogOut size={20} />
              <span>Logout from Admin Panel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
