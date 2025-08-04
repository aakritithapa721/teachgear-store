import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  TrendingUp, 
  Clock,
  ShoppingBag,
  Star
} from 'lucide-react';

const AccountDashboard = ({ darkMode }) => {
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  const stats = [
    { label: 'Total Orders', value: '12', icon: Package, color: 'blue' },
    { label: 'Wishlist Items', value: '8', icon: Heart, color: 'red' },
    { label: 'Addresses', value: '3', icon: MapPin, color: 'green' },
    { label: 'Payment Methods', value: '2', icon: CreditCard, color: 'purple' },
  ];

  const recentOrders = [
    { id: '#12345', date: '2024-01-15', total: '$89.99', status: 'Delivered', items: 2 },
    { id: '#12344', date: '2024-01-10', total: '$156.50', status: 'Shipped', items: 3 },
    { id: '#12343', date: '2024-01-05', total: '$45.00', status: 'Processing', items: 1 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'Shipped': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Processing': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className={`rounded-xl p-6 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg`}>
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Welcome back, {user?.name || user?.email?.split('@')[0] || 'User'}! 👋
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`rounded-xl p-6 ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              } shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                  <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className={`rounded-xl p-6 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Orders
          </h2>
          <Link
            to="/account/orders"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
          >
            View all orders →
          </Link>
        </div>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className={`p-4 rounded-lg border transition-colors duration-200 ${
                darkMode 
                  ? 'border-gray-700 hover:bg-gray-700/50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <Package className={`w-5 h-5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Order {order.id}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {order.date} • {order.items} items
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {order.total}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`rounded-xl p-6 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg`}>
        <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/products"
            className={`p-4 rounded-lg border-2 border-dashed transition-all duration-300 hover:border-solid ${
              darkMode 
                ? 'border-gray-600 hover:border-indigo-500 hover:bg-gray-700/50' 
                : 'border-gray-300 hover:border-indigo-500 hover:bg-indigo-50'
            }`}
          >
            <ShoppingBag className={`w-8 h-8 mb-3 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <h3 className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Continue Shopping
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Explore our latest products
            </p>
          </Link>

          <Link
            to="/account/wishlist"
            className={`p-4 rounded-lg border-2 border-dashed transition-all duration-300 hover:border-solid ${
              darkMode 
                ? 'border-gray-600 hover:border-red-500 hover:bg-gray-700/50' 
                : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-8 h-8 mb-3 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <h3 className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              View Wishlist
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              8 items waiting for you
            </p>
          </Link>

          <Link
            to="/account/help"
            className={`p-4 rounded-lg border-2 border-dashed transition-all duration-300 hover:border-solid ${
              darkMode 
                ? 'border-gray-600 hover:border-green-500 hover:bg-gray-700/50' 
                : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
            }`}
          >
            <Star className={`w-8 h-8 mb-3 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <h3 className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Leave a Review
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Share your experience
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default AccountDashboard;