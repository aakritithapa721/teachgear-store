import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// Existing imports
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import UserDashboard from './pages/User_dashboard';
import AdminDashboard from './pages/components/Admin/Admin_dashboard';
import AdminProducts from './pages/components/Admin/AdminProducts';
import AddProduct from './pages/components/Admin/AddProduct';
import Uploads from './pages/uploads';
import Checkout from './pages/Checkout';
import Navbar from './pages/components/Navbar';
import ScrollToTopButton from './pages/components/ScrollToTopButton';
import Footer from './pages/components/Footer';

// Account-related imports
import AccountLayout from './pages/components/account/AccountLayout';
import AccountDashboard from './pages/account/AccountDashboard';
import MyOrders from './pages/account/MyOrders';
import Wishlist from './pages/account/Wishlist';
import Addresses from './pages/account/Addresses';
import PaymentMethods from './pages/components/AccountManagement/PaymentMethods';
import AccountSettings from './pages/components/AccountManagement/AccountSettings';
import Notifications from './pages/components/AccountManagement/Notifications';
import HelpSupport from './pages/components/AccountManagement/HelpSupport';
import LoyaltyRewards from './pages/components/AccountManagement/LoyaltyRewards';
import ProductList from './pages/components/Admin/ProductList';

// Admin Layout Component
import AdminLayout from './pages/components/Admin/AdminLayout';

// New admin pages
import ManageUsers from './pages/components/Admin/ManageUsers';
import ReviewOrders from './pages/components/Admin/ReviewOrders';
import SystemSettings from './pages/components/Admin/SystemSettings';

import './styles/modern.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme');
    return savedMode ? savedMode === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <CartProvider>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
        style={{
          backgroundColor: darkMode ? '#111827' : '#ffffff',
          color: darkMode ? '#ffffff' : '#111827',
        }}
      >
        <Router>
          <Toaster 
            toastOptions={{
              className: darkMode ? 'dark-toast' : 'light-toast',
              style: {
                background: darkMode ? '#374151' : '#ffffff',
                color: darkMode ? '#ffffff' : '#111827',
              },
            }}
          />

          <Routes>
            {/* Public & User Routes */}
            <Route path="/*" element={
              <>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} toggleTheme={toggleTheme} />
                <Routes>
                  <Route path="/" element={<Homepage darkMode={darkMode} />} />
                  <Route path="/about" element={<AboutUs darkMode={darkMode} />} />
                  <Route path="/contact-us" element={<ContactUs darkMode={darkMode} />} />
                  <Route path="/register" element={<Register darkMode={darkMode} />} />
                  <Route path="/login" element={<Login darkMode={darkMode} />} />
                  <Route path="/products" element={<Products darkMode={darkMode} />} /> {/* No products prop needed */}
                  <Route path="/dashboard" element={<UserDashboard darkMode={darkMode} />} />
                  <Route path="/homepage" element={<Homepage darkMode={darkMode} />} />
                  <Route path="/uploads" element={<Uploads darkMode={darkMode} />} />
                  <Route path="/checkout" element={<Checkout darkMode={darkMode} />} />

                  {/* User Account Routes */}
                  <Route path="/account" element={<AccountLayout darkMode={darkMode} />}>
                    <Route index element={<Navigate to="/account/dashboard" replace />} />
                    <Route path="dashboard" element={<AccountDashboard darkMode={darkMode} />} />
                    <Route path="orders" element={<MyOrders darkMode={darkMode} />} />
                    <Route path="wishlist" element={<Wishlist darkMode={darkMode} />} />
                    <Route path="addresses" element={<Addresses darkMode={darkMode} />} />
                    <Route path="payment" element={<PaymentMethods darkMode={darkMode} />} />
                    <Route path="settings" element={<AccountSettings darkMode={darkMode} />} />
                    <Route path="notifications" element={<Notifications darkMode={darkMode} />} />
                    <Route path="help" element={<HelpSupport darkMode={darkMode} />} />
                    <Route path="rewards" element={<LoyaltyRewards darkMode={darkMode} />} />
                  </Route>
                </Routes>
                <ScrollToTopButton darkMode={darkMode} />
                <Footer darkMode={darkMode} />
              </>
            } />

            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminLayout darkMode={darkMode} toggleTheme={toggleTheme} />}>
              <Route index element={<AdminDashboard darkMode={darkMode} />} />
              <Route path="dashboard" element={<AdminDashboard darkMode={darkMode} />} />
              <Route path="products" element={<AdminProducts darkMode={darkMode} />} />
              <Route path="add-product" element={<AddProduct darkMode={darkMode} />} />
              <Route path="uploads" element={<Uploads darkMode={darkMode} />} />
              <Route path="products-list" element={<ProductList darkMode={darkMode} />} />
              <Route path="users/manage" element={<ManageUsers darkMode={darkMode} />} />
              <Route path="orders/review" element={<ReviewOrders darkMode={darkMode} />} />
              <Route path="system/settings" element={<SystemSettings darkMode={darkMode} />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </CartProvider>
  );
};

export default App;