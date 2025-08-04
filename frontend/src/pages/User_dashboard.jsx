import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { jwtDecode } from 'jwt-decode'; // Added this import

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { itemCount, total } = useCart();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.error('Invalid token:', err);
      navigate('/login');
    }
  }, [navigate]);

  // Check if user is admin (assuming role is in token)
  const isAdmin = user?.role === 'admin';

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Welcome, {user?.username || 'User'}!
      </h1>


      <div className="bg-white dark:bg-gray-800 shadow rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">🛒 Your Cart</h2>
        <p className="text-gray-700 dark:text-gray-300">Items in Cart: {itemCount}</p>
        <p className="text-gray-700 dark:text-gray-300">Total: ${total.toFixed(2)}</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate('/cart')}
        >
          Go to Cart
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">📦 Your Orders</h2>
        <p className="text-gray-700 dark:text-gray-300">Order history will appear here soon.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">⚙️ Settings</h2>
        <p className="text-gray-700 dark:text-gray-300">Account management coming soon.</p>
      </div>

      {/* Conditionally render admin links if user is admin */}
      {isAdmin && (
        <div className="mt-6">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-4"
            onClick={() => navigate('/admin')}
          >
            Go to Admin Dashboard
          </button>
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            onClick={() => navigate('/add-product')}
          >
            Add Product
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;