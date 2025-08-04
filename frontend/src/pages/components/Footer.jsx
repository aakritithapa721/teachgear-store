import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">TeachGear Store</h3>
          <p className="text-sm">
            Your one-stop shop for the latest tech gadgets and accessories. Quality products, great prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul>
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact-us" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <p>Email: support@teachgear.com</p>
          <p>Phone: +977 980-123-4567</p>
          <p>Address: Thamel, Kathmandu, Nepal</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8 text-sm">
        &copy; {new Date().getFullYear()} TeachGear Store. All rights reserved.
      </div>
    </footer>
  );
}
