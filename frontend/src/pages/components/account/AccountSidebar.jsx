import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings, 
  Bell, 
  HelpCircle, 
  Gift, 
  LogOut 
} from 'lucide-react';

const AccountSidebar = ({ darkMode }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  const getUserInitials = (user) => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  const menuItems = [
    { to: '/account/dashboard', label: 'Dashboard', icon: User },
    { to: '/account/orders', label: 'My Orders', icon: Package, badge: '2' },
    { to: '/account/wishlist', label: 'Wishlist', icon: Heart },
    { to: '/account/addresses', label: 'Addresses', icon: MapPin },
    { to: '/account/payment', label: 'Payment Methods', icon: CreditCard },
    { to: '/account/settings', label: 'Account Settings', icon: Settings },
    { to: '/account/notifications', label: 'Notifications', icon: Bell },
    { to: '/account/help', label: 'Help & Support', icon: HelpCircle },
    { to: '/account/rewards', label: 'Loyalty Rewards', icon: Gift, badge: 'NEW' },
  ];

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      {/* User Header */}
      <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
            {getUserInitials(user)}
          </div>
          <div>
            <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {user?.name || user?.email?.split('@')[0] || 'User'}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {user?.email}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Verified Customer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : `${darkMode 
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon size={18} />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.badge === 'NEW' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 mt-4 border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <LogOut size={18} />
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default AccountSidebar;
