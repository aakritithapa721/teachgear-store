import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username || 'User'}!</h1>

      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">🛒 Your Cart</h2>
        <p>Items in Cart: {itemCount}</p>
        <p>Total: ${total.toFixed(2)}</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate('/cart')}
        >
          Go to Cart
        </button>
      </div>

      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">📦 Your Orders</h2>
        <p>Order history will appear here soon.</p>
      </div>

      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-2">⚙️ Settings</h2>
        <p>Account management coming soon.</p>
      </div>
    </div>
  );
};

export default UserDashboard;
