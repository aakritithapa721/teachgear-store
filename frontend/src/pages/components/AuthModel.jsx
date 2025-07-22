import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, darkMode }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      console.log('Login attempt:', { email: formData.email, password: formData.password });
      // Add your login logic here
      alert('Login functionality would be implemented here');
    } else {
      console.log('Registration attempt:', formData);
      // Add your registration logic here
      alert('Registration functionality would be implemented here');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' });
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        style={{
          animation: isOpen ? 'slideUp 0.3s ease-out' : 'none'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${
            darkMode 
              ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 text-center">
          <h2 className="text-2xl font-bold mb-1">TEACHGEAR</h2>
          <p className="text-red-100">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`flex ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
          <button
            onClick={() => switchTab('login')}
            className={`flex-1 py-4 px-6 font-medium transition-all duration-200 relative ${
              activeTab === 'login'
                ? `${darkMode ? 'text-red-400 bg-gray-800' : 'text-red-500 bg-white'}`
                : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`
            }`}
          >
            Login
            {activeTab === 'login' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500"></div>
            )}
          </button>
          <button
            onClick={() => switchTab('register')}
            className={`flex-1 py-4 px-6 font-medium transition-all duration-200 relative ${
              activeTab === 'register'
                ? `${darkMode ? 'text-red-400 bg-gray-800' : 'text-red-500 bg-white'}`
                : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`
            }`}
          >
            Register
            {activeTab === 'register' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500"></div>
            )}
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="space-y-4">
            {activeTab === 'register' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:bg-gray-600'
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-20`}
                />
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:bg-gray-600'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:bg-white'
                } focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-20`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={activeTab === 'login' ? 'Enter your password' : 'Create a password'}
                required
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:bg-gray-600'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:bg-white'
                } focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-20`}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              {activeTab === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            {activeTab === 'login' && (
              <div className="text-center mt-4">
                <button 
                  onClick={() => alert('Password reset functionality would be implemented here')}
                  className={`text-sm hover:underline ${darkMode ? 'text-red-400' : 'text-red-500'}`}
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AuthModal;